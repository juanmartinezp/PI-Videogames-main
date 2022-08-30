const { Router } = require('express');
const { getAllInfo } = require('../controllers/getAllInfo.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getAllInfo)



module.exports = router;
