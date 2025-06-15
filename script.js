// Page Reload.
window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0);
})

// Page load to Top when click Profile Netflix Image Link.
window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Add Search Input Box for Medium Screen.
let search = document.querySelector(".fa-search");
let searchdiv = document.querySelector(".search-div");

let inputsearchmd = document.createElement("input");
inputsearchmd.type = "text"; 
inputsearchmd.className = "border-1 border-black rounded-lg text-white bg-black w-22 md:w-33 lg:w-50 xl:w-60 placeholder:text-white placeholder:font-inter placeholder:text-sm xl:placeholder:text-base px-3 py-0.5 xl:py-1 focus:outline-none text-base";

// Handle Placeholder for Small and Medium Screen.
function updatePlaceholder()
{
    if(window.innerWidth <= 426)
    {
        inputsearchmd.placeholder = "Search...";
    }
    else
    {
        inputsearchmd.placeholder = "Search Movies..."
    }
}

updatePlaceholder();
window.addEventListener("resize", updatePlaceholder);

// Add Navbar Background-color during scroll.
let navbardiv = document.querySelector(".navbar-div");

window.addEventListener("scroll", () => {
    if(window.scrollY === 0)
    {
        navbardiv.classList.remove("bg-gradient-color-scroll");
        inputsearchmd.classList.remove("border-white", "bg-white", "placeholder:text-black", "text-black");
        inputsearchmd.classList.add("border-black", "bg-black", "placeholder:text-white", "text-white");
    }
    else
    {
        navbardiv.classList.add("bg-gradient-color-scroll");
        inputsearchmd.classList.add("border-white", "bg-white", "placeholder:text-black", "text-black");
        inputsearchmd.classList.remove("border-black", "bg-black", "placeholder:text-white", "text-white");
    }
})

// Handle Input Search for Small and Medium Screen.
function HandleInputSearch() 
{
    if(window.innerWidth < 425)
    {
        inputsearchmd.classList.add("hidden");
    }
    else
    {
        inputsearchmd.classList.remove("hidden");
    }
}

HandleInputSearch();
window.addEventListener("resize", HandleInputSearch);

