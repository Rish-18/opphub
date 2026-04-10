document.addEventListener('DOMContentLoaded', () => {
    const oppGrid = document.getElementById('opportunities-grid');
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.getElementById('filter-category');
    const filterLocation = document.getElementById('filter-location');
    const loader = document.getElementById('loader');

    let opportunities = [];

    // Step 2: Simulate Frontend calls backend API (GET /api/opportunities)
    async function fetchOpportunities() {
        oppGrid.style.display = 'none';
        loader.style.display = 'block';

        // Simulate network delay for GET request
        setTimeout(() => {
            opportunities = [
                { id: 1, title: 'Software Engineering Intern', company: 'Google', location: 'Remote', category: 'internship', deadline: 'Apr 15, 2026', desc: 'Join Google\'s core search infrastructure team to build hyper-scale distributed systems.' },
                { id: 2, title: 'Women in Tech Scholarship', company: 'Microsoft', location: 'Remote', category: 'scholarship', deadline: 'May 01, 2026', desc: 'Merit-based scholarship for outstanding female students pursuing computer science.' },
                { id: 3, title: 'Frontend Developer', company: 'Spotify', location: 'On-site', category: 'job', deadline: 'Mar 30, 2026', desc: 'Craft beautiful and fluid user interfaces that millions of users interact with daily.' },
                { id: 4, title: 'Data Science Fellowship', company: 'OpenAI', location: 'Remote', category: 'scholarship', deadline: 'Jun 10, 2026', desc: 'Research fellowship focusing on advanced machine learning algorithms and safety alignments.' },
                { id: 5, title: 'Backend Systems Engineer', company: 'Stripe', location: 'On-site', category: 'job', deadline: 'Apr 25, 2026', desc: 'Design systems that process billions of dollars securely and instantly across the globe.' },
                { id: 6, title: 'Product Management Intern', company: 'Apple', location: 'On-site', category: 'internship', deadline: 'Mar 28, 2026', desc: 'Collaborate with engineering and design to map the future roadmap of groundbreaking hardware.' }
            ];

            loader.style.display = 'none';
            oppGrid.style.display = 'grid';
            renderOpportunities(opportunities);
        }, 1200);
    }

    // Step 3: Populate Opportunity Cards
    function renderOpportunities(data) {
        if (data.length === 0) {
            oppGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-secondary); background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px dashed var(--surface-border);">No opportunities found matching your specific criteria.</div>';
            return;
        }

        oppGrid.innerHTML = data.map((opp, index) => `
            <div class="glass-panel opp-card" style="animation: slideUp 0.5s ease-out ${index * 0.1}s backwards;">
                <div class="opp-header">
                    <div>
                        <h3 class="opp-title">${opp.title}</h3>
                        <div class="opp-company">${opp.company} &bull; ${opp.location}</div>
                    </div>
                </div>
                <div class="opp-description">${opp.desc}</div>
                <div class="opp-footer">
                    <div class="opp-deadline">⏳ ${opp.deadline}</div>
                    <a href="opportunity-details.html?id=${opp.id}" class="btn btn-secondary btn-sm">View Details</a>
                </div>
            </div>
        `).join('');
    }

    // Step 4: Handles Real-time User Filtering
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const category = filterCategory.value;
        const locationFilter = filterLocation.value;

        const filteredData = opportunities.filter(opp => {
            // Check Search
            const matchSearch =
                opp.title.toLowerCase().includes(searchTerm) ||
                opp.company.toLowerCase().includes(searchTerm) ||
                opp.desc.toLowerCase().includes(searchTerm);

            // Check Category
            const matchCategory = category === 'all' || opp.category === category;

            // Check Location
            const matchLocation =
                locationFilter === 'all' ||
                (locationFilter === 'remote' && opp.location === 'Remote') ||
                (locationFilter === 'onsite' && opp.location === 'On-site');

            return matchSearch && matchCategory && matchLocation;
        });

        renderOpportunities(filteredData);
    }

    // Connect event listeners
    searchInput.addEventListener('input', applyFilters);
    filterCategory.addEventListener('change', applyFilters);
    filterLocation.addEventListener('change', applyFilters);

    // Initial Load execution
    fetchOpportunities();
});
