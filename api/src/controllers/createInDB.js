const { Videogame, Genres } = require('../db.js')


// async function createGame(name, description, released, rating, platforms, genres, image) {
//     try {
//         const createGame = await Videogame.create({
//             name,
//             description,
//             released,
//             rating,
//             platforms,
//             genres,
//             image
//         })

//         const getGenres = await Genres.findAll({
//             where: { id: genres }
//         })

//         createGame.addGenres(getGenres)
//         return createGame
//     }

//     catch (error) {
//         console.log(error)
//     }
// }


// async function createInDB(req, res, next) {
//     try {
//         let {name, description, released, rating, platforms, genres, image} = req.body
//         if(!name || !description || !platforms) {
//             return res.status(404).json({msg: 'Missing data to Create your Game'})
//         }
//         let newGame = await createGame(name, description, released, rating, platforms, genres, image);
//         console.log('Game created successfully')
//         return res.json(newGame)
//     }
//     catch (error) {
//         return next(error)
//     }
// }


async function createInDB(req, res) {
    let {name, description, released, rating, platforms, image, genres} = req.body

    if (!name || !description || !genres ) {
        console.log('ESTOY ENTRANDO A CREATE')
        return res.status(404).send("Missing data to Create your Game");
    }
    //valido que el nombre del juego no exista
    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length != 0) {
        return res.send("That Name already exists");
    }

    
    //creo un videogame
    let vgCreate = await Videogame.create({
        name,
        description,
        rating:  rating ? rating : 0,
        released: released ? released : "No released date",
        image: image ? image : "https://previews.123rf.com/images/momoforsale/momoforsale2004/momoforsale200400053/144601971-no-game-sign-isolated-on-white-background-vector-illustration-.jpg",
        platforms: platforms ? platforms.toString() : "No platforms available",

    });
    //busco el genero en mi Base de datos
    let genreDb = await Genres.findAll({
        where: { name: genres },
    });

    //agrego el genero a mi videogame creado
    vgCreate.addGenre(genreDb);

    res.send("El Videogame fue creado con exito");
}


module.exports = createInDB