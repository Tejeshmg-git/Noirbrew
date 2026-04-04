/* Noirbrew Main JS - Foundation */

document.addEventListener('DOMContentLoaded', function() {
    /* 🧭 Header Scroll Effect - Preserved for Foundation */
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('solid');
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent');
                header.classList.remove('solid');
            }
        });
    }

    /* Redundant Placeholder Listeners Removed to prevent Component Conflicts */

});

// Standardized Modal/Reservation functions will go here
function openReservationModal() {
    console.log("Opening reservation flow...");
}
