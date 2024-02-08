function showBox(itemName, itemDescription, itemPrice, imageSrc) {
    var overlay = document.getElementById('overlay');
    var whiteBox = document.getElementById('white-box');

    // Populate the white box with the details of the clicked food item
    whiteBox.innerHTML = `
        <img src="${imageSrc}" height="250" width="100%" style="margin: 0 ! important;">
        <div class="item_details">
            <div class="item_name" style="text-align: left; font-size: 2rem;">${itemName}</div>
            <div class="item_description" style="text-align: left; font-size: 1rem; border-bottom: 1px solid rgb(192,192,192);">${itemDescription}</div>
            <!-- Quantity input and buttons -->
            <div class="quantity-controls" style = "margin-top: 25px;">
                <button class="minus" style = "background-color: #007bff;">-</button>
                <input type="number" class="quantity" value="1" min="1">
                <button class="plus" style = "background-color: #007bff;">+</button>
            </div>
        </div>
        <button class="add-to-cart" data-name="${itemName}" data-price="${itemPrice}" style="font-size: .75rem;">
            Add to Cart
            <div class="item_price" style="display: inline-block; text-align: right; font-size: .75rem; margin: 5px;">$${itemPrice}</div>
        </button>
    `;
    overlay.style.display = 'flex';

    // Prevent event propagation to the overlay when white-box is clicked
    whiteBox.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Event listener to handle clicks on the overlay to close it
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Event listener for the 'Add to Cart' button
    whiteBox.querySelector('.add-to-cart').addEventListener('click', function(event) {
        var itemName = event.target.getAttribute('data-name');
        var itemPrice = event.target.getAttribute('data-price');
        var quantityInput = whiteBox.querySelector('.quantity'); // Define quantityInput here
        var quantity = parseInt(quantityInput.value);
        addToCart(itemName, itemPrice, quantity);
    });

    // Define quantityInput, minusButton, and plusButton here
    var quantityInput = whiteBox.querySelector('.quantity');
    var minusButton = whiteBox.querySelector('.minus');
    var plusButton = whiteBox.querySelector('.plus');

    minusButton.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    plusButton.addEventListener('click', function() {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
}


document.addEventListener('click', function(event) {
    var overlay = document.getElementById('overlay');
    var whiteBox = document.getElementById('white-box');

    // Check if the click event target is the overlay itself (outside the white box)
    if (event.target === overlay) {
        overlay.style.display = 'none'; // Close the overlay
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with the class 'food_item'
    var foodItems = document.querySelectorAll('.food_item');
    
    // Iterate over each 'food_item' element
    foodItems.forEach(function(foodItem) {
        // Attach click event listener to each 'food_item' element
        foodItem.addEventListener('click', function(event) {
            // Check if the clicked element has the class 'add-to-cart'
            if (event.target.classList.contains('add-to-cart')) {
                // Retrieve data attributes from the clicked element
                var itemName = event.target.getAttribute('data-name');
                var itemPrice = event.target.getAttribute('data-price');

                // Call addToCart function with retrieved values
                addToCart(itemName, itemPrice);
            }
        });
    });
});


var cart = []; // Changed from cost to cart
var total = 0;

function addToCart(name, price, quantity, event) {
    // Check if price is a valid string representing a number
    if (!isNaN(parseFloat(price))) {
        // Convert price to a number
        price = parseFloat(price);
        console.log('Actual price:', price);

        // Add item to cart
        for (var i = 0; i < quantity; i++) {
            cart.push({ name: name, price: price });
            total += price;
        }
        updateCartDisplay();
        viewCart();
    } else {
        console.error('Invalid price:', price + '');
        console.error('Invalid name:', name);
    }
}

function removeFromCart(name, price) {
    // Find the index of the item to remove
    var index = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name && cart[i].price === price) {
            index = i;
            break;
        }
    }
    // If item found, remove it from the cart
    if (index !== -1) {
        var removedQuantity = cart[index].quantity || 1; // Default to 1 if quantity not defined
        total -= price * removedQuantity; // Update the total based on the removed item's price and quantity
        cart.splice(index, 1);
        updateCartDisplay();
    } else {
        console.error('Item not found in the cart:', name, price);
    }
}

function updateCartDisplay() {
    var cartItemsElement = document.getElementById('cart-items');
    var cartTotalElement = document.getElementById('cart-total');
    
    // Clear existing content
    cartItemsElement.innerHTML = '';

    // Object to keep track of item quantities
    var itemQuantities = {};

    // Iterate through the cart
    cart.forEach(function (item) {
        // If the item is encountered for the first time, initialize the quantity to 1
        if (!itemQuantities[item.name]) {
            itemQuantities[item.name] = 1;
        } else {
            // If the item has been encountered before, increment the quantity
            itemQuantities[item.name]++;
        }
    });

    // Iterate through the itemQuantities object to display items and their quantities
    for (var itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            var itemQuantity = itemQuantities[itemName];

            // Create a paragraph element for the item and its quantity
            var itemParagraph = document.createElement('p');
            var itemPrice = cart.find(item => item.name === itemName).price;
            itemParagraph.textContent = `${itemName}: $${(itemPrice * itemQuantity).toFixed(2)} (x${itemQuantity})`;

            // Create a remove button for the item
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                removeFromCart(itemName, itemPrice);
            });

            // Append the remove button to the paragraph element
            itemParagraph.appendChild(removeButton);

            // Append the item and its quantity to the cart items element
            cartItemsElement.appendChild(itemParagraph);
        }
    }

    cartTotalElement.textContent = '$' + total.toFixed(2);
}


 // Function to display the cart overlay
 function viewCart() {
    var cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.style.display = 'block'; // Show the cart overlay
}

// Function to close the cart overlay
function closeCart() {
    var cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.style.display = 'none'; // Hide the cart overlay
}

// Add event listener to the "View Cart" button
document.getElementById('view-cart-button').addEventListener('click', function() {
    viewCart(); // Call the viewCart function when the button is clicked
});