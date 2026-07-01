"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

const SCALE_FACTOR = 0.95
const CONSTANT_SPEED = 0.3
const RUN_ANIM_THRESHOLD = 0.02

// How long each click-triggered override stays active before returning to
// normal behavior. Tune these to roughly match the clip lengths.
const IDLE3_OVERRIDE_DURATION = 2500
const DEATH_OVERRIDE_DURATION = 4000


type PoroAnim = "Poro_idle1.anm" | "HappyLick" | "Jump" | "Run2" | "Death" | "Eat" | "Float" | "Poro_idle2.anm" | "Poro_idle3.anm"
type PoroOverride = "Poro_idle3.anm" | "Death" | "HappyLick" | null

interface PoroModelProps {
  targetX: number
  override: PoroOverride
  isPlaying: boolean
  onPoroClick: (e: ThreeEvent<MouseEvent>) => void
}

function PoroModel({ targetX, override, isPlaying, onPoroClick }: PoroModelProps) {
  const group = useRef<THREE.Group>(null)
  
  const { scene, animations } = useGLTF(
    "/models/poro.glb", 
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  )
  const { actions } = useAnimations(animations, group)

  const posX = useRef(0)
  const facingAngle = useRef(Math.PI * 0.15)
  const currentAnim = useRef<PoroAnim>("Poro_idle1.anm")

  const playAnim = (anim: PoroAnim) => {
    Object.values(actions).forEach((a) => a?.fadeOut(0.3))
    const action = actions[anim] ?? actions["Poro_idle1.anm"] ?? Object.values(actions)[0]
    if (!action) return
    action.reset().fadeIn(0.3)
    if (anim === "Death" || anim === "HappyLick" || anim === "Jump" || anim === "Eat") {
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity)
    }
    action.play()
  }

  useEffect(() => {
    playAnim(currentAnim.current)
  }, [actions])

  useFrame((state, delta) => {
    if (!group.current) return

    const destX = (targetX * state.viewport.width) / 2
    const distanceToTarget = destX - posX.current
    const absoluteDistance = Math.abs(distanceToTarget)

    // Running is driven purely by distance — no cursor state needed
    const desiredAnim: PoroAnim = override
      ? override
      : absoluteDistance > RUN_ANIM_THRESHOLD
      ? "Run2"
      : isPlaying
      ? "Float"
      : "Poro_idle1.anm"

    if (desiredAnim !== currentAnim.current) {
      currentAnim.current = desiredAnim
      playAnim(desiredAnim)
    }

    // Freeze movement while eating or dead
    const isBusyOverride = override === "Poro_idle3.anm" || override === "Death"
    if (!isBusyOverride) {
      const maxMoveThisFrame = CONSTANT_SPEED * delta

      if (absoluteDistance <= maxMoveThisFrame) {
        posX.current = destX
      } else {
        posX.current += Math.sign(distanceToTarget) * maxMoveThisFrame
      }

      if (absoluteDistance > RUN_ANIM_THRESHOLD) {
        const targetAngle = destX > posX.current ? Math.PI * 0.5 : -Math.PI * 0.5
        facingAngle.current += (targetAngle - facingAngle.current) * Math.min(delta * 8, 1)
      } else {
        facingAngle.current += (Math.PI * 0.15 - facingAngle.current) * Math.min(delta * 4, 1)
      }
    }

    group.current.position.x = posX.current
    group.current.position.y = -1.6 * SCALE_FACTOR
    group.current.rotation.y = facingAngle.current
  })

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={0.001 * SCALE_FACTOR}
        onClick={onPoroClick}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          document.body.style.cursor = "auto"
        }}
      />
    </group>
  )
}

interface PoroProps {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function Poro({ containerRef }: PoroProps) {
  const [override, setOverride] = useState<PoroOverride>(null)
  const [isReacting, setIsReacting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [targetX, setTargetX] = useState(0)
  const [showHeart, setShowHeart] = useState(false)

  const overrideTimeout = useRef<NodeJS.Timeout | null>(null)
  const heartTimeout = useRef<NodeJS.Timeout | null>(null)
  const hoverChargeTimer = useRef<NodeJS.Timeout | null>(null)
  const isHovered = useRef(false)

  // Toggles which animation plays on the next click
  const nextClickAnim = useRef<"Poro_idle3.anm" | "Death">("Poro_idle3.anm")

  useEffect(() => {
    const handler = (e: CustomEvent) => setIsPlaying(e.detail.isPlaying)
    window.addEventListener("poroPlayState", handler as EventListener)
    return () => window.removeEventListener("poroPlayState", handler as EventListener)
  }, [])

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => {
      if (overrideTimeout.current) clearTimeout(overrideTimeout.current)
      if (heartTimeout.current) clearTimeout(heartTimeout.current)
      if (hoverChargeTimer.current) clearTimeout(hoverChargeTimer.current)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chasePointer = (clientX: number, clientY: number) => {
      if (isReacting) return
      const rect = container.getBoundingClientRect()
      const normalizedX = ((clientX - rect.left) / rect.width) * 2 - 1
      const normalizedY = (clientY - rect.top) / rect.height // 0 = top, 1 = bottom

      // Only chase cursor if in bottom 40% of the section
      if (normalizedY > 0.6) {
        setTargetX(normalizedX)
      }

      if (hoverChargeTimer.current) {
        clearTimeout(hoverChargeTimer.current)
        hoverChargeTimer.current = null
      }
    }

    const handleMouseMove = (e: MouseEvent) => chasePointer(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) chasePointer(touch.clientX, touch.clientY)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("touchmove", handleTouchMove, { passive: true })
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [containerRef, isReacting])

  const handleMouseEnter = () => {
    if (isReacting) return
    isHovered.current = true
    hoverChargeTimer.current = setTimeout(() => {
      if (!isHovered.current) return
      setOverride("HappyLick")
      overrideTimeout.current = setTimeout(() => {
        isHovered.current = false
        setOverride(null)
      }, 2200)
    }, 1000)
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    if (hoverChargeTimer.current) clearTimeout(hoverChargeTimer.current)
  }

  const handlePoroClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (isReacting) return

    const animToPlay = nextClickAnim.current
    nextClickAnim.current = animToPlay === "Poro_idle3.anm" ? "Death" : "Poro_idle3.anm"

    setIsReacting(true)
    if (overrideTimeout.current) clearTimeout(overrideTimeout.current)
    if (hoverChargeTimer.current) clearTimeout(hoverChargeTimer.current)
    setOverride(animToPlay)

    const duration = animToPlay === "Poro_idle3.anm" ? IDLE3_OVERRIDE_DURATION : DEATH_OVERRIDE_DURATION
    overrideTimeout.current = setTimeout(() => {
      setIsReacting(false)
      setOverride(null)
    }, duration)
  }

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%", filter: "var(--poro-filter)" }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} />
        <directionalLight position={[-2, 2, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <PoroModel
            targetX={targetX}
            override={override}
            isPlaying={isPlaying}
            onPoroClick={handlePoroClick}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(
  "/models/poro.glb", 
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
)