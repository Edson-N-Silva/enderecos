const express = require('express');
const router = express.Router();
const Endereco = require('../models/Endereco');

// Criar uma nova reclamação
router.post('/', async (req, res) => {
    const { rua, numero, bairro, cidade } = req.body;
    const newEndereco = new Endereco({ rua, numero, bairro, cidade });
    await newEndereco.save();
    res.json(newEndereco);
});

// Listar todas as reclamações
router.get('/', async (req, res) => {
    const enderecos = await Endereco.find();
    res.json(enderecos);
});

// Atualizar uma reclamação
router.put('/:id', async (req, res) => {
    const { rua, numero, bairro, cidade } = req.body;
    const updatedEndereco = await Endereco.findByIdAndUpdate(req.params.id, { rua, numero, bairro, cidade }, { new: true });
    res.json(updatedEndereco);
});

// Deletar uma reclamação
router.delete('/:id', async (req, res) => {
    await Endereco.findByIdAndDelete(req.params.id);
    res.json({ message: 'Endereço deletado com sucesso!' });
});

module.exports = router;
