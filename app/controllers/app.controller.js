const Name = require('../models/app.model.js');

// Create and Save a new Name
exports.create = (req, res) => {

    // Create a Name
    const name = new Name({
        firstName: req.body.firstName, 
        middleName: req.body.middleName,
        lastName: req.body.lastName
    });

    // Save Name in the database
    name.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating name."
        });
    });
};

// Retrieve and return all names from the database.
exports.findAll = (req, res) => {
    Name.find()
    .then(names => {
        res.send(names);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving names."
        });
    });
};

// Find a single name with an id
exports.findOne = (req, res) => {
    Name.findById(req.params.id)
    .then(name => {
        if(!name) {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });            
        }
        res.send(name);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving name with id " + req.params.id
        });
    });
};

// Update a name identified by the id in the request
exports.update = (req, res) => {

    // Find name and update it with the request body
    Name.findByIdAndUpdate(req.params.id, {
        ...(req.body.firstName ? {firstName: req.body.firstName} : {}),
        ...(req.body.middleName ? {middleName: req.body.middleName} : {}),
        ...(req.body.lastName ? {lastName: req.body.lastName} : {})
    }, {new: true, useFindAndModify: false})
    .then(name => {
        if(!name) {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });
        }
        res.send(name);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating name with id " + req.params.id
        });
    });
};

// Delete a name with the specified id in the request
exports.delete = (req, res) => {
    Name.findByIdAndRemove(req.params.id, {useFindAndModify: false})
    .then(name => {
        if(!name) {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });
        }
        res.send({message: "Name deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Name not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete name with id " + req.params.id
        });
    });
};
