const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        miPrimerAPI: 'Funciona!'
    })
});

module.exports = router;

//duda.  porque uso ruta raiz / ???