const API_URL = 'http://localhost:3000/api/feedback';

let feedbacks = [];

document.addEventListener('DOMContentLoaded', () => {
    getFeedbacks();

    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    const filterDivision = document.getElementById('filterDivision');
    const feedbackForm = document.getElementById('feedbackForm');
    const editForm = document.getElementById('editForm');
    const editModal = document.getElementById('editModal');
    const feedbackList = document.getElementById('feedbackList');

    if (searchInput) searchInput.addEventListener('input', renderFeedbackList);
    if (filterStatus) filterStatus.addEventListener('change', renderFeedbackList);
    if (filterDivision) filterDivision.addEventListener('change', renderFeedbackList);
    
    if (feedbackForm) feedbackForm.addEventListener('submit', handleCreate);
    if (editForm) editForm.addEventListener('submit', handleUpdate);
    
  
    if (feedbackList) {
        feedbackList.addEventListener('click', (e) => {
            const target = e.target;
            const id = target.getAttribute('data-id');

            if (target.classList.contains('btn-edit')) {
                openEditModal(id);
            }

            if (target.classList.contains('btn-delete')) {
                deleteFeedback(id);
            }
        });
    }

    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === this) closeEditModal();
        });
        
        const closeBtn = editModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEditModal);
        }
    }
});


async function getFeedbacks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to connect to backend');
        feedbacks = await response.json();
        console.log("Data loaded:", feedbacks);
        renderFeedbackList();
    } catch (error) {
        console.error('Error fetching data:', error);
        const list = document.getElementById('feedbackList');
        if(list) list.innerHTML = '<p style="color:red">Gagal mengambil data. Pastikan server backend sudah berjalan.</p>';
    }
}


async function handleCreate(e) {
    e.preventDefault();
    
    const feedback = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        eventName: document.getElementById('eventName').value,
        division: document.getElementById('division').value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
        comment: document.getElementById('comment').value,
        suggestion: document.getElementById('suggestion').value,
        status: 'open'
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback)
        });

        if (response.ok) {
            const successMsg = document.getElementById('success-message');
            if(successMsg) {
                successMsg.classList.add('active');
                setTimeout(() => successMsg.classList.remove('active'), 3000);
            }
            e.target.reset(); 
            getFeedbacks(); 
        }
    } catch (error) {
        alert('Error: Gagal mengirim feedback.');
        console.error(error);
    }
}


async function deleteFeedback(id) {
    if (!id) {
        console.error("No ID provided for deletion");
        return;
    }
    
    if (confirm('Apakah Anda yakin ingin menghapus feedback ini?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            getFeedbacks();
        } catch (error) {
            alert('Gagal menghapus data.');
            console.error(error);
        }
    }
};


async function handleUpdate(e) {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    
    const updatedData = {
        eventName: document.getElementById('editEventName').value,
        division: document.getElementById('editDivision').value,
        rating: parseInt(document.querySelector('input[name="editRating"]:checked').value),
        status: document.getElementById('editStatus').value,
        comment: document.getElementById('editComment').value,
        suggestion: document.getElementById('editSuggestion').value
    };
    
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        
        closeEditModal();
        getFeedbacks();
    } catch (error) {
        alert('Gagal mengupdate data.');
        console.error(error);
    }
}

//helper functions

window.switchTab = function(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    const button = event.target; 
    if(button) button.classList.add('active');
    
    document.getElementById(tabId).classList.add('active');
    if (tabId === 'admin-panel') getFeedbacks();
};

function openEditModal(id) {
    console.log("Opening edit for ID:", id);
    const feedback = feedbacks.find(f => (f.id == id) || (f._id == id));
    
    if (!feedback) {
        console.error("Feedback not found in local data for ID:", id);
        return;
    }

    const editIdInput = document.getElementById('editId');
    if(editIdInput) editIdInput.value = feedback.id || feedback._id;
    
    document.getElementById('editEventName').value = feedback.eventName || '';
    document.getElementById('editDivision').value = feedback.division || '';
    
    const ratingRadio = document.querySelector(`input[name="editRating"][value="${feedback.rating}"]`);
    if(ratingRadio) ratingRadio.checked = true;

    document.getElementById('editStatus').value = feedback.status || 'open';
    document.getElementById('editComment').value = feedback.comment || '';
    document.getElementById('editSuggestion').value = feedback.suggestion || '';
    
    document.getElementById('editModal').classList.add('active');
};

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if(modal) modal.classList.remove('active');
};

function renderFeedbackList() {
    const searchInput = document.getElementById('searchInput');
    const filterStatus = document.getElementById('filterStatus');
    const filterDivision = document.getElementById('filterDivision');

    if (!searchInput || !filterStatus || !filterDivision) return;

    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = filterStatus.value;
    const divisionValue = filterDivision.value;
    
    let filtered = feedbacks.filter(f => {
        const matchSearch = (f.name?.toLowerCase() || '').includes(searchTerm) || 
                           (f.eventName?.toLowerCase() || '').includes(searchTerm);
        const matchStatus = !statusValue || f.status === statusValue;
        const matchDivision = !divisionValue || f.division === divisionValue;
        return matchSearch && matchStatus && matchDivision;
    });
    
    const listContainer = document.getElementById('feedbackList');
    if(!listContainer) return;
    
    if (filtered.length === 0) {
        listContainer.innerHTML = '<p>Tidak ada feedback yang ditemukan.</p>';
        return;
    }
    
    listContainer.innerHTML = filtered.map(f => {
        const safeId = f.id || f._id;
        
        return `
        <div class="feedback-item">
            <div class="feedback-header">
                <div>
                    <h3>${f.name} - ${f.eventName}</h3>
                    <div class="feedback-info">
                        ${f.email} | ${f.division} | Rating: ${f.rating}/5 | ${f.createdAt ? new Date(f.createdAt).toLocaleDateString('id-ID') : 'Baru saja'}
                    </div>
                </div>
                <span class="status-badge status-${f.status}">${f.status}</span>
            </div>
            ${f.comment ? `<p><strong>Komentar:</strong> ${f.comment}</p>` : ''}
            ${f.suggestion ? `<p><strong>Saran:</strong> ${f.suggestion}</p>` : ''}
            <div class="feedback-actions">
                <button class="btn-edit" data-id="${safeId}">Edit</button>
                <button class="btn-delete" data-id="${safeId}">Hapus</button>
            </div>
        </div>
    `}).join('');
}