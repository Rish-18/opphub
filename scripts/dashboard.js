document.addEventListener('DOMContentLoaded', () => {
    // Simulated Backend Data Fetch Operations

    // 1. Fetch User Data
    setTimeout(() => {
        const storedName = localStorage.getItem('opphub_user_name') || 'Alex Developer';
        const firstName = storedName.split(' ')[0];
        const initial = storedName.charAt(0).toUpperCase();

        const isComplete = localStorage.getItem('opphub_profile_complete') === 'true';
        const userCourse = localStorage.getItem('opphub_course') || 'Student';
        const progressCount = isComplete ? '100%' : '50%';
        const progressWidth = isComplete ? '100%' : '50%';
        const actionBtnText = isComplete ? 'Edit Profile' : 'Complete Profile';
        
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `Welcome back, ${firstName}!`;
        welcomeMessage.style.opacity = 0;
        welcomeMessage.style.animation = 'fadeIn 0.5s forwards';

        const profileSummary = document.getElementById('profile-summary');
        profileSummary.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold;">
                    ${initial}
                </div>
                <div>
                    <h4 style="font-size: 1.1rem;">${storedName}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">${userCourse} | ${progressCount} Profile Complete</p>
                </div>
            </div>
            <div style="margin-top: 1.5rem; background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
                <div style="background: var(--accent-primary); width: ${progressWidth}; height: 100%; border-radius: 4px; box-shadow: 0 0 10px var(--accent-primary); transition: width 1s ease-in-out;"></div>
            </div>
            <a href="../profile/profile.html" class="btn btn-secondary btn-sm" style="margin-top: 1.5rem; width: 100%;">${actionBtnText}</a>
        `;
    }, 600);

    // 2. Fetch Recent Opportunities
    setTimeout(() => {
        const recentOpp = document.getElementById('recent-opportunities');
        const mockOpportunities = [
            { title: 'Frontend Developer', company: 'Google', location: 'Remote', badge: 'New', badgeClass: 'badge-new' },
            { title: 'UI/UX Designer', company: 'Spotify', location: 'New York, NY', badge: 'Hot', badgeClass: 'badge-hot' }
        ];

        recentOpp.innerHTML = mockOpportunities.map(job => `
            <a href="../opportunities/opportunities.html" class="list-item">
                <div class="item-info">
                    <h4>${job.title}</h4>
                    <p>${job.company} &bull; ${job.location}</p>
                </div>
                <span class="item-badge ${job.badgeClass}">${job.badge}</span>
            </a>
        `).join('');
    }, 800);

    // 3. Fetch Saved Opportunities
    setTimeout(() => {
        const savedOpp = document.getElementById('saved-opportunities');
        const mockSaved = [
            { title: 'Data Science Fellowship', company: 'OpenAI', badge: 'Scholarship', badgeClass: 'badge-new' },
            { title: 'Backend Systems Engineer', company: 'Stripe', badge: 'Job', badgeClass: 'badge-hot' }
        ];

        savedOpp.innerHTML = mockSaved.map(job => `
            <a href="opportunity-details.html?id=1" class="list-item">
                <div class="item-info">
                    <h4>${job.title}</h4>
                    <p>${job.company}</p>
                </div>
                <span class="item-badge ${job.badgeClass}">${job.badge}</span>
            </a>
        `).join('');
    }, 900);

    // 4. Fetch Application Status
    setTimeout(() => {
        const appStatus = document.getElementById('application-status');
        const tableLoader = document.getElementById('table-loader');

        tableLoader.style.display = 'none';

        const mockApps = [
            { role: 'Software Engineer Intern', company: 'Microsoft', date: 'Mar 15, 2026', status: 'In Review', statusClass: 'status-review' },
            { role: 'Full Stack Developer', company: 'Netflix', date: 'Mar 10, 2026', status: 'Interview', statusClass: 'status-interview' },
            { role: 'Backend Engineer', company: 'Amazon', date: 'Feb 28, 2026', status: 'Rejected', statusClass: 'status-rejected' }
        ];

        appStatus.innerHTML = mockApps.map(app => `
            <tr style="animation: fadeIn 0.5s ease-out forwards; opacity: 0;">
                <td style="font-weight: 500;">${app.role}</td>
                <td style="color: var(--text-secondary);">${app.company}</td>
                <td style="color: var(--text-secondary);">${app.date}</td>
                <td><span class="status-badge ${app.statusClass}">${app.status}</span></td>
            </tr>
        `).join('');

        // Stagger animation for rows
        const rows = appStatus.querySelectorAll('tr');
        rows.forEach((row, idx) => {
            row.style.animationDelay = `${idx * 0.1}s`;
        });
    }, 1100);
});
