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
    if (err) return res.status(500).send({"message":"There was a problem finding the category."});
      if (!cat) return res.status(404).send({"message":"No category found."});
      if (req.body.name && cat._id && req.body.street && req.body.city && req.body.state && req.body.zip){
      let addr = {street: req.body.street , city: req.body.city , state: req.body.state , zip:req.body.zip};
      Company.create({name : req.body.name,category: cat._id,address: addr},(err, company) => {
              if (err) return res.status(500).send({"message":"There was a problem adding the information to the database."});
              res.status(200).send(company);
      });
    } else return res.status(400).send({"message":"Please, send all the data correctly."});
  });
  } else return res.status(404).send({"message":"No category found."});
});

// RETURNS ALL THE COMPANIES IN THE DATABASE
router.get('/', (req, res) => {
    Company.find({}, (err, companies) => {
        if (err) return res.status(500).send({"message":"There was a problem finding the companies."});
        res.status(200).send(companies);
    });
});
// RETURNS ALL THE COMPANIES WITH DETERMINED CATEGORY
router.get('/category/:id', (req, res) => {
    Company.find({ 'category': req.params.id}, {}, function (err, companies) {
        if (err) return res.status(500).send({"message":"There was a problem finding the companies."});
        res.status(200).send(companies);
    });
});
// GETS A SINGLE COMPANY FROM THE DATABASE
router.get('/:id', (req, res) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(500).send({"message":"There was a problem finding the company."});
        if (!company) return res.status(404).send({"message":"No company found."});
        res.status(200).send(company);
    });
});
// DELETES A COMPANY FROM THE DATABASE
router.delete('/:id', (req, res) => {
    Company.findByIdAndRemove(req.params.id, (err, company) => {
        if (err) return res.status(500).send({"message":"There was a problem deleting the company."});
        if (!company) return res.status(404).send({"message":"No company found."});
        res.status(200).send({"message":`Company ${company.name} was deleted.`});
    });
});

// UPDATES A SINGLE COMPANY IN THE DATABASE
router.put('/:id', (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, company) => {
        if (err) return res.status(500).send({"message":"There was a problem updating the company."});
        res.status(200).send(company);
    });
});


module.exports = router;
