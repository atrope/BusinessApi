// CategoryController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Category = require('./Category');
// CREATES A NEW CATEGORY
router.post('/', (req, res) => {
    if (req.body.name)
    Category.create({name : req.body.name},(err, category) => {
      if (err) return res.status(500).send({"message":"There was a problem finding the category."});
            res.status(200).send(category);
        });
    else res.status(400).send({"message":"Name is required for this endpoint"});
});
// RETURNS ALL THE CATEGORIES IN THE DATABASE
router.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return res.status(500).send({"message":"There was a problem finding the categories."});
        res.status(200).send(categories);
    });
});
// GETS A SINGLE CATEGORY FROM THE DATABASE
router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if (err) return res.status(500).send({"message":"There was a problem finding the category."});
        if (!category) return res.status(404).send({"message":"No category found."});
        res.status(200).send(category);
    });
});
// DELETES A CATEGORY FROM THE DATABASE
router.delete('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => { //findByIdAndRemove not fires post middleware
        if (err) return res.status(500).send({"message":"There was a problem deleting the category."});
        if(!category) return res.status(404).send({"message":"No category found."});
        category.remove();
        res.status(204).send();
    });
});

// UPDATES A SINGLE CATEGORY IN THE DATABASE
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, category) => {
        if (err) return res.status(500).send({"message":"There was a problem updating the category."});
        res.status(200).send(category);
    });
});


module.exports = router;
