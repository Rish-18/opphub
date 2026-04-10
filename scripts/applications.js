document.addEventListener('DOMContentLoaded', () => {
    const appList = document.getElementById('application-list');
    const loader = document.getElementById('loader');
    const trackerContainer = document.getElementById('tracker-container');

    // Step 2: Simulate Backend Request (GET /api/applications)
    async function fetchApplications() {

        // Emulate realistic loading sequence
        setTimeout(() => {
            const applications = [
                { id: 101, title: 'Software Engineer Intern', type: 'Internship', date: 'Mar 15, 2026', status: 'In Review', statusClass: 'status-review' },
                { id: 102, title: 'Women in Tech Scholarship', type: 'Scholarship', date: 'Mar 12, 2026', status: 'Applied', statusClass: 'status-review', colorHack: 'style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7;"' },
                { id: 103, title: 'Frontend Developer', type: 'Job', date: 'Mar 10, 2026', status: 'Interview', statusClass: 'status-interview' },
                { id: 104, title: 'Backend Engineer', type: 'Job', date: 'Feb 28, 2026', status: 'Rejected', statusClass: 'status-rejected' },
                { id: 105, title: 'Data Science Fellowship', type: 'Scholarship', date: 'Jan 15, 2026', status: 'Accepted', statusClass: '', colorHack: 'style="background: rgba(39, 201, 63, 0.2); color: #86efac;"' }
            ];

            // Hide Loader & Show Container
            loader.style.display = 'none';
            trackerContainer.style.display = 'block';

            if (applications.length === 0) {
                appList.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-secondary); padding: 2rem;">No applications tracked yet. Start browsing!</td></tr>';
                return;
            }

            // Step 3: Populate Table with Custom Data Mapping
            appList.innerHTML = applications.map((app, index) => `
                <tr style="animation: slideUp 0.5s ease-out ${index * 0.1}s backwards;">
                    <td style="font-weight: 600;">${app.title}</td>
                    <td style="color: var(--text-secondary);">${app.type}</td>
                    <td style="color: var(--text-secondary);">${app.date}</td>
                    <td><span class="status-badge ${app.statusClass}" ${app.colorHack || ''}>${app.status}</span></td>
                    <td>
                        <a href="opportunity-details.html?id=${app.id}" class="text-link text-sm">View Details</a>
                    </td>
                </tr>
            `).join('');

        }, 800); // 0.8s network delay simulation
    }

    // Initialize Request
    fetchApplications();
});
