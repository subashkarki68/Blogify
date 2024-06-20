require("dotenv").config({ path: "../.env" });
const data = require("./data");
const { sub } = require("date-fns");

const mongoose = require("mongoose");
const blogController = require("../modules/blogs/blog.controller");

//Local
const user1 = "66707afa34630646b58db123";
const user2 = "66707bed34630646b58db149";

// //Remote DB
// const user1 = "66712b74bbc1483cd1ec457b";
// const user2 = "66712f40924a6acae438f63e";
console.log("Dotenv loaded:", require("dotenv").config().loaded);

const setup = {
  initialize: async () => {
    try {
      console.log("Starting Blog seeding with data:", data.length);
      console.log("writing to", process.env.DB_URL);
      await mongoose.connect(process.env.DB_URL);
      let temp = 0;
      let dateManipulate = 1;
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
        payload.createdAt = sub(Date.now(), { minutes: dateManipulate++ });
        payload.updatedAt = sub(Date.now(), { minutes: dateManipulate++ });
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