// Add Search Input Box.
search.addEventListener("click", () => {
    let existinginput = searchdiv.querySelector("input");
    if(!existinginput)
    {
        searchdiv.prepend(inputsearchmd);
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
    let existinginput = searchdiv.querySelector("input");
    if(localStorage.getItem("inputbox") === "true")
    {
        searchdiv.prepend(inputsearchmd);
    }
    else
    {
        if(existinginput)
        {
            existinginput.remove();
        }
    }
})

// Input Box Search Cards.
window.addEventListener('DOMContentLoaded', () => {
    let moviecard = document.querySelectorAll(".movie-card");
    let movieheading = document.querySelectorAll(".movie-heading");
    let searchheading = document.createElement("h2");
    searchheading.className = "text-white text-xl md:text-2xl font-bold px-3 py-3 font-inter mt-8";
    searchheading.innerText = "Best Searches";
    let main = document.querySelector(".main");
    let removescroll = document.querySelectorAll(".remove-scroll");

    let heroimage = document.querySelector(".Hero-Img");
    let movienotfound = document.createElement("div");
    movienotfound.className = "font-inter py-25 px-10 text-sm md:text-base md:px-38 md:py-40 lg:text-lg lg:px-65 lg:py-55 xl:text-xl xl:px-110";
    movienotfound.innerHTML = `
        <p class="pb-2">Your search for "" did not have any matches.</p>
        <p class="pb-2">Suggestions:</p>
        <ul class="list-disc list-inside pl-6">
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie, TV show title, an actor or director</li>
            <li>Try a genre, like comedy, romance, sports, or drama</li>
        </ul>
    `;

    inputsearchmd.addEventListener("input", () => {
        let inputsearchvalue = inputsearchmd.value.toLowerCase().replace(/\s+/g, "");
        let searchheadingvisible = false;
        let matchFound = false;
        
        moviecard.forEach((card) => {
            let image = card.querySelector("img");
            let imagevalue = image.getAttribute("data-title").toLowerCase().replace(/\s+/g, "");
            
            if(imagevalue.includes(inputsearchvalue))
            {
                movieheading.forEach((movie) => {
                    movie.style.display = "none";
                });
                card.style.display = "block";
                searchheadingvisible = true;
                matchFound = true;
                movienotfound.classList.add("hidden");
                heroimage.classList.remove("hidden","md:hidden");
            }
            else
            {
                card.style.display = "none";
            }
        })

        if(searchheadingvisible == true)
        {
            removescroll.forEach((rmscroll) => {
                rmscroll.classList.remove("overflow-x-auto");
            });
            main.before(searchheading);
            main.classList.add("flex", "overflow-x-auto", "scrollbar-hide");
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
                rmscroll.classList.add("overflow-x-auto");
            });
            main.classList.remove("flex", "overflow-x-auto", "scrollbar-hide");
            searchheading.remove();
            heroimage.classList.remove("hidden","md:hidden");
            movienotfound.classList.add("hidden");
        }
        
        if(!matchFound)
        {
            moviecard.forEach(card => {
                card.style.display = "none";
            });
            movieheading.forEach(movie => {
                movie.style.display = "none";
            });
            searchheading.remove();
            heroimage.classList.add("hidden","md:hidden");
            movienotfound.classList.remove("hidden");
            main.prepend(movienotfound);
            movienotfound.innerHTML = `
                <p class="pb-2">Your search for <span class='font-bold'>"${inputsearchvalue}"</span> did not have any matches.</p>
                <p class="pb-2">Suggestions:</p>
                <ul class="list-disc list-inside pl-6">
                    <li>Try different keywords</li>
                    <li>Looking for a movie or TV show?</li>
                    <li>Try using a movie, TV show title, an actor or director</li>
                    <li>Try a genre, like comedy, romance, sports, or drama</li>
                </ul>
            `;
        }
    })

    // Handle Search Visibility and MovieNotFound According to Pixels.
    function HandleSearchIconVisibility() {
        let searchvisibility = document.querySelector(".search-visibility");
        let screenWidth = window.innerWidth;
        let inputsearchvalue = inputsearchmd.value.toLowerCase().replace(/\s+/g, "");

        if (screenWidth < 425) 
        {
            searchvisibility.style.display = "none";
            moviecard.forEach(card => card.style.display = "block");
            movieheading.forEach(movie => movie.style.display = "block");
            removescroll.forEach(r => r.classList.add("overflow-x-auto"));
            main.classList.remove("flex", "overflow-x-auto", "scrollbar-hide");
            searchheading.remove();
            heroimage.classList.remove("hidden", "md:hidden");
            movienotfound.classList.add("hidden");
        } 
        else 
        {
            searchvisibility.style.display = "block";
            if (inputsearchvalue !== "") 
            {
                moviecard.forEach(card => card.style.display = "none");
                movieheading.forEach(movie => movie.style.display = "none");
                searchheading.remove();
                heroimage.classList.add("hidden", "md:hidden");
                movienotfound.classList.remove("hidden");
            }
        }
    }

    HandleSearchIconVisibility();
    window.addEventListener("resize", HandleSearchIconVisibility);
})

// Browse DropDown Toggle Button.
let browsedropdownicon = document.querySelector(".browse-dropdown-icon");
let browsedropdowndiv = document.querySelector(".browse-dropdown-div");
let browsedropdownitems = document.createElement("i");
browsedropdownitems.className = "fa-solid fa-caret-up text-xl";
browsedropdownitems.innerHTML = `
    <div class="bg-[rgba(19,13,10,0.85)] px-20 py-5 fixed top-[65px] left-[25px] border-t-2 border-t-white">
        <ul class="font-inter flex items-center justify-center flex-col gap-y-5 text-base font-normal text-[#B3B3B3]">
            <li class="Browse-Home cursor-pointer">Home</li>
            <li class="Browse-TV cursor-pointer">TV Shows</li>
            <li class="Browse-Movies cursor-pointer">Movies</li>
            <li class="Browse-New cursor-pointer">New & Popular</li>
            <li class="Browse-List cursor-pointer">My List</li>
        </ul>
    </div>  
`;

