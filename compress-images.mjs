import sharp from "sharp"
import { readdir, stat, rename, unlink } from "fs/promises"
import { join } from "path"

const INPUT_DIR = "./public/images"

const TARGETS = [
  { file: "bayernlogo.png",    maxSize: 300, quality: 80 },
  { file: "nvidialogo.png",    maxSize: 300, quality: 80 },
  { file: "overwatchlogo.png", maxSize: 300, quality: 80 },
  { file: "riotlogo.png",      maxSize: 300, quality: 80 },
  { file: "waterloologo.png",  maxSize: 300, quality: 80 },
  { file: "jamhackslogo.png",  maxSize: 300, quality: 80 },
  { file: "rayquaza.png",      maxSize: 300, quality: 80 },
  { file: "league.png",        maxSize: 300, quality: 80 },
  { file: "thumbnailSrc.jpg",  maxSize: 1200, quality: 75 },
  { file: "pranavmarthi.png",  maxSize: 600,  quality: 80 },
]

const formatBytes = (b) => b < 1024 * 1024
  ? `${(b / 1024).toFixed(0)}KB`
  : `${(b / 1024 / 1024).toFixed(1)}MB`

let totalSaved = 0

for (const { file, maxSize, quality } of TARGETS) {
  const inputPath = join(INPUT_DIR, file)
  const isJpeg = file.endsWith(".jpg") || file.endsWith(".jpeg")
  const tmpPath = inputPath + ".tmp"

  try {
    const before = (await stat(inputPath)).size

    const pipeline = sharp(inputPath).resize(maxSize, maxSize, {
      fit: "inside",
      withoutEnlargement: true,
    })

    if (isJpeg) {
      await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tmpPath)
    } else {
      await pipeline.png({ quality, compressionLevel: 9 }).toFile(tmpPath)
    }

    const after = (await stat(tmpPath)).size
    const saved = before - after

    if (saved > 0) {
      await rename(tmpPath, inputPath)
      console.log(`✅ ${file.padEnd(25)} ${formatBytes(before)} → ${formatBytes(after)}  (saved ${formatBytes(saved)})`)
      totalSaved += saved
    } else {
      await unlink(tmpPath)
      console.log(`⏭  ${file.padEnd(25)} already optimal, skipped`)
    }
  } catch (err) {
    console.log(`❌ ${file}: ${err.message}`)
  }
}

console.log(`\n🎉 Total saved: ${formatBytes(totalSaved)}`)