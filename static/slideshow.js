const slideshowImages = document.querySelectorAll('.slideshow_image');
let currentImageIndex = 0;

function changeImage() {
    slideshowImages.forEach(image => {
        image.style.display = 'none';
    });

    slideshowImages[currentImageIndex].style.display = 'block';
    
    let slideshowDelay = (currentImageIndex == 0 || currentImageIndex == 8) ? 2000 : 500;

    currentImageIndex = (currentImageIndex+1) % slideshowImages.length;

    setTimeout(changeImage, slideshowDelay);
}

changeImage(); // Initially show the first image