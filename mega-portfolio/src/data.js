// ─────────────────────────────────────────────────────────────
//  EDIT YOUR CONTENT HERE. Everything on the site reads from this file.
//  Screenshots live in src/assets/shots/ — import them below and add them to a project's `gallery`.
// ─────────────────────────────────────────────────────────────

// FacultyHub (captured from the running PHP build)
import fhHome from './assets/shots/fh-pub-home.webp';
import fhLogin from './assets/shots/fh-pub-login.webp';
import fhStDash from './assets/shots/fh-st-dash.webp';
import fhStRes from './assets/shots/fh-st-resources.webp';
import fhStFac from './assets/shots/fh-st-faculty.webp';
import fhStTime from './assets/shots/fh-st-timeline.webp';
import fhTeDash from './assets/shots/fh-te-dash.webp';
import fhAdDash from './assets/shots/fh-ad-dash.webp';
import fhAdTeach from './assets/shots/fh-ad-teachers.webp';
import fhMHome from './assets/shots/fh-m-home.webp';
import fhMDash from './assets/shots/fh-m-st-dash.webp';
// Memora (captured from the running PHP build with its demo data)
import mmHome from './assets/shots/mm-pub-home.webp';
import mmSteps from './assets/shots/mm-steps.webp';
import mmOcc from './assets/shots/mm-occasions.webp';
import mmPricing from './assets/shots/mm-pricing.webp';
import mmEnv from './assets/shots/mm-rec-d-env.webp';
import mmOpen from './assets/shots/mm-rec-d-open.webp';
import mmPtDash from './assets/shots/mm-pt-dash.webp';
import mmPtOrders from './assets/shots/mm-pt-orders.webp';
import mmPtCreate from './assets/shots/mm-pt-create.webp';
import mmPtQr from './assets/shots/mm-pt-qrcards.webp';
import mmPtAn from './assets/shots/mm-pt-analytics.webp';
import mmAdDash from './assets/shots/mm-ad-dash.webp';
import mmAdMem from './assets/shots/mm-ad-memories.webp';
import mmMHome from './assets/shots/mm-m-home.webp';
import mmMEnv from './assets/shots/mm-m-rec-env.webp';
import mmMOpen from './assets/shots/mm-m-rec-open.webp';
import mmMOpen2 from './assets/shots/mm-m-rec-open2.webp';
import mmMBday from './assets/shots/mm-m-rec-bday.webp';
// Raksha (exported from Figma)
import rkDash from './assets/shots/rk-dashboard.webp';
import rkSos from './assets/shots/rk-sos.webp';
import rkWalk from './assets/shots/rk-safe-walk.webp';
import rkTrack from './assets/shots/rk-track-me.webp';
import rkHelp from './assets/shots/rk-need-help.webp';
import rkCall from './assets/shots/rk-fake-call.webp';
import rkLogin from './assets/shots/rk-login.webp';
import rkSignup from './assets/shots/rk-sign-up.webp';
import rkGoogle from './assets/shots/rk-google.webp';
// Higanbana
import hgDesk from './assets/shots/higan-desktop.webp';
import hgOpen from './assets/shots/higan-d-open.webp';
import hgMob from './assets/shots/higan-mobile.webp';
import hgBloom from './assets/shots/higan-m-bloom.webp';
import hgLetter from './assets/shots/higan-letter.webp';
import hgVideo from './assets/higan.mp4';
// Particle Heart
import phHeart from './assets/shots/ph-d-heart.webp';
import phScatter from './assets/shots/ph-d-scatter.webp';
import phForm from './assets/shots/ph-d-form.webp';
import phMHeart from './assets/shots/ph-m-heart.webp';
import phMScatter from './assets/shots/ph-m-scatter.webp';
import phVideo from './assets/ph.mp4';
// Will You Be Mine
import wyIntro from './assets/shots/mine-m-1-intro.webp';
import wyDraw from './assets/shots/mine-m-2-drawing.webp';
import wyQ from './assets/shots/mine-m-3-question.webp';
import wyYes from './assets/shots/mine-m-4-yes.webp';
import wyDesk from './assets/shots/mine-d-question.webp';
import wyVideo from './assets/mine.mp4';
// Eye → Space (captured from the live site)
import eyDBuild from './assets/shots/eye-d-build.webp';
import eyDOpen from './assets/shots/eye-d-open.webp';
import eyDLook from './assets/shots/eye-d-look.webp';
import eyDIris from './assets/shots/eye-d-iris.webp';
import eyDPortal from './assets/shots/eye-d-portal.webp';
import eyDSpace from './assets/shots/eye-d-space.webp';
import eyMBuild from './assets/shots/eye-m-build.webp';
import eyMOpen from './assets/shots/eye-m-open.webp';
import eyMIris from './assets/shots/eye-m-iris.webp';
import eyMPortal from './assets/shots/eye-m-portal.webp';
import eyMSpace from './assets/shots/eye-m-space.webp';
import eyVideo from './assets/eye.mp4';
// Burn the World (captured from the live site)
import cdMatch from './assets/shots/candle-d-match.webp';
import cdLight from './assets/shots/candle-d-light.webp';
import cdLit from './assets/shots/candle-d-lit.webp';
import cdFall from './assets/shots/candle-d-fall.webp';
import cdSpread from './assets/shots/candle-d-spread.webp';
import cdFire from './assets/shots/candle-d-fire.webp';
import cdVideo from './assets/candle.mp4';

