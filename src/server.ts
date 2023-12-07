import chalk from 'chalk';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function runDB() {
  try {
    const connection = await mongoose.connect(config.db.uri as string);
    if (connection) {
      console.log(chalk.green('Connected to MongoDB Successfully!!'));
      app.listen(config.port, () => {
        console.log(chalk.green('Server is running on port...:', config.port));
      });
    }
  } catch (err) {
    console.log(chalk.red('Error connecting to MongoDB'));
  }
}
runDB();
