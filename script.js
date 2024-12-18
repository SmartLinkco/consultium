$(document).ready(function() {
    // Modal Management
    let currentModal = null;

    function openModal(modalId) {
        currentModal = $(modalId);
        currentModal.fadeIn(300);
        $('body').addClass('modal-open');
        
        // Reset scroll position of modal content
        $(modalId + ' .modal-content').scrollTop(0);
    }

    function closeModal() {
        if (currentModal) {
            currentModal.fadeOut(300);
            $('body').removeClass('modal-open');
            currentModal = null;
        }
    }

    // Service Card Click Handlers
    $('.learn-more-btn').click(function(e) {
        e.preventDefault();
        const service = $(this).closest('.service-card').data('service');
        openModal(`#${service}Modal`);
    });

    // Enquiry Button Click Handlers
    $('.enquire-btn').click(function(e) {
        e.preventDefault();
        const package = $(this).data('package');
        $('#selectedPackage').val(package);
        closeModal();
        openModal('#enquiryModal');
    });

    // Close Modal Handlers
    $('.close-modal').click(closeModal);
    $(window).click(function(e) {
        if ($(e.target).hasClass('modal')) {
            closeModal();
        }
    });

    // Form Submission Handler
    $('#enquiryForm').submit(function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();

        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const formData = {
            package: $('#selectedPackage').val(),
            name: name,
            email: email,
            phone: phone,
            message: $('#message').val().trim()
        };

        // You would typically send this to your server
        console.log('Form submitted:', formData);

        // Show success message
        closeModal();
        openModal('#successModal');

        // Reset form
        this.reset();

        // Close success message after 3 seconds
        setTimeout(function() {
            closeModal();
        }, 3000);
    });

    // Mobile Menu Toggle
    $('.menu-toggle').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Smooth Scrolling for Navigation Links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Add scroll event for navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Add touch event handling for iOS
    $(document).on('touchmove', '.modal', function(e) {
        if (!$(e.target).closest('.modal-content').length) {
            e.preventDefault();
        }
    });

    // Prevent modal content scroll from propagating to body
    $('.modal-content').on('touchstart touchmove', function(e) {
        e.stopPropagation();
    });

    // Add this to your existing JavaScript
    document.getElementById('getStartedBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('getStartedModal').style.display = 'block';
    });

    // Make sure your modal close functionality handles the new modal
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Theme toggling functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(icon, savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(icon, newTheme);
        });
    }

    function updateThemeIcon(icon, theme) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Call this function when the document is ready
    document.addEventListener('DOMContentLoaded', initThemeToggle);
});
