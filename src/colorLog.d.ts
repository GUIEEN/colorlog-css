/// <reference types="node" />
import { PathLike } from 'fs'

export declare enum Colors {
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

export declare type ColorLogMember =
  | 'log'
  | 'pri'
  | 'sec'
  | 'suc'
  | 'danger'
  | 'warn'
  | 'info'

interface ColorLogMembers {
  log(...args: any[]): ColorLogMembers
  pri(...args: any[]): ColorLogMembers
  sec(...args: any[]): ColorLogMembers
  suc(...args: any[]): ColorLogMembers
  danger(...args: any[]): ColorLogMembers
  warn(...args: any[]): ColorLogMembers
  info(...args: any[]): ColorLogMembers
  end(): void
}

export class ColorLog implements ColorLogMembers {
  /**
   * Declare path of CSS file if you want to initialize the colors with your css file.
   * @param path
   */
  constructor(path?: string)

  /**
   * Showing the default color list
   */
  list(): void

  /**
   * Read specified css file synchronously
   * @param cssFilePath
   */
  set(cssFilePath: PathLike): void

  /**
   * Start to join the ColorLogMembers' methods. After calling the functions, you need to call end() function.
   */
  join(): ColorLogMembers
  end(): void

  /**
   * log() will print the args with default color.
   * Each method name represents the color which is derived from bootstrap
   * @param args
   */
  log(...args: any[]): ColorLogMembers
  pri(...args: any[]): ColorLogMembers
  sec(...args: any[]): ColorLogMembers
  suc(...args: any[]): ColorLogMembers
  danger(...args: any[]): ColorLogMembers
  warn(...args: any[]): ColorLogMembers
  info(...args: any[]): ColorLogMembers

  /**
   * makeForm() will generate the form for configuration of this.categories. You can modify the colors of this.categories with using this function.
   *
   * eg) this.categories
   * @param fg
   * @param bg
   */
  makeForm(fg: string | Colors | null, bg?: string | Colors): string
  gen(cssColor: string): string

  /**
   * Represents the method's color and prefix's value & color.
   */
  categories: {
    [key in ColorLogMember]: {
      color: string
      pre: {
        color: string
        val: string
      }
    }
  }
}
