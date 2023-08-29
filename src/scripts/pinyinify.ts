import { readFileSync, readdirSync, writeFileSync } from "fs"
import { pinyin } from "pinyin"

function pinyinify(name: string) {
  return [
    pinyin(name, {
      compact: true,
      heteronym: true,
      style: pinyin.STYLE_NORMAL,
    }),
    pinyin(name, {
      compact: true,
      heteronym: true,
      style: pinyin.STYLE_FIRST_LETTER,
    }),
  ].flatMap(py => py.map(el => el.join("")))
}

function addAliasToSchema(json: any) {
  for (const key in json) {
    if (key === "anyOf" || key === "oneOf") {
      for (const item of json[key]) {
        if (item["title"]) {
          const alias = pinyinify(item["title"])
          // remove all non-alphanumeric characters
          const cleanedAlias = alias.map(el => el.replace(/[^a-zA-Z0-9]/g, ""))
          item["alias"] = cleanedAlias.join(" ")
        }
      }
    } else if (typeof json[key] === "object") {
      addAliasToSchema(json[key])
    }
  }
}

function main() {
  const directory = process.argv[2]
  // scan all schemas in the directory
  const files = readdirSync(directory)
  for (const file of files) {
    const filePath = `${directory}/${file}`
    const json = JSON.parse(readFileSync(filePath, "utf-8"))
    addAliasToSchema(json)
    writeFileSync(filePath, JSON.stringify(json, null, 2))
  }
}

main()
