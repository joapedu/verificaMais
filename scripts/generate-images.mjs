import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')

mkdirSync(outDir, { recursive: true })

const categories = [
  {
    range: [1, 10],
    label: 'GOLPE',
    sub: 'Tentativa de Golpe',
    bg: '#FEE2E2',
    strip: '#DC2626',
    text: '#991B1B',
    icon: '⚠',
    iconColor: '#FCA5A5',
  },
  {
    range: [11, 20],
    label: 'LEGÍTIMO',
    sub: 'Mensagem Legítima',
    bg: '#DCFCE7',
    strip: '#16A34A',
    text: '#14532D',
    icon: '✓',
    iconColor: '#86EFAC',
  },
  {
    range: [21, 30],
    label: 'FAKE NEWS',
    sub: 'Notícia Falsa',
    bg: '#FEF3C7',
    strip: '#D97706',
    text: '#78350F',
    icon: '✗',
    iconColor: '#FCD34D',
  },
  {
    range: [31, 40],
    label: 'NOTÍCIA REAL',
    sub: 'Notícia Verdadeira',
    bg: '#DBEAFE',
    strip: '#2563EB',
    text: '#1E3A8A',
    icon: '✓',
    iconColor: '#93C5FD',
  },
]

for (const cat of categories) {
  for (let i = cat.range[0]; i <= cat.range[1]; i++) {
    const num = String(i).padStart(2, '0')

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <!-- Background -->
  <rect width="800" height="600" fill="${cat.bg}"/>

  <!-- Top strip -->
  <rect width="800" height="8" fill="${cat.strip}"/>

  <!-- Card shadow area -->
  <rect x="60" y="60" width="680" height="480" rx="24" fill="white" fill-opacity="0.65"/>

  <!-- Big icon watermark -->
  <text x="400" y="310" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="200" font-weight="bold"
    fill="${cat.iconColor}" opacity="0.5">${cat.icon}</text>

  <!-- Category label -->
  <text x="400" y="340" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="52" font-weight="900"
    fill="${cat.text}">${cat.label}</text>

  <!-- Sub label -->
  <text x="400" y="400" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="26" font-weight="600"
    fill="${cat.text}" opacity="0.75">${cat.sub} · Imagem ${num}</text>

  <!-- Placeholder notice -->
  <text x="400" y="490" text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18" fill="#94A3B8">
    Substitua por imagem real (800 × 600 px)
  </text>

  <!-- Bottom strip -->
  <rect y="592" width="800" height="8" fill="${cat.strip}"/>
</svg>`

    const filePath = join(outDir, `image-${num}.svg`)
    writeFileSync(filePath, svg, 'utf-8')
    console.log(`✓ image-${num}.svg  [${cat.label}]`)
  }
}

console.log('\nDone! 40 placeholder images created in public/images/')
