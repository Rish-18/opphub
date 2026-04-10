document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');
    const signupBtn = document.getElementById('signup-btn');

    if (signupForm) {
        const btnText = signupBtn.querySelector('.btn-text');
        const loader = signupBtn.querySelector('.loader');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Step 1: User enters details
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate password match
            if (password !== confirmPassword) {
                showError('Passwords do not match. Please try again.');
                return;
            }

            // Hide previous errors
            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            // Show loading state
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            signupBtn.disabled = true;

            try {
                // Step 3: Frontend sends request to backend POST /api/register
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullname, email, password })
                });

                // Step 4: Backend process logic
                const data = await response.json();

                // Step 5: Valid -> Redirect to Login Page
                if (response.ok) {
                    localStorage.setItem('opphub_user_name', fullname);
                    window.location.href = 'login.html';
                } else {
                    // Invalid -> Show error message
                    throw new Error('API_ERROR:' + (data.message || 'Registration failed. Please try again.'));
                }
            } catch (error) {
                // Step 5: Invalid -> Show error message

                if (error.message.startsWith('API_ERROR:')) {
                    showError(error.message.replace('API_ERROR:', ''));
                } else {
                    // Mocked API simulation 
                    setTimeout(() => {
                        if (password.length >= 6) {
                            localStorage.setItem('opphub_user_name', fullname);
                            // Redirect to login after successful account creation
                            window.location.href = 'login.html';
                        } else {
                            showError('Error: Password must be at least 6 characters.');
                        }
                    }, 1000);
                }
            }
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // Reset button
        const btnText = signupBtn.querySelector('.btn-text');
        const loader = signupBtn.querySelector('.loader');

        btnText.style.display = 'inline-block';
        loader.style.display = 'none';
        signupBtn.disabled = false;

        // Shake animation for error
        const card = document.querySelector('.auth-card');
        card.style.transform = 'translate(5px, 0)';
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 100);
        setTimeout(() => card.style.transform = 'translate(5px, 0)', 200);
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 300);
        setTimeout(() => card.style.transform = 'translate(0, 0)', 400);
    }
});