export const ME = {
  name: 'Mega Chaudhary',
  role: 'UI/UX designer',
  role2: 'vibe coder',
  email: 'megachaudhary71@gmail.com',
  phone: '+977 9747691369',
  location: 'Koteshwor, Kathmandu',
  github: 'https://github.com/mega-chaudhary',
  status: 'Open to UI/UX internships',
  intro:
    'I design clean, user-first interfaces in Figma, then build them into real products with AI tools. Academic portals, a flower-shop platform, a safety app, small interactive gifts and generative ASCII art.',
};

export const STATS = [
  { value: '8', label: 'Projects designed' },
  { value: '6', label: 'Built and running' },
  { value: '3', label: 'Portals in FacultyHub' },
];

// Floating screens in the hero (your real work)
export const HERO_SCREENS = [
  { src: mmHome, w: 1.6, h: 1 }, { src: rkDash, w: .46, h: 1 }, { src: fhStDash, w: 1.6, h: 1 },
  { src: hgMob, w: .5, h: 1 }, { src: phHeart, w: 1.6, h: 1 }, { src: mmMOpen, w: .46, h: 1 },
  { src: fhHome, w: 1.6, h: 1 }, { src: rkWalk, w: .46, h: 1 }, { src: mmPtDash, w: 1.6, h: 1 },
  { src: wyQ, w: .46, h: 1 }, { src: fhTeDash, w: 1.6, h: 1 }, { src: hgDesk, w: 1.6, h: 1 },
];

export const ABOUT_FILES = [
  {
    file: 'bio.md',
    title: 'Hello, world.',
    body: 'I’m a BIM student in Kathmandu who fell for interface design. I start with flows and wireframes in Figma, push every screen to high fidelity, then vibe code the design into a working product with AI.',
    rows: [['File type', 'Markdown document'], ['Role', 'UI/UX Designer & Vibe Coder'], ['Status', '● Open to internships', 'ok']],
    visual: 'golden',
  },
  {
    file: 'education.md',
    title: 'Academic background.',
    body: 'Management and IT together: I learn how businesses run, then design the software they run on.',
    rows: [['Bachelor', 'BIM · Institute of Management Studies'], ['Semester', 'Running 6th'], ['+2', 'Kanjirowa National College'], ['SEE', 'Indradhanus Higher Secondary School']],
    visual: 'bw',
  },
  {
    file: 'experience.md',
    title: 'Real-world work.',
    body: 'Running a store floor taught me what people actually do when something goes wrong. I design for that moment.',
    rows: [['2023 – 24', 'Store Manager · Chinese Store'], ['', 'Operations, staff, inventory, customer service'], ['2023 – 24', 'Social Media Handler · Unique Collection'], ['', '6 months running the brand’s social handle']],
    visual: 'golden',
  },
  {
    file: 'location.md',
    title: 'Geographic node.',
    body: 'Working from Kathmandu, with full availability for remote collaboration anywhere.',
    rows: [['Base', 'Koteshwor, Kathmandu, Nepal'], ['Timezone', 'UTC+05:45 (Nepal Time)'], ['Status', '● Active', 'ok']],
    visual: 'map',
  },
];

