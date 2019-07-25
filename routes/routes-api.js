const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        miPrimerAPI: 'Funciona!'
    })
});

router.get('/Funcion1', (req, res) => {
    res.json({
        miPrimerAPI: 'Funcion 1 funciona! '
    })
});


module.exports = router;