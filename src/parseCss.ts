import fs, { PathLike } from 'fs'

let format = {
    selector: {
      name: null,
      color: null,
      background: null,
      val: null
    }
  },
  obj = { ...format },
  tmp = '',
  hasMeaning = false,
  isComment = false,
  result = {}

type selector =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

interface ParsedCss {
  [selector: string]: {
    color: string
    background: string
    val: string
  }
}

// Sync Version
const parseCssSync = (cssFile: PathLike): ParsedCss => {
  const cssFileString: string = fs.readFileSync(cssFile, { encoding: 'utf8' })

  let i = 0,
    len = cssFileString.length,
    char: string

  while (i < len) {
    char = cssFileString[i++]
    if (char == null) break

    // CSS Comment /* ... */
    if (isComment) {
      if (char === '*') tmp = char
      if (tmp === '*' && char === '/') {
        tmp = ''
        isComment = false
      }
      continue
    }

    if (char === '/') {
      tmp = char
      continue
    }
    if (tmp === '/' && char === '*') {
      isComment = true
      continue
    }

    // Start parsing
    if (char === '.') {
      hasMeaning = true
    }

    if (char === '}') {
      result[obj.selector.name] = {
        color: obj.selector.color,
        background: obj.selector.background,
        val: obj.selector.val
      }

      obj = { ...format }
      hasMeaning = false
    }

    if (hasMeaning) {
      tmp += char

      if (char === '{') {
        tmp = tmp.replace(/\n| |{/g, '')
        obj.selector.name = tmp
        tmp = ''
        continue
      }

      if (char === ';') {
        if (/background/.test(tmp)) {
          obj.selector.background = tmp.split(':')[1].replace(/ |;/g, '')
        } else if (/color/.test(tmp)) {
          obj.selector.color = tmp.split(':')[1].replace(/ |;/g, '')
        } else if (/val/.test(tmp)) {
          obj.selector.val = tmp.split(':')[1].replace(/ |;/g, '')
        }

        tmp = ''
      }
    }
  }

  return result
}

export default parseCssSync
