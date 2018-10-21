const express = require('express')
const fs = require('fs');
const app = express();
const db = JSON.parse(fs.readFileSync('../db/data.json'))
app.use(express.json())

module.exports.create = function(req, res) {
    let newCar = {
      id: req.body.id,
      brand: req.body.brand,
      model: req.body.model,
      engineVolume: req.body.engineVolume,
      year: req.body.year
    };
    const foundCar = db.find(car => {
       return (newCar.id === car.id) || (newCar.brand === car.brand && newCar.model === car.model && newCar.engineVolume === car.engineVolume && newCar.year === car.year)
    })
    console.log(foundCar)
    if(foundCar) {
      res.status(409).json({ "message": "Car already exists." });
    } else {
      db.push(newCar);
      res.status(201).send(newCar);
    }
};
module.exports.getAll = function(req, res) {
    res.status(200)
    res.send(db)
};

module.exports.getById = function(req, res) {
    let car = db.find(car => car.id === parseInt(req.params.id)) 
    if(!car) {
      res.status(404).send('Car with this id not found')
    } else {
      res.status(200)
      res.send(car)
    }
};

module.exports.updateById = function(req, res) {
    let index = null;
    let car = db.find((car, key) => {
        if(car.id === parseInt(req.params.id)) {
            index = key;
            return true;
        } else {
            return false;
        }
    }) 
    if(!car) {
      res.status(404).send('Car with this id not found')
    } else {
      car.brand = req.body.brand,
      car.model = req.body.model,
      car.engineVolume = req.body.engineVolume,
      car.year = req.body.year
      db[index] = car
      res.status(200).send(car)
    }
};
module.exports.deleteById = function(req, res) {
    let index = null;
    db.forEach((car, key) => {
        if(car.id === parseInt(req.params.id)){
            index = key
        }
    });
    if (typeof index === 'number') {
        
      db.splice(index, 1);
      res.status(200).send({'message': 'The car has been successfully removed'});
    } else {
      res.status(404).send({'message':'Car with such id has not been found'});
    }
  };