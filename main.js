document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");

    // Route mapping object
    const routes = {
        "/home": "html/home.html",
        "/about": "html/about.html",
        "/services": "html/services.html",
        "/contact": "html/contact.html",
        "/sample": "html/sample.html",
        "/experiences": "html/experiences.html",
    };

    // Function to handle client-side routing and menu item highlighting
    function handleRoute(path) {
        const route = routes[path] || "html/home.html";

        fetch(route)
            .then((response) => response.text())
            .then((html) => {
                content.innerHTML = html;
                if (route === "html/contact.html") {
                    loadReCaptchaScript();
                }
            })
            .catch((error) => {
                console.error("Error loading content: " + error);
            });

        handleActiveNavItem(path);
    }

    // Function to handle menu item highlighting
    function handleActiveNavItem(path) {
        const navLinks = document.querySelectorAll("#menu a");

        navLinks.forEach((link) => {
            const page = link.getAttribute("data-page");
            if (page === path) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Handle back/forward navigation
    window.addEventListener("popstate", function (event) {
        const path = event.state ? event.state.path : window.location.pathname;
        handleRoute(path);
    });

    // Handle route changes when clicking menu links
    document.addEventListener("click", function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute("data-page")) {
            e.preventDefault();
            const pageUrl = e.target.getAttribute("data-page");
            window.history.pushState({ path: pageUrl }, "", pageUrl);
            handleRoute(pageUrl);
        }
    });

    // Initial route handling
    const initialPath = window.location.pathname;
    handleRoute(initialPath);
});

function loadReCaptchaScript() {
    var script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Define the onSubmit function
window.onSubmit = function (token) {
    var emailElement = document.getElementById("email");
    emailElement.style.display = "block";
    var recaptchaContainer = document.querySelector(".recaptcha-container");
    recaptchaContainer.style.display = "none";
};
