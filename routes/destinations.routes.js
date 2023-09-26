

const router = require('express').Router();
const Destinations = require('../models/Destination.model.js');

// GET route to retrieve and display all the destinations
router.get('/destinations', (req, res, next) => {
    Destinations.find()
      .then(allTheDestinationsFromDB => {
        console.log('Retrieved destinations from DB:', allTheDestinationsFromDB);
   
        res.render('destinations/destinations-list.hbs');
      })
      .catch(error => {
        console.log('Error while getting the destinations from the DB: ', error);
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });
  router.get('/destinations/:destinationsId', (req, res) =>{
    const { destinationsId } = req.params;

    Book.findById(bookId)
    .then(theBook => res.render('books/book-details.hbs', { book: theBook }))
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
      next(error);
    });
});

//GET route to create
router.get('/destinations/create', (req, res) => res.render('destinationss/destinations-create.hbs'));
router.post('/dsetinations/create', (req, res, next) => {
  // console.log(req.body);
  const { location, safari, description, rating } = req.body;
 
  Destinations.create({ location, safari, description, rating })
    // .then(destinationsFromDB => console.log(`New destiantion created: ${destinationFromDB.title}.`))
    .then(() => res.redirect('/destinations'))
    .catch(error => next(error));
});

// GET route to display the form to update a specific book
router.get('/destinations/:destinationsId/edit', (req, res, next) => {
  const { destinationsId } = req.params;
 
  Destinations.findById(destinationsId)
    .then(destinationsToEdit => {
      console.log(destinationsToEdit);
    })
    .catch(error => next(error));
});
router.post('/destinations/:destinationId/edit', (req, res, next) => {
  const { destinationId } = req.params;
  const { location, description, safari, rating } = req.body;
 
  Destinations.findByIdAndUpdate(destinationId, { location, description, safari, rating }, { new: true })
    .then(updateddestinations => res.redirect(`/destinations/${updateddestination.id}`)) // go to the details page to see the updates
    .catch(error => next(error));
});

router.post('/destinations/:destinationId/delete', (req, res, next) => {
  const { destinationsId } = req.params;
 
  Destinations.findByIdAndDelete(destinationsId)
    .then(() => res.redirect('/destinations'))
    .catch(error => next(error));
});
 
module.exports = router;

