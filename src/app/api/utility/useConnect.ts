// lib/useConnect.js
import { useEffect, useState } from 'react';
import connectDB from './connectDB';
import dbConnect from './dbConnect';

const useConnect = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connect = async () => {
      // await connectDB();
      dbConnect();
      setIsConnected(true);
      console.log("xxxxxxxxxxxxxxxxxxx")
    };

    connect();
  }, []);

  return isConnected;
};

export default useConnect;
