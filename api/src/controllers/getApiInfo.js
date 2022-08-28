const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env



async function getApiInfo(){
    try {
        let URL = `https://api.rawg.io/api/games?key=${API_KEY}`
        let apiData = [];
        let next_url = URL
            for(let i = 0; i < 5; i++){
                let pages = await axios.get(next_url)
                pages.data.results.map(e => {
                    apiData.push(
                        {
                            name: e.name,
                            id: e.id,
                            released: e.released,
                            rating: e.rating,
                            image: e.background_image,
                            platforms: e.platforms.map(i => i.platform.name),
                            genres: e.genres.map(i => i.name)
                        }
                    )
                    next_url = pages.data.next
                })
            }
        console.log(apiData.length, 'VIDEO JUEGOSSSSSSSSSSSSSSSSSSSSS')    
        return apiData
    }
    catch (error) {
        return next(error)
    }
}




module.exports = getApiInfo