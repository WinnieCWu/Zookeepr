const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//use filterByQuery method to set specific parameters to get one specific obj
router.get('/animals', (req, res) => {
    // get all animals
   let results = animals;
   if (req.query) {
       results = filterByQuery(req.query, results);
   }
    res.json(results);
  });

//use findById() allows for more routes
//this id route only works if all id values are unique
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id,animals);
    // let results = animals;
    // if (req.query){
    //     results = filterByQuery(req.query, results);
    // }
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    //req.body = property where our incoming content will be
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file and animals array in this fxn
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;
