const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env
const {Videogame, Genres} = require('../db.js')





async function findID(id) {
    try {
        if(id.includes("-")) {
            let game = await Videogame.findOne({
                where: {id: id},
                include: {
                    model: Genres,
                    attributes: ["name"]
                }
            })
            console.log(game)
            let gamesDB = {
                id: game.id,
                name: game.name,
                description: game.description,
                released: game.released,
                image: game.image || 'no image',
                rating: game.rating,
                platforms: [game.platforms],
                genres: game.genres.length > 0 ? game.genres.map(e => e.name) : ['No genres available']
            }
            return gamesDB;
        }
        
        let {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        let gamesAPI = {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            released: data.released,
            image: data.background_image || 'no image',
            rating: data.rating,
            platforms: data.platforms.map(i => i.platform.name),
            genres: data.genres.length > 0 ? data.genres.map(e => e.name) : ['No genres available']
        }
        return gamesAPI
    }
    catch(error) {
        console.log(error)
    }
}




async function getByID(req, res, next) {
    try {
        const {id} = req.params;
        let game = await findID(id)
        if(!game) {
            return res.status(404).json({msg: 'Oops, we couldnt find your game'})
        }
        return res.json(game)
    }
    catch(error) {
        return next(error)
    }
}




module.exports = getByID, findID
