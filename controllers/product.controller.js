const Product = require('../models/product.model');
const path = require('path');

exports.home = function(req, res) {
    res.render('home', {});
};

exports.list = function(req, res) {
    Product.find({}, function(err, users) {
        res.render('list', {users: users});
    });
};

exports.product_create = function(req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function(err) {
        if (err) {
            return err;
        }
        res.send({message: 'Product Created successfully'});
    });
};

exports.product_details = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) return err;
        res.send(product);
    });
};

exports.product_update = function(req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, product) {
        if (err) return err;
        res.send({message: 'Product udpated.'});
    });
};

exports.product_delete = function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) return err;
        res.send({message: 'Deleted successfully!'});
    });
};
