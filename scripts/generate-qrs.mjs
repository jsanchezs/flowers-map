import fs from 'node:fs/promises'
import path from 'node:path'
import QRCode from 'qrcode'
import soundPoints from '../src/data/soundPoints.js'

const siteUrl = 'https://jsanchezs.github.io/flowers-map/'
const outputDir = path.resolve('public/qrs')

function buildPointUrl(pointId) {
  const url = new URL(siteUrl)
  url.searchParams.set('p', pointId)
  return url.toString()
}

function getQrViewBoxSize(svg) {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/)

  if (!viewBoxMatch) {
    throw new Error('QR SVG has no viewBox')
  }

  const [, viewBox] = viewBoxMatch
  const [, , width, height] = viewBox.split(/\s+/).map(Number)

  return Math.min(width, height)
}

function buildCenteredLogoMarkup(qrSize) {
  const logoSize = qrSize * 0.3
  const scale = logoSize / 128
  const center = qrSize / 2

  return [
    `<g transform="translate(${center} ${center}) scale(${scale}) translate(-64 -64)">`,
    '  <circle cx="64" cy="64" r="60" fill="#FFFFFF"/>',
    '  <circle cx="64" cy="64" r="56" fill="#FFF9F2"/>',
    '  <path d="M64 16c14 0 24 11.4 24 25.4 0 7.8-3.2 14.4-8.3 18.7C74.8 64 69.6 66 64 66s-10.8-2-15.7-5.9C43.2 55.8 40 49.2 40 41.4 40 27.4 50 16 64 16Z" fill="#D76657" stroke="#FFF9F2" stroke-width="6"/>',
    '  <path d="M112 64c0 14-11.4 24-25.4 24-7.8 0-14.4-3.2-18.7-8.3C64 74.8 62 69.6 62 64s2-10.8 5.9-15.7C72.2 43.2 78.8 40 86.6 40 100.6 40 112 50 112 64Z" fill="#C85445" stroke="#FFF9F2" stroke-width="6"/>',
    '  <path d="M64 112c-14 0-24-11.4-24-25.4 0-7.8 3.2-14.4 8.3-18.7C53.2 64 58.4 62 64 62s10.8 2 15.7 5.9C84.8 72.2 88 78.8 88 86.6 88 100.6 78 112 64 112Z" fill="#B74236" stroke="#FFF9F2" stroke-width="6"/>',
    '  <path d="M16 64c0-14 11.4-24 25.4-24 7.8 0 14.4 3.2 18.7 8.3C64 53.2 66 58.4 66 64s-2 10.8-5.9 15.7C55.8 84.8 49.2 88 41.4 88 27.4 88 16 78 16 64Z" fill="#E07A6C" stroke="#FFF9F2" stroke-width="6"/>',
    '  <circle cx="64" cy="64" r="20" fill="#FFF1C8" stroke="#FFF9F2" stroke-width="6"/>',
    '  <circle cx="64" cy="64" r="7" fill="#6F2418"/>',
    '</g>',
  ].join('')
}

function injectLogo(svg) {
  const qrSize = getQrViewBoxSize(svg)
  return svg.replace('</svg>', `${buildCenteredLogoMarkup(qrSize)}</svg>`)
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true })

  for (const point of soundPoints) {
    const pointUrl = buildPointUrl(point.id)
    const qrSvg = await QRCode.toString(pointUrl, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 448,
      color: {
        dark: '#111111',
        light: '#FFFFFF',
      },
    })

    const finalSvg = injectLogo(qrSvg)
    const outputPath = path.join(outputDir, `${point.id}.svg`)

    await fs.writeFile(outputPath, finalSvg, 'utf8')
  }

  const manifest = soundPoints.map((point) => ({
    id: point.id,
    title: point.title,
    url: buildPointUrl(point.id),
    qrFile: `public/qrs/${point.id}.svg`,
  }))

  await fs.writeFile(
    path.join(outputDir, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  )

  console.log(`Generated ${soundPoints.length} QR codes in ${outputDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
