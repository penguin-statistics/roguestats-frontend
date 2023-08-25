import pinyin from 'pinyin'

import { readFileSync, writeFileSync } from 'fs';

function pinyinify(name: string) {
  // we are using pinyin2, the return value of pinyin() is an array of arrays
  const fullPinyin = pinyin(name, {
    heteronym: true,
    style: pinyin.STYLE_NORMAL,
  })
  const partialPinyin = pinyin(name, {
    heteronym: true,
    style: pinyin.STYLE_FIRST_LETTER,
  })
  return [fullPinyin.join(''), partialPinyin.join('')]
}

function addAliasToSchema(json: any) {
  for (const key in json) {
    if (key === 'anyOf' || key === 'oneOf') {
      for (const item of json[key]) {
        if (item['title']) {
          const alias = pinyinify(item['title'])
          // remove all non-alphanumeric characters
          const cleanedAlias = alias.map(el => el.replace(/[^a-zA-Z0-9]/g, ''));
          item['alias'] = cleanedAlias.join(' ')
        }
      }
    } else if (typeof json[key] === 'object') {
      addAliasToSchema(json[key])
    }
  }
}

function main() {
  const path = './battle.schema.json' // change this to your schema path
  const file = readFileSync(path, 'utf-8')
  const json = JSON.parse(file)
  addAliasToSchema(json)
  writeFileSync(path, JSON.stringify(json, null, 2))
  console.log('done')
}

main();
