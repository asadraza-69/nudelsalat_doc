document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id], div.hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    /* ── Active link on scroll ──────────────────────────────── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id') || 'why-beef';
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));

    /* ── Smooth-scroll on nav click ─────────────────────────── */
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });



    /* ── Copy button on code blocks ─────────────────────────── */
    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.textContent = 'Copy';
        btn.style.cssText = [
            'position:absolute', 'top:0.6rem', 'right:0.6rem',
            'background:#21262d', 'color:#8b949e', 'border:1px solid #30363d',
            'border-radius:5px', 'padding:0.25rem 0.6rem', 'font-size:0.72rem',
            'cursor:pointer', 'font-family:Inter,sans-serif', 'font-weight:600',
            'transition:color .15s,background .15s',
        ].join(';');

        btn.addEventListener('mouseenter', () => { btn.style.color = '#f0f6fc'; btn.style.background = '#30363d'; });
        btn.addEventListener('mouseleave', () => { btn.style.color = '#8b949e'; btn.style.background = '#21262d'; });

        btn.addEventListener('click', () => {
            const text = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = 'Copied!';
                btn.style.color = '#3fb950';
                setTimeout(() => { btn.textContent = 'Copy'; btn.style.color = '#8b949e'; }, 2000);
            });
        });

        pre.style.position = 'relative';
        pre.appendChild(btn);
    });
});
