const { Router } = require('express');
const getAllInfo  = require('../controllers/getAllInfo.js');
const getByID = require('../controllers/getByID.js');
const getGenres = require('../controllers/getGenres.js');
const createInDB = require('../controllers/createInDB.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getAllInfo)
router.get('videogames/:id', getByID)
router.get('/genres', getGenres)
router.post('/videogames', createInDB)



module.exports = router;
