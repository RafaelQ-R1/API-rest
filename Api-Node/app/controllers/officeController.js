const Cargo = require('../models/office');

module.exports.AddCargo = async (req, res) => {
    try {
        const {
            title,
            remuneration
        } = req.body;

        if (await Cargo.findOne({
                title
            }))
            
            {
            return res.status(400).send({
                error: 'This office already exists. Try again'
            });
        }

        const cargoCriado = await Cargo.create({
            title,
            remuneration
        });


        return res.status(200).send({
            cargoCriado
        });

    } catch (err) {
        console.log(err)

        return res.status(400).send({
            error: 'Ocorreu um erro ao tentar criar o cargo'
        });
    }

}

module.exports.ReadCargo = async (req, res) => {
    try {
        const user = await Cargo.find()
        return res.status(200).send({
            user
        });
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar o usuário'
        });
    }
}


module.exports.ReadOneCargo = async (req, res) => {
    try {
        const cargo = await Cargo.findOne(req.params.id)
        return res.status(200).send({
            cargo
        });
    } catch (err) {
        return res.status(400).send({
            error: 'Não foi possível encontrar o cargo em questão'
        });
    }
}


module.exports.AlterCargo = async (req, res) => {
    const user = await cargo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    return res.json(user);
}


module.exports.DeleteCargo = async (req, res) => {
    await Cargo.findByIdAndRemove(req.params.id);
    return res.send();

}