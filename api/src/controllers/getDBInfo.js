const {Videogame, Genres} = require("../db.js")
const Sequelize = require('sequelize');
const op = Sequelize.Op;


async function getDBInfo(){
    
    try {
        const game = await Videogame.findAll({
            include: [{
                model: Genres,
                through:{
                    atributes: ["name"]
                }
            }]
        })
        let data = game.map(e =>{
            return {
                name: e.name,
                id: e.id,
                released: e.released,
                rating: e.rating,
                image: e.image,
                platforms: e.platforms.map(i => i),
                genres: e.genres?.map(i => i.name),
                createdInDB: e.createdInDB
            }}
            )
            console.log(data.lenght,'ESTOY ENTRANDO A LA BASE DE DATOS')
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = getDBInfo