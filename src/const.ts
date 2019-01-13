/**
 * Default Style of 4-bit ColoursSet. (https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
 */
export enum Style {
  // Style
  Reset = '\x1b[0m',
  Bold = '\x1b[1m',
  Dim = '\x1b[2m',
  Italic = '\x1b[3m',
  Underscore = '\x1b[4m',
  Reverse = '\x1b[7m',

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

/**
 * Your Color Set. You can directly modify it with `color()` method :)
 * Default color theme is Argonaut
 */
export const Colors = {
  Black: 'rgb(46;46;46)',
  Red: 'rgb(255;38;14)',
  Green: 'rgb(155;226;5)',
  Yellow: 'rgb(255;196;0)',
  Blue: 'rgb(1;162;250)',
  Magenta: 'rgb(129;91;181)',
  Cyan: 'rgb(0;222;239)',
  White: 'rgb(255;255;255)',
  BrightBlack: 'rgb(86;86;86)',
  BrightRed: 'rgb(255;66;81)',
  BrightGreen: 'rgb(184;227;110)',
  BrightYellow: 'rgb(255;216;82)',
  BrightBlue: 'rgb(0;166;255)',
  BrightMagenta: 'rgb(172;123;240)',
  BrightCyan: 'rgb(116;253;243)',
  BrightWhite: 'rgb(255;251;246)'
}

/**
 * ColorSchemes in here is generated based on the data derived from iterm schemes. (https://github.com/mbadolato/iTerm2-Color-Schemes)
 */
export enum Schemes {
  '3024_Day' = '3024_Day',
  '3024_Night' = '3024_Night',
  'AdventureTime' = 'AdventureTime',
  'Afterglow' = 'Afterglow',
  'AlienBlood' = 'AlienBlood',
  'Argonaut' = 'Argonaut',
  'Arthur' = 'Arthur',
  'AtelierSulphurpool' = 'AtelierSulphurpool',
  'Atom' = 'Atom',
  'AtomOneLight' = 'AtomOneLight',
  'Batman' = 'Batman',
  'Belafonte_Day' = 'Belafonte_Day',
  'Belafonte_Night' = 'Belafonte_Night',
  'BirdsOfParadise' = 'BirdsOfParadise',
  'Blazer' = 'Blazer',
  'BlulocoDark' = 'BlulocoDark',
  'BlulocoLight' = 'BlulocoLight',
  'Borland' = 'Borland',
  'Bright_Lights' = 'Bright_Lights',
  'Broadcast' = 'Broadcast',
  'Brogrammer' = 'Brogrammer',
  'Builtin_Dark' = 'Builtin_Dark',
  'Builtin_Light' = 'Builtin_Light',
  'Builtin_Pastel_Dark' = 'Builtin_Pastel_Dark',
  'Builtin_Solarized_Dark' = 'Builtin_Solarized_Dark',
  'Builtin_Solarized_Light' = 'Builtin_Solarized_Light',
  'Builtin_Tango_Dark' = 'Builtin_Tango_Dark',
  'Builtin_Tango_Light' = 'Builtin_Tango_Light',
  'C64' = 'C64',
  'CLRS' = 'CLRS',
  'Calamity' = 'Calamity',
  'Chalk' = 'Chalk',
  'Chalkboard' = 'Chalkboard',
  'ChallengerDeep' = 'ChallengerDeep',
  'Chester' = 'Chester',
  'Ciapre' = 'Ciapre',
  'Cobalt_Neon' = 'Cobalt_Neon',
  'Cobalt2' = 'Cobalt2',
  'CrayonPonyFish' = 'CrayonPonyFish',
  'Dark_Pastel' = 'Dark_Pastel',
  'Dark+' = 'Dark+',
  'Darkside' = 'Darkside',
  'Desert' = 'Desert',
  'DimmedMonokai' = 'DimmedMonokai',
  'DotGov' = 'DotGov',
  'Dracula' = 'Dracula',
  'Duotone_Dark' = 'Duotone_Dark',
  'ENCOM' = 'ENCOM',
  'Earthsong' = 'Earthsong',
  'Elemental' = 'Elemental',
  'Elementary' = 'Elementary',
  'Espresso_Libre' = 'Espresso_Libre',
  'Espresso' = 'Espresso',
  'Fahrenheit' = 'Fahrenheit',
  'Fideloper' = 'Fideloper',
  'FirefoxDev' = 'FirefoxDev',
  'Firewatch' = 'Firewatch',
  'FishTank' = 'FishTank',
  'Flat' = 'Flat',
  'Flatland' = 'Flatland',
  'Floraverse' = 'Floraverse',
  'ForestBlue' = 'ForestBlue',
  'Framer' = 'Framer',
  'FrontEndDelight' = 'FrontEndDelight',
  'FunForrest' = 'FunForrest',
  'Galaxy' = 'Galaxy',
  'Github' = 'Github',
  'Glacier' = 'Glacier',
  'Grape' = 'Grape',
  'Grass' = 'Grass',
  'Gruvbox_Dark' = 'Gruvbox_Dark',
  'Hacktober' = 'Hacktober',
  'Hardcore' = 'Hardcore',
  'Harper' = 'Harper',
  'Highway' = 'Highway',
  'Hipster_Green' = 'Hipster_Green',
  'Homebrew' = 'Homebrew',
  'Hopscotch' = 'Hopscotch',
  'Hurtado' = 'Hurtado',
  'Hybrid' = 'Hybrid',
  'IC_Green_PPL' = 'IC_Green_PPL',
  'IC_Orange_PPL' = 'IC_Orange_PPL',
  'IR_Black' = 'IR_Black',
  'Jackie_Brown' = 'Jackie_Brown',
  'Japanesque' = 'Japanesque',
  'Jellybeans' = 'Jellybeans',
  'JetBrains_Darcula' = 'JetBrains_Darcula',
  'Kibble' = 'Kibble',
  'Kolorit' = 'Kolorit',
  'Later_This_Evening' = 'Later_This_Evening',
  'Lavandula' = 'Lavandula',
  'LiquidCarbon' = 'LiquidCarbon',
  'LiquidCarbonTransparent' = 'LiquidCarbonTransparent',
  'LiquidCarbonTransparentInverse' = 'LiquidCarbonTransparentInverse',
  'Man_Page' = 'Man_Page',
  'Material' = 'Material',
  'MaterialDark' = 'MaterialDark',
  'Mathias' = 'Mathias',
  'Medallion' = 'Medallion',
  'Misterioso' = 'Misterioso',
  'Molokai' = 'Molokai',
  'MonaLisa' = 'MonaLisa',
  'Monokai_Remastered' = 'Monokai_Remastered',
  'Monokai_Soda' = 'Monokai_Soda',
  'Monokai_Vivid' = 'Monokai_Vivid',
  'N0tch2k' = 'N0tch2k',
  'Neopolitan' = 'Neopolitan',
  'Neutron' = 'Neutron',
  'NightLion_v1' = 'NightLion_v1',
  'NightLion_v2' = 'NightLion_v2',
  'Nocturnal_Winter' = 'Nocturnal_Winter',
  'Novel' = 'Novel',
  'Obsidian' = 'Obsidian',
  'Ocean' = 'Ocean',
  'OceanicMaterial' = 'OceanicMaterial',
  'Ollie' = 'Ollie',
  'OneHalfDark' = 'OneHalfDark',
  'OneHalfLight' = 'OneHalfLight',
  'Operator_Mono_Dark' = 'Operator_Mono_Dark',
  'Pandora' = 'Pandora',
  'Parasio_Dark' = 'Parasio_Dark',
  'PaulMillr' = 'PaulMillr',
  'PencilDark' = 'PencilDark',
  'PencilLight' = 'PencilLight',
  'Piatto_Light' = 'Piatto_Light',
  'Pnevma' = 'Pnevma',
  'Pro_Light' = 'Pro_Light',
  'Pro' = 'Pro',
  'Purple_Rain' = 'Purple_Rain',
  'Red_Alert' = 'Red_Alert',
  'Red_Planet' = 'Red_Planet',
  'Red_Sands' = 'Red_Sands',
  'Relaxed' = 'Relaxed',
  'Rippedcasts' = 'Rippedcasts',
  'Royal' = 'Royal',
  'Ryuuko' = 'Ryuuko',
  'SeaShells' = 'SeaShells',
  'Seafoam_Pastel' = 'Seafoam_Pastel',
  'Seti' = 'Seti',
  'Shaman' = 'Shaman',
  'Slate' = 'Slate',
  'Smyck' = 'Smyck',
  'Snazzy' = 'Snazzy',
  'SoftServer' = 'SoftServer',
  'Solarized_Darcula' = 'Solarized_Darcula',
  'Solarized_Dark_-_Patched' = 'Solarized_Dark_-_Patched',
  'Solarized_Dark_Higher_Contrast' = 'Solarized_Dark_Higher_Contrast',
  'Solarized_Dark' = 'Solarized_Dark',
  'Solarized_Light' = 'Solarized_Light',
  'SpaceGray_Eighties_Dull' = 'SpaceGray_Eighties_Dull',
  'SpaceGray_Eighties' = 'SpaceGray_Eighties',
  'SpaceGray' = 'SpaceGray',
  'Spacedust' = 'Spacedust',
  'Spiderman' = 'Spiderman',
  'Spring' = 'Spring',
  'Square' = 'Square',
  'Sundried' = 'Sundried',
  'Symfonic' = 'Symfonic',
  'Tango_Adapted' = 'Tango_Adapted',
  'Tango_Half_Adapted' = 'Tango_Half_Adapted',
  'Teerb' = 'Teerb',
  'Terminal_Basic' = 'Terminal_Basic',
  'Thayer_Bright' = 'Thayer_Bright',
  'The_Hulk' = 'The_Hulk',
  'Tomorrow_Night_Blue' = 'Tomorrow_Night_Blue',
  'Tomorrow_Night_Bright' = 'Tomorrow_Night_Bright',
  'Tomorrow_Night_Burns' = 'Tomorrow_Night_Burns',
  'Tomorrow_Night_Eighties' = 'Tomorrow_Night_Eighties',
  'Tomorrow_Night' = 'Tomorrow_Night',
  'Tomorrow' = 'Tomorrow',
  'ToyChest' = 'ToyChest',
  'Treehouse' = 'Treehouse',
  'Twilight' = 'Twilight',
  'Ubuntu' = 'Ubuntu',
  'UltraViolent' = 'UltraViolent',
  'UnderTheSea' = 'UnderTheSea',
  'Urple' = 'Urple',
  'Vaughn' = 'Vaughn',
  'VibrantInk' = 'VibrantInk',
  'Violet_Dark' = 'Violet_Dark',
  'Violet_Light' = 'Violet_Light',
  'WarmNeon' = 'WarmNeon',
  'Wez' = 'Wez',
  'Whimsy' = 'Whimsy',
  'WildCherry' = 'WildCherry',
  'Wombat' = 'Wombat',
  'Wryan' = 'Wryan',
  'Zenburn' = 'Zenburn',
  'ayu' = 'ayu',
  'ayu_light' = 'ayu_light',
  'cyberpunk' = 'cyberpunk',
  'deep' = 'deep',
  'idea' = 'idea',
  'idleToes' = 'idleToes',
  'lovelace' = 'lovelace',
  'purplepeter' = 'purplepeter',
  'rebecca' = 'rebecca',
  'synthwave' = 'synthwave'
}
