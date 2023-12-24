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

function renderImages( ) {
  // 3 random images on page #### 2 random images currently
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

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
    for (let i = 0; i < productArray.length; i++) {
      let productListItem = document.createElement('li');
      productListItem.textContent = `${productArray[i].name} - Votes ${productArray[i].views}`;
      resultsList.appendChild(productListItem);
    }
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
