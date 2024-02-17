function showBox(itemName, itemDescription, itemPrice, imageSrc) {
    var overlay = document.getElementById('overlay');
    var whiteBox = document.getElementById('white-box');
    
    // Populate the white box with the details of the clicked food item
    whiteBox.innerHTML = `
        <img src="${imageSrc}" height="250" width="100%" style="margin: 0 ! important;">
        <div class="item_details">
            <div class="item_name" style = "text-align: left; font-size: 2rem;">${itemName}</div>
            <div class="item_price" style = "text-align: right; font-size: 1.5rem; margin: 5px;">$${itemPrice}</div>
            <div class="item_description" style = "text-align: left; font-size: 1rem; border-bottom: 1px solid rgb(192,192,192);">${itemDescription}</div>
        </div>
        `;

    overlay.style.display = 'flex'; 
}



document.addEventListener('click', function(event) {
    var overlay = document.getElementById('overlay');
    var whiteBox = document.getElementById('whiteBox');

    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});