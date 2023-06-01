const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model");

    // create Schema (pattern documents will follow)
   // const pizzaSchema = new Schema({title: String});

    // create Model
    //const Pizza = mongoose.model("Pizza", pizzaSchema);


mongoose.connect("mongodb://127.0.0.1:27017/loopeyRestaurant")
    .then((response) => {
    console.log(
        `Connected to Mongo! Database Name: "${response.connections[0].name}"`
      );

    const pizzaOne = {
        title: "margarita",
        price: 12,
        dough: "classic"
     };

     //create a new document (a new pizza)
     return Pizza.create(pizzaOne);


    })
    .then( (pizzafromDB) => {
        console.log("a new pizza was created with id...", pizzafromDB._id);
        return Pizza.find({title: "margarita"})
    })
    .then((pizzasArr) =>{
        console.log("I currently have this amount of pizzas...", pizzasArr.length);
        console.log(pizzasArr);


        //Model.findByIdAndUpdate(id, update [, options])
        // return Pizza.findByIdAndUpdate("64789de53c9bf30504b1845d", {dough: "with garlic"}, {returnDocument: 'after'})

        return Pizza.updateMany({price: {$gt: 12} }, {dough: "with garlic"});


    })
    .then( (result) => {
        console.log("your pizzas were updated....")
        console.log(result)
    })
    .catch((err) => console.error("Error connecting to Mongo", err));