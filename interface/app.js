const { Select } = require('enquirer')
const rl = require('readline-sync')
const date = new Date().toISOString().slice(0, 10)

async function initInterface() {
    const response = await new Select({
        name: 'init',
        message: 'Selecione a ação:\n',
        choices: ['salvar registro', 'consultar registros']
    }).run()

    if (response === 'salvar registro') {
        await sendData()
        return
    }

    await readData()
}

async function sendData() {
    const conteudoSelecionado = await new Select({
        name: 'content',
        message: 'Selecione o conteúdo\n',
        choices: ['japones', 'ingles', 'programação', 'outro']
    }).run()

    const conteudo = conteudoSelecionado === 'outro'
        ? rl.question('Digite o novo conteudo: ')
        : conteudoSelecionado

    const tempo = Number(rl.question('Tempo de estudo em minutos: '))
    const descricao = rl.question('Descricao do estudo: ')
    const dia = rl.question(`Data (YYYY-MM-DD) [${date}]: `) || date

    const response = await fetch('http://localhost:3000/create-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conteudo, dia, tempo, descricao })
    })

    const result = await response.json()
    console.log(result)
}

async function readData() {
    const tipoConsulta = await new Select({
        name: 'readType',
        message: 'Consultar por:',
        choices: ['dia', 'conteudo']
    }).run()

    const query = tipoConsulta === 'dia'
        ? `dia=${rl.question('Digite o dia (YYYY-MM-DD): ')}`
        : `conteudo=${encodeURIComponent(rl.question('Digite o conteudo: '))}`

    const endpoint = tipoConsulta === 'dia'
        ? 'http://localhost:3000/consultar/dia'
        : 'http://localhost:3000/consultar/conteudo'

    const response = await fetch(`${endpoint}?${query}`)
    const result = await response.json()
    console.log(result)
}

initInterface().catch((error) => {
    console.error('Erro na interface:', error.message)
})
