/* Noirbrew - Global Header Component */

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base-path') || '';
        const pagesBase = base === './' ? 'pages/' : ''; // For root pages, subpages are in 'pages/', for subpages itself they are current dir.
        
        const homeV1Link = `${base}index.html`;
        const homeV2Link = `${base}home-v2.html`;
        const aboutLink = `${pagesBase}about.html`;
        const teaLink = `${pagesBase}tea.html`;
        const meditationLink = `${pagesBase}meditation.html`;
        const reservationLink = `${pagesBase}reservation.html`;
        const contactLink = `${pagesBase}contact.html`;

        this.innerHTML = `
            <header class="header transparent">
                <div class="container nav-container">
                    <a href="${homeV1Link}" class="logo">
                        <span class="noir">NOIR</span><span class="brew">BREW</span>
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
                        <!-- Theme Toggle -->
                        <button id="theme-toggle" class="icon-btn" aria-label="Toggle Theme">
                            <i class="ph ph-moon dark-icon"></i>
                            <i class="ph ph-sun light-icon"></i>
                        </button>
                        
                        <!-- RTL Toggle -->
                        <button id="rtl-toggle" class="icon-btn" aria-label="Toggle RTL">
                            <i class="ph ph-translate"></i>
                        </button>

                        <!-- Action Buttons -->
                        <a href="${teaLink}" class="btn btn-secondary">Explore Tea</a>
                        <a href="${reservationLink}" class="btn btn-primary">Book Now</a>

                        <!-- Mobile Hamburger -->
                        <button class="hamburger-menu" aria-label="Open Menu">
                            <i class="ph ph-list"></i>
                        </button>
                    </div>
                </div>
            </header>
        `;

        // 🌗 Presence Persistence: Global Initializations
        const root = document.body;
        const html = document.documentElement;
        
        const savedTheme = localStorage.getItem('noir-theme');
        const savedDir = localStorage.getItem('noir-dir');

        if (savedTheme === 'light') {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
        } else if (savedTheme === 'dark') {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
        }

        if (savedDir) {
            html.dir = savedDir;
        }

        // 🌗 Theme Toggle Interaction Logic
        const themeBtn = this.querySelector('#theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', (e) => {
                const isLight = root.classList.toggle('light-mode');
                if (isLight) {
                    root.classList.remove('dark-mode');
                    localStorage.setItem('noir-theme', 'light');
                } else {
                    root.classList.add('dark-mode');
                    localStorage.setItem('noir-theme', 'dark');
                }
            });
        }

        // 🔁 RTL Toggle Interaction Logic
        const rtlBtn = this.querySelector('#rtl-toggle');
        if (rtlBtn) {
            rtlBtn.addEventListener('click', () => {
                const isRTL = html.dir === 'rtl';
                html.dir = isRTL ? 'ltr' : 'rtl';
                localStorage.setItem('noir-dir', html.dir);
            });
        }

        // 📱 Mobile Navigation Logic
        const hamburger = this.querySelector('.hamburger-menu');
        const navMenu = this.querySelector('.nav-links');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // 🚦 Dynamic Active Link Highlight Logic
        const path = window.location.pathname;
        const page = path.split("/").pop();
        const allLinks = this.querySelectorAll('.nav-links a');

        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const linkPage = href.split("/").pop();
            
            // Check if current page is this link or if we are at root (index.html)
            if (page === linkPage || (page === "" && linkPage === "index.html")) {
                link.classList.add('active');
                
                // If it's inside a dropdown, highlight the parent too
                const dropdownParent = link.closest('.has-dropdown');
                if (dropdownParent) {
                    dropdownParent.querySelector('.dropdown-trigger').classList.add('active');
                }
            }
        });

        // 🎨 Inject Component Styles for Visibility & Active State
        const activeStyles = document.createElement('style');
        activeStyles.textContent = `
            /* Global Header Visibility authority */
            header {
                background: var(--bg-primary) !important;
                backdrop-filter: none !important;
                transition: var(--transition-base), padding 0.3s ease;
                border-bottom: 1px solid var(--glass-border);
            }

            /* Subtle Scrolled state for elevation */
            header.scrolled {
                padding: 10px 0 !important;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            }

            .logo .noir { 
                color: var(--text-primary) !important; 
                transition: color 0.3s ease;
            }
            
            .nav-links ul li a {
                color: var(--text-primary) !important;
                transition: color 0.3s ease;
            }

            .nav-links a.active {
                color: var(--primary-gold) !important;
                position: relative;
            }
            .nav-links a.active::after {
                content: "";
                position: absolute;
                bottom: -5px; left: 0;
                width: 100%; height: 1px;
                background: var(--primary-gold);
                transform: scaleX(1);
            }

            /* Fix invisibility for secondary buttons in dark heroes */
            .header-ctas .btn-secondary {
                color: #ffffff !important;
                border-color: #ffffff !important;
            }
            body.light-mode .header-ctas .btn-secondary {
                color: #000000 !important;
                border-color: #000000 !important;
            }

            /* Custom Dropdown Alignment */
            .dropdown-menu li a {
                color: var(--text-primary) !important;
                background: var(--bg-secondary) !important;
            }
        `;
        this.appendChild(activeStyles);

        // 🚦 Scroll Atmosphere Transformation
        const header = this.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

customElements.define('site-header', SiteHeader);
