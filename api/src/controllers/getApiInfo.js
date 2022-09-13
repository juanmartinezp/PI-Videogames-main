const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env



async function getApiInfo(){
    try {
        let URL = `https://api.rawg.io/api/games?key=${API_KEY}&page=`
        let apiData = [];
            for(let i = 1; i < 6; i++){
                let pages = await axios.get(`${URL}${i}`)
                pages.data.results.map(e => {
                    apiData.push(
                        {
                            name: e.name,
                            id: e.id,
                            released: e.released,
                            rating: e.rating,
                            image: e.background_image,
                            platforms: e.platforms.map(i => i.platform.name),
                            genres: e.genres.map(i => i.name),
                            createdInDB: false
                        }
                    )
                    next_url = pages.data.next
                })
            }
            console.log(apiData.length, 'VIDEO JUEGOS TRAIDOS DE LA API')    
        return apiData
    }
    catch (error) {
        return next(error)
    }
}




module.exports = getApiInfo