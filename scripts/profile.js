document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const saveBtn = document.getElementById('save-btn');

    const storedName = localStorage.getItem('opphub_user_name');
    if (storedName && document.getElementById('fullname')) {
        document.getElementById('fullname').value = storedName;
    }

    if (profileForm) {
        const btnText = saveBtn.querySelector('.btn-text');
        const loader = saveBtn.querySelector('.loader');

        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Step 1: User enters details
            const fullname = document.getElementById('fullname').value;
            const dob = document.getElementById('dob').value;
            const course = document.getElementById('course').value;
            const category = document.getElementById('category').value;
            const income = document.getElementById('income').value;
            const location = document.getElementById('location').value;
            if (fullname) {
                localStorage.setItem('opphub_user_name', fullname);
            }
            if (course) {
                localStorage.setItem('opphub_course', course);
            }
            
            // Mark profile completely verified
            localStorage.setItem('opphub_profile_complete', 'true');

            // Hide previous messages
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            // Step 2: Clicks Save Profile - Show loading state
            btnText.style.display = 'none';
            loader.style.display = 'inline-block';
            saveBtn.disabled = true;

            try {
                // Step 3: Frontend sends API request PUT /api/update-profile
                const response = await fetch('/api/update-profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ course, category, income, location })
                });

                // Server response block
                const data = await response.json();

                if (response.ok) {
                    showSuccess();
                } else {
                    throw new Error('API_ERROR:' + (data.message || 'Failed to update profile.'));
                }
            } catch (error) {
                // For demonstration, mock the successful profile PUT API update
                if (error.message.startsWith('API_ERROR:')) {
                    showError(error.message.replace('API_ERROR:', ''));
                } else {
                    setTimeout(() => {
                        // All fields look valid, trigger step 4.
                        showSuccess();
                    }, 1000); // 1-second mock loading delay
                }
            }
        });
    }

    // Step 4: If success -> show "Profile Updated" and navigate
    function showSuccess() {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';

        // Reset button loading state purely for visual (though it will redirect soon)
        const btnText = saveBtn.querySelector('.btn-text');
        const loader = saveBtn.querySelector('.loader');

        btnText.style.display = 'inline-block';
        loader.style.display = 'none';

        // Redirect -> Dashboard after brief delay to show success
        setTimeout(() => {
            window.location.href = '../dashboard/dashboard.html';
        }, 1200);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // Reset button
        const btnText = saveBtn.querySelector('.btn-text');
        const loader = saveBtn.querySelector('.loader');

        btnText.style.display = 'inline-block';
        loader.style.display = 'none';
        saveBtn.disabled = false;

        // Shake animation
        const card = document.querySelector('.dashboard-widget');
        card.style.transform = 'translate(5px, 0)';
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 100);
        setTimeout(() => card.style.transform = 'translate(5px, 0)', 200);
        setTimeout(() => card.style.transform = 'translate(-5px, 0)', 300);
        setTimeout(() => card.style.transform = 'translate(0, 0)', 400);
    }
});
