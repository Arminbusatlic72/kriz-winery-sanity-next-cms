import {readdirSync} from 'fs'
import {join} from 'path'

export function getImagesFromDirectory(directoryPath: string): string[] {
  try {
    // Construct the full path relative to the project root
    const fullPath = join(process.cwd(), 'public', directoryPath)

    // Read all files in the directory
    const files = readdirSync(fullPath)

    // Filter for image files (you can extend this list)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']
    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)),
    )

    // Return the full public URL paths
    return imageFiles.map((file) => join('/static/images/accommodation', file).replace(/\\/g, '/'))
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error)
    return []
  }
}
