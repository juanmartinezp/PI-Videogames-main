const { Videogame, Genres } = require('../db.js')



async function createInDB(req, res) {
    let {name, description, released, rating, platforms, image, genres, createdInDB} = req.body

    if (!name || !description || !genres ) {
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
        createdInDB,

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