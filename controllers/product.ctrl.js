const productModel = require('../models/product.model');

const productRead = (req, res, next) => {
    //find database object of type product and the supplied ID
    productModel.findById(req.params.id, (err, obj) => {
      if (err) return next(err);
    
      //return found object to client
      return res.status(200).json(obj).end();
    });
  };
  
  const productGetAll = (req, res, next) => {
    //find all database objects of schema type productModel
    productModel.find((err, foundObjects) => {
      if (err) return next(err);
      //return found objects to client
      return res.status(200).json(foundObjects).end();
    });
  };

const productCreate = (req, res, next) => {
    //create a new product object using the data we get from the request body (req.body)

    console.log(req.body)

  const product = new productModel({
    name: req.body.name,
    weightInGrams: req.body.weightInGrams,
    inStock: req.body.inStock
  });

  //save the object inside our mongodb
  product.save(async (err) => {
    if (err) return next(err);

    return res.status(200).json(product).end(); //return our product and status OK
  });
};

const productUpdate = async (req, res, next) => {

    //find the product model by the id parsed in the url param and update it using the data contained in the request body
    productModel.findByIdAndUpdate(req.params.id, { $set: req.body }, async (err) => {
    if (err) return next(err);

    return res
      .status(200)
      .json({ _id: req.params.id, ...req.body })
      .end();
  });
};

const productDelete = (req, res, next) => {
    productModel.findByIdAndRemove(req.params.id, async (err, result) => {
    if (err) return next(err);
    return res.status(200).json('Product removed.').end();
  });
};

module.exports = {
  productGetAll,
  productRead,
  productCreate,
  productUpdate,
  productDelete,
};