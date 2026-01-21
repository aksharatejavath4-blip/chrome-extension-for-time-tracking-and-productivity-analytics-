document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('stats-container');

    chrome.storage.local.get(null, (data) => {
        if (Object.keys(data).length === 0) {
            container.innerHTML = "<p>No data tracked yet.</p>";
            return;
        }

        for (const [url, seconds] of Object.entries(data)) {
            const minutes = Math.floor(seconds / 60);
            const row = document.createElement('div');
            row.className = 'site-row';
            row.innerHTML = `<span>${url}</span><span class="time">${minutes}m</span>`;
            container.appendChild(row);
        }
    });

    document.getElementById('clearBtn').onclick = () => {
        chrome.storage.local.clear(() => location.reload());
    };
});
