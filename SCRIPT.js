const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.toggle("light-theme");

    themeIcon.textContent = isLight ? "☾" : "☼";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

});


// 2. MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});


// Close menu after clicking a navigation link

document.querySelectorAll(
    ".nav-link, .brand, .scroll-cue"
).forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// 3. ACTIVE NAVIGATION HIGHLIGHTING

const sections = document.querySelectorAll(
    "main section[id]"
);

const navItems = document.querySelectorAll(
    ".nav-link"
);


const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navItems.forEach(item => {

                    item.classList.toggle(
                        "active",
                        item.getAttribute("href") ===
                        `#${entry.target.id}`
                    );

                });

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);


sections.forEach(section => {

    sectionObserver.observe(section);

});


// 4. SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


document.querySelectorAll(".reveal").forEach(element => {

    revealObserver.observe(element);

});


// 5. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

const formFeedback = document.getElementById("formFeedback");


// Function to display error messages

function showError(input, errorId, message) {

    document.getElementById(errorId).textContent = message;

    input.classList.toggle("invalid", Boolean(message));

    input.setAttribute(
        "aria-invalid",
        String(Boolean(message))
    );

}


// When the form is submitted

contactForm.addEventListener("submit", event => {

    event.preventDefault();


    // Get input values

    const name = document.getElementById("visitorName");

    const email = document.getElementById("visitorEmail");

    const message = document.getElementById("visitorMessage");


    // Check name

    const validName = name.value.trim().length >= 2;


    // Check email

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.value.trim()
    );


    // Check message

    const validMessage = message.value.trim().length >= 10;


    // Display validation errors

    showError(
        name,
        "nameError",
        validName ? "" : "Please enter at least 2 characters."
    );


    showError(
        email,
        "emailError",
        validEmail ? "" : "Please enter a valid email address."
    );


    showError(
        message,
        "messageError",
        validMessage ? "" : "Please enter at least 10 characters."
    );


    // Check whether all fields are valid

    if (validName && validEmail && validMessage) {

        formFeedback.textContent =
            "All fields look good! This demo form does not send messages because no backend is connected.";

        formFeedback.classList.add("success");

    }

    else {

        formFeedback.textContent =
            "Please correct the highlighted fields and try again.";

        formFeedback.classList.remove("success");

    }

});


// 6. CLEAR ERROR WHEN USER STARTS TYPING

const inputFields = [
    ["visitorName", "nameError"],
    ["visitorEmail", "emailError"],
    ["visitorMessage", "messageError"]
];


inputFields.forEach(([inputId, errorId]) => {

    document.getElementById(inputId).addEventListener(
        "input",
        event => {

            if (event.target.value.trim()) {

                document.getElementById(errorId).textContent = "";

                event.target.classList.remove("invalid");

                event.target.setAttribute(
                    "aria-invalid",
                    "false"
                );

            }

            formFeedback.classList.remove("success");

        }
    );

});


// 7. AUTOMATIC CURRENT YEAR IN FOOTER

document.getElementById("year").textContent =
    new Date().getFullYear();
