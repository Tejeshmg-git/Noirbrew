/* Noirbrew - Global Header Component */

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base-path') || '';
        const pagesBase = base === './' ? 'pages/' : ''; 
        
        const homeV1Link = `${base}index.html`;
        const homeV2Link = `${base}home-v2.html`;
        const aboutLink = `${pagesBase}about.html`;
        const teaLink = `${pagesBase}tea.html`;
        const meditationLink = `${pagesBase}meditation.html`;
        const reservationLink = `${pagesBase}reservation.html`;
        const loginLink = `${pagesBase}login.html`;
        const contactLink = `${pagesBase}contact.html`;

        this.innerHTML = `
            <header class="header solid-nav">
                <div class="container nav-container">
                    <a href="${homeV1Link}" class="logo">
                        <img src="${base}assets/images/logo-icon.svg" alt="Noirbrew Logo" class="logo-img">
                        <div class="logo-text">
                            <span class="noir">NOIR</span><span class="brew">BREW</span>
                        </div>
                    </a>
                    
                    <nav class="nav-links">
                        <ul>
                            <li class="has-dropdown">
                                <a href="${homeV1Link}" class="dropdown-trigger">Home <i class="ph ph-caret-down"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a href="${homeV1Link}">Home V1 - Classic</a></li>
                                    <li><a href="${homeV2Link}">Home V2 - Premium</a></li>
                                </ul>
                            </li>
                            <li><a href="${aboutLink}">About</a></li>
                            <li><a href="${teaLink}">Tea</a></li>
                            <li><a href="${meditationLink}">Meditation</a></li>
                            <li><a href="${reservationLink}">Reservation</a></li>
                            <li><a href="${contactLink}">Contact</a></li>
                        </ul>
                    </nav>

                    <div class="header-ctas">
                        <!-- Desktop Toggles -->
                        <div class="desktop-controls">
                            <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
                                <i class="ph ph-moon dark-icon"></i>
                                <i class="ph ph-sun light-icon"></i>
                            </button>
                            <button id="rtl-toggle" class="icon-btn rtl-btn" aria-label="Toggle RTL">
                                <span class="rtl-label">RTL</span>
                            </button>
                        </div>
                        
                        <!-- Desktop Buttons -->
                        <div class="desktop-btns">
                            <a href="${teaLink}" class="btn btn-secondary">Explore Tea</a>
                            <a href="${loginLink}" class="btn btn-primary">Login</a>
                        </div>

                        <!-- Mobile Hamburger -->
                        <button class="hamburger-menu" aria-label="Open Menu">
                            <i class="ph ph-list"></i>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Mobile Sidenav Overlay -->
            <div class="mobile-overlay"></div>

            <!-- Mobile Sidenav -->
            <aside class="mobile-sidebar">
                <div class="sidebar-header">
                    <span class="sidebar-logo">Menu</span>
                    <button class="close-sidebar"><i class="ph ph-x"></i></button>
                </div>

                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="${homeV1Link}">Home V1 - Classic</a></li>
                        <li><a href="${homeV2Link}">Home V2 - Premium</a></li>
                        <li><a href="${aboutLink}">About</a></li>
                        <li><a href="${teaLink}">Tea Collection</a></li>
                        <li><a href="${meditationLink}">Meditation</a></li>
                        <li><a href="${reservationLink}">Reservation</a></li>
                        <li><a href="${contactLink}">Contact</a></li>
                    </ul>
                </nav>

                <div class="sidebar-footer">
                    <div class="sidebar-controls">
                        <button id="mobile-theme-toggle" class="icon-btn-circle" aria-label="Toggle Theme">
                            <i class="ph ph-moon dark-icon"></i>
                            <i class="ph ph-sun light-icon"></i>
                        </button>
                        <button id="mobile-rtl-toggle" class="icon-btn-circle rtl-btn" aria-label="Toggle RTL">
                            <span class="rtl-label">RTL</span>
                        </button>
                    </div>
                    <div class="sidebar-btns">
                        <a href="${teaLink}" class="btn btn-secondary w-100">Explore Tea</a>
                        <a href="${loginLink}" class="btn btn-primary w-100">Login</a>
                    </div>
                </div>
            </aside>
        `;

        // --- Logic & State Persistence ---
        const root = document.body;
        const html = document.documentElement;
        
        const applyTheme = (theme) => {
            if (theme === 'light') {
                root.classList.add('light-mode');
                root.classList.remove('dark-mode');
                localStorage.setItem('noir-theme', 'light');
            } else {
                root.classList.add('dark-mode');
                root.classList.remove('light-mode');
                localStorage.setItem('noir-theme', 'dark');
            }
        };

        const savedTheme = localStorage.getItem('noir-theme') || 'dark';
        applyTheme(savedTheme);

        const savedDir = localStorage.getItem('noir-dir');
        if (savedDir) html.dir = savedDir;

        // Toggle Listeners (Support both mobile and desktop buttons)
        const initToggle = (id, action) => {
            const btn = this.querySelector(id);
            if (btn) btn.addEventListener('click', action);
        };

        initToggle('#theme-toggle', () => applyTheme(root.classList.contains('light-mode') ? 'dark' : 'light'));
        initToggle('#mobile-theme-toggle', () => applyTheme(root.classList.contains('light-mode') ? 'dark' : 'light'));
        
        const toggleRTL = () => {
            html.dir = html.dir === 'rtl' ? 'ltr' : 'rtl';
            localStorage.setItem('noir-dir', html.dir);
        };
        initToggle('#rtl-toggle', toggleRTL);
        initToggle('#mobile-rtl-toggle', toggleRTL);

        // Sidebar Controls
        const hamburger = this.querySelector('.hamburger-menu');
        const sidebar = this.querySelector('.mobile-sidebar');
        const overlay = this.querySelector('.mobile-overlay');
        const closeBtn = this.querySelector('.close-sidebar');

        const toggleSidebar = () => {
            if (!sidebar || !overlay) return;
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            root.classList.toggle('no-scroll');
        };

        if (hamburger) hamburger.addEventListener('click', toggleSidebar);
        if (overlay) overlay.addEventListener('click', toggleSidebar);
        if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);

        // Active Link Highlight (Refined for Component Parity)
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split("/").pop() || "index.html";
        const navLinks = this.querySelectorAll('.nav-links a, .sidebar-nav a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Normalize href for comparison
            const linkPage = href.split("/").pop();
            
            if (currentPage === linkPage) {
                link.classList.add('active');
                
                // If it's a child of a dropdown, highlight the parent trigger too
                const dropdownParent = link.closest('.has-dropdown');
                if (dropdownParent) {
                    const trigger = dropdownParent.querySelector('.dropdown-trigger');
                    if (trigger) trigger.classList.add('active');
                }
            }
        });

        // Inject Core Header CSS (Overriding defaults for cleanliness)
        const headerStyles = document.createElement('style');
        headerStyles.textContent = `
            header {
                background: var(--bg-primary) !important;
                border-bottom: 1px solid var(--glass-border);
                transition: transform 0.3s ease;
            }

            .logo {
                font-family: 'Playfair Display', serif;
                font-size: 20px;
                font-weight: 600;
                letter-spacing: 1px;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .logo-img { height: 22px; width: auto; }
            .logo-text { display: flex; align-items: center; gap: 2px; }
            .logo .noir { color: var(--text-primary) !important; }
            .logo .brew { color: var(--primary-gold) !important; }

            .desktop-controls, .desktop-btns { display: flex; align-items: center; gap: 24px; }
            
            /* --- RTL Toggle Style --- */
            .rtl-btn { font-family: 'Inter', sans-serif; }
            .rtl-label {
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 1px;
                text-transform: uppercase;
                min-width: 28px;
                text-align: center;
            }
            html[dir="rtl"] .rtl-label { content: ''; }
            html[dir="rtl"] .rtl-label::after { content: 'LTR'; }
            html[dir="ltr"] .rtl-label::after { content: ''; }
            html:not([dir]) .rtl-label::after { content: ''; } 
            
            /* Logic for the label text swap */
            .rtl-label { visibility: hidden; position: relative; }
            .rtl-label::before { 
                visibility: visible; 
                position: absolute; 
                inset: 0;
                content: 'RTL';
            }
            html[dir="rtl"] .rtl-label::before { content: 'LTR'; }
            /* --- Mobile Sidenav Styles --- */
            .mobile-overlay {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.85);
                z-index: 998;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
            }
            .mobile-overlay.active { opacity: 1; visibility: visible; }

            .mobile-sidebar {
                position: fixed;
                top: 0;
                right: -100%;
                width: 320px;
                height: 100vh;
                background: var(--bg-primary);
                z-index: 999;
                display: flex;
                flex-direction: column;
                transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border-left: 1px solid var(--glass-border);
            }
            .mobile-sidebar.active { right: 0; }

            .sidebar-header {
                padding: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--glass-border);
            }
            .sidebar-logo {
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 3px;
                color: var(--primary-gold);
            }
            .close-sidebar {
                background: none; border: none; font-size: 24px; color: var(--text-primary); cursor: pointer;
            }

            .sidebar-nav { padding: 40px 30px; flex: 1; overflow-y: auto; }
            .sidebar-nav ul { list-style: none; display: flex; flex-direction: column; gap: 32px; }
            .sidebar-nav a {
                color: var(--text-primary);
                text-decoration: none;
                font-size: 16px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 2px;
                transition: color 0.3s ease;
                display: block;
                text-align: left;
            }
            .sidebar-nav a.active { 
                color: var(--primary-gold) !important;
                font-weight: 600;
            }

            .nav-links a.active {
                color: var(--primary-gold) !important;
                opacity: 1 !important;
                position: relative;
            }

            .nav-links a.active i {
                color: var(--primary-gold) !important;
            }

            /* Premium Underline Indicator for Top-Level Active Links */
            .nav-links > ul > li > a.active::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 1px;
                background: var(--primary-gold);
                transform-origin: left;
                animation: lineGrow 0.4s ease forwards;
            }

            @keyframes lineGrow {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
            }

            .sidebar-footer {
                padding: 40px 30px;
                border-top: 1px solid var(--glass-border);
                display: flex;
                flex-direction: column;
                gap: 32px;
                background: var(--bg-secondary);
            }
            .sidebar-controls { display: flex; gap: 20px; }
            .icon-btn-circle {
                width: 48px; height: 48px;
                border-radius: 50%;
                border: 1px solid var(--glass-border);
                background: transparent;
                color: var(--text-primary);
                display: flex; align-items: center; justify-content: center;
                cursor: pointer;
                transition: border-color 0.3s ease;
            }
            .icon-btn-circle:hover { border-color: var(--primary-gold); }
            
            .sidebar-btns { display: flex; flex-direction: column; gap: 16px; }
            .w-100 { width: 100%; text-align: center; justify-content: center; }

            .no-scroll { overflow: hidden; }

            /* Desktop visibilities */
            @media (min-width: 1025px) {
                .hamburger-menu, .mobile-sidebar, .mobile-overlay { display: none !important; }
            }
            @media (max-width: 1024px) {
                .nav-links, .desktop-btns, .desktop-controls { display: none !important; }
                .hamburger-menu { display: flex; font-size: 24px; background: none; border: none; color: var(--text-primary); cursor: pointer; }
            }
        `;
        this.appendChild(headerStyles);
    }
}

customElements.define('site-header', SiteHeader);
