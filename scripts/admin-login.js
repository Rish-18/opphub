document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('admin-login-form');
    const errorBanner = document.getElementById('admin-error');
    const loginBtn = document.getElementById('admin-login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loader = document.getElementById('login-loader');

    // Hardcoded admin credentials for demo
    const ADMIN_EMAIL = 'admin@opphub.com';
    const ADMIN_PASSWORD = 'admin123';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('admin-email').value.trim();
        const password = document.getElementById('admin-password').value;

        // Hide previous errors
        errorBanner.style.display = 'none';

        // Show loading state
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        loginBtn.disabled = true;

        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                // Set admin session
                localStorage.setItem('opphub_admin_logged_in', 'true');
                localStorage.setItem('opphub_admin_email', email);
                window.location.href = 'admin-dashboard.html';
            } else {
                // Show error
                errorBanner.textContent = 'Invalid admin credentials. Please try again.';
                errorBanner.style.display = 'block';

                btnText.style.display = 'inline-block';
                loader.style.display = 'none';
                loginBtn.disabled = false;

                // Shake animation
                const card = document.querySelector('.admin-login-card');
                card.style.transform = 'translateX(8px)';
                setTimeout(() => card.style.transform = 'translateX(-8px)', 80);
                setTimeout(() => card.style.transform = 'translateX(6px)', 160);
                setTimeout(() => card.style.transform = 'translateX(-6px)', 240);
                setTimeout(() => card.style.transform = 'translateX(0)', 320);
            }
        }, 1000);
    });
});
