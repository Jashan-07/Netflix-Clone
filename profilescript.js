// Netflix Profile Image Link Location.
let netflixprofileimglink = document.querySelector(".netflix-img-link");
netflixprofileimglink.addEventListener("click", () => {
    window.location.href = "index.html";
})

// Profile Image Link Location.
let profileimglink = document.querySelector(".profile-img-link");
profileimglink.addEventListener("click", () => {
    window.location.href = "profile.html";
})

// Profile Next Billing Date Updation for Small to Large Screen Size.
let profiledateupdate = document.querySelectorAll(".profile-date-update");
let billingdate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
let formatteddate = billingdate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});
profiledateupdate.forEach((profiledate) => {
    profiledate.innerText = `Next Billing Date - ${formatteddate}`;
})