
import mongoose from 'mongoose';
import { useContext } from 'react';
import GlobalContext from '../../context/globalContext';

const connectDB = async () => {
  // const x = useContext(GlobalContext);
  // console.log(x)
  // console.log(x)
  // console.log(x)
  // console.log(x)
  // console.log(x)
  // console.log(x)
  // console.log(x)

  try {
    console.log(process.env.NEXT_PUBLIC_MONGODB_URL)
    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL!);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    // process.exit(1); // Exit process on connection failure
  }
};

export default connectDB;

