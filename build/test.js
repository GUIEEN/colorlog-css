"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorLog_1 = require("./colorLog");
var clg = new colorLog_1.ColorLog('./test.css');
// clg.list()
// clg.log('I want a default color')
// clg.pri('But I wanna more pretty log')
// clg
//   .join()
//   .log('log')
//   .pri('pri')
//   .sec('sec')
//   .suc('suc')
//   .danger('danger')
//   .warn('warn')
//   .info('info')
//   .end()
// clg.log('log')
// clg.pri('pri')
// clg.sec('sec')
// clg.suc('suc')
// clg.danger('danger')
// clg.warn('warn')
clg.info('info');
console.log(clg.categories);
// console.log('\u001b[38;2;255;255;255;48;2;0;170;189;2m', 'haha')
//# sourceMappingURL=test.js.map