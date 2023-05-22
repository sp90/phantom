import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

if (!process.versions?.['bun']) {
  dotenv.config();
}

const dbUrl = process.env['MONGODB_URL'];

if (!dbUrl) {
  throw new Error('MONGODB_URL is missing');
}

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);

export default mongoose;
