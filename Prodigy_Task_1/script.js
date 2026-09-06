document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("navbar");
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll("#nav-links a");
    const animatedSections = document.querySelectorAll(".animate");

    // =========================
    // Mobile Menu
    // =========================

menuBtn.addEventListener("click", function () {

    if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    } else {
        navLinks.classList.add("active");
        menuBtn.textContent = "✕";
    }

});


    // =========================
    // Navigation Links
    // =========================

    links.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const targetSection = document.querySelector(link.getAttribute("href"));

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight,
                behavior: "smooth"
            });
        }

        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";

    });

});


    // =========================
    // Navbar + Active Link
    // =========================

    window.addEventListener("scroll", function () {

        // Change navbar background
        if (window.scrollY > 50) {

            navbar.style.background = "#141e30";
            navbar.style.padding = "15px 8%";

        } else {

            navbar.style.background = "transparent";
            navbar.style.padding = "20px 8%";

        }


        // Find current section
        let current = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                current = section.getAttribute("id");

            }

        });


        // Highlight active link
        links.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });


    // =========================
    // Section Animation
    // =========================

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.2
    });


    // Start observing sections
    animatedSections.forEach(function (section) {

        observer.observe(section);

    });

});