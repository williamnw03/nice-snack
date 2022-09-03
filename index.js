// Tombol menu
const menuButton = document.querySelector("div.menu-button");
const navbarMenu = document.querySelector("nav.navbar-menu");

menuButton.addEventListener("click", e => navbarMenu.classList.toggle("muncul"));

// Carousel
const carouselAllPlay = () => {
    const tempImg = document.querySelector("img.temp-img");
    const mainImg = document.querySelector("img.main-img");
    const buttonCarousel = document.querySelectorAll(".button-carousel");

    let carouselInterval;
    let countCarousel = 1;
    const totalImg = 3;
    const duration = 700;
    
    const carouselSwitch = (plus = true) => {
        plus ? countCarousel++ : countCarousel--;
        if(countCarousel > totalImg) countCarousel = 1
    
        if(countCarousel < 1) countCarousel = totalImg
    
        tempImg.classList.add("carousel-muncul");
        tempImg.setAttribute("src", `./img_carousel/carousel_${countCarousel}.jpg`);
        
        // Dissolve
        setTimeout(() => {
            if(countCarousel > totalImg) countCarousel = 1;
            tempImg.setAttribute("src", `./img_carousel/kosong.png`);
            mainImg.setAttribute("src", `./img_carousel/carousel_${countCarousel}.jpg`);
            tempImg.classList.remove("carousel-muncul");
        }, duration)
    }
    
    // How long it stay
    const carouselPlay = () => carouselInterval = setInterval(() => carouselSwitch(), 3000)
    
    carouselPlay();
    
    const manualCarouselCheck = (select) => {
        if(tempImg.classList.contains("carousel-muncul")) return false
                
        tempImg.classList.remove("carousel-muncul");
    
        clearInterval(carouselInterval);
    
        carouselSwitch(select)
    
        carouselPlay()
    }
    
    buttonCarousel.forEach(e => {
    
        e.addEventListener("click", ev => {
            if(countCarousel > totalImg || countCarousel < 1) return false
    
            if(e.classList.contains("button-right")) manualCarouselCheck(true);
    
            if(e.classList.contains("button-left")) manualCarouselCheck(false);
        })
    })
}

carouselAllPlay();

// Animation
const pictures = document.querySelectorAll("div.animasi-atas");

const observe = new IntersectionObserver(entries => {
    entries.forEach(e => {
        e.target.classList.toggle("muncul-dari-atas", e.isIntersecting)

        if(e.isIntersecting) observe.unobserve(e.target)
        
    })
}, {threshold: 0.3})

pictures.forEach(e => {
    observe.observe(e)
})

