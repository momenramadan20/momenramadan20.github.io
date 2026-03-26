// ============================================================
// script.js – Interactive features for Momen's CV Webpage
// ============================================================

// -----------------------------------------------
// Option 5: Welcome Message on Page Load
// -----------------------------------------------
// Displays a welcome modal overlay when the page loads.

window.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("welcome-modal");
    var closeBtn = document.getElementById("welcome-close-btn");

    // Show the modal
    modal.classList.add("visible");

    // Close modal when button is clicked
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("visible");
    });
});

// -----------------------------------------------
// Option 3: Dark Mode / Light Mode Toggle
// -----------------------------------------------
// Switches between dark and light themes and saves
// the user's preference in localStorage.

(function () {
    var toggle = document.getElementById("dark-mode-toggle");

    // Load saved preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggle.innerHTML = "&#9788; Light Mode";
    }

    toggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        var isDark = document.body.classList.contains("dark-mode");

        // Update button text
        toggle.innerHTML = isDark ? "&#9788; Light Mode" : "&#127769; Dark Mode";

        // Save preference
        localStorage.setItem("darkMode", isDark);
    });
})();

// -----------------------------------------------
// Option 2: Show/Hide Sections
// -----------------------------------------------
// Allows users to toggle the visibility of
// Skills, Projects, and Activities sections.

(function () {
    var toggleButtons = document.querySelectorAll(".btn-section-toggle");

    toggleButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var targetId = btn.getAttribute("data-target");
            var target = document.getElementById(targetId);

            if (target.classList.contains("hidden")) {
                // Show the section
                target.classList.remove("hidden");
                btn.textContent = btn.textContent.replace("Show", "Hide");
            } else {
                // Hide the section
                target.classList.add("hidden");
                btn.textContent = btn.textContent.replace("Hide", "Show");
            }
        });
    });
})();

// -----------------------------------------------
// Option 4: Dynamic Skills List
// -----------------------------------------------
// Lets the user type a new skill and add it to
// the Technical skills list dynamically.

(function () {
    var input = document.getElementById("new-skill-input");
    var addBtn = document.getElementById("add-skill-btn");
    var list = document.getElementById("technical-skills-list");
    var message = document.getElementById("skill-message");

    addBtn.addEventListener("click", function () {
        var skill = input.value.trim();

        // Clear previous message
        message.textContent = "";
        message.className = "form-message";

        if (skill === "") {
            message.textContent = "Please enter a skill.";
            message.classList.add("error-text");
            return;
        }

        // Create new list item and append it
        var li = document.createElement("li");
        li.textContent = skill;
        list.appendChild(li);

        // Show success feedback
        message.textContent = '"' + skill + '" has been added!';
        message.classList.add("success-text");

        // Clear input
        input.value = "";
    });

    // Allow pressing Enter to add a skill
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });
})();

// -----------------------------------------------
// Option 6: Interactive Project Section
// -----------------------------------------------
// Shows/hides project details when the user clicks
// the "Show Details" / "Hide Details" button.

function toggleProjectDetails(button) {
    var details = button.parentElement.nextElementSibling;

    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
        button.textContent = "Hide Details";
    } else {
        details.classList.add("hidden");
        button.textContent = "Show Details";
    }
}

// -----------------------------------------------
// Option 1: Contact Form with Validation
// -----------------------------------------------
// Validates name, email, and message fields.
// Displays error messages for each field and a
// success message when the form is valid.

(function () {
    var form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        // Get field values
        var name = document.getElementById("contact-name").value.trim();
        var email = document.getElementById("contact-email").value.trim();
        var msg = document.getElementById("contact-message").value.trim();

        // Get error display elements
        var nameError = document.getElementById("name-error");
        var emailError = document.getElementById("email-error");
        var msgError = document.getElementById("message-error");
        var successMsg = document.getElementById("form-success");

        // Reset errors
        nameError.textContent = "";
        emailError.textContent = "";
        msgError.textContent = "";
        successMsg.textContent = "";
        successMsg.classList.add("hidden");

        var isValid = true;

        // Validate name (required)
        if (name === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        }

        // Validate email (required + format)
        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate message (required)
        if (msg === "") {
            msgError.textContent = "Message is required.";
            isValid = false;
        }

        // If all valid, show success and reset form
        if (isValid) {
            successMsg.textContent = "Thank you, " + name + "! Your message has been sent successfully.";
            successMsg.classList.remove("hidden");
            form.reset();
        }
    });
})();
