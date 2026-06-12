// compress-audio.mjs
// Requires ffmpeg installed: brew install ffmpeg
// Run from project root: node compress-audio.mjs

import { exec } from "child_process"
import { stat } from "fs/promises"
import { promisify } from "util"

const execAsync = promisify(exec)

const INPUT_DIR = "./public/audio"

const TRACKS = [
  "clarity.mp3",
  "cyanide.mp3",
  "japanesedenim.mp3",
  "nights.mp3",
  "ochosrios.mp3",
  "rearrangemyworld.mp3",
  "seigfried.mp3",
  "whiplash.mp3",
  "whoknows.mp3",
]

const formatBytes = (b) => b < 1024 * 1024
  ? `${(b / 1024).toFixed(0)}KB`
  : `${(b / 1024 / 1024).toFixed(1)}MB`

// Check ffmpeg is available
try {
  await execAsync("ffmpeg -version")
} catch {
  console.error("❌ ffmpeg not found. Install it with: brew install ffmpeg")
  process.exit(1)
}

let totalSaved = 0

for (const file of TRACKS) {
  const inputPath = `${INPUT_DIR}/${file}`
  const tmpPath = `${INPUT_DIR}/${file}.tmp.mp3`

  try {
    const before = (await stat(inputPath)).size

    // Re-encode at 128kbps — transparent quality for music streaming
    await execAsync(
      `ffmpeg -i "${inputPath}" -b:a 128k -map_metadata 0 -id3v2_version 3 -y "${tmpPath}" -loglevel quiet`
    )

    const after = (await stat(tmpPath)).size
    const saved = before - after

    if (saved > 0) {
      await execAsync(`mv "${tmpPath}" "${inputPath}"`)
      console.log(`✅ ${file.padEnd(25)} ${formatBytes(before)} → ${formatBytes(after)}  (saved ${formatBytes(saved)})`)
      totalSaved += saved
    } else {
      await execAsync(`rm "${tmpPath}"`)
      console.log(`⏭  ${file.padEnd(25)} already optimal, skipped`)
    }
  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`)
  }
}

console.log(`\n🎉 Total saved: ${formatBytes(totalSaved)}`)