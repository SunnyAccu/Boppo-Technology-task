require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connect');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`the server is running at ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
