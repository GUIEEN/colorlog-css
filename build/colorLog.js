"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __importDefault(require("util"));
var parseCss_1 = __importDefault(require("./parseCss"));
// 4-bit ColoursSet. https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
var StyleSet;
(function (StyleSet) {
    // Style
    StyleSet["Reset"] = "\u001B[0m";
    StyleSet["Bold"] = "\u001B[1m";
    StyleSet["Dim"] = "\u001B[2m";
    StyleSet["Italic"] = "\u001B[3m";
    StyleSet["Underscore"] = "\u001B[4m";
    // Blink = '\x1b[5m',
    StyleSet["Reverse"] = "\u001B[7m";
    // Hidden = '\x1b[8m',
    // Foreground
    StyleSet["FgBlack"] = "\u001B[30m";
    StyleSet["FgRed"] = "\u001B[31m";
    StyleSet["FgGreen"] = "\u001B[32m";
    StyleSet["FgYellow"] = "\u001B[33m";
    StyleSet["FgBlue"] = "\u001B[34m";
    StyleSet["FgMagenta"] = "\u001B[35m";
    StyleSet["FgCyan"] = "\u001B[36m";
    StyleSet["FgWhite"] = "\u001B[37m";
    StyleSet["FgDefault"] = "\u001B[39m";
    StyleSet["FgBrightBlack"] = "\u001B[90m";
    StyleSet["FgBrightRed"] = "\u001B[91m";
    StyleSet["FgBrightGreen"] = "\u001B[92m";
    StyleSet["FgBrightYellow"] = "\u001B[93m";
    StyleSet["FgBrightBlue"] = "\u001B[94m";
    StyleSet["FgBrightMagenta"] = "\u001B[95m";
    StyleSet["FgBrightCyan"] = "\u001B[96m";
    StyleSet["FgBrightWhite"] = "\u001B[97m";
    // Background
    StyleSet["BgBlack"] = "\u001B[40m";
    StyleSet["BgRed"] = "\u001B[41m";
    StyleSet["BgGreen"] = "\u001B[42m";
    StyleSet["BgYellow"] = "\u001B[43m";
    StyleSet["BgBlue"] = "\u001B[44m";
    StyleSet["BgMagenta"] = "\u001B[45m";
    StyleSet["BgCyan"] = "\u001B[46m";
    StyleSet["BgWhite"] = "\u001B[47m";
    StyleSet["BgDefault"] = "\u001B[49m";
    StyleSet["BgBrightBlack"] = "\u001B[100m";
    StyleSet["BgBrightRed"] = "\u001B[101m";
    StyleSet["BgBrightGreen"] = "\u001B[102m";
    StyleSet["BgBrightYellow"] = "\u001B[103m";
    StyleSet["BgBrightBlue"] = "\u001B[104m";
    StyleSet["BgBrightMagenta"] = "\u001B[105m";
    StyleSet["BgBrightCyan"] = "\u001B[106m";
    StyleSet["BgBrightWhite"] = "\u001B[107m";
})(StyleSet || (StyleSet = {}));
// Default color theme is Argonaut
var Colors;
(function (Colors) {
    Colors["Black"] = "46;46;46";
    Colors["Red"] = "255;38;14";
    Colors["Green"] = "155;226;5";
    Colors["Yellow"] = "255;196;0";
    Colors["Blue"] = "1;162;250";
    Colors["Magenta"] = "129;91;181";
    Colors["Cyan"] = "0;222;239";
    Colors["White"] = "255;255;255";
    Colors["BrightBlack"] = "86;86;86";
    Colors["BrightRed"] = "255;66;81";
    Colors["BrightGreen"] = "184;227;110";
    Colors["BrightYellow"] = "255;216;82";
    Colors["BrightBlue"] = "0;166;255";
    Colors["BrightMagenta"] = "172;123;240";
    Colors["BrightCyan"] = "116;253;243";
    Colors["BrightWhite"] = "255;251;246";
})(Colors = exports.Colors || (exports.Colors = {}));
var ColorCore = /** @class */ (function () {
    function ColorCore(path, _isJoin, _makeForm) {
        if (_isJoin === void 0) { _isJoin = false; }
        if (_makeForm === void 0) { _makeForm = function (fg, bg) {
            var isFg = true, isBg = true;
            if (fg === '' || fg == null)
                isFg = false;
            if (bg === '' || bg == null)
                isBg = false;
            if (isFg && isBg)
                return "\u001B[38;2;" + fg + ";48;2;" + bg + "m";
            if (isFg)
                return "\u001B[38;2;" + fg + "m";
            if (isBg)
                return "\u001B[48;2;" + bg + "m";
            return "" + StyleSet.FgDefault + StyleSet.BgDefault;
        }; }
        var _this = this;
        this._isJoin = _isJoin;
        this._makeForm = _makeForm;
        this.categories = {
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
        };
        this.makeForm = function (fg, bg) {
            return _this._makeForm(fg, bg);
        };
        this.list = function () {
            Object.keys(StyleSet).filter(function (key) {
                console.log(StyleSet[key], key, StyleSet.Reset);
            });
        };
        this.set = function (cssFilePath) {
            _this._set(cssFilePath);
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('default', args);
        };
        this.pri = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('primary', args);
        };
        this.sec = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('secondary', args);
        };
        this.suc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('success', args);
        };
        this.danger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('danger', args);
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('warning', args);
        };
        this.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._wrap('info', args);
        };
        this.join = function () {
            var color = new ColorCore();
            color.categories = _this.categories;
            color._isJoin = true;
            return color;
        };
        this.end = function () { return process.stdout.write('\n'); };
        this.gen = function (cssColor) { return _this._parse(cssColor); };
        this._wrap = function (name, args) {
            var color = new ColorCore();
            color.categories = _this.categories;
            if (_this._isJoin)
                color._isJoin = true;
            _this._out(name, args);
            return color;
        };
        this._parse = function (color) {
            if (color.substr(0, 1) === '#') {
                var collen = (color.length - 1) / 3;
                var fact = [17, 1, 0.062272][collen - 1];
                var val_1 = Math.round(parseInt(color.substr(1, collen), 16) * fact);
                var val2 = Math.round(parseInt(color.substr(1 + collen, collen), 16) * fact);
                var val3 = Math.round(parseInt(color.substr(1 + 2 * collen, collen), 16) * fact);
                return val_1 + ";" + val2 + ";" + val3;
            }
            var val = '', isStart = false, cnt = 0;
            for (var _i = 0, color_1 = color; _i < color_1.length; _i++) {
                var i = color_1[_i];
                if (i.match(/^\d+$/)) {
                    isStart = true;
                }
                if (i === ',') {
                    isStart = false;
                    if (cnt < 2)
                        val += ';';
                    cnt++;
                }
                if (i === ')')
                    break;
                if (isStart) {
                    if (cnt < 3) {
                        val += i.toString();
                    }
                    else {
                        break;
                    }
                }
            }
            return val;
        };
        this._set = function (cssStream) {
            var parsed = parseCss_1.default(cssStream);
            if (Object.keys(parsed).length === 0) {
                console.error('CSS parsing error');
                return null;
            }
            for (var e in parsed) {
                var selector = e.replace(/^.|#/, '');
                var fg = void 0, bg = void 0, val = void 0;
                if (parsed[e]['background'])
                    bg = _this._parse(parsed[e]['background']);
                if (parsed[e]['color'])
                    fg = _this._parse(parsed[e]['color']);
                if (parsed[e]['val'])
                    val = parsed[e]['val'];
                if (selector.indexOf('#') > 0) {
                    var _a = selector.split('#'), main = _a[0], prefix = _a[1];
                    if (prefix === 'pre') {
                        if (_this.categories[main]) {
                            _this.categories[main].pre.color = _this._makeForm(fg, bg);
                            if (val != null)
                                _this.categories[main].pre.val = val;
                        }
                    }
                }
                else if (_this.categories[selector]) {
                    _this.categories[selector].color = _this._makeForm(fg, bg);
                }
            }
        };
        if (path != null && path !== '') {
            this.set(path);
        }
    }
    ColorCore.prototype._out = function (name, args) {
        var msg = [this.categories[name].color].concat(args, [StyleSet.Reset, '\n']);
        if (this._isJoin) {
            msg = [this.categories[name].color].concat(args, [StyleSet.Reset]);
        }
        if (this.categories[name].pre.color !== '' &&
            this.categories[name].pre.val !== '') {
            var _a = this.categories[name].pre, color = _a.color, val = _a.val;
            msg = [color, val, StyleSet.Reset].concat(msg);
        }
        process.stdout.write(util_1.default.format.apply(this, msg));
    };
    return ColorCore;
}());
var ColorLog = /** @class */ (function (_super) {
    __extends(ColorLog, _super);
    function ColorLog(path) {
        return _super.call(this, path) || this;
    }
    return ColorLog;
}(ColorCore));
exports.ColorLog = ColorLog;
exports.default = ColorLog;
//# sourceMappingURL=colorLog.js.map