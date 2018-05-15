// CompanyController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Company = require('./Company');
var Category = require('../category/Category');
// CREATES A NEW COMPANY
router.post('/', (req, res) => {
  if (req.body.categoryId){
  Category.findById(req.body.categoryId, (err, cat) => {
      if (err) return res.status(500).send("There was a problem finding the category.");
      if (!cat) return res.status(404).send("No category found.");
      Company.create({
              name : req.body.name,
              category: cat._id
          },
          (err, company) => {
              if (err) return res.status(500).send("There was a problem adding the information to the database.");
              res.status(200).send(company);
          });
  });
  }
  else if (req.body.categoryName){
    Category.findOne({ 'name': { $regex : new RegExp(req.body.categoryName, "i") }}, {}, function (err, cat) {
      console.log(cat);
        if (err) return res.status(500).send("There was a problem finding the category.");
        if (!cat) return res.status(404).send("No category found.");
        Company.create({
                name : req.body.name,
                category: cat._id
            },
            (err, company) => {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(company);
            });
    });
  } else return res.status(404).send("No category found.");
});

// RETURNS ALL THE COMPANIES IN THE DATABASE
router.get('/', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).send("There was a problem finding the companies.");
        res.status(200).send(companies);
    });
});
// RETURNS ALL THE COMPANIES WITH DETERMINED CATEGORY
router.get('/category/:id', (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId;
    if (ObjectId.isValid(req.params.id) && new ObjectId(req.params.id) == req.params.id){ // If its and Mongo id
    Company.find({ 'category': req.params.id}, {}, function (err, companies) {
        if (err) return res.status(500).send("There was a problem finding the companies.");
        res.status(200).send(companies);
    });
  }
  else {
    Category.findOne({ 'name': { $regex : new RegExp(req.params.id, "i") } }, {}, function (err, cat) {
      console.log(cat);
      if (!cat) return res.status(404).send("No category found.");
      Company.find({ 'category': cat._id}, {}, function (err, companies) {
          if (err) return res.status(500).send("There was a problem finding the companies.");
          res.status(200).send(companies);
      });
    });
  }
});
// GETS A SINGLE COMPANY FROM THE DATABASE
router.get('/:id', (req, res) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(500).send("There was a problem finding the company.");
        if (!company) return res.status(404).send("No company found.");
        res.status(200).send(company);
    });
});
// DELETES A COMPANY FROM THE DATABASE
router.delete('/:id', (req, res) => {
    Company.findByIdAndRemove(req.params.id, (err, company) => {
        if (err) return res.status(500).send("There was a problem deleting the company.");
        res.status(200).send(`Company ${company.name} was deleted.`);
    });
});

// UPDATES A SINGLE COMPANY IN THE DATABASE
router.put('/:id', (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, company) => {
        if (err) return res.status(500).send("There was a problem updating the company.");
        res.status(200).send(company);
    });
});


module.exports = router;
