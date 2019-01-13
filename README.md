<div align="center">

# colorlog-css

[![npm version](https://badge.fury.io/js/colorlog-css.svg)](https://badge.fury.io/js/colorlog-css)
[![LICENSE](https://img.shields.io/github/license/GUIEEN/colorlog-css.svg)](https://github.com/GUIEEN/colorlog-css/blob/master/LICENSE)

🌈 **Colorize** your ~~_ugly_~~ console.log with **198 Schemes** and **your CSS** !

</div>

![](https://gist.githubusercontent.com/GUIEEN/4983b788d10a46a34e2deb4dd4435437/raw/7651b0816d6106ab43a1f35c32bbbfef343540d7/Styles.png)
![](https://gist.githubusercontent.com/GUIEEN/4983b788d10a46a34e2deb4dd4435437/raw/7651b0816d6106ab43a1f35c32bbbfef343540d7/Schemes.png)

## Installation

```sh
npm install colorlog-css --save
yarn add colorlog-css
```

## Usage

### Javascript

```js
var colorLog = require('colorlog-css')
var clg = new colorLog.default('./MyColors.css')
// var clg = new colorLog.default()
// clg.set('./MyColors.css')

clg.log('I want a default color')
clg.pri('But I wanna more pretty log')
```

### TypeScript

```ts
import ColorLog from 'colorlog-css'

const clg = new ColorLog('./MyColors.css')
// const clg = new ColorLog()
// clg.set('./MyColors.css')

clg.list()
clg.suc('cess :)')
clg
  .join()
  .log('log')
  .pri('pri')
  .sec('sec')
  .suc('suc')
  .danger('danger')
  .warn('warn')
  .info('info')
  .end()
```

![](https://gist.githubusercontent.com/GUIEEN/4983b788d10a46a34e2deb4dd4435437/raw/7651b0816d6106ab43a1f35c32bbbfef343540d7/ChangeColor.png)

There are already **198 schemes** based on the [iterm-scheme list](https://github.com/mbadolato/iTerm2-Color-Schemes) and [3/4 bit default style](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors). You can easily modify your color with these predefined colors and your CSS.

```ts
clg.list() // Will show the default 3/4 bit style list.
clg.listScheme() // List schemes with methods of scheme applied.

import { Schemes } from 'colorlog-css'
// Schemes will applied to the methods 🕶
clg.setScheme(Schemes.Batman)
```

## How to change color ?

Make a CSS file for customizing your own color :)

- Selectors
  - Class Format ( Each selector will represent method's color)
    - `.primary`
    - `.secondary`
    - `.success`
    - `.danger`
    - `.warning`
    - `.info`
    - `.default`
  - Id Format
    - `#pre`
      - `val` ( property represent the value of prefix )

```css
/* SAMPLE */

.success {
  background: #00bc80;
  color: rgb(255, 255, 255);
}

/* .default #pre {
  background: null;
  color: #ffffff;
  val: *Default*;
} */

.primary #pre {
  background: rgb(0, 115, 216);
  color: rgb(255, 255, 255);
  val: 🌈 HEY;
}

.secondary #pre {
  background: #514636;
  color: rgb(235, 244, 255);
  val: ☕️ Hmm..;
}

.success #pre {
  background: #58ff82;
  color: rgb(33, 33, 33);
  val: ✅ Great !;
}

.danger #pre {
  background: #ff7dab;
  color: rgb(0, 0, 0);
  val: 🔥 🔥 WATCH OUT;
}

.warning #pre {
  background: #ffdc2e;
  color: rgb(0, 0, 0);
  val: 💩 Shit;
}

.info #pre {
  background: rgba(0, 170, 189, 0.612);
  color: rgb(255, 255, 255);
  val: ⭐️ __NOTE__ ⭐️;
}
```

```ts
import ColorLog from 'colorlog-css'

const clg = new ColorLog('./MyColors.css')
clg
  .join()
  .log('log')
  .pri('pri')
  .sec('sec')
  .suc('suc')
  .danger('danger')
  .warn('warn')
  .info('info')
  .end()
```

or programmatically,

```ts
import ColorLog, { Colors } from 'colorlog-css'

const clg = new ColorLog('./MyColors.css')

clg.info('You can change the color like this', '\n\n')

clg.danger('danger')

// Apply only background
clg.categories.danger.color = clg.makeForm(null, '#ff4757')
clg.danger('danger')

// Apply styles and colors
clg.categories.danger.color = clg.makeForm(
  [Colors.Magenta, Style.Italic, Style.Bold],
  '#7bed9f'
)
clg.danger('danger')
```

Output will look like this ✨

![](https://gist.githubusercontent.com/GUIEEN/4983b788d10a46a34e2deb4dd4435437/raw/7651b0816d6106ab43a1f35c32bbbfef343540d7/ChangeColor.png)

## TODO...

- [x] Make it available to customize default color set.
  - [x] Customize it with schemes / inputing the value directly.
- [x] Change font styles with `string` or `string[]` types
- [ ] Any ideas? 😄

Any questions or suggestions are always welcome 🍀
