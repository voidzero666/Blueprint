const router = require('express').Router();

const productController = require('../controllers/product.ctrl');

//Create route (HTTP POST /api/product/)
router.post('/product/', productController.productCreate);

//READ BY ID route (HTTP GET /api/product/{productID})
router.get('/product/:id', productController.productRead);

//READ ALL route (HTTP GET /api/product/)
router.get('/product/', productController.productGetAll);

//UPDATE route (HTTP PUT /api/product/{productID})
router.put('/product/:id', productController.productUpdate);

//DELETE route (HTTP PUT /api/product/{productID})
router.delete('/product/:id', productController.productDelete);

//Catch all endpoints that could not be found
router.use('*', (req, res) =>
  res.status(404).json({ message: 'Endpoint Not found' }).end()
);

module.exports = router;