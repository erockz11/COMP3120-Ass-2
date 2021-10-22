
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');



dbConnect = async () => {
  const mongoServer = await MongoMemoryServer.create() ;
  const uri = mongoServer.getUri();
  console.log("my uri is:")
  console.log(uri)

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  await mongoose.connect(uri, mongooseOpts);
  console.log("did we connect?")
};

dbDisconnect = async () => {
  console.log("disconnecting")
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports = {
    dbConnect,
    dbDisconnect
}