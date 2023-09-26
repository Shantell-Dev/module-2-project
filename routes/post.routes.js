// routes/post.routes.js
// all imports stay untouched

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

// <form action="/post-create" method="POST">
router.post('/post-create', (req, res, next) => {
    const { location, content, safari } = req.body;
    // 'author' represents the ID of the user document
  
    Post.create({ location, content, safari })
      .then(dbPost => {
        // when the new post is created, the user needs to be found and its posts updated with the
        // ID of newly created post
        return User.findByIdAndUpdate(safari, { $push: { posts: dbPost._id } });
      })
      .then(() => res.redirect('/posts')) // if everything is fine, redirect to list of posts
      .catch(err => {
        console.log(`Err while creating the post in the DB: ${err}`);
        next(err);
      });
  });
  
  // GET route to display all the posts
  router.get('/posts', (req, res, next) => {
    Post.find()
      .then(dbPosts => {
        console.log('Posts from the DB: ', dbPosts);
      })
      .catch(err => {
        console.log(`Err while getting the posts from the DB: ${err}`);
        next(err);
      });
  });

  // GET route to display all the posts
// ****************************************************************************************
 
router.get('/posts', (req, res, next) => {
    Post.find()
      .populate('author') // --> we are saying: give me whole user object with this ID (author represents an ID in our case)
      .then(dbPosts => {
        // console.log("Posts from the DB: ", dbPosts);
        res.render('posts/list', { posts: dbPosts });
      })
      .catch(err => {
        console.log(`Err while getting the posts from the DB: ${err}`);
        next(err);
      });
  });

  // GET route for displaying the post details page
// ****************************************************************************************
 
router.get('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;
   
    Post.findById(postId)
      .populate('author')
      .then(foundPost => res.render('posts/details', foundPost))
      .catch(err => {
        console.log(`Err while getting a single post from the  DB: ${err}`);
        next(err);
      });
  });

  // GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************
 
router.get('/posts/:postId', (req, res, next) => {
    const { postId } = req.params;
   
    Post.findById(postId)
      .populate('explorer comments') // <-- the same as .populate('author).populate('comments')
      .populate({
        // we are populating author in the previously populated comments
        path: 'comments',
        populate: {
          path: 'explorer',
          model: 'User'
        }
      })
      .then(foundPost => res.render('posts/details', foundPost))
      .catch(err => {
        console.log(`Err while getting a single post from the  DB: ${err}`);
        next(err);
      });
  });
  