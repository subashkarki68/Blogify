require("dotenv").config();
const data = require("./data");

const mongoose = require("mongoose");
const blogController = require("../modules/blogs/blog.controller");

const user1 = "660d92ea59336b069313f02b";
const user2 = "660dc638eaaf9ca27382613a";

const setup = {
  initialize: async () => {
    try {
      console.log("Starting Blog seeding with data:", data.length);
      await mongoose.connect(process.env.DB_URL);
      let temp = 0;
      for (let i = 0; i < data.length; i++) {
        if (temp === 100) {
          temp = 0;
        } else {
          temp++;
        }
        console.log("Seeding", data[i]);
        const payload = data[i];
        payload.status = "published";
        payload.author = i < Math.floor(data.length / 2) ? user1 : user2; // Assign users
        payload.pictureUrl = `https://cdn.dummyjson.com/product-images/${temp}/thumbnail.jpg`;
        await blogController.create(payload);
        console.log("Seeding completed");
      }
      process.exit(1);
    } catch (error) {
      console.log(error);
    }
  },
};
setup.initialize();
