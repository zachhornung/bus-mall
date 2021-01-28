'use strict';
//Global Variables Go Below
var imagesSourceArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgContainer = document.getElementById('img-container');
var leftPicImage = document.getElementById('left-pic');
var centerPicImage = document.getElementById('center-pic');
var rightPicImage = document.getElementById('right-pic');
var roundsCounter = fetchRoundsCount() || 0;
var roundsLimit = 25;
var listLocation = document.getElementById('list-here');
var resultsDiv = document.getElementById('results'); //this is for when the max number of rounds is reached, a button will appear that will show results if you click on it
var ul = document.createElement('ul');
var h2 = document.createElement('h2');
h2.textContent = 'Results';
var button = document.getElementById('button');

function ProductImage(name){ //this is the object constructor
  this.name = name.substring(0, name.length - 4);
  this.timesClicked = 0;
  this.timesShown = 0;
  this.image = `images/${name}`;
  ProductImage.allImages.push(this);
}
ProductImage.allImages = fetchProductData() || []; // creates an allImages property on the ProductImage constructor. its value is the product data stored in local memory, or an empty array if there is nothing stored in memory.

if (roundsCounter === 0){
  for (var i = 0; i < imagesSourceArray.length; i++){ //this makes an object for each position in the image source array on line 3
    new ProductImage(imagesSourceArray[i]);
  }
}
function generateRandomProducts(){ //this generates a random number that ranges from 0 to however many index positions are in the product list. it then uses that number to select a random product form the array.
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
function renderProducts(){ //this renders the products to the screen with the condition that they were not displayed in the previous round of voting. it keeps track of how many times something is shown also
  var currentlyRenderedProducts = [leftPicImage.name, centerPicImage.name, rightPicImage.name];
  var newImages = generateRandomProducts();
  while (
    currentlyRenderedProducts[0] === newImages[0].name ||
    currentlyRenderedProducts[1] === newImages[0].name ||
    currentlyRenderedProducts[2] === newImages[0].name ||
    currentlyRenderedProducts[0] === newImages[1].name ||
    currentlyRenderedProducts[1] === newImages[1].name ||
    currentlyRenderedProducts[2] === newImages[1].name ||
    currentlyRenderedProducts[0] === newImages[2].name ||
    currentlyRenderedProducts[1] === newImages[2].name ||
    currentlyRenderedProducts[2] === newImages[2].name
  ){
    newImages = generateRandomProducts();
  }
  leftPicImage.src = newImages[0].image;
  leftPicImage.name = newImages[0].name;
  newImages[0].timesShown++;
  centerPicImage.src = newImages[1].image;
  centerPicImage.name = newImages[1].name;
  newImages[1].timesShown++;
  rightPicImage.src = newImages[2].image;
  rightPicImage.name = newImages[2].name;
  newImages[2].timesShown++;
}
function storeProductData(){//stores all objects states in local storage as a string
  var stringObject = JSON.stringify(ProductImage.allImages);
  localStorage.setItem('products', stringObject);
}
function fetchProductData(){//converts all objects (which are stored as one long string) back into actual objects.
  var reObjectify = localStorage.getItem('products');
  var productsFromStorage = JSON.parse(reObjectify);
  return productsFromStorage;
}
function storeRoundsCount(){//stores the number of voting rounds that have happened in local memory.
  var storeRoundsCount = roundsCounter;
  localStorage.setItem('rounds counter', storeRoundsCount);
}
function fetchRoundsCount(){//returns the stored rounds count from local memory.
  var storedRoundsCount = parseInt(localStorage.getItem('rounds counter'));
  return storedRoundsCount;
}
function forButtonClick(){// this is for the results button, when it is clicked it will display the results of the voting, and then remove the event listener from the button.
  displayList();
  displayChart();
  button.removeEventListener('click', forButtonClick);
}
function forImgClick(event){//this is the event listener for the actual voting (when an image is clicked). it checks to make sure the rounds limit hasnt been met, and then finds the image that was clicked and adds a counter to it. it incriments to the next round, stores the current round in local memory, generates new products, and stores the data of those products in local memory.
  event.preventDefault();
  if (roundsCounter === roundsLimit || fetchRoundsCount() >= roundsLimit){
    alert('That\'s ' + roundsLimit + ' Rounds of Voting!');
    imgContainer.removeEventListener('click', forImgClick);
    button.textContent = 'Results';
    resultsDiv.appendChild(button);
    return;
  }
  for (var i = 0; i < ProductImage.allImages.length; i++){
    if (event.target.src.includes(ProductImage.allImages[i].image)){
      ProductImage.allImages[i].timesClicked++;
      console.log(ProductImage.allImages[i]);
    }
  }
  // eslint-disable-next-line no-unused-vars
  roundsCounter++;
  storeRoundsCount();
  console.log(roundsCounter);
  console.log(fetchRoundsCount());
  var newProducts = generateRandomProducts();
  renderProducts(newProducts[0], newProducts[1], newProducts[2]);
  storeProductData();
}
function displayList(){ //this creates a list that includes every item in the product catalog, showing the name of the item, how many times it was shown, and how many times it was clicked on.
  listLocation.appendChild(h2);
  h2.appendChild(ul);
  for (var i = 0; i < ProductImage.allImages.length; i++){
    var li = document.createElement('li');
    li.textContent = (ProductImage.allImages[i].name + ' was shown ' + ProductImage.allImages[i].timesShown + ' times, and was clicked on ' + ProductImage.allImages[i].timesClicked + ' times.');
    ul.appendChild(li);
  }
}
function displayChart(){ //this displays a chart that shows each item in the catalog, how many times it was shown, and how many times it was clicked on.
  var ctx = document.getElementById('myChart').getContext('2d');
  var votesByProduct = [];
  var timesProductsAreShown = [];
  var names = [];

  for (var j = 0; j < ProductImage.allImages.length; j++){
    votesByProduct.push(ProductImage.allImages[j].timesClicked);
    timesProductsAreShown.push(ProductImage.allImages[j].timesShown);
    names.push(ProductImage.allImages[j].name);
  }

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names, // array of strings goes here
      datasets: [{
        label: 'times clicked',
        data: votesByProduct, // array of numbers goes here
        // data: votesByProduct,
        backgroundColor: new Array(20).fill('rgba(1, 200, 32, 0.2)'),
        borderColor: new Array(20).fill('rgba(1, 99, 32, 1)'),
        borderWidth: 1
      },
      {
        label: 'Times Shown',
        data: timesProductsAreShown,
        backgroundColor: new Array(20).fill('rgba(255, 200, 132, 0.2)'),
        borderColor: new Array(20).fill('rgba(255, 99, 132, 1)'),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
var randomProducts = generateRandomProducts();
renderProducts(randomProducts[0], randomProducts[1], randomProducts[2]);

imgContainer.addEventListener('click', forImgClick);

if (roundsCounter === roundsLimit){
  button.addEventListener('click', forButtonClick);
}
