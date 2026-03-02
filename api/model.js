const { pool } = require('./db')

async function save(conteudo, dia, tempo, descricao){
    const sql = `INSERT INTO contentRegisters (conteudo, dia, tempo, descricao) VALUES (?,?,?,?);`
    const [results] = await pool.query(sql, [conteudo, dia, tempo, descricao])
    return results
}

/*  Como parametro dessa function, ela recebe um json com as especificações da consulta
Exemplo:
{
    req: 'conteudo or dia or descricao'
    content: valor para filtrar
} */

async function readRegisters(param){
    if(param.req === 'conteudo'){
        const sql = `SELECT * FROM contentRegisters WHERE conteudo = ?;`
        const [results] = await pool.query(sql, [param.content])
        return results

    } else if (param.req === 'dia'){
        const sql = `SELECT * FROM contentRegisters WHERE dia = ?;`
        const [results] = await pool.query(sql, [param.content])
        return results

    } else if (param.req === 'descricao'){
        const sql = `SELECT * FROM contentRegisters WHERE descricao = ?;`
        const [results] = await pool.query(sql, [param.content])
        return results

    } else {
        throw Error('Erro na consulta')
    }
}

/* Aqui o parametro json devem ser dois dias distintos para realizar uma consulta between
Esses dias precisam ser previamente determinados no controller para não gerar uma consulta redundante.
Como por exemplo: os mesmos dias serem colocados 2 vezes, ou um dia inexistente no banco

Esse modelo pode ser montado no controller
json: {
dia1: '00-00-0000',
dia2: '00-00-0000'
} */

async function returnToStudyTime(betweenDia){
    const sql = `SELECT * FROM studyRegisters WHERE dia BETWEEN ? AND ?;`
    const [results] = await pool.query(sql, [betweenDia.dia1, betweenDia.dia2])
    return results
}

module.exports = { save, readRegisters, returnToStudyTime }
