/**
 * Client-side high performance image compressor.
 * Compresses any user-uploaded image into an optimized WebP/JPEG data URL,
 * keeping crisp visual fidelity while preventing localStorage or database quota errors.
 */
export const compressImageFile = (file, maxDimension = 1400, quality = 0.84) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('')
      return
    }

    // If already SVG, read as text/dataURL directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
      return
    }

    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        let width = img.width
        let height = img.height

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          resolve(e.target.result)
          return
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height)

        // Try WebP export first (supports alpha transparency and high compression)
        let dataUrl = ''
        try {
          dataUrl = canvas.toDataURL('image/webp', quality)
        } catch {
          dataUrl = ''
        }

        // If WebP is not supported or returned unchanged PNG fallback for non-PNG
        if (!dataUrl || (dataUrl.startsWith('data:image/png') && file.type !== 'image/png')) {
          dataUrl = file.type === 'image/png' 
            ? canvas.toDataURL('image/png') 
            : canvas.toDataURL('image/jpeg', quality)
        }

        resolve(dataUrl)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}
