const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env
const{Genres} = require('../db.js')


async function getGenres(req, res, next) {
    try {
        const allDBGenres = await Genres.findAll()
        if(allDBGenres.length === 0) {
            let {data} = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            data.results.forEach(e => {
                Genres.findOrCreate({
                    where: {
                        id: e.id,
                        name: e.name
                    }
                })
            });
            const allGenres = await Genres.findAll()
            const orderedGenres = allGenres.sort((a, b) => a.id - b.id)
            console.log(orderedGenres.length, ' GENRES FOUND or CREATED IN THE DB')
            return res.json(orderedGenres);
        }
        const orderedDBGenres = allDBGenres.sort((a, b) => a.id - b.id)
        console.log(orderedDBGenres.length, ' GENRES FOUND IN THE DB')
        return res.json(orderedDBGenres);
    }
    catch (error) {
        return next(error)
    }
}

module.exports = getGenres