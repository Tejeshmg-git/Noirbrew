/* Noirbrew - Global Footer Component */

class SiteFooter extends HTMLElement {
    connectedCallback() {
        const base = this.getAttribute('base-path') || '';
        const pagesBase = base === './' ? 'pages/' : '';
        const year = new Date().getFullYear();

        this.innerHTML = `
            <footer class="footer section-padding">
                <div class="container footer-grid">
                    <!-- Column 1: Brand -->
                    <div class="footer-col brand-col">
                        <a href="${base}index.html" class="logo">
                            <span class="noir">NOIR</span><span class="brew">BREW</span>
                        </a>
                        <p class="footer-text">
                            Experience the calm luxury of specialty tea and curated meditation sessions. 
                            A sanctuary for the modern soul.
                        </p>
                        <div class="social-circles">
                            <a href="#" class="social-circle" aria-label="Instagram"><i class="ph ph-instagram-logo"></i></a>
                            <a href="#" class="social-circle" aria-label="X (Twitter)"><i class="ph ph-x-logo"></i></a>
                            <a href="#" class="social-circle" aria-label="LinkedIn"><i class="ph ph-linkedin-logo"></i></a>
                            <a href="#" class="social-circle" aria-label="YouTube"><i class="ph ph-youtube-logo"></i></a>
                        </div>
                    </div>

                    <!-- Column 2: Experience -->
                    <div class="footer-col">
                        <h4 class="footer-title">Experience</h4>
                        <ul class="footer-links">
                            <li><a href="${base}index.html">Home V1</a></li>
                            <li><a href="${base}home-v2.html">Home V2</a></li>
                            <li><a href="${pagesBase}tea.html">Tea</a></li>
                            <li><a href="${pagesBase}meditation.html">Meditation</a></li>
                            <li><a href="${pagesBase}404.html">404 Error</a></li>
                        </ul>
                    </div>

                    <!-- Column 3: Company -->
                    <div class="footer-col">
                        <h4 class="footer-title">Our Company</h4>
                        <ul class="footer-links">
                            <li><a href="${pagesBase}about.html">About</a></li>
                            <li><a href="${pagesBase}contact.html">Contact</a></li>
                            <li><a href="${pagesBase}reservation.html">Reservation</a></li>
                            <li><a href="${pagesBase}coming-soon.html">Coming Soon</a></li>
                        </ul>
                    </div>

                    <!-- Column 4: Newsletter -->
                    <div class="footer-col newsletter-col">
                        <h4 class="footer-title">Stay Balanced</h4>
                        <p class="footer-text newsletter-text">Join 5,000+ souls receiving weekly tea insights and meditation guides.</p>
                        <form class="newsletter-form">
                            <input type="email" placeholder="Email address" required>
                            <button type="submit" class="btn btn-primary full-width">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="container bottom-content">
                        <p class="copyright">&copy; ${year} NOIRBREW PLATFORM. ALL RIGHTS RESERVED.</p>
                        <div class="legal-links">
                            <a href="#">PRIVACY</a>
                            <a href="#">TERMS</a>
                            <a href="#">COOKIES</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
