const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random100 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60356bd2f2d4d068ec05d8b0',
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
           // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random100].longitude,
                cities[random100].latitude,
            ]
          },
            images:[
                {
                url: 'https://res.cloudinary.com/djjde1wxp/image/upload/v1614200245/YelpCamp/hosqgz7qowelascn9gep.png',
                  filename: 'YelpCamp/hosqgz7qowelascn9gep'
                },
                {
                  url: 'https://res.cloudinary.com/djjde1wxp/image/upload/v1614200248/YelpCamp/ia3exb8abaipqb1jw6nc.png',
                  filename: 'YelpCamp/ia3exb8abaipqb1jw6nc'
                },
                {
                  url: 'https://res.cloudinary.com/djjde1wxp/image/upload/v1614200265/YelpCamp/rtsvnqoo5rhr77ou1bf9.png',
                  filename: 'YelpCamp/rtsvnqoo5rhr77ou1bf9'
                },
                {
                  url: 'https://res.cloudinary.com/djjde1wxp/image/upload/v1614200267/YelpCamp/ynhrbtftr0qb7o4ktzwf.png',
                  filename: 'YelpCamp/ynhrbtftr0qb7o4ktzwf'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
}) 