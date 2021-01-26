'use strict';

var imagesSourceArray = ['images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg', 'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg', 'images/pet-sweep.jpg', 'images/scissors.jpg', 'images/shark.jpg', 'images/sweep.png', 'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/usb.gif', 'images/water-can.jpg', 'images/wine-glass.jpg'];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
function ProductImage(image, name){
  this.name = name;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;

  ProductImage.allImages.push(this);
}

// creates an allImages property on the ProductImage constructor.
ProductImage.allImages = [];

for (var i = 0; i < imagesSourceArray.length; i++){
  new ProductImage(imagesSourceArray[i], productNames[i]);
}
console.log(ProductImage.allImages);

var imgContainer = document.getElementById('img-container');
var leftPicImage = document.getElementById('left-pic');
var centerPicImage = document.getElementById('center-pic');
var rightPicImage = document.getElementById('right-pic');

function generateRandomProducts(){
  var leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  var rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  while (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex){
    leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    centerIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  }
  var leftProduct = ProductImage.allImages[leftIndex];
  var centerProduct = ProductImage.allImages[centerIndex];
  var rightProduct = ProductImage.allImages[rightIndex];

  return [leftProduct, rightProduct, centerProduct];
}

function renderProducts(leftProduct, centerProduct, rightProduct){
  leftPicImage.src = leftProduct.image;
  leftProduct.timesShown++;

  centerPicImage.src = centerProduct.image;
  centerProduct.timesShown++;

  rightPicImage.src = rightProduct.image;
  rightProduct.timesShown++;
}
var roundsCounter = 1;
var roundsLimit = 25;
var randomProducts = generateRandomProducts();
renderProducts(randomProducts[0], randomProducts[1], randomProducts[2]);

// external function for event listener, so i can remove the event function
function forEventListener(event){
  console.log(event.target);

  for (var i = 0; i < ProductImage.allImages.length; i++){
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked++;
      console.log(ProductImage.allImages[i]);
    }
  }
  // eslint-disable-next-line no-unused-vars
  roundsCounter++;
  console.log(roundsCounter);
  var newProducts = generateRandomProducts();
  renderProducts(newProducts[0], newProducts[1], newProducts[2]);
  if (roundsCounter === roundsLimit){
    alert('That\'s ' + roundsLimit + ' Rounds of Voting!');
    imgContainer.removeEventListener('click', forEventListener);
    displayList();
  }
}

imgContainer.addEventListener('click', forEventListener);

var resultsDiv = document.getElementById('results');
var ul = document.createElement('ul');
var h2 = document.createElement('h2');
h2.textContent = 'Results';

function displayList(){
  resultsDiv.appendChild(h2);
  resultsDiv.appendChild(ul);
  for (var i = 0; i < ProductImage.allImages.length; i++){
    var li = document.createElement('li');
    li.textContent = (ProductImage.allImages[i].name + ' was shown ' + ProductImage.allImages[i].timesShown + ' times, and was clicked on ' + ProductImage.allImages[i].timesClicked + ' times.');
    ul.appendChild(li);
  }
}

// var resultsButton = document.createElement('button')

