const SuperheroModel = require("../models/superhero");

const createSuperhero = async (req, res) => {
    try {
        const { superhero_name, superpowers, isAlive } = req.body;
        const newSuperhero = new SuperheroModel ({
            superhero_name,
            superpowers,
            isAlive,
        });

        const superheroSaved = await newSuperhero.save();
        res.status(201).json(superheroSaved);
    }   catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const getListSuper = async (req, res) => {
    try {
        console.log("Listar heroes");
        const supers = await SuperheroModel.find()
        res.status(200).json(supers);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`id: ${id}`);
        const superh = await SuperheroModel.findById(id);
        console.log(superh);
        res.status(200).json(superh);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const editSuper = async (req, res) => {
    try {
        const { id } = req.params;
        const { superhero_name, superpowers, isAlive } = req.body;
        const superh = await SuperheroModel.findByIdAndUpdate(
            id,
            { superhero_name, superpowers, isAlive },
        );
        res.status(200).json(superh);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

const deleteSuper = async (req, res) => {
    try {
        const { id } = req.params;
        await SuperheroModel.findByIdAndDelete(id);
        res.status(200).json({message: "Super deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message});
    }
};

module.exports = { createSuperhero, getListSuper, getById, editSuper, deleteSuper };