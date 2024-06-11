const mongoose = require('mongoose');

//Define person schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ['waiter', 'chef', 'manager'],
        required: true
    },
    age: {
        type: Number
       
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    address: {
        type: String,
        required: true
       
    },
    salary: {
        type: Number,
        required: true
       
    }

})

//Define person model
const Person = mongoose.model('Person',personSchema);

module.exports = Person;