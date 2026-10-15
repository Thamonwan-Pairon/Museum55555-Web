const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches (16:9)
    pptx.author = 'GRURU MUSEUM Project Team';
    pptx.company = 'Ministry of Digital Economy and Society Presentation';
    pptx.title = 'GRURU MUSEUM: Future Archaeology Platform - Ministerial Presentation';

    // Color Palette based on Project Brief
    // Light Background Tech Style
    const BG_LIGHT = 'F8FAFC';       // Crisp light gallery background
    const CARD_BG = 'FFFFFF';        // White HUD card
    const CARD_BORDER = 'E2E8F0';    // Subtle border
    const COLOR_VOID = '0B0B0F';     // Void Black for main text
    const COLOR_FOG = '64748B';      // Muted Fog for secondary text
    const COLOR_LIME = '84CC16';     // Specimen Lime accent (rendered darker for contrast on white: #65A30D / #84CC16)
    const COLOR_LIME_BRIGHT = 'D7FF3A';
    const COLOR_EMBER = 'FF5A1F';    // Ember Orange (Past)
    const COLOR_VIOLET = '8C6BFF';   // Quantum Violet (Tech/Future)
    const COLOR_CYAN = '0284C7';     // Hologram Cyan / Science (accessible on white)
    const COLOR_AMBER = 'D97706';    // Wisdom Amber
    const COLOR_GREEN = '059669';    // Bio Green

    const fontHeading = 'Chakra Petch';
    const fontBody = 'IBM Plex Sans Thai';
    const fontMono = 'Consolas';

    const logoPath = path.join(__dirname, 'gruru_logo.jpg');
    const futureLabPath = path.join(__dirname, 'gruru_future_lab.jpg');
    const kgPath1 = path.join(__dirname, 'ChatGPT Image Oct 8, 2026, 09_53_32 PM-1.png');
    const kgPath4 = path.join(__dirname, 'ChatGPT Image Oct 8, 2026, 09_53_35 PM-4.png');

    // Helper to add header HUD banner to standard slides
    function addHeader(slide, title, category, specimenCode) {
        // Background
        slide.background = { color: BG_LIGHT };

        // Top accent line
        slide.addShape(pptx.ShapeType.rect, {
            x: 0, y: 0, w: '100%', h: 0.08,
            fill: { color: COLOR_EMBER }
        });

        // Specimen Label pill
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 0.25, w: 2.8, h: 0.32, r: 0.05,
            fill: { color: 'F1F5F9' },
            line: { color: 'CBD5E1', width: 1 }
        });
        slide.addText(specimenCode || 'GRM-2026-MIN-DIGITAL', {
            x: 0.85, y: 0.25, w: 2.7, h: 0.32,
            fontFace: fontMono, fontSize: 10, bold: true, color: COLOR_VOID, align: 'left', valign: 'middle'
        });

        // Category pill
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 3.7, y: 0.25, w: 2.2, h: 0.32, r: 0.05,
            fill: { color: 'EFF6FF' },
            line: { color: 'BFDBFE', width: 1 }
        });
        slide.addText(`HALL // ${category || 'STRATEGY'}`, {
            x: 3.75, y: 0.25, w: 2.1, h: 0.32,
            fontFace: fontMono, fontSize: 9.5, bold: true, color: '1D4ED8', align: 'left', valign: 'middle'
        });

        // Slide title
        slide.addText(title, {
            x: 0.8, y: 0.65, w: 8.4, h: 0.65,
            fontFace: fontHeading, fontSize: 22, bold: true, color: COLOR_VOID, align: 'left', valign: 'middle'
        });

        // Subtle divider line
        slide.addShape(pptx.ShapeType.line, {
            x: 0.8, y: 1.35, w: 8.4, h: 0,
            line: { color: 'E2E8F0', width: 1.5 }
        });

        // Footer
        slide.addText('GRURU MUSEUM — Future Archaeology Platform | นำเสนอรัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม', {
            x: 0.8, y: 5.25, w: 7.5, h: 0.3,
            fontFace: fontBody, fontSize: 9, color: COLOR_FOG, align: 'left', valign: 'middle'
        });
        slide.addText('CONFIDENTIAL • NATIONAL STRATEGY', {
            x: 7.2, y: 5.25, w: 2.0, h: 0.3,
            fontFace: fontMono, fontSize: 8.5, color: COLOR_EMBER, align: 'right', valign: 'middle'
        });
    }

    // ==========================================
    // SLIDE 1: Title & Strategic Vision
    // ==========================================
    {
        const slide = pptx.addSlide();
        slide.background = { color: BG_LIGHT };

        // Tech grid border accents
        slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: COLOR_EMBER } });
        slide.addShape(pptx.ShapeType.rect, { x: 0, y: 5.525, w: '100%', h: 0.1, fill: { color: COLOR_VIOLET } });

        // Specimen Tag
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 0.6, w: 3.5, h: 0.38, r: 0.05,
            fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
        });
        slide.addText('SPECIMEN // GRM-2026-EXEC-001', {
            x: 0.9, y: 0.6, w: 3.3, h: 0.38,
            fontFace: fontMono, fontSize: 10, bold: true, color: COLOR_VOID, align: 'left', valign: 'middle'
        });

        // Subtitle badge
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 4.5, y: 0.6, w: 4.7, h: 0.38, r: 0.05,
            fill: { color: 'FEF3C7' }, line: { color: 'FDE68A', width: 1 }
        });
        slide.addText('ข้อเสนอเชิงยุทธศาสตร์: นวัตกรรมโครงสร้างพื้นฐานความรู้ดิจิทัล', {
            x: 4.6, y: 0.6, w: 4.5, h: 0.38,
            fontFace: fontBody, fontSize: 9.5, bold: true, color: 'B45309', align: 'left', valign: 'middle'
        });

        // Title
        slide.addText('GRURU MUSEUM', {
            x: 0.8, y: 1.25, w: 5.5, h: 0.8,
            fontFace: fontHeading, fontSize: 36, bold: true, color: COLOR_VOID, letterSpacing: 1
        });

        // Tagline
        slide.addText('Future Archaeology Platform', {
            x: 0.8, y: 1.95, w: 5.5, h: 0.45,
            fontFace: fontHeading, fontSize: 18, bold: true, color: COLOR_EMBER
        });

        slide.addText('“New Knowledge. New Storytelling. Built for Everyday Living.”\nปลุกคลังภูมิปัญญาและประวัติศาสตร์ไทยสู่โครงสร้างกราฟความรู้ดิจิทัล เพื่อชีวิตคนรุ่นใหม่', {
            x: 0.8, y: 2.5, w: 5.2, h: 1.1,
            fontFace: fontBody, fontSize: 13, color: '334155', lineSpacingMultiple: 1.3
        });

        // Highlight Metric Cards (3-Second Booming Impact)
        const metrics = [
            { num: '3-5 วินาที', label: 'เข้าใจความเชื่อมโยงทันที', color: COLOR_EMBER },
            { num: '100% Verified', label: 'ตรวจสอบแหล่งอ้างอิงได้', color: COLOR_CYAN },
            { num: 'Everyday Takeaway', label: 'นำไปใช้ได้จริงทุกวัน', color: COLOR_GREEN }
        ];

        metrics.forEach((m, idx) => {
            const cardX = 0.8 + idx * 1.75;
            slide.addShape(pptx.ShapeType.roundRect, {
                x: cardX, y: 3.8, w: 1.65, h: 0.95, r: 0.08,
                fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1.5 }
            });
            slide.addText(m.num, {
                x: cardX, y: 3.88, w: 1.65, h: 0.4,
                fontFace: fontHeading, fontSize: 12, bold: true, color: m.color, align: 'center'
            });
            slide.addText(m.label, {
                x: cardX + 0.05, y: 4.25, w: 1.55, h: 0.45,
                fontFace: fontBody, fontSize: 8.5, color: COLOR_FOG, align: 'center'
            });
        });

        // Embedded Logo Image (Right Side)
        if (fs.existsSync(logoPath)) {
            slide.addImage({
                path: logoPath,
                x: 6.2, y: 1.3, w: 3.2, h: 3.2,
                sizing: { type: 'contain' }
            });
            slide.addShape(pptx.ShapeType.roundRect, {
                x: 6.2, y: 4.6, w: 3.2, h: 0.35, r: 0.05,
                fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
            });
            slide.addText('EMBLEM: THAI PRAJUMYAM x QUANTUM GRAPH', {
                x: 6.2, y: 4.6, w: 3.2, h: 0.35,
                fontFace: fontMono, fontSize: 7.5, bold: true, color: COLOR_FOG, align: 'center', valign: 'middle'
            });
        }

        // Presenter info
        slide.addText('นำเสนอต่อ: ฯพณฯ รัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (MDES)\nโดย: คณะทำงานยุทธศาสตร์นวัตกรรมข้อมูลดิจิทัล GRURU MUSEUM', {
            x: 0.8, y: 4.9, w: 5.2, h: 0.5,
            fontFace: fontBody, fontSize: 9.5, color: '64748B'
        });
    }

    // ==========================================
    // SLIDE 2: Strategic Problem & National Opportunity
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'ปัญหาเชิงยุทธศาสตร์ & โอกาสของประเทศไทยในยุค Data & AI', 'NATIONAL CRISIS & OPPORTUNITY', 'GRM-2026-STRAT-002');

        // Left Column: The 3 Bottlenecks
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 1.55, w: 4.1, h: 3.5, r: 0.08,
            fill: { color: 'FFFFFF' }, line: { color: 'FCA5A5', width: 1.5 }
        });
        slide.addText('3 ปัญหาใหญ่ของ "คลังความรู้ชาติ" ในปัจจุบัน', {
            x: 1.0, y: 1.7, w: 3.7, h: 0.4,
            fontFace: fontHeading, fontSize: 13, bold: true, color: 'DC2626'
        });

        const painPoints = [
            { icon: '❌', title: 'Data Silo & Unstructured', desc: 'ข้อมูลประวัติศาสตร์ วิทยาศาสตร์ และภูมิปัญญากว่า 80% ติดอยู่ในเอกสาร PDF หนังสือเก่า หรือฐานข้อมูลแยกส่วน ไม่พร้อมสำหรับ AI' },
            { icon: '❌', title: 'Attention Span Crisis', desc: 'คนรุ่นใหม่ (22-40 ปี) ตัดสินใจใน 3-5 วินาที ไม่บริโภคสารานุกรมยาว แต่คอนเทนต์สั้นบนโซเชียลก็มัก "ไม่มีแหล่งอ้างอิงที่ตรวจสอบได้"' },
            { icon: '❌', title: 'Disconnected Knowledge', desc: 'ความรู้ในอดีตถูกมองว่าล้าสมัย ไม่สามารถแปลงเป็น Everyday Value หรือ Soft Power ที่สร้างมูลค่าทางเศรษฐกิจได้จริง' }
        ];

        painPoints.forEach((p, idx) => {
            const py = 2.15 + idx * 0.95;
            slide.addText(`${p.icon}  ${p.title}`, {
                x: 1.0, y: py, w: 3.7, h: 0.28,
                fontFace: fontHeading, fontSize: 11, bold: true, color: COLOR_VOID
            });
            slide.addText(p.desc, {
                x: 1.25, y: py + 0.26, w: 3.45, h: 0.65,
                fontFace: fontBody, fontSize: 9.5, color: COLOR_FOG, lineSpacingMultiple: 1.15
            });
        });

        // Right Column: The Strategic Solution (GRURU Solution)
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 5.1, y: 1.55, w: 4.1, h: 3.5, r: 0.08,
            fill: { color: 'FFFFFF' }, line: { color: '86EFAC', width: 1.5 }
        });
        slide.addText('ทางออกเชิงยุทธศาสตร์: GRURU Platform', {
            x: 5.3, y: 1.7, w: 3.7, h: 0.4,
            fontFace: fontHeading, fontSize: 13, bold: true, color: '15803D'
        });

        const solutions = [
            { icon: '⚡', title: 'Semantic Knowledge Graph', desc: 'เปลี่ยนข้อมูลตัวอักษรแห้งๆ เป็นโครงข่ายความหมาย (Ontology) ที่คอมพิวเตอร์และมนุษย์เข้าใจร่วมกัน พร้อมต่อยอดสู่ Sovereign AI' },
            { icon: '💥', title: 'Data Booming Engine', desc: 'เข้าใจความเชื่อมโยงได้ใน 3 วินาที เริ่มจาก 1 หัวข้อแล้วระเบิดขยายสู่ 12 มิติความรู้ พร้อมแหล่งอ้างอิงตรวจสอบได้ 100%' },
            { icon: '🌱', title: 'Everyday Takeaway Model', desc: 'ทุกองค์ความรู้ต้องตอบโจทย์ชีวิตประจำวัน สุขภาพ การทำงาน และต่อยอดเศรษฐกิจสร้างสรรค์ (Creative Economy)' }
        ];

        solutions.forEach((s, idx) => {
            const sy = 2.15 + idx * 0.95;
            slide.addText(`${s.icon}  ${s.title}`, {
                x: 5.3, y: sy, w: 3.7, h: 0.28,
                fontFace: fontHeading, fontSize: 11, bold: true, color: COLOR_VOID
            });
            slide.addText(s.desc, {
                x: 5.55, y: sy + 0.26, w: 3.45, h: 0.65,
                fontFace: fontBody, fontSize: 9.5, color: COLOR_FOG, lineSpacingMultiple: 1.15
            });
        });
    }

    // ==========================================
    // SLIDE 3: Concept "Future Archaeology"
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'แนวคิดหลัก: Future Archaeology “ห้องแล็บนักโบราณคดีจากอนาคต”', 'CONCEPT & POSITIONING', 'GRM-2026-CONCEPT-003');

        // Concept art image on left
        if (fs.existsSync(futureLabPath)) {
            slide.addImage({
                path: futureLabPath,
                x: 0.8, y: 1.55, w: 4.2, h: 2.7,
                sizing: { type: 'cover' }
            });
            slide.addShape(pptx.ShapeType.roundRect, {
                x: 0.8, y: 4.3, w: 4.2, h: 0.7, r: 0.05,
                fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
            });
            slide.addText('FUTURE ARCHAEOLOGY LAB (SIMULATION)\nการผสาน Modern Art Gallery นิ่งเรียบ เข้ากับ Sci-Fi Data Lab สุดล้ำ', {
                x: 0.9, y: 4.32, w: 4.0, h: 0.65,
                fontFace: fontMono, fontSize: 8.5, color: COLOR_VOID, align: 'center', valign: 'middle'
            });
        }

        // Right Side: Brand Essence & Perceptual Map
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 5.2, y: 1.55, w: 4.0, h: 1.35, r: 0.08,
            fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1.5 }
        });
        slide.addText('แก่นแท้ของแบรนด์ (Brand Essence)', {
            x: 5.35, y: 1.65, w: 3.7, h: 0.3,
            fontFace: fontHeading, fontSize: 11, bold: true, color: COLOR_EMBER
        });
        slide.addText('“อดีตคือข้อมูล • อนาคตคือเรื่องเล่า”\nPast is Data, Future is Narrative.', {
            x: 5.35, y: 1.95, w: 3.7, h: 0.5,
            fontFace: fontHeading, fontSize: 13, bold: true, color: COLOR_VOID
        });
        slide.addText('บุคลิกแบบ “ภัณฑารักษ์จากอนาคต”: ฉลาดแต่ไม่เก๊ก ขี้เล่นแต่มีหลักฐานเสมอ', {
            x: 5.35, y: 2.45, w: 3.7, h: 0.35,
            fontFace: fontBody, fontSize: 9, color: COLOR_FOG
        });

        // Perceptual Map Card
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 5.2, y: 3.0, w: 4.0, h: 2.0, r: 0.08,
            fill: { color: 'F8FAFC' }, line: { color: 'CBD5E1', width: 1.5 }
        });
        slide.addText('Brand Positioning (Perceptual Matrix)', {
            x: 5.35, y: 3.1, w: 3.7, h: 0.3,
            fontFace: fontHeading, fontSize: 11, bold: true, color: COLOR_VIOLET
        });

        const matrix = [
            { label: 'สารานุกรมทั่วไป (Wikipedia/หอสมุด)', tag: 'วิชาการสูง แต่เป็นตัวหนังสือยาว เล่าแบบเส้นตรง แห้ง' },
            { label: 'คอนเทนต์ไวรัลบน Social Media', tag: 'สนุก ย่อยง่าย แต่ไม่มีการอ้างอิง ขาดความน่าเชื่อถือ' },
            { label: '⭐ GRURU MUSEUM (เป้าหมาย)', tag: '“สนุกแต่มีหลักฐาน” + “โครงข่ายเชื่อมโยงที่โต้ตอบได้ 100%”' }
        ];

        matrix.forEach((m, idx) => {
            const my = 3.45 + idx * 0.48;
            slide.addText(`• ${m.label}`, {
                x: 5.35, y: my, w: 3.7, h: 0.22,
                fontFace: fontHeading, fontSize: 9.5, bold: true, color: idx === 2 ? COLOR_EMBER : COLOR_VOID
            });
            slide.addText(m.tag, {
                x: 5.55, y: my + 0.18, w: 3.5, h: 0.26,
                fontFace: fontBody, fontSize: 8.5, color: COLOR_FOG
            });
        });
    }

    // ==========================================
    // SLIDE 4: The 5-Step Knowledge Pipeline
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'พันธกิจ 5 ขั้นตอน: กระบวนการแปรรูปภูมิปัญญาสู่การใช้งานจริง', 'KNOWLEDGE PIPELINE', 'GRM-2026-PIPE-004');

        const steps = [
            { no: '01', code: 'EXCAVATE', title: 'ขุดค้นข้อมูล', color: COLOR_EMBER, desc: 'ค้นหาและคัดกรององค์ความรู้จากคลังประวัติศาสตร์ วิทยาศาสตร์ วัฒนธรรม พร้อมแหล่งอ้างอิงชัดเจน' },
            { no: '02', code: 'DECODE', title: 'ถอดรหัสเชิงกราฟ', color: COLOR_CYAN, desc: 'แปลงข้อความและสถิติเป็น Entity & Relation สู่โครงข่าย Semantic Knowledge Graph' },
            { no: '03', code: 'RETELL', title: 'เล่าใหม่แบบ Visual', color: COLOR_VIOLET, desc: 'นำเสนอด้วยภาพ แผนภาพ และการโต้ตอบ ดูเข้าใจจบได้ใน 3–5 นาที แทนบทความยาว' },
            { no: '04', code: 'CONNECT', title: 'จุดระเบิด Data Booming', color: 'EAB308', desc: 'ให้ผู้ใช้สำรวจการเชื่อมโยงข้ามศาสตร์ ข้ามยุคสมัย เห็นความสัมพันธ์ที่ไม่เคยรู้มาก่อน' },
            { no: '05', code: 'APPLY', title: 'Everyday Takeaway', color: COLOR_GREEN, desc: 'สรุปเป็นการ์ดความรู้ที่นำไปปฏิบัติได้จริงในชีวิตประจำวัน สุขภาพ อาหาร หรือการทำงาน' }
        ];

        steps.forEach((s, idx) => {
            const sx = 0.8 + idx * 1.72;
            // Step Card
            slide.addShape(pptx.ShapeType.roundRect, {
                x: sx, y: 1.6, w: 1.6, h: 3.4, r: 0.08,
                fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1.5 }
            });

            // Step Header Pill
            slide.addShape(pptx.ShapeType.roundRect, {
                x: sx + 0.1, y: 1.75, w: 1.4, h: 0.45, r: 0.05,
                fill: { color: 'F8FAFC' }, line: { color: s.color, width: 1.5 }
            });
            slide.addText(s.no, {
                x: sx + 0.15, y: 1.75, w: 0.4, h: 0.45,
                fontFace: fontMono, fontSize: 14, bold: true, color: s.color, valign: 'middle'
            });
            slide.addText(s.code, {
                x: sx + 0.55, y: 1.75, w: 0.9, h: 0.45,
                fontFace: fontMono, fontSize: 8.5, bold: true, color: COLOR_VOID, valign: 'middle'
            });

            // Title
            slide.addText(s.title, {
                x: sx + 0.1, y: 2.35, w: 1.4, h: 0.4,
                fontFace: fontHeading, fontSize: 11.5, bold: true, color: COLOR_VOID, align: 'center'
            });

            // Accent Bar
            slide.addShape(pptx.ShapeType.rect, {
                x: sx + 0.3, y: 2.85, w: 1.0, h: 0.04,
                fill: { color: s.color }
            });

            // Description
            slide.addText(s.desc, {
                x: sx + 0.1, y: 3.0, w: 1.4, h: 1.85,
                fontFace: fontBody, fontSize: 9, color: COLOR_FOG, lineSpacingMultiple: 1.2, align: 'left'
            });
        });
    }

    // ==========================================
    // SLIDE 5: Core Technology: "Data Booming" & Knowledge Graph
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'เทคโนโลยีเด่น: สถาปัตยกรรม “Data Booming” และกราฟความรู้', 'CORE INNOVATION', 'GRM-2026-TECH-005');

        // Left Column: Explanation & 6 Dimensions
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 1.55, w: 4.2, h: 3.5, r: 0.08,
            fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1.5 }
        });

        slide.addText('นิยามและกลไก Data Booming', {
            x: 1.0, y: 1.7, w: 3.8, h: 0.35,
            fontFace: fontHeading, fontSize: 12.5, bold: true, color: COLOR_EMBER
        });

        slide.addText('เริ่มจาก 1 หัวข้อกลางจอ เมื่อคลิก โหนดจะ “ระเบิด” เป็นโหนดลูก 6–12 โหนดในรัศมีวงกลม แต่ละโหนดโผล่ห่างกัน 40ms พร้อมวงแหวนแสงเรืองและตัวนับความเชื่อมโยงวิ่งขึ้น ผู้ใช้เจาะลึกได้ 3 ชั้น', {
            x: 1.0, y: 2.05, w: 3.8, h: 0.85,
            fontFace: fontBody, fontSize: 9.5, color: '334155', lineSpacingMultiple: 1.2
        });

        slide.addText('6 หมวดหมู่ แยกชัดเจนด้วยสีและรูปทรง (WCAG AA Compliant):', {
            x: 1.0, y: 2.95, w: 3.8, h: 0.3,
            fontFace: fontHeading, fontSize: 10, bold: true, color: COLOR_VOID
        });

        const categories = [
            { shape: '● วงกลม', name: 'วิทยาศาสตร์ (Science)', color: '0284C7' },
            { shape: '⬡ หกเหลี่ยม', name: 'ประวัติศาสตร์ (History)', color: 'EA580C' },
            { shape: '■ สี่เหลี่ยม', name: 'เทคโนโลยี (Technology)', color: '7C3AED' },
            { shape: '▲ สามเหลี่ยม', name: 'วัฒนธรรม/ภูมิปัญญา (Wisdom)', color: 'D97706' },
            { shape: '◆ ข้าวหลามตัด', name: 'ธรรมชาติ/ชีวิต (Bio Nature)', color: '059669' },
            { shape: '○ วงแหวน', name: 'ศิลปะ/การออกแบบ (Art & Design)', color: 'DB2777' }
        ];

        categories.forEach((c, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const cx = 1.0 + col * 1.95;
            const cy = 3.3 + row * 0.52;

            slide.addShape(pptx.ShapeType.roundRect, {
                x: cx, y: cy, w: 1.85, h: 0.44, r: 0.05,
                fill: { color: 'F8FAFC' }, line: { color: 'CBD5E1', width: 1 }
            });
            slide.addText(c.shape, {
                x: cx + 0.05, y: cy + 0.02, w: 0.6, h: 0.4,
                fontFace: fontBody, fontSize: 8.5, bold: true, color: c.color, valign: 'middle'
            });
            slide.addText(c.name, {
                x: cx + 0.65, y: cy + 0.02, w: 1.15, h: 0.4,
                fontFace: fontBody, fontSize: 7.5, bold: true, color: COLOR_VOID, valign: 'middle'
            });
        });

        // Right Column: High-res Infographic from folder
        if (fs.existsSync(kgPath1)) {
            slide.addImage({
                path: kgPath1,
                x: 5.2, y: 1.55, w: 4.0, h: 3.5,
                sizing: { type: 'contain' }
            });
        }
    }

    // ==========================================
    // SLIDE 6: Citizen Personas & Target Impact
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'กลุ่มเป้าหมายพลเมืองและผลกระทบต่อเศรษฐกิจดิจิทัล', 'CITIZEN IMPACT', 'GRM-2026-USER-006');

        const personas = [
            {
                role: 'CURIOUS STARTER',
                age: 'อายุ 22–27 ปี',
                group: 'นักศึกษาจบใหม่ / First Jobber',
                behavior: 'ใช้สมาร์ตโฟนเป็นหลัก ต้องการข้อมูลที่สรุปจบใน 3–5 นาที ชอบกราฟิกสวยที่แชร์ต่อบน Social Media ได้ทันที',
                solution: 'Data Booming แบบ 1 คลิก + การ์ดความรู้ Specimen Card ขนาด 1080×1350 px สำหรับแชร์ลงโซเชียลมีเดีย',
                color: COLOR_EMBER
            },
            {
                role: 'CREATIVE PROFESSIONAL',
                age: 'อายุ 25–34 ปี',
                group: 'ดีไซเนอร์ / ครีเอเตอร์ / นักพัฒนา',
                behavior: 'ค้นหาวัตถุดิบและแรงบันดาลใจเพื่อสร้าง Soft Power ต้องการข้อมูลเชิงลึกที่มีหลักฐานอ้างอิงชัดเจน',
                solution: 'Interactive Graph เจาะลึกความสัมพันธ์, ฟีเจอร์เซฟคอลเลกชันส่วนตัว และ Open Dataset ดาวน์โหลดไปต่อยอด',
                color: COLOR_VIOLET
            },
            {
                role: 'LIFELONG LEARNER',
                age: 'อายุ 30–40 ปี',
                group: 'คนทำงาน / พ่อแม่รุ่นใหม่',
                behavior: 'สนใจที่มาของเรื่องรอบตัว เช่น สุขภาพ โภชนาการ และการเลี้ยงดู ต้องการความน่าเชื่อถือสูง ไม่ชอบข่าวลือ',
                solution: 'Everyday Takeaway ชัดเจน นำไปปรับใช้กับชีวิตได้จริง พร้อมปุ่มเปิดดูแหล่งอ้างอิงต้นฉบับได้ในคลิกเดียว',
                color: COLOR_GREEN
            }
        ];

        personas.forEach((p, idx) => {
            const px = 0.8 + idx * 2.87;
            slide.addShape(pptx.ShapeType.roundRect, {
                x: px, y: 1.55, w: 2.7, h: 3.5, r: 0.08,
                fill: { color: 'FFFFFF' }, line: { color: 'E2E8F0', width: 1.5 }
            });

            // Persona Header Tag
            slide.addShape(pptx.ShapeType.roundRect, {
                x: px + 0.15, y: 1.7, w: 2.4, h: 0.5, r: 0.05,
                fill: { color: 'F8FAFC' }, line: { color: p.color, width: 1.5 }
            });
            slide.addText(p.role, {
                x: px + 0.15, y: 1.72, w: 2.4, h: 0.25,
                fontFace: fontMono, fontSize: 10, bold: true, color: p.color, align: 'center'
            });
            slide.addText(`${p.age} • ${p.group}`, {
                x: px + 0.15, y: 1.95, w: 2.4, h: 0.22,
                fontFace: fontBody, fontSize: 8.5, color: COLOR_VOID, align: 'center'
            });

            // Insight Box
            slide.addText('พฤติกรรมและความต้องการ:', {
                x: px + 0.15, y: 2.3, w: 2.4, h: 0.25,
                fontFace: fontHeading, fontSize: 9.5, bold: true, color: COLOR_VOID
            });
            slide.addText(p.behavior, {
                x: px + 0.15, y: 2.55, w: 2.4, h: 0.9,
                fontFace: fontBody, fontSize: 9, color: COLOR_FOG, lineSpacingMultiple: 1.15
            });

            // Solution Box
            slide.addShape(pptx.ShapeType.roundRect, {
                x: px + 0.15, y: 3.55, w: 2.4, h: 1.35, r: 0.05,
                fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1', width: 1 }
            });
            slide.addText('💡 GRURU Feature ตอบโจทย์:', {
                x: px + 0.2, y: 3.62, w: 2.3, h: 0.22,
                fontFace: fontHeading, fontSize: 8.5, bold: true, color: COLOR_VOID
            });
            slide.addText(p.solution, {
                x: px + 0.2, y: 3.85, w: 2.3, h: 0.98,
                fontFace: fontBody, fontSize: 8.5, color: '334155', lineSpacingMultiple: 1.15
            });
        });
    }

    // ==========================================
    // SLIDE 7: Technical Architecture & Standards
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'สถาปัตยกรรมระบบและมาตรฐานเทคโนโลยีระดับสากล', 'TECH ARCHITECTURE', 'GRM-2026-SYS-007');

        const techPillars = [
            {
                title: 'High-Performance Stack',
                sub: 'Next.js 15 + TypeScript + Tailwind',
                desc: 'สถาปัตยกรรม Web App ล่าสุด โหลดเร็วภายใน 0.8 วินาที รองรับ Responsive ทั้ง Desktop, Tablet และ Mobile-First'
            },
            {
                title: 'D3.js Force Simulation',
                sub: 'Canvas-based Graph Rendering',
                desc: 'เรนเดอร์โครงข่าย Knowledge Graph ลื่นไหล 60 FPS แม้มีโหนดนับพัน พร้อมการเคลื่อนไหว Scan -> Decode -> Connect'
            },
            {
                title: 'Global Accessibility (WCAG AA)',
                sub: 'Contrast Ratio 5.3:1 ถึง 17:1',
                desc: 'ผ่านเกณฑ์ความเข้าถึงระดับสากล ผู้มีสายตาบกพร่องแยกโหนดด้วยรูปทรงเรขาคณิต รองรับระบบอ่านหน้าจอและโหมดลดการเคลื่อนไหว'
            },
            {
                title: 'Open Data & AI Ready',
                sub: 'Semantic JSON-LD / Graph API',
                desc: 'จัดเก็บข้อมูลมาตรฐานสากล พร้อมเปิด API ให้ภาครัฐและสตาร์ตอัปนำไป Fine-tune โมเดล AI ภาษาไทยได้อย่างถูกต้อง'
            }
        ];

        techPillars.forEach((t, idx) => {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            const tx = 0.8 + col * 4.3;
            const ty = 1.6 + row * 1.75;

            slide.addShape(pptx.ShapeType.roundRect, {
                x: tx, y: ty, w: 4.1, h: 1.55, r: 0.08,
                fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
            });

            slide.addText(t.title, {
                x: tx + 0.2, y: ty + 0.15, w: 3.7, h: 0.3,
                fontFace: fontHeading, fontSize: 12, bold: true, color: COLOR_VOID
            });
            slide.addText(t.sub, {
                x: tx + 0.2, y: ty + 0.45, w: 3.7, h: 0.25,
                fontFace: fontMono, fontSize: 9.5, bold: true, color: COLOR_VIOLET
            });
            slide.addText(t.desc, {
                x: tx + 0.2, y: ty + 0.75, w: 3.7, h: 0.65,
                fontFace: fontBody, fontSize: 9.5, color: COLOR_FOG, lineSpacingMultiple: 1.2
            });
        });
    }

    // ==========================================
    // SLIDE 8: Strategic Roadmap & MDES Collaboration
    // ==========================================
    {
        const slide = pptx.addSlide();
        addHeader(slide, 'แผนการดำเนินงานและข้อเสนอความร่วมมือกับกระทรวงดิจิทัลฯ', 'ROADMAP & PROPOSAL', 'GRM-2026-ROAD-008');

        // Roadmap Timeline (3 Phases)
        const phases = [
            {
                phase: 'PHASE 1 (Q1-Q2)',
                title: 'Prototype & Core Engine',
                deliverables: '• พัฒนา Design Tokens & UI Component\n• สร้างโมเดลจำลอง 50 หัวข้อความรู้\n• พัฒนา Data Booming Engine และกราฟ D3.js'
            },
            {
                phase: 'PHASE 2 (Q3)',
                title: 'Data Integration & Sandbox',
                deliverables: '• เชื่อมต่อคลังข้อมูลดิจิทัลภาครัฐ (e-Museum, หอสมุดแห่งชาติ)\n• ทดสอบระบบร่วมกับกลุ่มคนรุ่นใหม่ 10,000 คน\n• ปรับปรุงความถูกต้องและการแสดงผล'
            },
            {
                phase: 'PHASE 3 (Q4)',
                title: 'National Launch & Open API',
                deliverables: '• เปิดตัวเป็นแพลตฟอร์มพิพิธภัณฑ์ความรู้ดิจิทัลแห่งชาติ\n• เปิด Open Data API สำหรับการต่อยอดด้าน EdTech และ AI\n• แคมเปญ Soft Power สู่ระดับสากล'
            }
        ];

        phases.forEach((p, idx) => {
            const px = 0.8 + idx * 2.87;
            slide.addShape(pptx.ShapeType.roundRect, {
                x: px, y: 1.55, w: 2.7, h: 2.1, r: 0.08,
                fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
            });

            slide.addShape(pptx.ShapeType.roundRect, {
                x: px + 0.15, y: 1.68, w: 2.4, h: 0.35, r: 0.05,
                fill: { color: 'F1F5F9' }, line: { color: COLOR_EMBER, width: 1.5 }
            });
            slide.addText(p.phase, {
                x: px + 0.15, y: 1.68, w: 2.4, h: 0.35,
                fontFace: fontMono, fontSize: 9.5, bold: true, color: COLOR_EMBER, align: 'center', valign: 'middle'
            });

            slide.addText(p.title, {
                x: px + 0.15, y: 2.1, w: 2.4, h: 0.35,
                fontFace: fontHeading, fontSize: 11, bold: true, color: COLOR_VOID, align: 'center'
            });

            slide.addText(p.deliverables, {
                x: px + 0.15, y: 2.5, w: 2.4, h: 1.05,
                fontFace: fontBody, fontSize: 8.5, color: '334155', lineSpacingMultiple: 1.2
            });
        });

        // Bottom Proposal Card to the Minister
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 0.8, y: 3.8, w: 8.4, h: 1.3, r: 0.08,
            fill: { color: 'FEF3C7' }, line: { color: 'F59E0B', width: 1.5 }
        });
        slide.addText('🤝 ข้อเสนอเชิงนโยบายเพื่อขอรับการสนับสนุนจากกระทรวงดิจิทัลฯ (MDES):', {
            x: 1.0, y: 3.9, w: 8.0, h: 0.3,
            fontFace: fontHeading, fontSize: 11, bold: true, color: 'B45309'
        });
        slide.addText('1. การเชื่อมโยงข้อมูล (Data Partnership): สนับสนุนการเชื่อมต่อข้อมูลประวัติศาสตร์และภูมิปัญญาจากหน่วยงานในกำกับดูแล\n2. Sandbox สนับสนุน AI ไทย: ให้ GRURU MUSEUM เป็น Sandbox ในการสร้าง Semantic Knowledge Graph เพื่อป้อน AI โมเดลภาษาไทย\n3. การผลักดันสู่แพลตฟอร์มระดับชาติ: บรรจุเข้าเป็นส่วนหนึ่งของนโยบายพัฒนาทักษะดิจิทัลและการเรียนรู้ตลอดชีวิต (Lifelong Learning)', {
            x: 1.0, y: 4.22, w: 8.0, h: 0.8,
            fontFace: fontBody, fontSize: 9.5, color: '78350F', lineSpacingMultiple: 1.2
        });
    }

    // ==========================================
    // SLIDE 9: Executive Summary & Call to Action
    // ==========================================
    {
        const slide = pptx.addSlide();
        slide.background = { color: BG_LIGHT };

        // Accents
        slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.1, fill: { color: COLOR_EMBER } });
        slide.addShape(pptx.ShapeType.rect, { x: 0, y: 5.525, w: '100%', h: 0.1, fill: { color: COLOR_VIOLET } });

        // Center card
        slide.addShape(pptx.ShapeType.roundRect, {
            x: 1.5, y: 0.6, w: 7.0, h: 4.4, r: 0.1,
            fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 2 }
        });

        slide.addText('SPECIMEN // CONCLUSION-SUMMARY', {
            x: 1.5, y: 0.85, w: 7.0, h: 0.3,
            fontFace: fontMono, fontSize: 10, bold: true, color: COLOR_EMBER, align: 'center'
        });

        slide.addText('“เปลี่ยนมรดกทางปัญญาของชาติ\nให้กลายเป็นพลังขับเคลื่อนชีวิตคนรุ่นใหม่”', {
            x: 1.7, y: 1.25, w: 6.6, h: 1.0,
            fontFace: fontHeading, fontSize: 24, bold: true, color: COLOR_VOID, align: 'center'
        });

        slide.addText('GRURU MUSEUM พร้อมเป็นหัวหอกในการนำเทคโนโลยี Knowledge Graph และ Data Booming มาปฏิวัติการเรียนรู้ ยกระดับภูมิปัญญาไทยสู่ระดับโลก และเป็นโครงสร้างพื้นฐานดิจิทัลที่ยั่งยืน', {
            x: 2.0, y: 2.35, w: 6.0, h: 0.7,
            fontFace: fontBody, fontSize: 11, color: COLOR_FOG, align: 'center', lineSpacingMultiple: 1.25
        });

        // 3 Key Takeaways
        const pillars = [
            { t: 'NEW KNOWLEDGE', d: 'ค้นพบมุมมองใหม่ ตรวจสอบได้' },
            { t: 'NEW STORYTELLING', d: 'เข้าใจใน 3 วินาทีผ่าน Data Booming' },
            { t: 'EVERYDAY LIVING', d: 'นำไปใช้ในชีวิตจริงได้ทุกวัน' }
        ];

        pillars.forEach((p, idx) => {
            const px = 2.0 + idx * 2.05;
            slide.addShape(pptx.ShapeType.roundRect, {
                x: px, y: 3.2, w: 1.9, h: 0.9, r: 0.05,
                fill: { color: 'F8FAFC' }, line: { color: COLOR_VIOLET, width: 1.5 }
            });
            slide.addText(p.t, {
                x: px, y: 3.28, w: 1.9, h: 0.3,
                fontFace: fontMono, fontSize: 9, bold: true, color: COLOR_VIOLET, align: 'center'
            });
            slide.addText(p.d, {
                x: px + 0.05, y: 3.58, w: 1.8, h: 0.45,
                fontFace: fontBody, fontSize: 8.5, color: COLOR_VOID, align: 'center'
            });
        });

        slide.addText('กราบขอบพระคุณ ฯพณฯ รัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม\nทีมงานพร้อมสำหรับการสาธิตระบบและเริ่มดำเนินโครงการทันที', {
            x: 1.5, y: 4.3, w: 7.0, h: 0.55,
            fontFace: fontHeading, fontSize: 10.5, bold: true, color: COLOR_EMBER, align: 'center'
        });
    }

    const outputPath = path.join(__dirname, 'GRURU_MUSEUM_Digital_Minister_Presentation.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`Successfully generated presentation: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Error generating PPTX:', err);
    process.exit(1);
});