/*
  Each project has its own colour theme (`theme`) taken from the project itself.
  media.cover  -> what the 3D card shows ('browser' or 'phone' frame)
  gallery      -> screenshots shown on the project page
*/
export const PROJECTS = [
  {
    id: 'eye-space',
    title: 'Eye → Space',
    kicker: 'My eye drawn in text, diving into space',
    status: 'Live',
    role: 'Design + build',
    type: 'Generative art',
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'GitHub Pages'],
    theme: { bg: '#050304', bg2: '#1a0c08', ink: '#ecdcd0', accent: '#ff6fa8', soft: '#8a7166', dark: true },
    summary:
      'A photo of my own eye, redrawn every frame in coloured text characters. Rows of text flicker in, the eyelid forms, the eye opens, blinks and looks around, then the camera dives through the pupil into a starfield with a pink planet.',
    points: [
      'The photo is read pixel by pixel: each character cell samples its brightness and picks a matching glyph, from dense @#$Q to light .:/',
      'Every cell is coloured by what it shows: skin, the white of the eye, or iris fibres drawn with maths.',
      'A 20-second story in four acts (build, blink, zoom, space) with a timeline you can drag, plus pause and replay.',
      'Plain HTML, CSS and JavaScript with no libraries. The photo is embedded, so it even runs offline.',
    ],
    cover: { kind: 'browser', src: eyDOpen, url: 'mega-chaudhary.github.io/eyessss' },
    video: { src: eyVideo, poster: eyMOpen },
    gallery: [
      { src: eyDBuild, cap: 'Rows of text flicker in', kind: 'browser' },
      { src: eyDOpen, cap: 'The eye opens', kind: 'browser' },
      { src: eyDLook, cap: 'Looking around', kind: 'browser' },
      { src: eyDIris, cap: 'Zooming into the iris', kind: 'browser' },
      { src: eyDPortal, cap: 'Through the pupil', kind: 'browser' },
      { src: eyDSpace, cap: 'The pink planet', kind: 'browser' },
      { src: eyMBuild, cap: 'Mobile: building', kind: 'phone' },
      { src: eyMOpen, cap: 'Mobile: the eye', kind: 'phone' },
      { src: eyMIris, cap: 'Mobile: the iris', kind: 'phone' },
      { src: eyMPortal, cap: 'Mobile: the portal', kind: 'phone' },
      { src: eyMSpace, cap: 'Mobile: space', kind: 'phone' },
    ],
    note: 'Captured from the live site.',
    links: [
      { label: 'Open live site', href: 'https://mega-chaudhary.github.io/eyessss/' },
      { label: 'View the code', href: 'https://github.com/mega-chaudhary/eyessss' },
    ],
  },
  {
    id: 'burn-the-world',
    title: 'Burn the World',
    kicker: 'An ASCII candle that sets the floor on fire',
    status: 'Live',
    role: 'Design + build',
    type: 'Generative art',
    stack: ['JavaScript', 'Canvas', 'Python', 'NumPy', 'tkinter', 'GitHub Pages'],
    theme: { bg: '#070302', bg2: '#1f0c04', ink: '#ffe9d2', accent: '#ff7a1a', soft: '#a07a62', dark: true },
    summary:
      'A match strikes in the dark and lights a candle. The flame grows, the candle tips over, and the fire races across the floor until the whole screen burns, all drawn in coloured ASCII characters.',
    points: [
      'Built twice: a Python desktop version (tkinter + NumPy) and a JavaScript canvas version that runs in the browser.',
      'Flames are tear-drop shapes warped by scrolling noise. Brightness picks the character, heat blends the colour from deep red to white.',
      'Real lighting: the match and flame light up the candle, the floor and the dark around them.',
      'The fire spreads outward from where the wick hits the floor, throwing sparks and rising embers.',
    ],
    cover: { kind: 'browser', src: cdFire, url: 'mega-chaudhary.github.io/burn-the-world-html' },
    video: { src: cdVideo, poster: cdLit, kind: 'browser' },
    gallery: [
      { src: cdMatch, cap: 'The match strikes', kind: 'browser' },
      { src: cdLight, cap: 'Lighting the wick', kind: 'browser' },
      { src: cdLit, cap: 'The candle burns', kind: 'browser' },
      { src: cdFall, cap: 'It tips over', kind: 'browser' },
      { src: cdSpread, cap: 'The floor catches', kind: 'browser' },
      { src: cdFire, cap: 'Everything burns', kind: 'browser' },
    ],
    note: 'Captured from the live site.',
    links: [
      { label: 'Open live site', href: 'https://mega-chaudhary.github.io/burn-the-world-html/' },
      { label: 'View the code', href: 'https://github.com/mega-chaudhary/burn-the-world-html' },
    ],
  },
  {
    id: 'facultyhub',
    title: 'FacultyHub',
    kicker: 'Academic portal for students, teachers and the college office',
    status: 'Built · v2.2',
    role: 'UI/UX design + build',
    type: 'Web platform',
    stack: ['Figma', 'Google Stitch', 'PHP 8', 'MySQL', 'JavaScript', 'Claude'],
    theme: { bg: '#eef3ff', bg2: '#dfe8ff', ink: '#0f1f4d', accent: '#2557d6', soft: '#5b6b94', dark: false },
    summary:
      'Teachers at IMS upload notes, slides, study guides and old question papers for a course and semester, and only students of that class see them. I designed 71 screens in Figma, then built the whole platform.',
    points: [
      'Three portals in one product: Student, Teacher and an Admin console for the college office.',
      'A notes & resources repository filtered by subject, unit, teacher and format, plus an upload timeline.',
      'Anonymous teacher feedback across five areas, with averages and comments for each teacher.',
      'Excel student import, semester promotion, announcements, notifications and cloud file storage.',
    ],
    cover: { kind: 'browser', src: fhStDash, url: 'ims.edu.np/facultyhub/student_page' },
    gallery: [
      { src: fhHome, cap: 'Public home', kind: 'browser' },
      { src: fhLogin, cap: 'Sign in', kind: 'browser' },
      { src: fhStDash, cap: 'Student dashboard', kind: 'browser' },
      { src: fhStRes, cap: 'Notes & resources repository', kind: 'browser' },
      { src: fhStFac, cap: 'Teacher directory', kind: 'browser' },
      { src: fhStTime, cap: 'Upload timeline', kind: 'browser' },
      { src: fhTeDash, cap: 'Teacher dashboard', kind: 'browser' },
      { src: fhAdDash, cap: 'Admin overview', kind: 'browser' },
      { src: fhAdTeach, cap: 'Manage teachers', kind: 'browser' },
      { src: fhMHome, cap: 'Mobile home', kind: 'phone' },
      { src: fhMDash, cap: 'Mobile dashboard', kind: 'phone' },
    ],
    note: 'Screenshots from the running build with sample data.',
    links: [],
  },
  {
    id: 'memora',
    title: 'Memora',
    kicker: 'Flower-shop QR memory platform',
    status: 'In progress',
    role: 'Product design + build',
    type: 'Web platform',
    stack: ['Figma', 'PHP 8', 'MySQL', 'React', 'esbuild', 'Claude'],
    theme: { bg: '#fbf0f3', bg2: '#f4dbe4', ink: '#4a1330', accent: '#6e1d43', soft: '#8c6a7a', dark: false },
    summary:
      'Give flowers, keep the memory forever. A florist ties a heart-shaped QR card to the bouquet; whoever scans it opens a wax-sealed envelope with photos, a voice note and a letter.',
    points: [
      'Four products in one: public site, recipient memory page, florist partner portal and an admin console with 18 role-based modules.',
      'A custom heart-shaped QR renderer in React with five print-ready presets that still scan on any phone camera. Try it below.',
      '11 occasion themes, each with its own envelope, wax seal and colours.',
      'Voice notes, eSewa and Khalti payments, PIN-locked memories, 2-step sign-in and daily backups.',
    ],
    cover: { kind: 'browser', src: mmHome, url: 'memora.com.np' },
    gallery: [
      { src: mmHome, cap: 'Public site', kind: 'browser' },
      { src: mmSteps, cap: 'How it works', kind: 'browser' },
      { src: mmOcc, cap: 'Occasions', kind: 'browser' },
      { src: mmPricing, cap: 'Keepsake packages', kind: 'browser' },
      { src: mmEnv, cap: 'Recipient: the sealed envelope', kind: 'browser' },
      { src: mmOpen, cap: 'Recipient: the memory opens', kind: 'browser' },
      { src: mmPtDash, cap: 'Florist portal dashboard', kind: 'browser' },
      { src: mmPtCreate, cap: 'Create a memory', kind: 'browser' },
      { src: mmPtOrders, cap: 'Orders', kind: 'browser' },
      { src: mmPtQr, cap: 'QR keepsake cards', kind: 'browser' },
      { src: mmPtAn, cap: 'Florist analytics', kind: 'browser' },
      { src: mmAdDash, cap: 'Admin console', kind: 'browser' },
      { src: mmAdMem, cap: 'Memory moderation', kind: 'browser' },
      { src: mmMEnv, cap: 'Scan → envelope', kind: 'phone' },
      { src: mmMOpen, cap: 'Anniversary memory', kind: 'phone' },
      { src: mmMOpen2, cap: 'Voice note & letter', kind: 'phone' },
      { src: mmMBday, cap: 'Birthday theme', kind: 'phone' },
      { src: mmMHome, cap: 'Mobile site', kind: 'phone' },
    ],
    studio: true,
    note: 'Screenshots from the running build with its demo data. The QR studio below is Memora’s own HeartQR.jsx, running live.',
    links: [],
  },
  {
    id: 'raksha',
    title: 'Raksha',
    kicker: 'Women’s safety mobile app',
    status: 'Figma prototype',
    role: 'UI/UX design',
    type: 'Mobile app',
    stack: ['Figma', 'Prototyping'],
    theme: { bg: '#efe6fd', bg2: '#e0d0fa', ink: '#2b1650', accent: '#7b45d6', soft: '#7a6a96', dark: false },
    summary:
      'A purple-themed safety app built around one question: what does someone need in the first three seconds of feeling unsafe?',
    points: [
      'One big “Hold for SOS” button on the home screen, with Need Help, Fake Call, Alarm and Safe Walk one tap away.',
      'Safe Walk shows safe zones, alert areas and the nearest hospital and police station on a map.',
      'Track Me shares a live location with trusted contacts for 30 minutes, 1 hour or 2 hours.',
      'Fake Call lets someone trigger a believable incoming call to leave an uncomfortable situation.',
    ],
    cover: { kind: 'phone', src: rkDash },
    gallery: [
      { src: rkDash, cap: 'Home · Hold for SOS', kind: 'phone' },
      { src: rkSos, cap: 'SOS active', kind: 'phone' },
      { src: rkWalk, cap: 'Safe Walk map', kind: 'phone' },
      { src: rkTrack, cap: 'Track Me · live sharing', kind: 'phone' },
      { src: rkHelp, cap: 'Need Help', kind: 'phone' },
      { src: rkCall, cap: 'Fake call settings', kind: 'phone' },
      { src: rkLogin, cap: 'Log in', kind: 'phone' },
      { src: rkSignup, cap: 'Create account', kind: 'phone' },
      { src: rkGoogle, cap: 'Social sign-in', kind: 'phone' },
    ],
    note: 'Frames exported from the Figma file. Open the prototype to click through every flow.',
    links: [{ label: 'Open the Figma prototype', href: 'https://www.figma.com/proto/RUOQl8sdLdOs61lWXOU2OV/Untitled?node-id=644-122&t=9yCmcXIidPapZ12Z-1' }],
  },
  {
    id: 'higanbana',
    title: 'Higanbana',
    kicker: 'Interactive digital bouquet',
    status: 'Built',
    role: 'Design + build',
    type: 'Interactive site',
    stack: ['React', 'Vite', 'Canvas', 'Claude'],
    theme: { bg: '#120818', bg2: '#22102a', ink: '#fbe9ee', accent: '#ff2d4b', soft: '#b99aa6', dark: true },
    summary:
      'A bouquet of red spider lilies blooms under the moon, with a wax-sealed letter tucked inside. Tap the glowing heart, watch the field turn red, then open the letter.',
    points: [
      'Three-act reveal: a beating heart, the bloom, then a letter that unfolds on parchment.',
      'Hundreds of lily stamens and drifting petals animated in the browser.',
      'Japanese serif type and a crimson-on-midnight palette taken from the flower itself.',
    ],
    cover: { kind: 'phone', src: hgMob },
    video: { src: hgVideo, poster: hgMob },
    gallery: [
      { src: hgDesk, cap: 'The bloom (desktop)', kind: 'browser' },
      { src: hgOpen, cap: 'Tap to open', kind: 'browser' },
      { src: hgBloom, cap: 'Mobile', kind: 'phone' },
      { src: hgLetter, cap: 'The letter', kind: 'phone' },
    ],
    note: 'Screen recording and screenshots captured from the Higanbana build.',
    links: [],
  },
  {
    id: 'particle-heart',
    title: 'Particle Heart',
    kicker: '3D particle heart on a glowing portal',
    status: 'Live',
    role: 'Design + build',
    type: '3D / WebGL',
    stack: ['React', 'three.js', 'React Three Fiber', 'GLSL shaders', 'Bloom'],
    theme: { bg: '#03060f', bg2: '#0a1530', ink: '#e6efff', accent: '#4d8dff', soft: '#8fa3c9', dark: true },
    summary:
      'Thousands of particles rise from a glowing portal and gather into a heart. Move across it and the particles scatter, then drift back into shape.',
    points: [
      'Custom GLSL shaders drive every particle on the GPU.',
      'Post-processing bloom gives the holographic glow.',
      'Pointer interaction: the heart breaks apart and re-forms as you move.',
    ],
    cover: { kind: 'phone', src: phMHeart },
    video: { src: phVideo, poster: phMHeart },
    gallery: [
      { src: phForm, cap: 'Particles rising', kind: 'browser' },
      { src: phHeart, cap: 'The heart forms', kind: 'browser' },
      { src: phScatter, cap: 'Scattered by the pointer', kind: 'browser' },
      { src: phMHeart, cap: 'Mobile', kind: 'phone' },
      { src: phMScatter, cap: 'Mobile interaction', kind: 'phone' },
    ],
    note: 'Captured from the Particle Heart build.',
    links: [{ label: 'Open live site', href: 'https://mega-chaudhary.github.io/blueheart/' }],
  },
  {
    id: 'mine',
    title: 'Will You Be Mine',
    kicker: 'Tap-through proposal micro-site',
    status: 'Live',
    role: 'Design + build',
    type: 'Micro-site',
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'GitHub Pages'],
    theme: { bg: '#0b0204', bg2: '#1f060c', ink: '#fbe9ee', accent: '#ff2d4b', soft: '#b48a94', dark: true },
    summary:
      'A tiny website that asks one big question, one tap at a time. A heart draws itself line by line, then the question appears.',
    points: [
      'Four beats paced like a story: the seal, the heart drawing itself, the question, the answer.',
      'Hundreds of curved strokes drawn on canvas to build the heart over nine seconds.',
      'Add ?to=Name to the link and the page personalises itself.',
    ],
    cover: { kind: 'phone', src: wyQ },
    video: { src: wyVideo, poster: wyIntro },
    gallery: [
      { src: wyIntro, cap: 'Open it, slowly', kind: 'phone' },
      { src: wyDraw, cap: 'The heart draws itself', kind: 'phone' },
      { src: wyQ, cap: 'The question', kind: 'phone' },
      { src: wyYes, cap: 'Forever starts right now', kind: 'phone' },
      { src: wyDesk, cap: 'Desktop', kind: 'browser' },
    ],
    note: 'Captured from the live site’s code.',
    links: [{ label: 'Open live site', href: 'https://mega-chaudhary.github.io/willyoubemine/' }],
  },
];

