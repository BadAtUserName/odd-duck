'use strict';

// Global********** //
let votingRounds = 25;
let productArray = [];

//DOM Windows********//
let imageContainer = document.getElementById('image-container');
let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');
let showResultsButton = document.getElementById('show-results-button');
let resultsList = document.getElementById('results-container');

let ctx = document.getElementById('product-chart');

//Constructor Function*****//
function Product (name, imageExtension = 'jpg'){ // imageExtension makes it possible to not write whole file name
  this.name = name;
  this.image = `images/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// Helper Functions / Utilities********//
    //generate random index numbers
function randomIndexGenerator () {
  return Math.floor(Math.random() * productArray.length);
}

//two unique rounds of images
let imagesToShow = []; //stores index we are using
let priorImagesShown = [];

function renderImages( ) {

  //change length of index to hold whatever
  while(imagesToShow.length < 3 ){ // less than the lenght of product name array? or less than 6? will need to change something else? how many images do you need for 25 rounds? 
    let chosenIndex = randomIndexGenerator();
    if (!imagesToShow.includes(chosenIndex) || !priorImagesShown.includes(chosenIndex)){
      imagesToShow.push(chosenIndex);
    }
  }

  priorImagesShown = [];
  priorImagesShown.concat(imagesToShow);
  
  let imageOneIndex = imagesToShow.pop();
  let imageTwoIndex = imagesToShow.pop();
  let imageThreeIndex = imagesToShow.pop();

  // 3 random images on page #### 2 random images currently
  //let imageOneIndex = randomIndexGenerator();
  //let imageTwoIndex = randomIndexGenerator();
  //let imageThreeIndex = randomIndexGenerator();

//TODO make sure they are unique
  while(imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex) {
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

//images and title match the index
  imageOne.src = productArray[imageOneIndex].image;
  imageOne.title = productArray[imageOneIndex].name;

  imageTwo.src = productArray[imageTwoIndex].image;
  imageTwo.title = productArray[imageTwoIndex].name;

  imageThree.src = productArray[imageThreeIndex].image;
  imageTwo.title = productArray[imageThreeIndex].name;

  //TODO increase item views
  productArray[imageOneIndex].views++;
  productArray[imageTwoIndex].views++;
  productArray[imageThreeIndex].views++;
}

function renderChart(){
  let productNames = [];
  let productViews = [];
  let numberOfVotes = [];
  
  for(let i = 0; i < productArray.length; i++){
    productNames.push(productArray[i].name); // drill into goat array and grab name
    productViews.push(productArray[i].views);
    numberOfVotes.push(productArray[i].votes);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [ {
        label: 'Number of Views',
        data: productViews,
        borderWidth: 5,
        backgroundColor: 'dark blue',
        borderColor: 'dark blue'
      },
      {
        label: 'Number of Votes',
        data: numberOfVotes,
        borderWidth: 5,
        backgroundColor: 'light blue',
        borderColor: 'light grey'
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, chartObj);
}
// Event Handlers********//
function handleImageClick(event) {
// todo identify the image that was clcked 
  let imageClicked = event.target.title;

//todo increase the vote on that image'
  for (let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
      //todo decrement voting rounds
      votingRounds--;
      //generate new images
      renderImages();
    }
  }
  // todo once voting is  done remove avail to click
  if (votingRounds === 0) {
    imageContainer.removeEventListener('click', handleImageClick);
  }
}
//************************************EWWWWW REVIST THIS */
function handleShowResults(){
  if(votingRounds === 0) {
    renderChart();
    showResultsButton.removeEventListener('click', handleShowResults);
  }
}
//Executable Code
//in executable code make products
let sweep = new Product ('sweep', 'png');
let bag = new Product ('bag');
let banana = new Product ('banana');
let bathroom = new Product ('bathroom');
let boots = new Product ('boots');
let breakfast = new Product ('breakfast');
let bubblegum = new Product ('bubblegum');
let chair = new Product ('chair');
let cthulhu = new Product ('cthulhu');
let dogDuck = new Product ('dog-duck');
let dragon = new Product ('dragon');
let pen = new Product ('pen');
let petSweep = new Product ('pet-sweep');
let scissors = new Product ('scissors');
let shark = new Product ('shark');
let tauntaun = new Product ('tauntaun');
let unicorn = new Product ('unicorn');
let waterCan = new Product ('water-can');
let wineGlass = new Product ('wine-glass');



productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

renderImages();
imageContainer.addEventListener('click', handleImageClick);
showResultsButton.addEventListener('click', handleShowResults);
