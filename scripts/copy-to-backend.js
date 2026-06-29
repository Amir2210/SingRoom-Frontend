// Deploys the Vite build into the backend's static folder.
// 1. Cleans "JaMoveo Backend/public/assets" but keeps .png files.
// 2. Copies dist/assets/* into that folder.
// 3. Copies top-level dist files (index.html, ...) into the backend public root
//    so the freshly hashed asset references resolve correctly.
import { readdirSync, rmSync, cpSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

const distDir = resolve('dist')
const distAssets = join(distDir, 'assets')
const backendPublic = resolve('..', 'JaMoveo Backend', 'public')
const backendAssets = join(backendPublic, 'assets')

if (!existsSync(distDir)) {
  console.error('[copy-to-backend] dist folder not found - run the build first.')
  process.exit(1)
}

if (!existsSync(backendPublic)) {
  console.error(`[copy-to-backend] backend public folder not found at: ${backendPublic}`)
  process.exit(1)
}

// 1. Clean the backend assets folder, keeping .png files.
mkdirSync(backendAssets, { recursive: true })
let removed = 0
for (const entry of readdirSync(backendAssets)) {
  if (extname(entry).toLowerCase() === '.png') continue
  rmSync(join(backendAssets, entry), { recursive: true, force: true })
  removed++
}

// 2. Copy the built assets into the backend.
if (existsSync(distAssets)) {
  cpSync(distAssets, backendAssets, { recursive: true })
}

// 3. Copy top-level dist files (index.html, etc.) into the backend public root.
let copiedRoot = 0
for (const entry of readdirSync(distDir)) {
  const src = join(distDir, entry)
  if (statSync(src).isDirectory()) continue
  cpSync(src, join(backendPublic, entry))
  copiedRoot++
}

console.log(
  `[copy-to-backend] Done. Removed ${removed} non-png file(s) from assets, ` +
  `copied build assets + ${copiedRoot} root file(s) to: ${backendPublic}`
)
