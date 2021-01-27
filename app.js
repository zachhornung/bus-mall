'use strict';
//Global Variables Go Below
var imagesSourceArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var imgContainer = document.getElementById('img-container');
var leftPicImage = document.getElementById('left-pic');
var centerPicImage = document.getElementById('center-pic');
var rightPicImage = document.getElementById('right-pic');
var roundsCounter = 0;
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
ProductImage.allImages = []; // creates an allImages property on the ProductImage constructor.

for (var i = 0; i < imagesSourceArray.length; i++){ //this makes an object for each position in the image source array on line 3
  new ProductImage(imagesSourceArray[i]);
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
function forEventListener(event){ //this checks to see which image was clicked, and  then incriments the times clicked for that object by 1. it then increases the current voting round by 1, and generates new images. if the current voting round is the last voting round, it alerts the user, removes the event listener, and displays the results button to see the results.
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
    button.textContent = 'Results';
    resultsDiv.appendChild(button);
  }
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Times Shown',
        data: timesProductsAreShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
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

imgContainer.addEventListener('click', forEventListener);

button.addEventListener('click', function (){ //this adds an event listener to the button that will display both the list and the chart when clicked.
  displayList();
  displayChart();
});

