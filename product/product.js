// Tombol menu
const menuButton = document.querySelector("div.menu-button");
const navbarMenu = document.querySelector("nav.navbar-menu");

menuButton.addEventListener("click", e => navbarMenu.classList.toggle("muncul"));

// Open/Close card
const cardOpenClose = () => {
    const openCard = document.querySelectorAll("div.each-list-products > div div.info-detail");
    
    const closeCard = document.querySelectorAll("div.each-list-products > div div.information div.close-info");
    
    openCard.forEach(e => {
    
        e.addEventListener("click", ev => {
            e.nextElementSibling.classList.add("info-open");
        })
    
    })
    
    closeCard.forEach(e => {
    
        e.addEventListener("click", ev => {
            e.parentElement.classList.remove("info-open");
        })
    
    })
}



// Search and Filter
const searchAndFilter = () => {

    const searching = document.querySelector("div.search-filter-section div.search input")
    const selectFilter = document.querySelector("div.search-filter-section div.filter select");
    
    const allProduct = document.querySelectorAll("div.each-list-products > div.product");
    const snacks = document.querySelector("div.snacks-div");
    const drinks = document.querySelector("div.drinks-div");

    const snacksAll = snacks.querySelectorAll("div.list-snacks > div").length;
    const drinksAll = drinks.querySelectorAll("div.list-drinks > div").length;
    
    selectFilter.addEventListener("input", ev => {
        
        const valueSelect = ev.target.value;
    
        if(valueSelect === "all"){
            snacks.style.display = "block";
            drinks.style.display = "block";
        } else if(valueSelect === "snack") {
            snacks.style.display = "block";
            drinks.style.display = "none";
        } else {
            snacks.style.display = "none";
            drinks.style.display = "block";
        }
    
    })

    searching.addEventListener("input", ev => {

        const searchValue = ev.target.value.toLowerCase();
        const valueSelect = selectFilter.value;

        const allProductFiltering = () => {
            let countSnack = 0;
            let countDrinks = 0;

            
            allProduct.forEach(e => {
                const productName = e.children[3].firstElementChild.textContent.toLowerCase();
                
                if(productName.includes(searchValue)) {
                    e.style.display = "block";
                    e.classList.add("animasi-munculCard");
                    e.classList.remove("animasi-hilangCard");
                    setTimeout(() => {
                        e.style.display = "block";
                    }, 500)
                } else {
                    e.classList.add("animasi-hilangCard");
                    setTimeout(() => {
                        e.style.display = "none";
                    }, 500)
                    e.classList.remove("animasi-munculCard");
                    e.classList.contains("snacks") ? countSnack++ : countDrinks++
                }
            })

            if(countSnack == snacksAll) {
                const h3 = document.createElement("h3");
                const text = document.createTextNode("NOT FOUND");
                h3.append(text);

                if(!snacks.children[2]) snacks.append(h3);
            } else {
                if(snacks.children[2]) snacks.children[2].remove()
            }

            if(countDrinks == drinksAll) {
                const h3 = document.createElement("h3");
                const text = document.createTextNode("NOT FOUND");
                h3.append(text);

                if(!drinks.children[2]) drinks.append(h3);
            } else {
                if(drinks.children[2]) drinks.children[2].remove();
            }
        }

        if(valueSelect === "all"){
            snacks.style.display = "block";
            drinks.style.display = "block";

            allProductFiltering()

        } else if(valueSelect === "snack"){
            snacks.style.display = "block";
            drinks.style.display = "none";

            allProductFiltering()
        } else {
            snacks.style.display = "none";
            drinks.style.display = "block";

            allProductFiltering()
        }


    })

}

const fetchProduct = async () => {
    const response = await fetch("./product.json");
    const datas = await response.json();

    const snackContainer = document.querySelector("div.list-snacks");
    const drinksContainer = document.querySelector("div.list-drinks");

    const snacks = document.querySelector("div.snacks-div");
    const drinks = document.querySelector("div.drinks-div");

    let totalSnack = 0;
    let totalDrinks = 0;

    datas.forEach((data, i) => {
        if(data.type == "snack") {
            totalSnack++
            const cardElement = 
            `<div class="product snacks snack-${i+1}">
    
                <div class="info-detail">
                    <i class="fa-solid fa-circle-info"></i>
                </div>

                <div class="information">
                    <div class="close-info">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <h2>${data.name}</h2>
                    <p>${data.description}</p>
                </div>

                <div class="image-product">
                    <img src="./img_product/snack/${data.image}">
                </div>

                <div class="name-product">
                    <h2>${data.name}</h2>
                </div>

            </div>`

            snackContainer.innerHTML += cardElement;
        } 
    })

    datas.forEach((data, i) => {
        if(data.type == "drinks") {
            totalDrinks++
           const cardElement = 
           `<div class="product drinks drinks-${i+1}">
       
               <div class="info-detail">
                   <i class="fa-solid fa-circle-info"></i>
               </div>

               <div class="information">
                   <div class="close-info">
                       <i class="fa-solid fa-xmark"></i>
                   </div>
                   <h2>${data.name}</h2>
                   <p>${data.description}</p>
               </div>

               <div class="image-product">
                   <img src="./img_product/drinks/${data.image}">
               </div>

               <div class="name-product">
                   <h2>${data.name}</h2>
               </div>

           </div>`

           drinksContainer.innerHTML += cardElement;
       }
    })

    if(totalSnack == 0) {
        const h3 = document.createElement("h3");
        const text = document.createTextNode("NOT FOUND");
        h3.append(text);

        if(!snacks.children[2]) snacks.append(h3);
    } else {
        if(snacks.children[2]) snacks.children[2].remove()
    }

    if(totalDrinks == 0) {
        const h3 = document.createElement("h3");
        const text = document.createTextNode("NOT FOUND");
        h3.append(text);

        if(!drinks.children[2]) drinks.append(h3);
    } else {
        if(drinks.children[2]) drinks.children[2].remove();
    }

    searchAndFilter();
    cardOpenClose();
}

fetchProduct()






