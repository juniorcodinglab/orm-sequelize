const db = require('../models');

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await db.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(req, res) {
        const { id } = req.params;

        try {
            const result = await db.Niveis.findOne({ where: { id: Number(id) } } );

            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async criaNivel(req, res) {
        const { body } = req;

        try {
            const result = await db.Niveis.create(body);

            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req, res) {
        const { id } = req.params
        const newBody = req.body

        try {
            await db.Niveis.update(newBody, { where: { id: Number(id) }})
            const result = await db.Niveis.findOne( { where: { id: Number(id) }})
            
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel(req, res) {
        const { id } = req.params

        try {
            await db.Niveis.destroy({ where: { id: Number(id) }})

            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController;