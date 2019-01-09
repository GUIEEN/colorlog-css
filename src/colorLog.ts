import { PathLike } from 'fs'
import util from 'util'
import parseCssSync from './parseCss'

// 4-bit ColoursSet. https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
enum StyleSet {
  // Style
  Reset = '\x1b[0m',
  Bold = '\x1b[1m',
  Dim = '\x1b[2m',
  Italic = '\x1b[3m',
  Underscore = '\x1b[4m',
  // Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  // Hidden = '\x1b[8m',

  // Foreground
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',
  FgDefault = '\x1b[39m',
  FgBrightBlack = '\x1b[90m',
  FgBrightRed = '\x1b[91m',
  FgBrightGreen = '\x1b[92m',
  FgBrightYellow = '\x1b[93m',
  FgBrightBlue = '\x1b[94m',
  FgBrightMagenta = '\x1b[95m',
  FgBrightCyan = '\x1b[96m',
  FgBrightWhite = '\x1b[97m',

  // Background
  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
  BgDefault = '\x1b[49m',
  BgBrightBlack = '\x1b[100m',
  BgBrightRed = '\x1b[101m',
  BgBrightGreen = '\x1b[102m',
  BgBrightYellow = '\x1b[103m',
  BgBrightBlue = '\x1b[104m',
  BgBrightMagenta = '\x1b[105m',
  BgBrightCyan = '\x1b[106m',
  BgBrightWhite = '\x1b[107m'
}

// Default color theme is Argonaut
export enum Colors {
  Black = '46;46;46',
  Red = '255;38;14',
  Green = '155;226;5',
  Yellow = '255;196;0',
  Blue = '1;162;250',
  Magenta = '129;91;181',
  Cyan = '0;222;239',
  White = '255;255;255',
  BrightBlack = '86;86;86',
  BrightRed = '255;66;81',
  BrightGreen = '184;227;110',
  BrightYellow = '255;216;82',
  BrightBlue = '0;166;255',
  BrightMagenta = '172;123;240',
  BrightCyan = '116;253;243',
  BrightWhite = '255;251;246'
}

class ColorCore implements ColorMembers {
  public categories = {
    primary: {
      color: this._makeForm(Colors.BrightBlue),
      pre: { color: '', val: '' }
    },
    secondary: {
      color: this._makeForm(Colors.BrightBlack),
      pre: { color: '', val: '' }
    },
    success: {
      color: this._makeForm(Colors.BrightGreen),
      pre: { color: '', val: '' }
    },
    danger: {
      color: this._makeForm(Colors.BrightRed),
      pre: { color: '', val: '' }
    },
    warning: {
      color: this._makeForm(Colors.BrightYellow),
      pre: { color: '', val: '' }
    },
    info: {
      color: this._makeForm(Colors.BrightCyan),
      pre: { color: '', val: '' }
    },
    default: {
      color: this._makeForm(null),
      pre: { color: '', val: '' }
    }
  }

  constructor (
    path?: string,
    private _isJoin: boolean = false,
    private _makeForm = (fg: string | Colors, bg?: string | Colors) => {
      let isFg = true,
        isBg = true
      if (fg === '' || fg == null) isFg = false
      if (bg === '' || bg == null) isBg = false

      if (isFg && isBg) return `\x1b[38;2;${fg};48;2;${bg}m`
      if (isFg) return `\x1b[38;2;${fg}m`
      if (isBg) return `\x1b[48;2;${bg}m`
      return `${StyleSet.FgDefault}${StyleSet.BgDefault}`
    }
  ) {
    if (path != null && path !== '') {
      this.set(path)
    }
  }

  public makeForm = (fg: string | Colors | null, bg?: string | Colors) =>
    this._makeForm(fg, bg)

  public list = () => {
    Object.keys(StyleSet).filter(key => {
      console.log(StyleSet[key], key, StyleSet.Reset)
    })
  }

  public set = (cssFilePath: PathLike): void => {
    this._set(cssFilePath)
  }

