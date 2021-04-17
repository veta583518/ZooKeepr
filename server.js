const fs = require("fs");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));
const { animals } = require("./data/animals.json");

// function to query animalsArray by personality traits, diet, name, and/or species
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array.
    // If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach((trait) => {
      // Check the trait against each animal in the filteredResults array.
      // Remember, it is initialy a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one
      // of the trairs when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

// function to return specific animal object
function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

// function to create new animal, push animal to animalsArray, create data and add it to the catalog
function createNewAnimal(body, animalsArray) {
  // our function's main code will go here!
  const animal = body;

  animalsArray.push(animal);

  // write to animal.json file in the data subdirectory
  fs.writeFileSync(
    // use path.join() to join the value of the directory of the file we will execute the code in with the path to the json file
    path.join(__dirname, "./data/animals.json"),

    // save the js array as JSON; non edited and with whitespace for easy readability
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  // return finished code to post route for response
  return animal;
}

// add validation to make sure new animal data exists and also is the right type of data
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== "string") {
    return false;
  }
  if (!animal.species || typeof animal.species !== "string") {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== "string") {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

app.get("/api/animals", (req, res) => {
  let results = animals;

  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);

  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.post("/api/animals", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/animals", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/animals.html"));
});

app.get("/zookeepers", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
