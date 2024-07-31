import fs from 'node:fs'

const sprite = fs.readFileSync('./src/assets/img/sprite.svg', 'utf8')
const idRegExp = /id="([\w-]+)"/g
const iconNames = [...sprite.matchAll(idRegExp)].map($ => $[1])

const kebabToPascalCase = str =>
  str
    .split('-')
    .map(str => str[0].toUpperCase() + str.slice(1))
    .join('')

fs.writeFileSync(
  './src/types/icons.ts',
  `// This file is autogenerated by "./scripts/generate-icon-types.js". Do not edit it manually.

export enum IconName {
  ${iconNames.map($ => `${kebabToPascalCase($)} = "${$}"`).join(',\n  ')}
}
`
)

console.log(iconNames.length, 'icon types generated')
