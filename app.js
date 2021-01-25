'use strict';

var imagesSourceArray = ['images/bag.jpg', 'images/banana.jpg', 'images/bathroom.jpg', 'images/boots.jpg', 'images/breakfast.jpg', 'images/bubblegum.jpg', 'images/chair.jpg', 'images/cthulhu.jpg', 'images/dog-duck.jpg', 'images/dragon.jpg', 'images/pen.jpg', 'images/pet-sweep.jpg', 'images/scissors.jpg', 'images/shark.jpg', 'images/sweep.png', 'images/tauntaun.jpg', 'images/unicorn.jpg', 'images/usb.gif', 'images/water-can.jpg', 'images/wine-glass.jpg'];

function ProductImage(image){
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = image;

  ProductImage.allImages.push(this);
}

// creates an allImages property on the ProductImage constructor.
ProductImage.allImages = [];

for (var i = 0; i < imagesSourceArray.length; i++){
  new ProductImage(imagesSourceArray[i]);
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



imgContainer.addEventListener('click', function (event){
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
    imgContainer.addEventListener('click', function(event){
      alert('That\'s ' + roundsLimit + ' Rounds of Voting!');
      event.stopPropagation();
      return event.stopPropagation();
    });
  }
});