export const PROCESS = [
  { title: 'Understand', body: 'Start with the problem: who will use it, what they need, and where they’ll get stuck.' },
  { title: 'Flow & wireframe', body: 'User flows and low-fidelity wireframes in Figma and Google Stitch, to test structure fast.' },
  { title: 'Design the system', body: 'High-fidelity screens, components, popups and empty states, designed as one consistent system.' },
  { title: 'Build with AI', body: 'I vibe code the design into a real product with React, PHP and AI tools, then keep iterating on the live thing.' },
];

// Keys on the 3D keypad. `group` sets the keycap colour.
export const KEYS = [
  { label: 'Figma', sub: 'design', group: 'accent', used: 'Every project starts here: flows, wireframes and final screens. 71 screens for FacultyHub.' },
  { label: 'Stitch', sub: 'design', group: 'light', used: 'Google Stitch for fast screen-flow exploration on FacultyHub.' },
  { label: 'Flows', sub: 'ux', group: 'light', used: 'User-flow mapping before any screen design.' },
  { label: 'Claude', sub: 'ai', group: 'gold', used: 'My AI pair for vibe coding FacultyHub, Memora, Higanbana and Particle Heart.' },
  { label: 'Wire', sub: 'ux', group: 'light', used: 'Low-fidelity wireframes to test structure fast.' },
  { label: 'Proto', sub: 'ux', group: 'light', used: 'Clickable prototypes, like the Raksha prototype in Figma.' },
  { label: 'Type', sub: 'ui', group: 'light', used: 'Type pairing and hierarchy across every screen.' },
  { label: 'Color', sub: 'ui', group: 'light', used: 'Palettes and themes, like Memora’s 11 occasion themes.' },
  { label: 'React', sub: 'code', group: 'dark', used: 'Higanbana, Particle Heart and the Memora heart-QR studio.' },
  { label: 'three', sub: 'code', group: 'dark', used: 'three.js and React Three Fiber for Particle Heart and this site.' },
  { label: 'HTML', sub: 'code', group: 'dark', used: 'The base of every page I ship.' },
  { label: 'CSS', sub: 'code', group: 'dark', used: 'Layout, motion and theming.' },
  { label: 'JS', sub: 'code', group: 'dark', used: 'Interactions and canvas animation, like the heart in Will You Be Mine and the ASCII eye and candle.' },
  { label: 'PHP', sub: 'code', group: 'dark', used: 'FacultyHub’s three portals and Memora’s partner portal.' },
  { label: 'MySQL', sub: 'data', group: 'dark', used: 'Databases for FacultyHub and Memora.' },
  { label: 'Git', sub: 'ship', group: 'accent', used: 'GitHub and GitHub Pages for hosting live sites.' },
];

export const TIMELINE = [
  { when: '2023 – 24', what: 'Store Manager', where: 'Chinese Store', body: 'Ran daily operations, staff coordination and inventory. Solved customer problems on the floor.' },
  { when: '2023 – 24', what: 'Social Media Handler', where: 'Unique Collection', body: 'Managed the social handle for a unique product collection for six months.' },
  { when: 'BIM', what: 'Institute of Management Studies', where: 'Running 6th semester', body: 'Found UI/UX design. Raksha became my first full app screen set, from splash logo to police dashboard.' },
  { when: 'Now', what: 'FacultyHub, Memora & more', where: 'Designing and building', body: 'Shipping a three-portal academic platform, building a product for flower shops, and making interactive pieces in three.js.' },
];
