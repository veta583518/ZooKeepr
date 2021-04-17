const $animalForm = document.querySelector("#animal-form");

const handleAnimalFormSubmit = (event) => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = "";
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"')
    .selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  // use fetch api to POST Data
  fetch("/api/animals", {
    // specify what type of request this is so that it goes to correct endpoint
    method: "POST",
    // specify what type of data we are looking to send
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // provide the data we are sending to the body property
    body: JSON.stringify(animalObject),
  })
    // if fetch is successful return response as JSON
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // if not send error message
      alert("Error: " + response.statusText);
    })
    // console.log() postResponse and send end user confirmation of add
    .then((postResponse) => {
      console.log(postResponse);
      alert("Thank you for adding an animal");
    });
};

$animalForm.addEventListener("submit", handleAnimalFormSubmit);
