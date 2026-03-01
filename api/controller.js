const model = require('./model')

async function save(req, res){
    const { conteudo, data, time, desc } = req.body

    if(!conteudo || !data || !time || !desc){
        return res.status(400).json({message: 'Campo obrigatórios faltando'})
    }
    try {
        const result = await model.save(conteudo, data, time, desc)

        if(result.affectedRows > 0){
            return res.status(201).json({message: 'Sucesso ao salvar os dados'})
        }
    } catch (error){
        return res.status(500).json({message: 'Houve um erro ao salvar os dados no banco', error})
    }
}

module.exports = { save }