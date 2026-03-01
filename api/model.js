const connection = require('./db')

async function save(conteudo, data, time, desc){
    const sql = `INSERT INTO studyRegisters (conteudo, data, time, desc) VALUES (?,?,?,?);`
    const [results] =  await connection.query(sql, [conteudo, data, time, desc])
    return results
}

/*  Como parametro dessa function, ela recebe um json com as especificações da consulta
Exemplo:
{
    req: 'conteudo or data or desc'
    content: data específicada or descrição

} */

async function readRegisters(param){
    if(param.req == 'conteudo'){
        const sql = `SELECT * FROM studyRegisters WHERE conteudo = ?;`
        const [results] = await connection.query(sql, param.req)
        return results

    } else if (param.req == 'data'){
        const sql = `SELECT * FROM studyRegisters WHERE data = ?;`
        const [results] = await connection.query(sql, param.content)
        return results

    } else if (param.req == 'description'){
        const sql = `SELECT * FROM studyRegisters WHERE desc = ?;`
        const [results] = await connection.query(sql, param.content)
        return results

    } else {
        throw Error('Erro na consulta')
    }
}

/* Aqui o parametro json devem ser duas data distintintas para realizar uma consulta between
Essas datas precisam ser previamente determinadas no controller para não gerar uma consulta redundante.
Como por exemplo: as mesmas datas serem colocadas 2 vezes, ou uma data inesistente no banco

Esse modelo pode ser montado no controller
json: {
data1: '00-00-0000',
data2: '00-00-0000'
} */

async function returnToStudyTime(betweenData){
    const sql = `SELECT * FROM studyRegisters WHERE data BETWEEN ? AND ?;`
    const results = await connection.query(sql, [betweenData.data1, betweenData.data2])
    return results
}

module.exports = { save, readRegisters, returnToStudyTime }