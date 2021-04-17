const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals");
const { animals } = require("../data/animals.json");
const fs = require("fs");

jest.mock("fs");

test("filter by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "ominvore",
      personalityTraits: ["quirky", "rash"],
    },

    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];
  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);
  expect(updatedAnimals.length).toEqual(1);
});

test("find by id ", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "ominvore",
      personalityTraits: ["quirky", "rash"],
    },

    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];
  const results = findById("3", startingAnimals);
  expect(results.name).toBe("Erica");
  expect(results.species).toBe("gorilla");
});

test("creates animal object ", () => {
  const animal = createNewAnimal(
    { name: "Darlene", id: "jhgdja3ng2" },
    animals
  );
  expect(animal.name).toBe("Darlene");
  expect(animal.id).toBe("jhgdja3ng2");
});

test("validates animal", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };
  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };
  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
