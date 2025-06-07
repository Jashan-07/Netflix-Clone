// const container = document.querySelector('.scroller');

// // Clone all children and append clones to container.
// container.innerHTML += container.innerHTML;

// // When scroll reaches halfway, reset scrollLeft back by half scrollWidth.
// container.addEventListener('scroll', () => 
// {
//     if (container.scrollLeft >= container.scrollWidth / 2) 
//     {

//         console.log(container.scrollLeft, container.scrollWidth);
//         container.scrollLeft -= container.scrollWidth / 2;
//     }
// });

// ADD NAVBAR BACKGROUND-COLOR DURING SCROLL.
let navbardiv = document.querySelector(".navbar-div");

window.addEventListener("scroll", () => {

    if(window.scrollY === 0)
    {
        navbardiv.classList.remove("bg-gradient-color-scroll");
    }
    else
    {
        navbardiv.classList.add("bg-gradient-color-scroll");
    }
})

// ADD SEARCH INPUT BOX.
let search = document.querySelector(".fa-search");
let searchdiv = document.querySelector(".search-div");

let inputsearch = document.createElement("input");
inputsearch.type = "text";
inputsearch.className = "search-input border-2 border-black rounded-lg text-white bg-black w-50 placeholder:text-white px-3 focus:outline-none text-base";
inputsearch.placeholder = "Search Movie...";

search.addEventListener("click", () => {
    let existinginput = searchdiv.querySelector("input");
    if(!existinginput)
    {
        searchdiv.prepend(inputsearch);
        localStorage.setItem("inputbox", "true");
    }
    else
    {
        existinginput.remove();
        localStorage.setItem("inputbox", "false");
    }
})

// Store inputsearch in localstorage.
window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem("inputbox") === "true")
    {
        searchdiv.prepend(inputsearch);
    }
    else
    {
        let existinginput = searchdiv.querySelector("input");
        if(existinginput)
        {
            existinginput.remove();
        }
    }
})

// Input Box Search Cards.
let moviecard = document.querySelectorAll(".movie-card");
let movieheading = document.querySelectorAll(".movie-heading");

let searchheading = document.createElement("h2");
searchheading.className = "text-white text-2xl font-bold px-20 py-3 font-inter mt-8";
searchheading.innerText = "Best Searches";
let maindiv = document.querySelector(".main-div");
let main = document.querySelector(".main");
let removescroll = document.querySelectorAll(".remove-scroll");

inputsearch.addEventListener("input", () => {
    let inputsearchvalue = inputsearch.value.toLowerCase().replace(/\s+/g, "");;
    let searchheadingvisible = false;
    
    moviecard.forEach((card) => {
        let image = card.querySelector("img");
        let imagevalue = image.getAttribute("value").toLowerCase().replace(/\s+/g, "");
        
        if(imagevalue.includes(inputsearchvalue))
        {
            movieheading.forEach((movie) => {
                movie.style.display = "none";
            });
            card.style.display = "block";
            searchheadingvisible = true;
        }
        else
        {
            card.style.display = "none";
        }
    })

    if(searchheadingvisible == true)
    {
        removescroll.forEach((rmscroll) => {
            rmscroll.classList.remove("overflow-x-auto", "pl-17");
        });
        main.before(searchheading);
        main.classList.add("flex", "flex-nowrap", "pl-17", "overflow-x-auto", "py-3", "scrollbar-hide");
    }
    else
    {
        searchheading.remove();
    }

    if (inputsearchvalue === "") {
        moviecard.forEach(card => {
            card.style.display = "block";
        });
        movieheading.forEach(movie => {
            movie.style.display = "block";
        });
        removescroll.forEach(rmscroll => {
            rmscroll.classList.add("overflow-x-auto", "pl-17");
        });
        main.classList.remove("flex", "flex-nowrap", "pl-17", "overflow-x-auto", "py-3", "scrollbar-hide");
        searchheading.remove();
    }
})

// Footer Last Label Line.
document.getElementById("year").textContent = new Date().getFullYear();