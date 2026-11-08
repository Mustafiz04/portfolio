import fs from 'fs'
import path from 'path'

const filePath = path.join(
  process.cwd(),
  'node_modules',
  '@contentlayer',
  'core',
  'dist',
  'generation',
  'generate-dotpkg.js'
)

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8')
  const target =
    "const assertStatement = needsJsonAssertStatement ? ` assert { type: 'json' }` : '';"
  const replacement =
    "const assertStatement = nodeVersionMajor >= 22 ? ` with { type: 'json' }` : (needsJsonAssertStatement ? ` assert { type: 'json' }` : '');"

  if (content.includes(target)) {
    content = content.replace(target, replacement)
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('Successfully patched @contentlayer/core for Node 22+ / Node 24 support!')
  }
}
