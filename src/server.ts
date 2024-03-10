import chalk from 'chalk';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import logger from './services/Logger/logger';

async function runDB() {
  try {
    const connection = await mongoose.connect(config.db.uri as string);
    if (connection) {
      logger.loggerInfo.info(chalk.green('Connected to MongoDB Successfully!!'));
      app.listen(config.port, () => {
        logger.loggerInfo.info(chalk.green('Server is running on port...:', config.port));
      });
    }
  } catch (err) {
    logger.loggerError.error(chalk.red('Error connecting to MongoDB'));
  }
}
runDB();
