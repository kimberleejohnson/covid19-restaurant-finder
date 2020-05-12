const fs = require("fs");

// Return all restaurants
function getRestaurants() {
  return new Promise((resolve, reject) => {
    fs.readFile("restaurant_data.json", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

// Get all restaurants within a zip code
async function getRestaurant(zip) {
  const data = await getRestaurants();

  // Otherwise, filter through all restaurants, finding ones with given zip
  const zipRestaurants = data.Restaurants.filter(
    (restaurant) => restaurant.Zip_Code == zip
  );

  // And return the name and phone number of each
  return zipRestaurants.map(
    (restaurant) => `${restaurant.Name}: ${restaurant.Phone}\n\n`
  );
}

module.exports = {
  getRestaurants,
  getRestaurant,
};
