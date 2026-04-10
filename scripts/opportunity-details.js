document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const detailsContainer = document.getElementById('details-container');
    const applyBtn = document.getElementById('apply-btn');
    const saveBtn = document.getElementById('save-btn');
    const feedbackMsg = document.getElementById('feedback-msg');

    // MOCK GET DETAILS endpoint fetch
    setTimeout(() => {
        // Just mock some details so the page looks populated
        loader.style.display = 'none';
        detailsContainer.style.display = 'block';
    }, 600);

    // Apply Logic -> Simulates Application submission
    applyBtn.addEventListener('click', () => {
        const btnText = applyBtn.querySelector('.btn-text');
        const btnLoader = applyBtn.querySelector('.loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        applyBtn.disabled = true;

        setTimeout(() => {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            btnText.textContent = '✅ Applied';
            applyBtn.style.background = 'rgba(39, 201, 63, 0.2)';
            applyBtn.style.color = '#86efac';
            applyBtn.style.boxShadow = 'none';

            showFeedback('Application sent successfully! Track it in your Dashboard.', 'rgba(39, 201, 63, 0.1)', 'rgba(39, 201, 63, 0.3)', '#86efac');
            
            setTimeout(() => {
                window.location.href = '../applications/applications.html';
            }, 1000);
        }, 1200);
    });

    // Save Logic -> Simulates Saving to Wishlist
    let isSaved = false;
    saveBtn.addEventListener('click', () => {
        const btnText = saveBtn.querySelector('.btn-text');
        const btnLoader = saveBtn.querySelector('.loader');

        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        saveBtn.disabled = true;

        setTimeout(() => {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            saveBtn.disabled = false;

            if (!isSaved) {
                btnText.textContent = '✅ Saved';
                saveBtn.style.color = '#93c5fd';
                saveBtn.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                saveBtn.style.background = 'rgba(59, 130, 246, 0.1)';
                isSaved = true;
                showFeedback('Opportunity saved securely to your Dashboard Wishlist.', 'rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.3)', '#93c5fd');
            } else {
                btnText.textContent = '🔖 Save Opportunity';
                saveBtn.style = '';
                isSaved = false;
                feedbackMsg.style.display = 'none';
            }
        }, 800);
    });

    function showFeedback(msg, bg, border, color) {
        feedbackMsg.textContent = msg;
        feedbackMsg.style.display = 'block';
        feedbackMsg.style.background = bg;
        feedbackMsg.style.borderColor = border;
        feedbackMsg.style.color = color;
    }
});
