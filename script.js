$(document).ready(function() {
    // Modal Management
    let currentModal = null;

    function openModal(modalId) {
        currentModal = $(modalId);
        currentModal.fadeIn(300);
        $('body').css('overflow', 'hidden');
    }

    function closeModal() {
        if (currentModal) {
            currentModal.fadeOut(300);
            $('body').css('overflow', 'auto');
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
});
