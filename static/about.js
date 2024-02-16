const slideshowImages_q = document.querySelectorAll('.bio_image');
let currentImageIndex_q = 0;

const slideshowImages_aya = document.querySelectorAll('.aya_image');
let currentImageIndex_aya = 0;

const slideshowImages_richie = document.querySelectorAll('.richie_image');
let currentImageIndex_richie = 0;

slideshowImages_q.forEach(image => {
    image.style.display = 'block';
});

slideshowImages_aya.forEach(image => {
    image.style.display = 'block';
});

slideshowImages_richie.forEach(image => {
    image.style.display = 'block';
});

setTimeout(() => {
    changeImage_q();
}, 1000);

function changeImage_q() {
    slideshowImages_q.forEach(image => {
        image.style.display = 'none';
    });

    slideshowImages_q[currentImageIndex_q].style.display = 'block';

    let slideshowDelay = 1000;

    currentImageIndex_q = (currentImageIndex_q + 1) % slideshowImages_q.length;

    setTimeout(changeImage_aya, slideshowDelay); // Call changeImage_aya after one second
}

function changeImage_aya() {
    slideshowImages_aya.forEach(image => {
        image.style.display = 'none';
    });

    slideshowImages_aya[currentImageIndex_aya].style.display = 'block';

    let slideshowDelay = 1000;

    currentImageIndex_aya = (currentImageIndex_aya + 1) % slideshowImages_aya.length;

    setTimeout(changeImage_richie, slideshowDelay); // Call changeImage_richie after one second
}

function changeImage_richie() {
    slideshowImages_richie.forEach(image => {
        image.style.display = 'none';
    });

    slideshowImages_richie[currentImageIndex_richie].style.display = 'block';

    let slideshowDelay = 1000;

    currentImageIndex_richie = (currentImageIndex_richie + 1) % slideshowImages_richie.length;

    setTimeout(changeImage_q, slideshowDelay); // Call changeImage_q after one second
}
