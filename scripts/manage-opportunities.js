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

    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const tableBody = document.getElementById('manage-table-body');
    const emptyState = document.getElementById('manage-empty');

    // Edit modal elements
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Load and render
    renderTable();

    // Search & Filter listeners
    searchInput.addEventListener('input', renderTable);
    categoryFilter.addEventListener('change', renderTable);

    // Close modal
    cancelEditBtn.addEventListener('click', () => {
        editModal.classList.remove('show');
    });

    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) editModal.classList.remove('show');
    });

    // Save edit
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const opportunities = JSON.parse(localStorage.getItem('opphub_opportunities') || '[]');
        const index = opportunities.findIndex(o => o.id === id);

        if (index !== -1) {
            opportunities[index] = {
                ...opportunities[index],
                title: document.getElementById('edit-title').value.trim(),
                category: document.getElementById('edit-category').value,
                description: document.getElementById('edit-description').value.trim(),
                eligibility: document.getElementById('edit-eligibility').value.trim(),
                organization: document.getElementById('edit-organization').value.trim(),
                location: document.getElementById('edit-location').value.trim(),
                link: document.getElementById('edit-link').value.trim(),
                deadline: document.getElementById('edit-deadline').value
            };

            localStorage.setItem('opphub_opportunities', JSON.stringify(opportunities));
            editModal.classList.remove('show');
            renderTable();
        }
    });

    function renderTable() {
        const opportunities = JSON.parse(localStorage.getItem('opphub_opportunities') || '[]');
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryValue = categoryFilter.value;

        let filtered = opportunities;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(o =>
                o.title.toLowerCase().includes(searchTerm) ||
                o.organization.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        if (categoryValue) {
            filtered = filtered.filter(o => o.category === categoryValue);
        }

        if (filtered.length === 0) {
            tableBody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        tableBody.innerHTML = filtered.map(opp => {
            const status = getStatus(opp.deadline);
            return `
                <tr>
                    <td>
                        <strong>${escapeHtml(opp.title)}</strong><br>
                        <span style="color: var(--text-secondary); font-size: 0.82rem;">${escapeHtml(opp.organization)}</span>
                    </td>
                    <td><span class="category-badge">${escapeHtml(opp.category)}</span></td>
                    <td>${formatDate(opp.deadline)}</td>
                    <td><span class="status-badge ${status.class}">${status.icon} ${status.label}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="action-btn edit" onclick="openEdit('${opp.id}')">✏️ Edit</button>
                            <button class="action-btn delete" onclick="deleteOpp('${opp.id}')">🗑️ Delete</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Make functions global for inline onclick
    window.openEdit = function(id) {
        const opportunities = JSON.parse(localStorage.getItem('opphub_opportunities') || '[]');
        const opp = opportunities.find(o => o.id === id);
        if (!opp) return;

        document.getElementById('edit-id').value = opp.id;
        document.getElementById('edit-title').value = opp.title;
        document.getElementById('edit-category').value = opp.category;
        document.getElementById('edit-description').value = opp.description || '';
        document.getElementById('edit-eligibility').value = opp.eligibility || '';
        document.getElementById('edit-organization').value = opp.organization || '';
        document.getElementById('edit-location').value = opp.location || '';
        document.getElementById('edit-link').value = opp.link || '';
        document.getElementById('edit-deadline').value = opp.deadline || '';

        editModal.classList.add('show');
    };

    window.deleteOpp = function(id) {
        if (!confirm('Are you sure you want to delete this opportunity? This action cannot be undone.')) return;

        let opportunities = JSON.parse(localStorage.getItem('opphub_opportunities') || '[]');
        opportunities = opportunities.filter(o => o.id !== id);
        localStorage.setItem('opphub_opportunities', JSON.stringify(opportunities));
        renderTable();
    };
});

function getStatus(deadline) {
    const today = new Date();
    const d = new Date(deadline);
    const diff = (d - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return { label: 'Expired', class: 'status-expired', icon: '✕' };
    if (diff <= 7) return { label: 'Expiring', class: 'status-expiring', icon: '⚠' };
    return { label: 'Active', class: 'status-active', icon: '●' };
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
