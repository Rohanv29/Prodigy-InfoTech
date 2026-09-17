    const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links a");


// Mobile Menu
menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


// Close menu when a link is clicked
links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

    });

});