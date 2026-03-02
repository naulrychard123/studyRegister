const model = require('./model')

async function save(req, res){
    const { conteudo, dia, tempo, descricao } = req.body

    if(!conteudo || !dia || !tempo || !descricao){
        return res.status(400).json({message: 'Campo obrigatórios faltando'})
    }
    try {
        const result = await model.save(conteudo, dia, tempo, descricao)

        if(result.affectedRows > 0){
            return res.status(201).json({message: 'Sucesso ao salvar os dados'})
        }
        return res.status(500).json({message: 'Registro não foi salvo'})
    } catch (error){
        return res.status(500).json({message: 'Houve um erro ao salvar os dados no banco', error})
    }
}

async function searchPerDia(req, res){
    const dia = req.query.dia

    if(!dia){
        return res.status(400).json({message: 'Informe o dia na query (?dia=YYYY-MM-DD)'})
    }

    try {
        const result = await model.readRegisters({ req: 'dia', content: dia })
        return res.status(200).json(result)
    } catch (error){
        return res.status(500).json({message: 'Erro ao consultar por dia', error})
    }
}

async function searchPerContent(req, res){
    const conteudo = req.query.conteudo

    if(!conteudo){
        return res.status(400).json({message: 'Informe o conteúdo na query (?conteudo=nome)'})
    }

    try {
        const result = await model.readRegisters({ req: 'conteudo', content: conteudo })
        return res.status(200).json(result)
    } catch (error){
        return res.status(500).json({message: 'Erro ao consultar por conteúdo', error})
    }
}

module.exports = { save, searchPerDia, searchPerContent }
