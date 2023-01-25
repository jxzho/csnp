const prompts = require('prompts')
const { lightGreen } = require('kolorist')

const exec = async () => {

  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'What is your GitHub username?'
    },
    {
      type: 'number',
      name: 'age',
      message: 'How old are you?'
    },
    {
      type: 'text',
      name: 'about',
      message: 'Tell something about yourself',
      initial: 'Why should I?'
    }
  ]

  const res = await prompts(questions)

  console.log(lightGreen(JSON.stringify(res, null, 2)))
}

exec()
