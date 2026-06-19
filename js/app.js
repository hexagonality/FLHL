document.addEventListener('DOMContentLoaded', () => {
    if (typeof hostsData !== 'undefined') {
        renderHosts(hostsData);
        setupFilters();
    } else {
        console.error('Error: hostsData is not defined.');
    }
});

function renderHosts(data) {
    const container = document.getElementById('hosts-container');
    container.innerHTML = ''; // clear

    const sections = ['low', 'new', 'bad'];
    
    sections.forEach(sec_id => {
        const isActive = sec_id === 'low' ? 'active' : '';
        const sectionDiv = document.createElement('div');
        sectionDiv.id = `sec-${sec_id}`;
        sectionDiv.className = `archive-section ${isActive}`;
        
        const cards = data[sec_id];
        
        cards.forEach((c, i) => {
            const content_id = `content-${sec_id}-${i}`;
            const rack = document.createElement('div');
            rack.className = 'server-rack';
            
            const flags_html = c.flags.map(flag => `<img src="${flag}" class="flags" alt="" aria-hidden="true" width="20" height="15">`).join(' ');
            const flags_li = flags_html ? `<li>Flags: ${flags_html}</li>` : '';
            
            const discord_li = (c.discord && c.discord !== '#') ? `<li><a href="${c.discord}" target="_blank" style="color: var(--cyan-pulse)">Discord Server</a></li>` : '';
            const bench_li = c.bench !== '?' ? `<li>Benchmark: ${c.bench}</li>` : '';
            
            const content_items = c.content.map(item => `<li>${item}</li>`).join('');
            
            const desc_html = c.desc ? `<div class="rack-desc">${c.desc}</div>` : '';

            rack.innerHTML = `
                <div class="rack-header-container">
                    <button class="rack-toggle" aria-expanded="false" aria-controls="${content_id}">
                        <div class="rack-icon">
                            <img src="${c.icon}" alt="${c.title} Logo" width="40" height="40">
                        </div>
                        <div class="rack-title">
                            <h3>${c.title}</h3>
                            <div class="rack-meta">Location: ${c.location}</div>
                        </div>
                        <div class="rack-stats">
                            <div class="rack-stat-item">
                                <span class="rack-stat-label">RAM</span>
                                <span>${c.ram}</span>
                            </div>
                            <div class="rack-stat-item">
                                <span class="rack-stat-label">DISK</span>
                                <span>${c.disk}</span>
                            </div>
                            <div class="rack-stat-item">
                                <span class="rack-stat-label">24/7</span>
                                <span>${c.uptime}</span>
                            </div>
                        </div>
                        <div class="rack-rating">
                            ${c.rating} ★
                        </div>
                    </button>
                    <div class="rack-actions">
                        <a href="${c.website}" target="_blank" class="btn-primary">Visit</a>
                    </div>
                </div>
                <div id="${content_id}" class="rack-content">
                    ${desc_html}
                    <ul>
                        ${bench_li}
                        ${content_items}
                        ${flags_li}
                        ${discord_li}
                    </ul>
                </div>
            `;
            
            sectionDiv.appendChild(rack);
        });
        
        container.appendChild(sectionDiv);
    });

    // Re-attach accordion listeners
    document.querySelectorAll('.rack-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !expanded);
            const content = document.getElementById(button.getAttribute('aria-controls'));
            if (content) content.classList.toggle('open');
        });
    });
}

function showSection(id) {
    document.querySelectorAll(".archive-section").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".filter-btn").forEach(el => el.classList.remove("active"));
    document.getElementById("sec-" + id).classList.add("active");
    // Find the button that called this and make it active
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(b => {
        if (b.getAttribute('onclick').includes(id)) {
            b.classList.add("active");
        }
    });
}

function setupFilters() {
    window.showSection = showSection;
}
