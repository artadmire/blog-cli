const shell = require('shelljs')

module.exports = function (action) {
  return new Promise((resolve, reject) => {
    shell.exec(action, {}, (err, ok) => {
      if (err) {
        reject(err)
        return
      }
      resolve(ok)
    })
  })
}
