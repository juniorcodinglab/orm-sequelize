const db = require('../models');

class PessoaController {

    static async getAllPessoas(req, res) {
        try {
            const pessoasResult = await db.Pessoas.findAll();
            return res.status(200).json(pessoasResult);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async getPessoaById(req, res) {

        const { id } = req.params;

        try {
            const pessoaResult = await db.Pessoas.findOne({ where: { id: Number(id) } } );

            return res.status(200).json(pessoaResult);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async createNewPessoa(req, res) {

        const { body } = req;

        try {
            const pessoaResult = await db.Pessoas.create(body);

            return res.status(200).json(pessoaResult);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async updatePessoa(req, res) {

        const { id } = req.params
        const newPessoa = req.body

        try {
            await db.Pessoas.update(newPessoa, { where: { id: Number(id) }})
            const pessoaAtualizada = await db.Pessoas.findOne( { where: { id: Number(id) }})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletePessoa(req, res) {
        const { id } = req.params

        try {
            await db.Pessoas.destroy({ where: { id: Number(id) }})
            return res.status(200).json({ mensagem: `id ${id} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            const resultMatricula = await db.Matriculas.findOne({ where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)  
            }});

            return res.status(200).json(resultMatricula);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async createMatricula(req, res) {

        const { estudanteId } = req.params;
        const newMatricula = { ...req.body, estudante_id: Number(estudanteId) }

        try {
            const result = await db.Matriculas.create(newMatricula);
            return res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async updateMatricula(req, res) {

        const { estudanteId, matriculaId } = req.params
        const { body } = req;

        try {
            await db.Matriculas.update(body, {where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }})

            const result = await db.Matriculas.findOne( { where: { id: Number(matriculaId) }})
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await db.Matriculas.destroy({ where: { id: Number(matriculaId) }})
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;