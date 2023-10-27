document.addEventListener("DOMContentLoaded", function () {
    // Get the main content area and menu links
    const content = document.getElementById("content");
    const menuLinks = document.querySelectorAll("#menu a");

    // Function to load content from the specified URL
    function loadContent(url) {
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                content.innerHTML = html;
                if (url === "html/contact.html") {
                    // Load the reCAPTCHA script when contact.html is displayed
                    loadReCaptchaScript();
                }
            })
            .catch((error) => {
                console.error("Error loading content: " + error);
            });
    }

    // Add click event listeners to menu links
    menuLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const pageUrl = link.getAttribute("data-page");
            loadContent(pageUrl);
        });
    });

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

function loadGoogleTagManager() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EKZ7MS4HVX';

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-EKZ7MS4HVX');
    };

    document.head.appendChild(script);
}

loadGoogleTagManager();
