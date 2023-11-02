const db = require('../models');

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        try {
            const result = await db.Turmas.findAll()
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params;

        try {
            const result = await db.Turmas.findOne({ where: { id: Number(id) } } );

            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res) {
        const { body } = req;

        try {
            const result = await db.Turmas.create(body);

            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const newBody = req.body

        try {
            await db.Turmas.update(newBody, { where: { id: Number(id) }})
            const result = await db.Turmas.findOne( { where: { id: Number(id) }})
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res) {
        const { id } = req.params

        try {
            await db.Turmas.destroy({ where: { id: Number(id) }})

            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController;