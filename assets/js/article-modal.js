/**
 * Noir Brew - Premium Article Modal Experience
 * Handles immersive reading, progress tracking, and dynamic content injection.
 */

const articleData = {
    'intentional-silence': {
        title: 'The Art of Intentional Silence',
        category: 'Mindfulness',
        readTime: '5 min read',
        intro: 'In a world that rarely stops talking, silence has become the ultimate luxury. Discover how deep stillness can restore clarity, improve presence, and reconnect you with your internal balance.',
        content: `
            <p>Silence is not just the absence of sound; it is a presence in itself. When we intentionally step into a quiet space, we allow our nervous system to recalibrate. The constant noise of modern life—notifications, traffic, background hums—keeps our brains in a state of mild alert. Intentional silence is the antidote.</p>
            
            <h4>The Power of the Pause</h4>
            <p>Begin with five minutes. Sit in a space where you won't be interrupted. Don't try to meditate or control your thoughts; simply listen to the silence. You'll notice that after a few minutes, your breathing slows and the "mental fog" begins to lift.</p>
            
            <p>True clarity isn't found in the noise; it's waiting for you in the gaps between.</p>
        `,
        nextId: 'finding-calm'
    },
    'finding-calm': {
        title: 'A Guide to Finding Calm in Chaos',
        category: 'Wellness',
        readTime: '4 min read',
        intro: 'Life doesn\'t always wait for us to be ready. Learn practical, high-impact rituals to maintain your center even when the world feels overwhelming.',
        content: `
            <p>We often think of peace as something that happened in the past or something we'll find in the future—after the project is done, after the kids are asleep, after the weekend starts. But true calm is a portable state of being.</p>
            
            <h4>The Anchor Ritual</h4>
            <p>When chaos strikes, find an anchor. It could be the sensation of your feet on the floor, the warmth of a mug in your hands, or three conscious breaths. This 30-second reset breaks the stress cycle and brings you back to the present moment.</p>
            
            <p>Remember: You are the sky, and the chaos is just the weather. The weather changes, but the sky remains vast, open, and untouched.</p>
        `,
        nextId: 'seasonal-rituals'
    },
    'seasonal-rituals': {
        title: 'Rituals for the Changing Seasons',
        category: 'Life',
        readTime: '6 min read',
        intro: 'Nature doesn\'t rush, yet everything is accomplished. Discover how to align your daily tea and meditation practices with the natural rhythm of the year.',
        content: `
            <p>Just as the earth transitions through cycles of growth, harvest, and rest, our bodies and minds crave different rhythms throughout the year. Aligning your rituals with the seasons is a powerful way to stay grounded.</p>
            
            <h4>The Great Rest</h4>
            <p>This is the time for deep introspection. Use heavier, spiced blends and longer periods of seated silence. Respect the shorter days by slowing down your pace and allowing yourself more time for restoration.</p>
            
            <p>By listening to the external world, we learn to better hear our internal needs. Seasonal living isn't a trend; it's a return to our original pace.</p>
        `,
        nextId: 'tea-alchemy'
    },
    'tea-alchemy': {
        title: 'The Alchemy of Rare Tea Blends',
        category: 'Rituals',
        readTime: '7 min read',
        intro: 'Tea is more than a beverage; it\'s a bridge to the present. Explore the transformative power of ceremonial-grade infusions and the science behind the calm.',
        content: `
            <p>The journey from a single leaf to a perfect cup of tea is a masterclass in patience and precision. Rare, ceremonial-grade teas offer a complexity of flavor and a depth of experience that transcends the ordinary.</p>
            
            <h4>The Science of L-Theanine</h4>
            <p>Rare green and white teas are rich in L-theanine, an amino acid that promotes relaxation without drowsiness. When combined with caffeine, it creates a state of "alert calm" that is perfect for meditation or deep focus.</p>
            
            <p>Every sip is an invitation to slow down. In the world of Noir Brew, we don't just drink tea; we experience the alchemy of nature in every drop.</p>
        `,
        nextId: 'intentional-silence'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('article-modal');
    const contentArea = document.getElementById('modal-content-area');
    const progressBar = document.getElementById('progress-bar');
    const closeBtn = document.getElementById('close-modal');
    const triggers = document.querySelectorAll('.read-article-btn');

    if (!modal || !contentArea) return;

    function openArticle(id) {
        const data = articleData[id];
        if (!data) return;

        // Inject Content (Images removed as per user request)
        contentArea.innerHTML = `
            <div class="modal-article-header">
                <div class="modal-article-meta">
                    <span class="section-tag section-tag-pill">${data.category}</span>
                    <span style="opacity: 0.6; font-size: 13px;">${data.readTime}</span>
                </div>
                <h2 class="modal-article-title Playfair">${data.title}</h2>
                <p class="modal-article-intro">${data.intro}</p>
            </div>
            
            <div class="modal-article-body">
                ${data.content}
            </div>

            <div class="modal-article-footer">
                <span class="read-next-label">Read Next</span>
                <h3 class="read-next-title Playfair" id="read-next-trigger" data-next-id="${data.nextId}">
                    ${articleData[data.nextId].title} →
                </h3>
            </div>
        `;

        // Re-attach "Read Next" trigger
        const nextTrigger = document.getElementById('read-next-trigger');
        if (nextTrigger) {
            nextTrigger.addEventListener('click', () => {
                const nextId = nextTrigger.getAttribute('data-next-id');
                window.switchArticle(nextId);
            });
        }

        // Reset Scroll & Progress
        contentArea.scrollTop = 0;
        progressBar.style.width = '0%';

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 

        // Update icons if any were added
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function closeArticle() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    window.switchArticle = (id) => {
        contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => openArticle(id), 400);
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = trigger.getAttribute('data-article');
            if(id) openArticle(id);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeArticle);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeArticle();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeArticle();
    });

    contentArea.addEventListener('scroll', () => {
        const winScroll = contentArea.scrollTop;
        const height = contentArea.scrollHeight - contentArea.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
});
