const getApiInfo = require('./getApiInfo')
const getDBInfo = require('./getDBInfo')
const axios = require('axios')
const {API_KEY} = process.env
const {Videogame, Genres} = require("../db.js")
const Sequelize = require('sequelize');
const op = Sequelize.Op


async function searchByNameDB(name) {
    const games = await Videogame.findAll({
        where: {
            name:{
                [op.iLike]: `%${name}%`
            }
        },
        include: [{
            model: Genres,
            atributes: ["name"]
        }]
    })
    console.log('ESTOY MOSTRANDO searchByNameDB')
    let DBName = games.map(e =>{
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
    return DBName;
}

async function searchByNameApi(name) {
    let {data} = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
    let apiData = []
    data.results.map(e => {
        apiData.push(
            {
                name: e.name,
                id: e.id,
                released: e.released,
                rating: e.rating,
                image: e.background_image || "https://cdn.drawception.com/drawings/fhrR1T1nq6.png",
                platforms: e.platforms.map(i => i.platform.name),
                genres: e.genres.length > 0 ? e.genres.map(i => i.name) : ["Not info available"],
            }
            )
        })
        console.log('ESTOY MOSTRANDO searchByNameApi')
        if(apiData.length > 15){
            return apiData.slice(0, 15)
        }
    return apiData
}




async function getAllInfo(req, res, next){
    try {
        const name = req.query.name
        if(!name){
            let data = await getApiInfo()
            let myData = await getDBInfo()
            if(!myData || myData.length === 0){
                if(!data || data.length === 0){
                    return res.status(404).json({msg: "Oops, something went wrong"})  //si llego aca es que no encontre nada en la DB ni en la Api
                }
                console.log('ENTREEEEEEEEE A getAllInfo NO NAME')       
                return res.json(data)  //si llego aca es que no encontro nada en la DB pero si en la Api
            }
            let totalData = data.concat(myData)
            return res.json(totalData)   //aca traigo toda la info de la Api + la DB
        }
        let data = await searchByNameApi(name)
            let myData = await searchByNameDB(name)
            if(!myData || myData.length === 0){
                if(!data || data.length === 0){
                    return res.status(404).json({msg: "Oops, this game does not exist"})
                }
                let totalData = [...myData, ...data]
                let totalDataSlice = totalData.slice(0, 15)
                console.log(totalDataSlice.length, 'ENTREEEEEEEEE A getAllInfo CON NAME') 
                return res.json(totalDataSlice)
            }
    } catch (error) {
            return next(error)
    }
}



    module.exports = {getAllInfo}