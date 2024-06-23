document.addEventListener('DOMContentLoaded', function () {
    // Event listener pour la soumission du formulaire
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        var firstName = document.getElementById('firstName');
        var lastName = document.getElementById('lastName');
        var email = document.getElementById('email');
        var message = document.getElementById('message');

        clearContactFormErrors(); 

        validateField(lastName, "Le nom de famille est obligatoire.");
        validateField(firstName, "Le prénom est obligatoire.");
        validateEmailField(email, "L'adresse électronique est obligatoire.", "L'adresse électronique n'est pas valide.");
        validateField(message, "Le message est obligatoire.");
    });

    // Validation de l'email de la newsletter
    document.querySelector('#newsletter .container button').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        const newsletterEmail = document.getElementById('newsletter-email');
        clearNewsletterErrors(newsletterEmail.parentElement); 
        validateNewsletterEmail(newsletterEmail);
    });

    function validateField(input, emptyMsg) {
        if (!input.value.trim()) {
            showError(input, emptyMsg);
        } else {
            showSuccess(input);
        }
    }

    function validateEmailField(input, emptyMsg, invalidMsg) {
        if (!input.value.trim()) {
            showError(input, emptyMsg);
        } else if (!validateEmail(input.value)) {
            showError(input, invalidMsg);
        } else {
            showSuccess(input);
        }
    }

    function validateNewsletterEmail(input) {
        if (!input.value.trim()) {
            showError(input, "L'adresse électronique est obligatoire.");
        } else if (!validateEmail(input.value)) {
            showError(input, "L'adresse électronique n'est pas valide.");
        } else {
            showSuccess(input);
        }
    }

    function showError(input, message) {
        const container = input.parentElement;
        const error = container.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        container.appendChild(error);
        input.classList.add('error');
        input.style.borderColor = 'red';
    }

    function showSuccess(input) {
        input.style.borderColor = 'green';
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    function clearContactFormErrors() {
        const form = document.getElementById('contact-form');
        clearErrors(form);
    }

    function clearNewsletterErrors(container) {
        clearErrors(container);
    }

    function clearErrors(container) {
        const errors = container.querySelectorAll('.error-message');
        errors.forEach(function (error) {
            error.remove();
        });
        const inputs = container.querySelectorAll('input.error, textarea.error');
        inputs.forEach(function (input) {
            input.classList.remove('error');
            input.style.borderColor = 'gray';
        });
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Navigation et effets de défilement
    document.querySelector('.header__hamburger').addEventListener('click', function() {
        document.querySelector('.header__nav').classList.toggle('show');
    });

    document.querySelectorAll('.header__nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelector('.header__nav').classList.remove('show');
        });
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".header__nav-item a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    const scrollToTopButton = document.querySelector('.scroll-to-top__button');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
