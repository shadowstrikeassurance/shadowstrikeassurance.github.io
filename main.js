document.addEventListener("DOMContentLoaded", function () {
    // Get the main content area and menu links
    const content = document.getElementById("content");

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

    // Add a delegated click event listener to the document for menu links
    document.addEventListener("click", function (e) {
        if (e.target.tagName === 'A' && e.target.getAttribute("data-page")) {
            e.preventDefault();
            const pageUrl = e.target.getAttribute("data-page");
            loadContent(pageUrl);
        }
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
