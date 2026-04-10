document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pref-card');
    const continueBtn = document.getElementById('continue-btn');
    const countDisplay = document.querySelector('.count-number');
    const selected = new Set();

    // Toggle card selection
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const value = card.dataset.value;

            if (selected.has(value)) {
                selected.delete(value);
                card.classList.remove('selected');
            } else {
                selected.add(value);
                card.classList.add('selected');
            }

            updateUI();
        });
    });

    function updateUI() {
        // Update counter
        countDisplay.textContent = selected.size;

        // Enable/disable continue button
        if (selected.size > 0) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }
    }

    // Continue button → save preferences and redirect to dashboard
    continueBtn.addEventListener('click', () => {
        if (selected.size === 0) return;

        // Save preferences to localStorage
        const preferences = Array.from(selected);
        localStorage.setItem('opphub_preferences', JSON.stringify(preferences));
        localStorage.setItem('opphub_onboarded', 'true');

        // Show loading state
        const btnText = continueBtn.querySelector('.btn-text');
        const btnArrow = continueBtn.querySelector('.btn-arrow');
        btnText.textContent = 'Setting up...';
        btnArrow.style.display = 'none';
        continueBtn.disabled = true;

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html';
        }, 800);
    });

    // If user already onboarded, skip straight to dashboard
    if (localStorage.getItem('opphub_onboarded') === 'true') {
        // Allow re-visiting the page to update preferences
        // Pre-select previously chosen cards
        const saved = JSON.parse(localStorage.getItem('opphub_preferences') || '[]');
        saved.forEach(value => {
            const card = document.querySelector(`.pref-card[data-value="${value}"]`);
            if (card) {
                card.classList.add('selected');
                selected.add(value);
            }
        });
        updateUI();
    }
});
