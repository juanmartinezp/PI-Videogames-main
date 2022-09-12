//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const {Genres} = require('./src/db.js')
const {API_KEY} = process.env
require ('dotenv').config()

async function generateGenres() {
  try {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    genres.data.results.forEach(async (e) => {
      const [createdGames, isCreated] = await Genres.findOrCreate({
        where: {
          id: e.id,
        },
        defaults: {          
          name: e.name,
          id: e.id
        }
      })
      console.log(isCreated)
    })
  } catch (error) {
    console.log(error)
  }
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    generateGenres();
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
