const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(new URL(res.headers.location, url).href).then(resolve, reject)
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () =>
          resolve({
            status: res.statusCode,
            body: Buffer.concat(chunks),
            type: res.headers['content-type'] || '',
          }),
        )
      })
      .on('error', reject)
  })
}

async function download(url, dest) {
  const { status, body, type } = await get(url)
  if (status !== 200) throw new Error(`Fail ${status}`)
  if (!type.includes('image') && body.length < 1000) throw new Error(`Not image ${type}`)
  fs.writeFileSync(dest, body)
  return body.length
}

const assets = [
  'images/overview-hero/hotel-exterior.webp',
  'images/overview-hero/resto.webp',
  'images/overview-hero/junior-suite.webp',
  'images/overview-hero/suite.webp',
  'images/overview-hero/pool.webp',
  'images/overview-rooms/suite-main.jpeg',
  'images/overview-features/starry-night.webp',
  'images/overview-features/cafe-dining.webp',
  'images/meetings-weddings/hall.webp',
]

;(async () => {
  const outDir = path.join(process.cwd(), 'public', 'images')
  fs.mkdirSync(outDir, { recursive: true })

  for (const asset of assets) {
    const url = `https://hadith-hotel.com/${asset}`
    const ext = path.extname(asset).replace('.', '') || 'jpg'
    const base = path.basename(asset, path.extname(asset))
    const dest = path.join(outDir, `hadith-${base}.${ext}`)
    try {
      const size = await download(url, dest)
      console.log('OK', dest, size)
    } catch (e) {
      console.log('FAIL', url, e.message)
    }
  }
})()
