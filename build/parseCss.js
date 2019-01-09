"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var format = {
    selector: {
        name: null,
        color: null,
        background: null,
        val: null
    }
}, obj = __assign({}, format), tmp = '', hasMeaning = false, isComment = false, result = {};
// Sync Version
var parseCssSync = function (cssFile) {
    var cssFileString = fs_1.default.readFileSync(cssFile, { encoding: 'utf8' });
    var i = 0, len = cssFileString.length, char;
    while (i < len) {
        char = cssFileString[i++];
        if (char == null)
            break;
        // CSS Comment /* ... */
        if (isComment) {
            if (char === '*')
                tmp = char;
            if (tmp === '*' && char === '/') {
                tmp = '';
                isComment = false;
            }
            continue;
        }
        if (char === '/') {
            tmp = char;
            continue;
        }
        if (tmp === '/' && char === '*') {
            isComment = true;
            continue;
        }
        // Start parsing
        if (char === '.') {
            hasMeaning = true;
        }
        if (char === '}') {
            result[obj.selector.name] = {
                color: obj.selector.color,
                background: obj.selector.background,
                val: obj.selector.val
            };
            obj = __assign({}, format);
            hasMeaning = false;
        }
        if (hasMeaning) {
            tmp += char;
            if (char === '{') {
                tmp = tmp.replace(/\n| |{/g, '');
                obj.selector.name = tmp;
                tmp = '';
                continue;
            }
            if (char === ';') {
                if (/background/.test(tmp)) {
                    obj.selector.background = tmp.split(':')[1].replace(/ |;/g, '');
                }
                else if (/color/.test(tmp)) {
                    obj.selector.color = tmp.split(':')[1].replace(/ |;/g, '');
                }
                else if (/val/.test(tmp)) {
                    obj.selector.val = tmp.split(':')[1].replace(/ |;/g, '');
                }
                tmp = '';
            }
        }
    }
    return result;
};
exports.default = parseCssSync;
//# sourceMappingURL=parseCss.js.map