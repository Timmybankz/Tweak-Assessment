const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PW}@cluster0-qhysx.mongodb.net/pangaea?retryWrites=true&w=majority` ,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          }
        )
        .then(res => {
            console.log('Mongoose DB Connection successful');
        })
        .catch(err => {
            console.log('Mongoose DB connectionn failed', err);
        });
}