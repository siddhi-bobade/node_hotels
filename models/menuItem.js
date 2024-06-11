const mongoose = require('mongoose');


//Define menuItem schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    price: {
        type: Number,
        required:true
       
    },
    is_veg: {
        type: Boolean,
        required: true
        
    },
    ingredients: {
        type: [String],
        default:[]

    },
    sales: {
        type: Number,
        default: 0
       
    }
})

// Define menuItem model
const menuItem = mongoose.model('menuItem',menuItemSchema);

module.exports = menuItem;