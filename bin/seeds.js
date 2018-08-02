const usersData = [{}
  // {
  //   name: '',
  //   lastname: '',
  //   username: '',
  //   password: '',
  // }
];

const adventuresData =[{}
  // {
  //   refname: '', // user name referenced
  //   name: '',
  //   description: '',
  //   date: '',
  //   location: '',
  // }
];


const mongoose = require('mongoose');
const dbname = 'future-adventures';
mongoose.connect(`mongodb://localhost/${dbname}`);

const userCollection = require('../models/user');
userCollection.collection.drop();

userCollection.create(usersData, (err) =>{
  if(err){throw err;}
  console.log('Connection Success!');
  mongoose.connection.close();
});

const adventuresCollection = require('../models/adventure');
adventuresCollection.collection.drop();

adventuresCollection.create(adventuresData, (err) =>{
  if(err){throw err;}
  console.log('Connection Success!');
  mongoose.connection.close();
});


// module.exports = userCollection;
// module.exports = adventuresCollection;