const imageContainer = document.getElementById("image-conatiner");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'tdJmdo0XwlxZqcfU1d6BSmNrwwPbHaUab7Zi0XXYsKc';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// laoding images
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true
    }
};


function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
//Create elemnts for links and photos and add to the dom
function displayPhotos(){
    totalImages =photosArray.length;
    console.log('totale images', totalImages);
    photosArray.forEach((photo)=>{
    //create a tag
    const item = document.createElement('a');
    setAttributes(item,{
        href: photo.links.html,
        target: '_blank'
    });
    //create img tag
    const img = document.createElement('img');
    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description
    })
    // creating even listener for loading images
    img.addEventListener('load', imageLoaded);
    //put img tag inside a tag then put them inside image-container
    item.appendChild(img);
    imageContainer.appendChild(item);
});
};

async function getPhotoes (){
    try{
        const res =  await fetch(apiUrl);
        photosArray = await res.json();
        displayPhotos();
    }catch(err){
        console.log("woops something went wrong", err)
    }
}
getPhotoes();

// add thr scrolling function
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    ready = false;
    getPhotoes();
})
