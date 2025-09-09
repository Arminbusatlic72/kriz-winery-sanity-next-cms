import {readdirSync} from 'fs'
import {join, basename} from 'path'

export function getImagesFromDirectory(directoryPath: string): string[] {
  try {
    // Full path on disk
    const fullPath = join(process.cwd(), 'public', directoryPath)

    // Read all files in directory
    const files = readdirSync(fullPath)

    // Filter image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)),
    )

    // Return URL paths relative to public
    // So if directoryPath = 'images/about', returns ['/images/about/file1.jpg', ...]
    return imageFiles.map((file) => `/${directoryPath.replace(/^\/|\/$/g, '')}/${basename(file)}`)
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error)
    return []
  }
}
