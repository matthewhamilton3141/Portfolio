// components/notch-media-player.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from "lucide-react"

interface Track {
  title: string
  artist: string
  src: string
  coverUrl?: string
  waveColor: string 
  progressColor: string 
}

const TRACKS: Track[] = [
  {
    title: "who knows",
    artist: "daniel caesar",
    src: "/audio/whoknows.mp3",
    coverUrl: "/images/sonofspergy.jpg", 
    waveColor: "linear-gradient(to top, #800020,  #c60032ff )", 
    progressColor: "#E2E8F0"
  },
  {
    title: "japanese denim",
    artist: "daniel caesar",
    src: "/audio/japanesedenim.mp3",
    coverUrl: "/images/japanesedenim.jpg", 
    waveColor: "linear-gradient(to top, #e2e2e2ff,  #a5a5a5ff )",
    progressColor: "#E2E8F0" 
  },
  {
    title: "nights",
    artist: "frank ocean",
    src: "/audio/nights.mp3",
    coverUrl: "/images/blond.jpg",
    waveColor: "linear-gradient(to top, #22C55E, #e4e4e4ff)",
    progressColor: "#E2E8F0"
  },
  {
    title: "ochos rios",
    artist: "daniel caesar",
    src: "/audio/ochosrios.mp3",
    coverUrl: "/images/neverenough.jpg",
    waveColor: "#4169E1", 
    progressColor: "#E2E8F0"
  },
  {
    title: "clarity",
    artist: "zedd (ft. foxes)",
    src: "/audio/clarity.mp3",
    coverUrl: "/images/clarity.jpg",
    waveColor: "linear-gradient(to top, #3B82F6, #22C55E)", 
    progressColor: "#E2E8F0"
  },
  {
    title: "whiplash",
    artist: "aespa",
    src: "/audio/whiplash.mp3",
    coverUrl: "/images/whiplash.jpg",
    waveColor: "#FFFFFF", 
    progressColor: "#E2E8F0"
  },
  {
    title: "cyanide",
    artist: "daniel caeesar",
    src: "/audio/cyanide.mp3",
    coverUrl: "/images/casestudy.jpeg",
    waveColor: "linear-gradient(to top, #7aadffb9, #b7b7b7ff)",
    progressColor: "#E2E8F0"
  }
]