  public log = (...args: any[]): ColorMembers => this._wrap('default', args)
  public pri = (...args: any[]): ColorMembers => this._wrap('primary', args)
  public sec = (...args: any[]): ColorMembers => this._wrap('secondary', args)
  public suc = (...args: any[]): ColorMembers => this._wrap('success', args)
  public danger = (...args: any[]): ColorMembers => this._wrap('danger', args)
  public warn = (...args: any[]): ColorMembers => this._wrap('warning', args)
  public info = (...args: any[]): ColorMembers => this._wrap('info', args)

  public join = (): ColorMembers => {
    const color = new ColorCore()
    color.categories = this.categories
    color._isJoin = true

    return color
  }

  public end = () => process.stdout.write('\n')

  public gen = (cssColor: string): string => this._parse(cssColor)

  private _wrap = (name: string, args: string[]): ColorMembers => {
    const color = new ColorCore()
    color.categories = this.categories
    if (this._isJoin) color._isJoin = true
    this._out(name, args)
    return color
  }

  private _parse = (color: string) => {
    if (color.substr(0, 1) === '#') {
      let collen = (color.length - 1) / 3
      let fact = [17, 1, 0.062272][collen - 1]

      const val = Math.round(parseInt(color.substr(1, collen), 16) * fact)
      const val2 = Math.round(
        parseInt(color.substr(1 + collen, collen), 16) * fact
      )
      const val3 = Math.round(
        parseInt(color.substr(1 + 2 * collen, collen), 16) * fact
      )
      return `${val};${val2};${val3}`
    }

    let val = '',
      isStart = false,
      cnt = 0
    for (let i of color) {
      if (i.match(/^\d+$/)) {
        isStart = true
      }
      if (i === ',') {
        isStart = false
        if (cnt < 2) val += ';'
        cnt++
      }
      if (i === ')') break

      if (isStart) {
        if (cnt < 3) {
          val += i.toString()
        } else {
          break
        }
      }
    }

    return val
  }

  private _set = (cssStream: PathLike) => {
    const parsed = parseCssSync(cssStream)

    if (Object.keys(parsed).length === 0) {
      console.error('CSS parsing error')
      return null
    }

    for (let e in parsed) {
      let selector: string = e.replace(/^.|#/, '')
      let fg: string, bg: string, val: string

      if (parsed[e]['background']) bg = this._parse(parsed[e]['background'])
      if (parsed[e]['color']) fg = this._parse(parsed[e]['color'])
      if (parsed[e]['val']) val = parsed[e]['val']

      if (selector.indexOf('#') > 0) {
        let [main, prefix] = selector.split('#')
        if (prefix === 'pre') {
          if (this.categories[main]) {
            this.categories[main].pre.color = this._makeForm(fg, bg)
            if (val != null) this.categories[main].pre.val = val
          }
        }
      } else if (this.categories[selector]) {
        this.categories[selector].color = this._makeForm(fg, bg)
      }
    }
  }

  private _out (name: string, args: string[]): void {
    let msg = [this.categories[name].color, ...args, StyleSet.Reset, '\n']
    if (this._isJoin) {
      msg = [this.categories[name].color, ...args, StyleSet.Reset]
    }

    if (
      this.categories[name].pre.color !== '' &&
      this.categories[name].pre.val !== ''
    ) {
      const { color, val } = this.categories[name].pre
      msg = [color, val, StyleSet.Reset, ...msg]
    }

    process.stdout.write(util.format.apply(this, msg))
  }
}

export class ColorLog extends ColorCore {
  constructor (path?: string) {
    super(path)
  }
}

interface ColorMembers {
  log (...args: any[]): ColorMembers
  pri (...args: any[]): ColorMembers
  sec (...args: any[]): ColorMembers
  suc (...args: any[]): ColorMembers
  danger (...args: any[]): ColorMembers
  warn (...args: any[]): ColorMembers
  info (...args: any[]): ColorMembers
  end (): void
}

export default ColorLog
