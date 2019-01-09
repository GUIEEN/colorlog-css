import ColorLog from '../src/colorLog'

const clg = new ColorLog('./test.css')

clg.list()

clg.log('I want a default color')
clg.pri('But I wanna more pretty log')

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

clg.log('log')
clg.pri('pri')
clg.sec('sec')
clg.suc('suc')
clg.warn('warn')
clg.info('info\n\n')
// clg.log(clg.categories)

clg.danger('danger')
clg.categories.danger.color = clg.makeForm(null, clg.gen('rgb(90, 115, 216)'))
clg.danger('danger')

clg.log('\n')