export function NotchMediaPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const barRefs = useRef<HTMLDivElement[]>([])
  const playerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentTrack = TRACKS[currentTrackIndex]
  const BAR_COUNT = 9
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  // Reset function for mobile idle timing
  const resetInactivityTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    if (typeof window !== "undefined" && window.innerWidth < 768 && isExpanded) {
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 2500) // 5 seconds of total layout inactivity -> auto close
    }
  }

  // Manage custom event communication, tracking window loops, and touch inputs
  useEffect(() => {
    const event = new CustomEvent("notchStateChange", { detail: { isExpanded } })
    window.dispatchEvent(event)

    if (!isExpanded) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      return
    }

    resetInactivityTimer()

    const handleScroll = () => setIsExpanded(false)
    const handleTouchOutside = (e: TouchEvent) => {
      if (playerRef.current && !playerRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("touchend", handleTouchOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("touchend", handleTouchOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isExpanded])

  useEffect(() => {
    const audio = new Audio()
    audio.crossOrigin = "anonymous"
    audio.preload = "metadata"
    audioRef.current = audio

    const setAudioData = () => setDuration(audio.duration || 0)
    const setAudioTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => handleNext()

    audio.addEventListener("loadedmetadata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", handleEnded)

    audio.src = TRACKS[0].src

    return () => {
      audio.pause()
      audio.removeEventListener("loadedmetadata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", handleEnded)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    const wasPlaying = isPlaying
    audioRef.current.src = currentTrack.src
    audioRef.current.load()

    if (wasPlaying) {
      audioRef.current.play()
        .then(() => initAudioContext())
        .catch(() => setIsPlaying(false))
    } else {
      setCurrentTime(0)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
        .then(() => initAudioContext())
        .catch(() => setIsPlaying(false))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.muted = isMuted
  }, [isMuted])

  const initAudioContext = () => {
    if (!audioRef.current) return

    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContextClass()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      
      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)

      audioContextRef.current = ctx
      analyserRef.current = analyser
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume()
    }

    renderVisualizer()
  }

  const renderVisualizer = () => {
    if (!analyserRef.current) return

    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      if (audioRef.current && !audioRef.current.paused) {
        analyserRef.current!.getByteFrequencyData(dataArray)

        barRefs.current.forEach((bar, index) => {
          if (!bar) return
          const dataIndex = Math.floor((index / BAR_COUNT) * (bufferLength * 0.55))
          const rawValue = dataArray[dataIndex] || 0
          const scaleY = Math.max(0.15, rawValue / 255)
          bar.style.transform = `scaleY(${scaleY})`
        })
      } else {
        barRefs.current.forEach((bar) => {
          if (!bar) return
          bar.style.transform = "scaleY(0.15)"
        })
      }
    }

    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    draw()
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(!isPlaying)
    resetInactivityTimer()
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
    resetInactivityTimer()
  }

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    resetInactivityTimer()
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    resetInactivityTimer()
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newTime = parseFloat(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
    resetInactivityTimer()
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    /* OUTER WRAPPER FIXED: Uses w-auto and left-1/2 -translate-x-1/2 instead of left-0 right-0. 
       This completely prevents the wrapper from blocking the desktop cursor layout bounds on either side. */
    <div className="w-auto flex justify-center fixed top-3 left-1/2 -translate-x-1/2 z-[999999] pointer-events-auto">
      <div
        ref={playerRef}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onTouchStart={resetInactivityTimer}
        onMouseMove={resetInactivityTimer}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={`
          bg-black text-white shadow-[0_24px_50px_rgba(0,0,0,0.6)] border border-white/10
          flex flex-col justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
          overflow-hidden select-none
          ${isExpanded 
            ? "w-[91vw] sm:w-[385px] h-[105px] rounded-[28px] p-4 cursor-default" 
            : isPlaying 
              ? "w-[210px] h-[35px] rounded-[20px] px-3.5 py-1.5 cursor-pointer" 
              : "w-[110px] h-[35px] rounded-[20px] px-2.5 py-1.5 cursor-pointer"
          }
        `}
      >
        {/* COMPACT NOTCH OVERLAY */}
        {!isExpanded ? (
          <div className="flex items-center justify-between w-full h-full my-auto transition-opacity duration-200">
            {isPlaying ? (
              <>
                <div className="flex items-center gap-2 overflow-hidden max-w-[120px]">
                  <div className="w-5 h-5 rounded-[5px] overflow-hidden flex-shrink-0 border border-white/5">
                    {currentTrack.coverUrl ? (
                      <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Music className="w-3 h-3 text-neutral-400 m-auto" />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold tracking-tight truncate text-white/90">
                    {currentTrack.title}
                  </span>
                </div>

                <div className="flex items-center gap-[2px] h-3.5 px-1 origin-bottom">
                  {Array.from({ length: BAR_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      ref={(el) => { if (el) barRefs.current[i] = el }}
                      className="w-[2px] h-full rounded-full transition-transform duration-[40ms] ease-out origin-bottom will-change-transform"
                      style={{ 
                        transform: "scaleY(0.15)",
                        background: currentTrack.waveColor
                      }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center w-full h-full justify-start pl-0.5">
                <div className="w-5 h-5 rounded-[5px] overflow-hidden border border-white/10 flex-shrink-0">
                  {currentTrack.coverUrl ? (
                    <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Music className="w-3 h-3 text-neutral-400 m-auto" />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* EXPANDED SYSTEM ISLAND DECK */
          <div className="flex flex-col w-full h-full justify-between animate-[fadeIn_0.2s_ease-out]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0 max-w-[55%]">
                <div className="w-11 h-11 rounded-[10px] bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0 shadow-md">
                  {currentTrack.coverUrl ? (
                    <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Music className="w-5 h-5 text-neutral-400 m-auto" />
                  )}
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="text-[13px] font-bold text-white tracking-tight truncate">
                    {currentTrack.title}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">
                    {currentTrack.artist}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  onClick={toggleMute} 
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button 
                  onClick={handlePrev} 
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>
                <button 
                  onClick={togglePlay} 
                  className="p-2 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                </button>
                <button 
                  onClick={handleNext} 
                  className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full mt-1.5">
              <span className="text-[9px] font-medium font-mono text-neutral-400/80 min-w-[24px]">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-[5px] rounded-full appearance-none outline-none cursor-pointer transition-all bg-neutral-800
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0
                             [&::-moz-range-thumb]:w-0 [&::-moz-range-thumb]:h-0 [&::-moz-range-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, ${currentTrack.progressColor} 0%, ${currentTrack.progressColor} ${progressPercent}%, #262626 ${progressPercent}%, #262626 100%)`
                  }}
                />
              </div>
              <span className="text-[9px] font-medium font-mono text-neutral-400/80 min-w-[24px] text-right">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}