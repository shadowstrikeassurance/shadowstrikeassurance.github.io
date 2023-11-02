document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");

    function loadContent(url) {
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                content.innerHTML = html;
                if (url === "html/contact.html") {
                    loadReCaptchaScript();
                }
            })
            .catch((error) => {
                console.error("Error loading content: " + error);
            });
    }

    // Define your route mapping object
    const routes = {
        "/home": "html/home.html",
        "/about": "html/about.html",
        "/services": "html/services.html",
        "/contact": "html/contact.html",
        "/sample": "html/sample.html",
        "/experiences": "html/experiences.html",
    };

    // Function to handle client-side routing
    function handleRoute() {
        const path = window.location.pathname;
        const route = routes[path] || null;

        if (route) {
            loadContent(route);
        } else {
            loadContent("html/home.html");
        }
    }

    // Initial route handling
    handleRoute();

    // Handle route changes when clicking menu links
    document.addEventListener("click", function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute("data-page")) {
            e.preventDefault();
            const pageUrl = e.target.getAttribute("data-page");
            window.history.pushState(null, "", pageUrl);
            handleRoute();
        }
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", handleRoute);

    // Load the initial content (e.g., home.html) on page load
    loadContent("html/home.html");
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
