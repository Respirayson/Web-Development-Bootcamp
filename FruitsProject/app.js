const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {

    await mongoose.connect("mongodb://localhost:27017/fruitsDB");

    const fruitSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "No name given"]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });

    const Fruit = mongoose.model("Fruit", fruitSchema);

    const dragonfruit = new Fruit({
        name: "Dragonfruit",
        rating: 4,
        review: "Pink"
    });

    const mango = new Fruit({
        name: "Mango",
        rating: 4,
        review: "Yellow"
    });

    mango.save()

    const peopleSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema
    })

    const People = mongoose.model("People", peopleSchema);

    const people = new People({
        name: "Taeri",
        age: 25,
        favouriteFruit: dragonfruit
    })

    // people.save()

    const grape = new Fruit({
        name: "Grape",
        rating: 5,
        review: "Sweet"
    });

    // Fruit.insertMany([banana, grape], (err) => {
    //     if (err) {console.log(err)} else {console.log("Successfully added")};
    // })

    Fruit.find((err, fruits) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(fruits);

            // mongoose.connection.close();

            fruits.forEach((fruit) => {
                console.log(fruit.name);
            })
        }
    })

    // People.updateOne({name: "John"}, {favouriteFruit: mango}, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         mongoose.connection.close();

    //         console.log("Successfully updated");
    //     }
    // })

    // Fruit.deleteOne({name: "Pear"}, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {

    //         mongoose.connection.close();
    //         console.log("Successfully deleted");
    //     }
    // })
}

