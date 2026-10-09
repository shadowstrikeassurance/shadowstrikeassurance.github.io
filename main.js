// Mobile menu
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menu-btn");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Contact form (opens the visitor's email client)
const status = document.getElementById("form-status");
function say(msg, isError) {
  status.textContent = msg;
  status.classList.toggle("error", !!isError);
}

document.getElementById("send-btn").addEventListener("click", () => {
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) return say("Please fill in all fields.", true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say("Please enter a valid email address.", true);

  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const subject = encodeURIComponent(`Message from ${name}`);
  window.location.href = `mailto:info@bustercybersec.com?subject=${subject}&body=${body}`;
  say("Opening your email client...");
});
