import mongoose from "mongoose";

// Function to connect to the database
export default function connectToDB() {
  mongoose.connect("mongodb+srv://dasi254844:0583254844@cluster0.glvtz.mongodb.net/grocery_management1")
    .then(data => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("Connection error: " + err.message);
      process.exit(1);
    })
}
