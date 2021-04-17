const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("creates a new Zookeeper", () => {
  const zookeeper = createNewZookeeper(
    {
      name: "Veronica",
      age: 32,
    },
    zookeepers
  );
  expect(zookeeper.name).toBe("Veronica");
  expect(zookeeper.age).toBe(32);
});

test("Filters by query ", () => {
  const startingZookeepers = [
    {
      id: "0",
      name: "Kim",
      age: 28,
      favoriteAnimal: "dolphin",
    },

    {
      id: "1",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
  ];
  const updatedZookeeper = filterByQuery({ name: "Kim" }, startingZookeepers);
  expect(updatedZookeeper.length).toEqual(1);
});

test("Find by ID", () => {
  const startingZookeepers = [
    {
      id: "0",
      name: "Kim",
      age: 28,
      favoriteAnimal: "dolphin",
    },

    {
      id: "1",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
  ];
  const result = findById("1", startingZookeepers);
  expect(result.name).toBe("Raksha");
  expect(result.favoriteAnimal).toBe("penguin");
});

test("validates zookeeper", () => {
  const zookeeper = {
    id: "0",
    name: "Kim",
    age: 28,
    favoriteAnimal: "dolphin",
  };
  const invalidZookeeper = {
    id: "0",
    name: "Kim",
    age: 28,
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
