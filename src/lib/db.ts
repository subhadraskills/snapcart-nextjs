// import mongoose from "mongoose";

// const mongodbUrl=process.env.MONGODB_URL

// if(!mongodbUrl){
//     throw new Error("db error")
// }


// let cached=global.mongoose
// if(!cached){
//     cached=global.mongoose={conn:null, promise:null}
// }

// const connectDb=async ()=>{
//     if(cached.conn){
//         return cached.conn
//     }
//     if(!cached.promise){
//         cached.promise= mongoose.connect(mongodbUrl).then((conn) => conn.connection)

//     }


//     try{
//         const conn=await cached.promise
//         return conn

//     }

//     catch (error){
//         console.log(error)

//     }

// }
// export default connectDb;


// import mongoose from "mongoose";

// const mongodbUrl = process.env.MONGODB_URL// change only if needed

// if(!mongodbUrl){
//     throw new Error("db error")
// }

// let cached = global.mongoose
// if(!cached){
//     cached = global.mongoose = {conn:null, promise:null}
// }

// const connectDb = async () => {
//     if(cached.conn){
//         return cached.conn
//     }
//     if(!cached.promise){
//         cached.promise = mongoose.connect(mongodbUrl).then((conn) => conn.connection)
//     }

//     try{
//         const conn = await cached.promise
//         cached.conn = conn  // add this line to cache connection
//         return conn
//     }
//     catch (error){
//         console.log(error)
//         throw error  // minimal fix
//     }
// }


// export default connectDb;




// src/lib/mongoose.ts
import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined");
}

// TypeScript ke liye global cache declare karna
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async (): Promise<mongoose.Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUrl).then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
    const conn = await cached.promise;
    cached.conn = conn; // cache the connection
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDb;