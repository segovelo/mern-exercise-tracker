const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {  
  User.findById(req.params.id)  
    .then(user => res.json(user))  
    .catch(err => res.status(400).json('Error: ' + err));  
});  

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const surname = req.body.surname;
  const dob = Date.parse(req.body.dob);
  const address = req.body.address;
  const telephone = req.body.telephone;
  const email = req.body.email;

 

  const newUser = new User({
    username,
    firstname,
    surname,
    dob,
    address,
    telephone,
    email,
  });
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}); // End of router.route('/add').post(...)

router.route('/update/:id').post((req, res) => {  
  User.findById(req.params.id)  
    .then(user => {  
      user.username = req.body.username;  
      user.firstname = req.body.firstname;
      user.surname = req.body.surname;
      user.dob = Date.parse(req.body.dob);
      user.address = req.body.address;
      user.telephone = req.body.telephone;
      user.email = req.body.email;
      user.save()  
        .then(() => res.json('User updated!'))  
        .catch(err => res.status(400).json('Error: ' + err));  
    })  
    .catch(err => res.status(400).json('Error: ' + err));  
});


router.route('/delete/:id').delete((req, res) => {  
  User.findByIdAndDelete(req.params.id)  
    .then(() => res.json('User deleted.'))  
    .catch(err => res.status(400).json('Error: ' + err));  
});  

module.exports = router;