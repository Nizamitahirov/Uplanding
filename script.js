document.addEventListener('DOMContentLoaded', function() {

    // --- Scroll Fade-in Animation ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Schedule Modal Logic ---
    const scheduleLink = document.getElementById('schedule-link');
    const modal = document.getElementById('schedule-modal');
    const closeModalBtn = document.getElementById('modal-close');
    let calendarInstance = null; // To hold the flatpickr instance

    function openModal() {
        modal.classList.add('active');
        if (!calendarInstance) {
            calendarInstance = flatpickr("#calendar-container", {
                inline: true,
                minDate: "today",
                dateFormat: "Y-m-d",
            });
        }
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    scheduleLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // --- Booking Form Submission ---
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!calendarInstance || calendarInstance.selectedDates.length === 0) {
            alert("Please select a date from the calendar.");
            return;
        }
        
        const date = calendarInstance.selectedDates[0].toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        const timeEl = document.querySelector('input[name="time"]:checked');
        if (!timeEl) {
            alert("Please select a time slot.");
            return;
        }
        const time = timeEl.value;
        
        const name = document.getElementById('name').value;
        
        alert(`Thank you, ${name}!\n\nYour demo has been confirmed for:\nDate: ${date}\nTime: ${time}`);
        
        closeModal();
        bookingForm.reset();
        calendarInstance.clear();
        document.querySelectorAll('input[name="time"]').forEach(radio => radio.checked = false);
    });

});
