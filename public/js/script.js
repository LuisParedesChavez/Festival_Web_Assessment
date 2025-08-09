document.getElementById("rockButton").addEventListener("click", function() {
    window.location.href = "/rock"; // Replace with the actual URL for the rock page
});

document.getElementById("popButton").addEventListener("click", function() {
    window.location.href = "/pop"; // Replace with the actual URL for the pop page
});

document.getElementById("technoButton").addEventListener("click", function() {
    window.location.href = "/techno"; // Replace with the actual URL for the techno page
});

document.getElementById("lineupButton").addEventListener("click", function() {
    window.location.href = "/lineup"; // Replace with the actual URL for the full line-up page
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    
    // Check if elements exist
    if (!name || !email || !message) {
        alert("All fields are required.");
        event.preventDefault();
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!name.value || !email.value || !message.value) {
        alert("All fields are required.");
        event.preventDefault();
        return;
    }

    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
    }
});
