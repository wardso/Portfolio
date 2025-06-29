// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰'; // Change icon
        });

        // Close menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰'; // Reset icon
            });
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null, // viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the animation defined in CSS
                entry.target.classList.add('is-visible');
                // Stop observing the element once it has animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with 'slide-up' or 'slide-in' classes
    document.querySelectorAll('.slide-up, .slide-in').forEach(el => {
        observer.observe(el);
    });

    // Optional: Add an active class to navbar links when their section is in view
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -49% 0px', // When the middle of the section is in the viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinksList.forEach(link => {
                    link.classList.remove('active-nav');
                    // Find the link that corresponds to the current section
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Form Submission Handling (Optional, but recommended for contact form) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Basic client-side validation (optional, add more if needed)
            const name = this.elements['name'].value.trim();
            const email = this.elements['email'].value.trim();
            const message = this.elements['message'].value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return; // Stop the function if validation fails
            }

            // You would typically send this data to a backend server here.
            // For a simple static portfolio, you might use a service like Formspree or Netlify Forms.
            // Example of how you might fetch (uncomment and adapt if you set up a backend endpoint):

            /*
            fetch('/your-backend-contact-endpoint', { // Replace with your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: this.elements['subject'].value.trim(),
                    message: message
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) { // Assuming your backend sends a success flag
                    alert('Message sent successfully!');
                    contactForm.reset(); // Clear the form
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred while sending your message.');
            });
            */

            // For now, just a confirmation message since there's no backend:
            alert('Thank you for your message! I will get back to you shortly.');
            contactForm.reset(); // Clear the form after "sending"
        });
    }
});
