module.exports = (app) => {
    const names = require('../controllers/app.controller.js');

    // Create a new Name
    app.post('/names', names.create);

    // Retrieve all Names
    app.get('/names', names.findAll);

    // Retrieve a single Name with id
    app.get('/names/:id', names.findOne);

    // Update a Name with id
    app.put('/names/:id', names.update);

    // Delete a Name with id
    app.delete('/names/:id', names.delete);
}