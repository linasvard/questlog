import mongoose from 'mongoose';

let connection: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
  if (connection) {
    console.log('Connecting to database...');
    connection = mongoose
      .connect(process.env.MONGODB_URL as string)
      .then((mongoose) => {
        console.log('Connected to database');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to database:', error);
        connection = null;
        throw error;
      });
  }
  return connection;
};
