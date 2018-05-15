// CategoryController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Category = require('./Category');
// CREATES A NEW CATEGORY
router.post('/', (req, res) => {
    Category.create({
            name : req.body.name,
        },
        (err, category) => {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(category);
        });
});
// RETURNS ALL THE CATEGORIES IN THE DATABASE
router.get('/', (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return res.status(500).send("There was a problem finding the categories.");
        res.status(200).send(categories);
    });
});
// GETS A SINGLE CATEGORY FROM THE DATABASE
router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, category) => {
        if (err) return res.status(500).send("There was a problem finding the category.");
        if (!category) return res.status(404).send("No category found.");
        res.status(200).send(category);
    });
});
// DELETES A CATEGORY FROM THE DATABASE
router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, category) => {
        if (err) return res.status(500).send("There was a problem deleting the category.");
        res.status(200).send(`Category ${category.name} was deleted.`);
    });
});

// UPDATES A SINGLE CATEGORY IN THE DATABASE
router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, category) => {
        if (err) return res.status(500).send("There was a problem updating the category.");
        res.status(200).send(category);
    });
});


module.exports = router;
