const { Videogame, Genres } = require('../db.js')


async function createGame(name, description, released, rating, platforms, genres, image) {
    try {
        const createGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            genres,
            image
        })

        const getGenres = await Genres.findAll({
            where: { id: genres }
        })

        createGame.addGenres(getGenres)
        return createGame
    }

    catch (error) {
        console.log(error)
    }
}


async function createInDB(req, res, next) {
    try {
        let {name, description, released, rating, platforms, genres, image} = req.body
        if(!name || !description || !platforms) {
            return res.status(404).json({msg: 'Missing data to Create your Game'})
        }
        let newGame = await createGame(name, description, released, rating, platforms, genres, image);
        return res.json(newGame, 'Your Game was successfully created in the DB')
    }
    catch (error) {
        return next(error)
    }
}


module.exports = createInDB