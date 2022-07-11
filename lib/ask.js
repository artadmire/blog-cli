const inquirer = require('inquirer')

// Support types from prompt-for which was used

const prompts = [
  {
    type: 'input',
    message: '请输入commit meaasge:',
    name: 'commitMsg',
    default: 'docs: deploy' // 默认值
  }
]

function ask () {
  return new Promise((resolve, reject) => {
    inquirer.prompt(prompts).then((answers) => {
      resolve(answers)
    })
    .catch((e) => {
      reject(e)
    })
  })
}

module.exports = {
  ask
}
