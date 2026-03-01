const { Select } = require('enquirer')
const rl = require('readline-sync')
const date = new Date()

    async function initInterface(){
        const response = await new Select({
            name: 'init',
            message: 'Selecione a ação:\n',
            choices: ['salvar registro', 'consultar registros']
        }).run()
        
        if(response === 'salvar registro'){

        }
    }

    async function sendData(){
      const conteudo = await new Select({
        name: 'content',
        message: 'Selecione o conteúdo\n',
        choices: ['japones', 'ingles', 'programação', 'outro']
      }).run()

      if(conteudo === 'outro'){
        const response = new Select({
            name: 'resp',
            message: 'Deseja criar um novo grupo de estudos?\n',
            choices: ['sim', 'não']
        }).run()

        if(response === 'sim'){
            return fetch('http://localhost:3000/add-group', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            })
        }
      }
    }