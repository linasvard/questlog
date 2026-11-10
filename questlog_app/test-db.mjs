import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
} finally {
  await mongoose.connection.close();
  console.log('Disconnected from MongoDB');
}