// Browse.
browsedropdownicon.addEventListener("click", () => {
    if(!browsedropdowndiv.contains(browsedropdownitems))
    {
        browsedropdowndiv.prepend(browsedropdownitems);
    }
    else
    {
        browsedropdownitems.remove();
    }
})

// Handle Browse Dropdown Visibility According to Pixels.
function HandleDropdownIconVisibility() 
{
    if(window.innerWidth >= 768)
    {
        browsedropdownicon.classList.add("hidden");
        browsedropdowndiv.classList.add("hidden");
    }
    else
    {
        browsedropdownicon.classList.remove("hidden");
        browsedropdowndiv.classList.remove("hidden");
    }
}

window.addEventListener("DOMContentLoaded", HandleDropdownIconVisibility);
window.addEventListener("resize", HandleDropdownIconVisibility);

// Browse Navigation.
let browsehome = browsedropdownitems.querySelector(".Browse-Home");
let browsetv = browsedropdownitems.querySelector(".Browse-TV");
let browsemovies = browsedropdownitems.querySelector(".Browse-Movies");
let browsenew = browsedropdownitems.querySelector(".Browse-New");
let browselist = browsedropdownitems.querySelector(".Browse-List");

browsehome.addEventListener("click", () => {
    HandleBrowseItems('Home');
})
browsetv.addEventListener("click", () => {
    HandleBrowseItems('Tv');
})
browsemovies.addEventListener("click", () => {
    HandleBrowseItems('Movies');
})
browsenew.addEventListener("click", () => {
    HandleBrowseItems('New');
})
browselist.addEventListener("click", () => {
    HandleBrowseItems('List');
})

function HandleBrowseItems(browseitems)
{
    ClearBold();
    if(browseitems === "Home")
    {
        browsehome.classList.add("font-bold", "text-[#FFFFFF]");
        window.scrollTo({ top: 10, behavior: 'smooth' });
    }
    if(browseitems === "Tv")
    {
        browsetv.classList.add("font-bold", "text-[#FFFFFF]");
        window.scrollTo({ top: 605, behavior: 'smooth' });
    }
    else if(browseitems === "Movies")
    {
        browsemovies.classList.add("font-bold", "text-[#FFFFFF]");
        window.scrollTo({ top: 605, behavior: 'smooth' });
    }
    else if(browseitems === "New")
    {
        browsenew.classList.add("font-bold", "text-[#FFFFFF]");
        window.scrollTo({ top: 605, behavior: 'smooth' });
    }
    else if(browseitems === "List")
    {
        browselist.classList.add("font-bold", "text-[#FFFFFF]");
        window.scrollTo({ top: 605, behavior: 'smooth' });
    }
}

function ClearBold()
{
    browsehome.classList.remove("font-bold", "text-[#FFFFFF]");
    browsetv.classList.remove("font-bold", "text-[#FFFFFF]");
    browsemovies.classList.remove("font-bold", "text-[#FFFFFF]");
    browsenew.classList.remove("font-bold", "text-[#FFFFFF]");
    browselist.classList.remove("font-bold", "text-[#FFFFFF]");
}

window.addEventListener('DOMContentLoaded', () => {
    HandleBrowseItems("Home");
})

// Hero Section Scroll use in Play and More Info Buttons.
let herosection = document.querySelector("#Hero-Section");

let playbtn = document.querySelector(".playbtn");
playbtn.addEventListener("click", () => {
    herosection.scrollIntoView({ behavior: "smooth" });
})

let moreinfobtn = document.querySelector(".more-info-btn");
moreinfobtn.addEventListener("click", () => {
    herosection.scrollIntoView({ behavior: "smooth" });
})

// Footer Year Updation.
let footeryearupdate = document.querySelector(".footer-year-update");
let footeryear = new Date().getFullYear();
footeryearupdate.innerText = `${footeryear}`;

// Profile Image Location Link.
let profileimglink = document.querySelector(".profile-img-link");
profileimglink.addEventListener("click", () => {
    window.location.href = "profile.html";
})

let notificationvisibility = document.querySelector(".notification-visibility");
let notificationdiv = document.querySelector(".notification-div");

notificationvisibility.addEventListener("click", () => {
    notificationdiv.classList.remove("hidden");
    setTimeout(() => {
        notificationdiv.classList.add("hidden");
    }, 2000);
})