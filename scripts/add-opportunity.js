document.addEventListener('DOMContentLoaded', () => {
    // Check admin session
    if (localStorage.getItem('opphub_admin_logged_in') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    // Logout handler
    document.getElementById('admin-logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('opphub_admin_logged_in');
        localStorage.removeItem('opphub_admin_email');
        window.location.href = 'admin-login.html';
    });

    const form = document.getElementById('add-opportunity-form');
    const successBanner = document.getElementById('form-success');
    const errorBanner = document.getElementById('form-error');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = document.getElementById('submit-loader');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Hide previous messages
        successBanner.style.display = 'none';
        errorBanner.style.display = 'none';

        // Gather form data
        const opportunity = {
            id: Date.now().toString(),
            title: document.getElementById('opp-title').value.trim(),
            category: document.getElementById('opp-category').value,
            description: document.getElementById('opp-description').value.trim(),
            eligibility: document.getElementById('opp-eligibility').value.trim(),
            organization: document.getElementById('opp-organization').value.trim(),
            location: document.getElementById('opp-location').value.trim() || 'Not specified',
            link: document.getElementById('opp-link').value.trim(),
            deadline: document.getElementById('opp-deadline').value,
            createdAt: new Date().toISOString()
        };

        // Validate
        if (!opportunity.title || !opportunity.category || !opportunity.description || !opportunity.deadline) {
            errorBanner.textContent = 'Please fill in all required fields.';
            errorBanner.style.display = 'block';
            return;
        }

        // Show loading
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Save to localStorage
            const opportunities = JSON.parse(localStorage.getItem('opphub_opportunities') || '[]');
            opportunities.push(opportunity);
            localStorage.setItem('opphub_opportunities', JSON.stringify(opportunities));

            // Show success
            btnText.style.display = 'inline-block';
            loader.style.display = 'none';
            successBanner.style.display = 'block';

            // Reset form
            form.reset();

            // Redirect to manage page
            setTimeout(() => {
                window.location.href = 'manage-opportunities.html';
            }, 1200);
        }, 800);
    });
});
