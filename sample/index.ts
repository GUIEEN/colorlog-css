import ColorLog, { Colors, Style } from '../src/index'

const clg = new ColorLog()

clg.list()

clg.log('I want a default color')
clg.set('./test.css')
clg.pri('But I wanna more pretty log')

clg.log('This is default log message')
clg.pri('pri')
clg.sec('sec')
clg.suc('suc')
clg.danger('danger')
clg.warn('warn')
clg.info('info', '\n\n')

clg.info('You can change the color like this', '\n\n')

clg.danger('danger')
clg.categories.danger.color = clg.makeForm(null, '#ff4757')
clg.danger('danger')
clg.categories.danger.color = clg.makeForm(
  [Colors.Magenta, Style.Italic, Style.Bold],
  '#7bed9f'
)
clg.danger('danger')

clg.log('\n')

clg.listScheme()
