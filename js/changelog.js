document.addEventListener('DOMContentLoaded', () => {
    if (typeof changelogData !== 'undefined') {
        renderChangelog(changelogData);
    } else {
        console.error('Error: changelogData is not defined.');
    }
});

function renderChangelog(data) {
    const container = document.getElementById('changelog-container');
    container.innerHTML = '';
    
    data.forEach(entry => {
        const rack = document.createElement('div');
        rack.className = 'server-rack';
        rack.style.padding = '1.5rem';
        
        const items = entry.items.map(item => `<li>${item}</li>`).join('');
        
        rack.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: var(--cyan-pulse); font-family: var(--font-data)">${entry.date}</h3>
            <ul style="list-style: disc inside; display: flex; flex-direction: column; gap: 0.5rem; color: var(--ash);">
                ${items}
            </ul>
        `;
        
        container.appendChild(rack);
    });
}
