import fs, { PathLike } from 'fs'
import { default as pathDefault } from 'path'
import util from 'util'
import { Colors, Schemes, Style } from './const'
import parseCssSync from './parseCss'

class Color {
  public static _parse = (color: string): string => {
    // parsing HEX syntax
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
    // parsing RGBA? syntax
    for (let i of color) {
      if (/^\d+$/.test(i)) {
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

  public static _makeForm = (color: string, isBg?: boolean) => {
    // RGBA? or HEX syntax
    if (/^rgba?\(/.test(color) || /^#\w{6}$/.test(color)) {
      color = Color._parse(color)
      return isBg ? `\x1b[48;2;${color}m` : `\x1b[38;2;${color}m`
    }

    // Predefined 4-bit color syntax
    if (/\x1b\[/.test(color)) {
      return color
    }

    return ''
  }

  public static makeForm = (
    fg: string | string[] | Style | null,
    bg?: string | string[] | Style
  ) => {
    let result = ''
    if (Array.isArray(fg)) {
      fg.forEach(e => {
        result += Color._makeForm(e)
      })
    } else {
      result += Color._makeForm(fg)
    }

    if (bg) {
      if (Array.isArray(bg)) {
        bg.forEach(e => {
          result += Color._makeForm(e, true)
        })
      } else {
        result += Color._makeForm(bg, true)
      }
    }

    if (result === '') return `${Style.FgDefault}${Style.BgDefault}`

    return result
  }

  public static _categories = {
    primary: {
      color: Color.makeForm(Colors.BrightBlue),
      pre: { color: '', val: '' }
    },
    secondary: {
      color: Color.makeForm(Colors.BrightBlack),
      pre: { color: '', val: '' }
    },
    success: {
      color: Color.makeForm(Colors.BrightGreen),
      pre: { color: '', val: '' }
    },
    danger: {
      color: Color.makeForm(Colors.BrightRed),
      pre: { color: '', val: '' }
    },
    warning: {
      color: Color.makeForm(Colors.BrightYellow),
      pre: { color: '', val: '' }
    },
    info: {
      color: Color.makeForm(Colors.BrightCyan),
      pre: { color: '', val: '' }
    },
    default: {
      color: Color.makeForm(null),
      pre: { color: '', val: '' }
    }
  }
}

class ColorCore implements ColorMembers {
  /**
   * Represents the method's color and prefix's value & color.
   */
  public categories = {
    primary: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    secondary: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    success: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    danger: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    warning: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    info: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    },
    default: {
      color: null,
      pre: {
        color: null,
        val: null
      }
    }
  }

  /**
   * Declare path of CSS file if you want to initialize the colors with your css file.
   * @param path
   */
  constructor (path?: string, private _isJoin: boolean = false) {
    [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'default'
    ].forEach(element => {
      Object.defineProperty(this.categories, element, {})

      Object.defineProperty(this.categories[element], 'color', {
        get () {
          return Color._categories[element].color
        },

        set (value) {
          Color._categories[element].color = value
        }
      })
      Object.defineProperty(this.categories[element], 'pre', {})

      Object.defineProperty(this.categories[element].pre, 'color', {
        get () {
          return Color._categories[element].pre.color
        },

        set (value) {
          Color._categories[element].pre.color = value
        }
      })

      Object.defineProperty(this.categories[element].pre, 'val', {
        get () {
          return Color._categories[element].pre.val
        },

        set (value) {
          Color._categories[element].pre.val = value
        }
      })
    })

    if (path != null && path !== '') {
      this.set(path)
    }
  }
  private _tmpCategory = null

  /**
   * makeForm() will generate the form for configuration of this.categories. You can modify the colors of this.categories with using this function.
   *
   * eg) this.categories.primary.color = colorlog.makeForm('rgb(255,255,255)')
   * @param fg
   * @param bg
   */
  public makeForm = (fg: string | string[] | null, bg?: string | string[]) =>
    Color.makeForm(fg, bg)

  /**
   * Showing the default color list.
   */
  public list = () => {
    Object.keys(Style).filter(key => {
      console.log(Style[key], key, Style.Reset)
    })
  }

  /**
   * Read specified css file synchronously.
   * @param cssFilePath
   */
  public set = (cssFilePath: PathLike): void => {
    this._set(cssFilePath)
  }

  /**
   * log() will print the args with default color.
   * Each method name represents the color is derived from bootstrap.
   * @param args
   */
  public log = (...args: any[]): ColorMembers => this._wrap('default', args)
  public pri = (...args: any[]): ColorMembers => this._wrap('primary', args)
  public sec = (...args: any[]): ColorMembers => this._wrap('secondary', args)
  public suc = (...args: any[]): ColorMembers => this._wrap('success', args)
  public danger = (...args: any[]): ColorMembers => this._wrap('danger', args)
  public warn = (...args: any[]): ColorMembers => this._wrap('warning', args)
  public info = (...args: any[]): ColorMembers => this._wrap('info', args)

  /**
   * Start to join the ColorLogMembers' methods. After calling the functions, you need to call end() function.
   */
  public join = (): ColorMembers => {
    const color = new ColorCore()
    color.categories = this.categories
    color._isJoin = true

    return color
  }

  public end = () => process.stdout.write('\n')

  /**
   * Apply color scheme to Colors.
   * @param scheme
   */
  public setScheme = (scheme: Schemes) => {
    const schemePath = pathDefault.resolve(
      __dirname,
      '../schemes',
      scheme + '.json'
    )
    const schemeJson = JSON.parse(fs.readFileSync(schemePath, 'utf-8'))
    const keys = Object.keys(Colors)
    for (let i in keys) {
      Colors[keys[i]] = schemeJson[i]
    }
    this._applyColor()
  }

  /**
   * List schemes with methods of scheme applied.
   */
  public listScheme = () => {
    this._tmpCategory = JSON.parse(JSON.stringify(Color._categories))
    this.join()
      .log(
        Style.Bold,
        Style.Italic,
        Style.Underscore,
        `This is your Current Setting ::`
      )
      .end()
    this.join()
      .log('\t\t\t')
      .pri('pri')
      .sec('sec')
      .suc('suc')
      .danger('danger')
      .warn('warn')
      .info('info')
      .end()

    let cnt = 1
    for (let item in Schemes) {
      if (isNaN(Number(item))) {
        this.setScheme(Schemes[`${item}`])
        this.join()
          .log(
            Style.Bold,
            Style.Italic,
            Style.Underscore,
            `${cnt++}.  ${item} scheme :: `
          )
          .end()
        this.join()
          .log('\t\t\t')
          .pri('pri')
          .sec('sec')
          .suc('suc')
          .danger('danger')
          .warn('warn')
          .info('info')
          .end()
      }
    }
    Color._categories = JSON.parse(JSON.stringify(this._tmpCategory))
  }

  private _wrap = (name: string, args: string[]): ColorMembers => {
    const color = new ColorCore()
    color.categories = this.categories
    if (this._isJoin) color._isJoin = true
    this._out(name, args)
    return color
  }

  private _set = (cssStream: PathLike) => {
    const parsed = parseCssSync(cssStream)

    if (Object.keys(parsed).length === 0) {
      throw new Error('CSS parsing error')
    }

    for (let e in parsed) {
      let selector: string = e.replace(/^.|#/, '')
      let fg: string, bg: string, val: string

      if (parsed[e]['background']) bg = parsed[e]['background']
      if (parsed[e]['color']) fg = parsed[e]['color']

      if (selector.indexOf('#') > 0) {
        if (parsed[e]['val']) val = parsed[e]['val']
        let [main, prefix] = selector.split('#')

        if (prefix === 'pre') {
          if (this.categories[main]) {
            this.categories[main].pre.color = this.makeForm(fg, bg)
            if (val != null) this.categories[main].pre.val = val
          }
        }
      } else if (this.categories[selector]) {
        this.categories[selector].color = this.makeForm(fg, bg)
      }
    }
  }

  private _applyColor = () => {
    this.categories.primary.color = Color.makeForm(Colors.BrightBlue)
    this.categories.secondary.color = Color.makeForm(Colors.BrightBlack)
    this.categories.success.color = Color.makeForm(Colors.BrightGreen)
    this.categories.danger.color = Color.makeForm(Colors.BrightRed)
    this.categories.warning.color = Color.makeForm(Colors.BrightYellow)
    this.categories.info.color = Color.makeForm(Colors.BrightCyan)

    this.categories.primary.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightBlue
    )
    this.categories.secondary.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightBlack
    )
    this.categories.success.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightGreen
    )
    this.categories.danger.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightRed
    )
    this.categories.warning.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightYellow
    )
    this.categories.info.pre.color = Color.makeForm(
      Colors.Black,
      Colors.BrightCyan
    )
  }

  private _out (name: string, args: string[]): void {
    let msg = [this.categories[name].color, ...args, Style.Reset, '\n']
    if (this._isJoin) {
      msg = [this.categories[name].color, ...args, Style.Reset]
    }

    if (
      this.categories[name].pre.color !== '' &&
      this.categories[name].pre.val !== ''
    ) {
      const { color, val } = this.categories[name].pre
      msg = [color, val, Style.Reset, ...msg]
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
