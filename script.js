/**
 * GRURU MUSEUM — Interactive Web Application Logic
 * Implements: Data Booming Engine, Force Graph Simulation, HUD Coordinates,
 * Specimen Labeling, and Everyday Takeaways.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLiveHud();
    initDataBooming();
    initKnowledgeGraph();
    initExhibitionActions();
});

// ==========================================================================
// 1. Live HUD & Navigation Tracking
// ==========================================================================
function initLiveHud() {
    const timeDisplay = document.getElementById('hud-live-clock');
    if (timeDisplay) {
        setInterval(() => {
            const now = new Date();
            timeDisplay.textContent = now.toTimeString().split(' ')[0] + ' UTC+7';
        }, 1000);
    }

    // Scroll Spy for Navigation Links
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Toast helper
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// ==========================================================================
// 2. Data Booming Interactive Engine (Hall 02)
// ==========================================================================
const boomingTopics = {
    herb: {
        id: 'GRM-1872-SCI-014',
        seedName: 'สมุนไพรไทย',
        seedCat: 'ธรรมชาติ & โอสถ',
        seedIcon: '🌿',
        seedDesc: 'คลังภูมิปัญญาพฤกษศาสตร์และการแพทย์แผนไทยที่บันทึกในใบลาน',
        nodes: [
            { id: 'HB1', title: 'แอนโดรกราโฟไลด์', cat: 'วิทยาศาสตร์', shape: '●', color: '#0284C7', desc: 'สารสกัดยับยั้งการแบ่งตัวของไวรัสทางเดินหายใจ', takeaway: 'ใช้รักษาอาการหวัดระยะเริ่มต้น 60-120 มก./วัน' },
            { id: 'HB2', title: 'คัมภีร์เวชศาสตร์ฉบับหลวง', cat: 'ประวัติศาสตร์', shape: '⬡', color: '#EA580C', desc: 'การบันทึกยาตามธาตุเจ้าเรือนสมัยรัชกาลที่ 5', takeaway: 'เข้าใจสมดุล ดิน-น้ำ-ลม-ไฟ ในสุขภาพตนเอง' },
            { id: 'HB3', title: 'AI Screening สมุนไพร', cat: 'เทคโนโลยี', shape: '■', color: '#7C3AED', desc: 'ใช้อัลกอริทึมจำลองการเกาะจับโปรตีนลดเวลาวิจัยยา 80%', takeaway: 'นวัตกรรมสร้างมูลค่าใหม่ให้เกษตรกรไทย' },
            { id: 'HB4', title: 'ตำรับยาตรีผลา', cat: 'ภูมิปัญญา', shape: '▲', color: '#D97706', desc: 'การล้างพิษและปรับสมดุลลำไส้ด้วยสมอไทย สมอพิเภก มะขามป้อม', takeaway: 'จิบชาตรีผลาอุ่นๆ เสริมภูมิคุ้มกันยามเช้า' },
            { id: 'HB5', title: 'เกษตรอินทรีย์ความแม่นยำสูง', cat: 'ธรรมชาติ', shape: '◆', color: '#059669', desc: 'เซนเซอร์ IoT ควบคุมแร่ธาตุในดินให้พืชสร้างสารสำคัญสูงสุด', takeaway: 'เลือกบริโภคพืชสมุนไพรออร์แกนิกที่มีใบรับรอง' },
            { id: 'HB6', title: 'อัตลักษณ์บรรจุภัณฑ์ไทย', cat: 'ศิลปะ', shape: '○', color: '#E11D48', desc: 'ออกแบบแพ็กเกจจิ้งร่วมสมัยด้วยสีย้อมธรรมชาติและใบตองแปรรูป', takeaway: 'ยกระดับสินค้าชุมชนสู่ตลาดสากลด้วยดีไซน์' },
            { id: 'HB7', title: 'มาตรฐาน อย. & GMP', cat: 'วิทยาศาสตร์', shape: '●', color: '#0284C7', desc: 'การทดสอบโลหะหนักและจุลชีพปนเปื้อนในระดับคลินิก', takeaway: 'ตรวจเช็กเลขสารบบ อย. ทุกครั้งก่อนซื้อยาสมุนไพร' },
            { id: 'HB8', title: 'Soft Power Wellness', cat: 'เทคโนโลยี', shape: '■', color: '#7C3AED', desc: 'สร้างมูลค่าทางเศรษฐกิจกว่าแสนล้านในตลาดสปาและสุขภาพโลก', takeaway: 'โอกาสธุรกิจสำหรับผู้ประกอบการและครีเอเตอร์รุ่นใหม่' }
        ]
    },
    architecture: {
        id: 'GRM-1804-ARC-003',
        seedName: 'เรือนไทยเดิม',
        seedCat: 'สถาปัตยกรรม & วิศวกรรม',
        seedIcon: '🏛️',
        seedDesc: 'วิศวกรรมการอยู่อาศัยแบบ Passive Cooling ปรับตัวตามลมมรสุม',
        nodes: [
            { id: 'AR1', title: 'หลักการระบายอากาศธรรมชาติ', cat: 'วิทยาศาสตร์', shape: '●', color: '#0284C7', desc: 'ชายคายื่นยาว 45° และช่องระบายใต้หลังคาพาความร้อนออก', takeaway: 'จัดวางหน้าต่างบ้านรับลมตะวันตกเฉียงใต้ช่วยลดค่าไฟแอร์' },
            { id: 'AR2', title: 'ระบบเข้าเดือยไร้ตะปู', cat: 'ประวัติศาสตร์', shape: '⬡', color: '#EA580C', desc: 'ภูมิปัญญาช่างสลักไม้ที่ถอดประกอบและย้ายบ้านหนีน้ำท่วมได้', takeaway: 'แนวคิด Modular Architecture นำกลับมาใช้ในการก่อสร้างเร็ว' },
            { id: 'AR3', title: 'BIM & 3D Scanning', cat: 'เทคโนโลยี', shape: '■', color: '#7C3AED', desc: 'บันทึกโครงสร้างเรือนไทยโบราณเป็น Digital Twin ก่อนสูญหาย', takeaway: 'สถาปัตย์รุ่นใหม่เรียนรู้โครงสร้างผ่าน AR/VR' },
            { id: 'AR4', title: 'ยกใต้ถุนสูงหนีน้ำท่วม', cat: 'ภูมิปัญญา', shape: '▲', color: '#D97706', desc: 'การอยู่ร่วมกับธรรมชาติในฤดูน้ำหลากโดยไม่ต้องสร้างคันกั้น', takeaway: 'ออกแบบพื้นที่ชั้นล่างแบบอเนกประสงค์รองรับภูมิอากาศแปรปรวน' },
            { id: 'AR5', title: 'ไม้สักทองและการปลูกทดแทน', cat: 'ธรรมชาติ', shape: '◆', color: '#059669', desc: 'การคัดเลือกไม้ทนปลวกและระบบวนเกษตรยั่งยืน', takeaway: 'สนับสนุนวัสดุก่อสร้างคาร์บอนต่ำที่มาจากการปลูกทดแทน' },
            { id: 'AR6', title: 'ลวดลายกระจังและฝาปะกน', cat: 'ศิลปะ', shape: '○', color: '#E11D48', desc: 'สัดส่วนทองคำแบบไทยที่ให้ทั้งความแข็งแรงและความงามทางสายตา', takeaway: 'ประยุกต์ลายกราฟิกไทยลงในงานอินทีเรียร์โมเดิร์น' }
        ]
    }
};

let currentTopicKey = 'herb';
let boomActive = false;

function initDataBooming() {
    const canvas = document.getElementById('booming-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const orbitContainer = document.getElementById('orbit-nodes-layer');
    const seedNodeEl = document.getElementById('booming-seed-node');
    const triggerBtn = document.getElementById('btn-boom-action');
    const resetBtn = document.getElementById('btn-boom-reset');
    const topicSelect = document.getElementById('booming-topic-select');

    if (topicSelect) {
        topicSelect.addEventListener('change', (e) => {
            currentTopicKey = e.target.value;
            resetBoom(ctx, canvas, orbitContainer);
            updateSeedUI();
        });
    }

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
            runBoomingAnimation(ctx, canvas, orbitContainer);
        });
    }

    if (seedNodeEl) {
        seedNodeEl.addEventListener('click', () => {
            runBoomingAnimation(ctx, canvas, orbitContainer);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetBoom(ctx, canvas, orbitContainer);
        });
    }

    updateSeedUI();
}

function updateSeedUI() {
    const data = boomingTopics[currentTopicKey];
    const nameEl = document.getElementById('seed-name-display');
    const catEl = document.getElementById('seed-cat-display');
    const iconEl = document.getElementById('seed-icon-display');
    if (nameEl) nameEl.textContent = data.seedName;
    if (catEl) catEl.textContent = data.seedCat;
    if (iconEl) iconEl.textContent = data.seedIcon;

    document.getElementById('specimen-id-display').textContent = data.id;
    document.getElementById('node-title-inspect').textContent = data.seedName;
    document.getElementById('node-desc-inspect').textContent = data.seedDesc;
    document.getElementById('takeaway-inspect').textContent = 'คลิกปุ่ม "💥 ระเบิดความรู้ (DATA BOOMING)" หรือคลิกที่โหนดเพื่อดูความเชื่อมโยง';
}

function runBoomingAnimation(ctx, canvas, orbitContainer) {
    if (boomActive) return;
    boomActive = true;

    const data = boomingTopics[currentTopicKey];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 175;

    orbitContainer.innerHTML = '';
    document.getElementById('boom-status-label').textContent = 'CASCADE BURSTING IN 40ms...';
    document.getElementById('boom-status-label').style.color = '#7C3AED';

    let totalConnections = 0;

    data.nodes.forEach((node, i) => {
        setTimeout(() => {
            const angle = (i / data.nodes.length) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Create Node element
            const el = document.createElement('div');
            el.className = 'booming-child-node';
            el.style.position = 'absolute';
            el.style.left = `${x - 45}px`;
            el.style.top = `${y - 25}px`;
            el.style.width = '90px';
            el.style.padding = '6px 4px';
            el.style.background = '#FFFFFF';
            el.style.border = `2px solid ${node.color}`;
            el.style.borderRadius = '6px';
            el.style.textAlign = 'center';
            el.style.cursor = 'pointer';
            el.style.boxShadow = `0 4px 14px rgba(0,0,0,0.08), 0 0 12px ${node.color}33`;
            el.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transform = 'scale(0)';

            el.innerHTML = `
                <div style="font-size:9px; font-weight:700; color:${node.color}; font-family:var(--font-mono);">${node.shape} ${node.cat}</div>
                <div style="font-size:10.5px; font-weight:700; color:#0B0B0F; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${node.title}</div>
            `;

            el.addEventListener('mouseenter', () => {
                el.style.transform = 'scale(1.15)';
                inspectNode(node);
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });

            el.addEventListener('click', () => {
                inspectNode(node);
                showToast(`โหลดข้อมูล: ${node.title}`);
            });

            orbitContainer.appendChild(el);

            requestAnimationFrame(() => {
                el.style.transform = 'scale(1)';
            });

            // Draw rays
            drawBoomRays(ctx, canvas, data.nodes.slice(0, i + 1), radius);

            totalConnections += Math.floor(Math.random() * 4) + 3;
            document.getElementById('boom-connection-count').textContent = totalConnections;

            if (i === data.nodes.length - 1) {
                document.getElementById('boom-status-label').textContent = `ACTIVE • ${data.nodes.length} NODES LINKED`;
                document.getElementById('boom-status-label').style.color = '#15803D';
                inspectNode(data.nodes[0]);
            }
        }, i * 40); // 40ms stagger per brief!
    });
}

function drawBoomRays(ctx, canvas, activeNodes, radius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw ambient ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(215, 255, 58, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw lines to nodes
    activeNodes.forEach((node, i) => {
        const total = boomingTopics[currentTopicKey].nodes.length;
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${node.color}55`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
    });
}

function inspectNode(node) {
    document.getElementById('specimen-id-display').textContent = `GRM-NODE-${node.id}`;
    document.getElementById('node-title-inspect').textContent = `${node.shape} ${node.title} (${node.cat})`;
    document.getElementById('node-desc-inspect').textContent = node.desc;
    document.getElementById('takeaway-inspect').textContent = node.takeaway;
}

function resetBoom(ctx, canvas, orbitContainer) {
    boomActive = false;
    orbitContainer.innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('boom-status-label').textContent = 'STANDBY (กดปุ่มจุดระเบิดเพื่อดูผลลัพธ์)';
    document.getElementById('boom-status-label').style.color = 'var(--gr-ember)';
    document.getElementById('boom-connection-count').textContent = '0';
    updateSeedUI();
}

// ==========================================
// 3. Knowledge Graph Explorer (Hall 03)
// ==========================================
const graphDataset = [
    { id: 1, name: 'ศิลาจารึกสุโขทัย', cat: 'ประวัติศาสตร์', year: 1835, x: 120, y: 150, r: 18, color: '#EA580C', shape: '⬡' },
    { id: 2, name: 'อักษรไทยลายสือไทย', cat: 'ศิลปะ', year: 1835, x: 220, y: 120, r: 16, color: '#E11D48', shape: '○' },
    { id: 3, name: 'ดาราศาสตร์สุริยุปราคา', cat: 'วิทยาศาสตร์', year: 2411, x: 380, y: 160, r: 24, color: '#0284C7', shape: '●' },
    { id: 4, name: 'พระจอมเกล้าฯ (ร.4)', cat: 'ประวัติศาสตร์', year: 2411, x: 290, y: 220, r: 22, color: '#EA580C', shape: '⬡' },
    { id: 5, name: 'หว้ากอ สถานีทดลอง', cat: 'วิทยาศาสตร์', year: 2411, x: 450, y: 230, r: 16, color: '#0284C7', shape: '●' },
    { id: 6, name: 'การแพทย์แผนไทยคัมภีร์ใบลาน', cat: 'ภูมิปัญญา', year: 2430, x: 160, y: 290, r: 20, color: '#D97706', shape: '▲' },
    { id: 7, name: 'โรงพยาบาลศิริราชยุคแรก', cat: 'ประวัติศาสตร์', year: 2431, x: 260, y: 320, r: 18, color: '#EA580C', shape: '⬡' },
    { id: 8, name: 'ฟ้าทะลายโจร แอนโดรกราโฟไลด์', cat: 'ธรรมชาติ', year: 2540, x: 140, y: 400, r: 20, color: '#059669', shape: '◆' },
    { id: 9, name: 'ยาสมุนไพรต้านไวรัสร่วมสมัย', cat: 'เทคโนโลยี', year: 2564, x: 310, y: 410, r: 22, color: '#7C3AED', shape: '■' },
    { id: 10, name: 'Thai LLM โมเดลภาษาไทย', cat: 'เทคโนโลยี', year: 2568, x: 480, y: 350, r: 26, color: '#7C3AED', shape: '■' },
    { id: 11, name: 'เรือนไทย ปรับอุณหภูมิตามลม', cat: 'ภูมิปัญญา', year: 2350, x: 550, y: 180, r: 18, color: '#D97706', shape: '▲' },
    { id: 12, name: 'Passive Solar Architecture', cat: 'วิทยาศาสตร์', year: 2565, x: 620, y: 260, r: 20, color: '#0284C7', shape: '●' }
];

const graphLinks = [
    { source: 1, target: 2, relation: 'ต้นกำเนิดของ' },
    { source: 3, target: 4, relation: 'คำนวณและนำการทดลอง' },
    { source: 3, target: 5, relation: 'สถานที่สังเกตการณ์' },
    { source: 4, target: 7, relation: 'รากฐานการก่อตั้ง' },
    { source: 6, target: 7, relation: 'ผสมผสานสู่ระบบการแพทย์' },
    { source: 6, target: 8, relation: 'บันทึกสรรพคุณสมุนไพร' },
    { source: 8, target: 9, relation: 'สกัดสารสำคัญสู่ตำรับ' },
    { source: 9, target: 10, relation: 'ป้อนข้อมูลเข้าโมเดล AI' },
    { source: 11, target: 12, relation: 'ต่อยอดสู่สถาปัตยกรรมเขียว' },
    { source: 1, target: 10, relation: 'ชุดข้อมูลประวัติศาสตร์' }
];

let selectedCategory = 'all';
let maxYearFilter = 2570;
let searchQuery = '';

function initKnowledgeGraph() {
    const canvas = document.getElementById('full-graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Filter pills
    const pills = document.querySelectorAll('.graph-cat-btn');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedCategory = pill.dataset.cat;
            renderGraph(ctx, canvas);
        });
    });

    // Time slider
    const slider = document.getElementById('graph-year-slider');
    const yearDisplay = document.getElementById('graph-year-val');
    if (slider) {
        slider.addEventListener('input', (e) => {
            maxYearFilter = parseInt(e.target.value);
            if (yearDisplay) yearDisplay.textContent = `ถึง พ.ศ. ${maxYearFilter}`;
            renderGraph(ctx, canvas);
        });
    }

    // Search input
    const searchInput = document.getElementById('graph-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderGraph(ctx, canvas);
        });
    }

    // Canvas click detection
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

        const clicked = graphDataset.find(n => {
            const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
            return dist <= n.r + 6;
        });

        if (clicked) {
            showToast(`สำรวจโหนด: ${clicked.name} (พ.ศ. ${clicked.year})`);
        }
    });

    renderGraph(ctx, canvas);
}

function renderGraph(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filtered nodes
    const visibleNodes = graphDataset.filter(n => {
        const matchCat = (selectedCategory === 'all' || n.cat === selectedCategory);
        const matchYear = n.year <= maxYearFilter;
        const matchSearch = (!searchQuery || n.name.toLowerCase().includes(searchQuery) || n.cat.toLowerCase().includes(searchQuery));
        return matchCat && matchYear && matchSearch;
    });

    const visibleIds = new Set(visibleNodes.map(n => n.id));

    // Draw Links
    graphLinks.forEach(link => {
        if (visibleIds.has(link.source) && visibleIds.has(link.target)) {
            const src = graphDataset.find(n => n.id === link.source);
            const tgt = graphDataset.find(n => n.id === link.target);

            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(tgt.x, tgt.y);
            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Link relation text
            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;
            ctx.font = '10px Chakra Petch';
            ctx.fillStyle = '#94A3B8';
            ctx.fillText(link.relation, midX, midY - 4);
        }
    });

    // Draw Nodes
    visibleNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Shape icon inside node
        ctx.font = 'bold 12px Chakra Petch';
        ctx.fillStyle = node.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.shape, node.x, node.y);

        // Node Label
        ctx.font = '600 11px IBM Plex Sans Thai';
        ctx.fillStyle = '#0B0B0F';
        ctx.fillText(node.name, node.x, node.y + node.r + 14);

        // Year badge
        ctx.font = '10px Consolas';
        ctx.fillStyle = '#64748B';
        ctx.fillText(`พ.ศ. ${node.year}`, node.x, node.y + node.r + 28);
    });

    const countEl = document.getElementById('graph-visible-count');
    if (countEl) countEl.textContent = `${visibleNodes.length} / ${graphDataset.length} โหนด`;
}

// ==========================================================================
// 4. Exhibition Cards & Everyday Lab Actions
// ==========================================================================
function initExhibitionActions() {
    // Copy takeaway buttons
    document.querySelectorAll('.btn-copy-takeaway').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.hud-card');
            const title = card.querySelector('.exhibit-title, .takeaway-title')?.textContent || 'ความรู้';
            const takeaway = card.querySelector('.takeaway-text')?.textContent || '';
            navigator.clipboard.writeText(`${title}: ${takeaway}`).then(() => {
                showToast(`คัดลอก Everyday Takeaway แล้ว! พร้อมแชร์ต่อ`);
            });
        });
    });

    // Save collection buttons
    document.querySelectorAll('.btn-bookmark-item').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast(`บันทึกเข้าคอลเลกชันส่วนตัวเรียบร้อยแล้ว (Save to Collection)`);
        });
    });
}
