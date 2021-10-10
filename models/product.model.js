const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const productSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    weightInGrams: { 
		type: Number,
        default: 0
	},
    inStock: { 
		type: Boolean
	},
}
);

//cast schema into model
module.exports = mongoose.model('productModel', productSchema);