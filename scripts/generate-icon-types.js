import fs from 'node:fs'

const sprite = fs.readFileSync('./src/assets/img/sprite.svg', 'utf8')
const idRegExp = /<symbol id="([\w-]+)"/g
const iconNames = [...sprite.matchAll(idRegExp)].map(icon => icon[1])

const kebabToPascalCase = str =>
  str
    .split('-')
    .map(str => str[0].toUpperCase() + str.slice(1))
    .join('')

fs.writeFileSync(
  './src/types/icons.ts',
  `// This file is autogenerated by "./scripts/generate-icon-types.js". Do not edit it manually.

export enum IconName {
  ${iconNames.map(name => `${kebabToPascalCase(name)} = "${name}"`).join(',\n  ')}
}
`
)

console.log(iconNames.length, 'icon types generated')
