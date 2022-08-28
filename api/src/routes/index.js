const { Router } = require('express');
const { videogames} = require('../controllers/getAllInfo.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', videogames)


module.exports = router;
