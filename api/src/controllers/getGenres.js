const axios = require('axios')
require('dotenv').config();
const {API_KEY} = process.env
const{Genres} = require('../db.js')


async function getGenres(req, res, next) {
    try {
        const allDBGenres = await Genres.findAll()
        const orderedDBGenres = allDBGenres.sort((a, b) => a.id - b.id)
        console.log(orderedDBGenres.length, ' GENRES FOUND IN THE DB')
        return res.json(orderedDBGenres);
    }
    catch (error) {
        return next(error)
    }
}

module.exports = getGenres