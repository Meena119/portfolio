document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        const isOpen =
            navLinks.classList.contains("open");

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    /* Close menu when clicking a link */

    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

            });

        });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-link");


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navItems.forEach(function (link) {

                            link.classList.remove("active");

                        });


                        const activeLink =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add("active");

                        }

                    }

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }

        );


    sections.forEach(function (section) {

        observer.observe(section);

    });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* =====================================================
       TESTIMONIAL CAROUSEL
    ===================================================== */

    const slider =
        document.getElementById(
            "testimonialSlider"
        );

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    const nextBtn =
        document.getElementById("nextBtn");

    const prevBtn =
        document.getElementById("prevBtn");


    let currentSlide = 0;


    function showSlide(index) {

        if (index >= testimonials.length) {

            currentSlide = 0;

        }
        else if (index < 0) {

            currentSlide =
                testimonials.length - 1;

        }
        else {

            currentSlide = index;

        }


        slider.style.transform =
            `translateX(-${currentSlide * 100}%)`;

    }


    nextBtn.addEventListener(
        "click",
        function () {

            showSlide(currentSlide + 1);

        }
    );


    prevBtn.addEventListener(
        "click",
        function () {

            showSlide(currentSlide - 1);

        }
    );



    /* Automatic carousel */

    setInterval(function () {

        showSlide(currentSlide + 1);

    }, 6000);



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
/* =========================================================
   HERO ROLE TYPING EFFECT
========================================================= */

const roles = [
    "Python & ML Developer",
    "Web Developer",
    "Data Analyst"
];

const roleElement = document.getElementById("typing-role");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {

    if (!roleElement) return;

    const currentRole = roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(
        typeRole,
        deleting ? 60 : 100
    );
}

typeRole();