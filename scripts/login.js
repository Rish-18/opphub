document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    if (loginForm) {
        const btnText = loginBtn.querySelector('.btn-text');
        const loader = loginBtn.querySelector('.loader');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Step 1: User enters Email, Password
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Hide previous errors
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Show loading state
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            loginBtn.disabled = true;

            try {
                // Step 3: Frontend sends request to backend POST /api/login
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                // Step 4: Backend verifies
                const data = await response.json();

                // Step 5: Valid -> Redirect to Dashboard
                if (response.ok) {
                    window.location.href = '../preferences/preferences.html';
                } else {
                    // Invalid -> Show error message
                    throw new Error('API_ERROR:' + (data.message || 'Invalid email or password. Please try again.'));
                }
            } catch (error) {
                // Step 5: Invalid -> Show error message

                if (error.message.startsWith('API_ERROR:')) {
                    showError(error.message.replace('API_ERROR:', ''));
                } else {
                    // Mocked API simulation 
                    setTimeout(() => {
                        // Allow any email for presentation, but check for generic password length
                        if (password.length >= 6) {
                            window.location.href = '../preferences/preferences.html';
                        } else {
                            showError('Error: Password must be at least 6 characters.');
                        }
                    }, 800);
                }
            }
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // Reset button
        const btnText = loginBtn.querySelector('.btn-text');
        const loader = loginBtn.querySelector('.loader');

        btnText.style.display = 'inline-block';
        loader.style.display = 'none';
        loginBtn.disabled = false;

        // Shake animation for error
        const card = document.querySelector('.auth-card');
        card.style.transform = 'translate(5px, 0)';
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 100);
        setTimeout(() => card.style.transform = 'translate(5px, 0)', 200);
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 300);
        setTimeout(() => card.style.transform = 'translate(0, 0)', 400);
    }
});
