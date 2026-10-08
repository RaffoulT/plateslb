document.addEventListener('DOMContentLoaded', () => {
    const letterPicker = document.getElementById('letter-picker');
    const numberInput = document.getElementById('number-input');
    const displayLetter = document.getElementById('display-letter');
    const displayNumber = document.getElementById('display-number');
    const plate = document.getElementById('plate');
    const plateContainer = document.getElementById('plate-container');

    // Update Plate Letter
    letterPicker.addEventListener('change', (e) => {
        displayLetter.textContent = e.target.value;
        animatePlateUpdate();
    });

    // Update Plate Number with validation
    numberInput.addEventListener('input', (e) => {
        // Only allow numbers
        let value = e.target.value.replace(/[^0-9]/g, '');
        
        // Limit to 7 digits
        if (value.length > 7) {
            value = value.slice(0, 7);
        }
        
        // Update input if cleaned
        if (value !== e.target.value) {
            e.target.value = value;
        }

        // Show empty state if nothing typed, else show number
        displayNumber.textContent = value || '------';
        animatePlateUpdate();
    });

    // Simple bump animation when value changes
    function animatePlateUpdate() {
        plate.style.transform = 'scale(1.02)';
        setTimeout(() => {
            plate.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            resetTilt();
        }, 150);
    }

    // 3D Tilt Effect on Plate hover
    let bounds;
    
    plateContainer.addEventListener('mouseenter', () => {
        bounds = plateContainer.getBoundingClientRect();
        plate.style.transition = 'transform 0.1s ease-out';
    });

    plateContainer.addEventListener('mousemove', (e) => {
        if (!bounds) return;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        }
        
        // Max rotation 10 deg
        const rotateX = -(center.y / (bounds.height / 2)) * 10;
        const rotateY = (center.x / (bounds.width / 2)) * 10;

        plate.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    plateContainer.addEventListener('mouseleave', () => {
        resetTilt();
    });

    function resetTilt() {
        plate.style.transition = 'transform 0.5s ease-out';
        plate.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
});
