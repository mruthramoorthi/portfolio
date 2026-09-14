/**
 * RUDRA CYBER-CORE PORTFOLIO - INTERACTIVE ENGINE
 * Features: Typewriter CLI, Live Hacker Terminal, Hosting Filter, Smooth Telemetry, Live SMTP Mailer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. DYNAMIC TYPEWRITER EFFECT
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    'AWS & Google Cloud Multi-Region Deployments',
    'Custom Business ERP & Automation Logic',
    'High-End Clusters & Budget-Optimized VPS',
    'Zero-Downtime Server Migrations & Tuning',
    'Hacker-Grade Cyber Hardening & Firewalls'
  ];
  let phraseIdx = 0;
  let letterIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const endPause = 2200;

  function runTypewriter() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, letterIdx - 1);
      letterIdx--;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, letterIdx + 1);
      letterIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && letterIdx === currentPhrase.length) {
      delay = endPause;
      isDeleting = true;
    } else if (isDeleting && letterIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(runTypewriter, delay);
  }

  runTypewriter();

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const cyberNav = document.getElementById('cyber-nav');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileToggle && cyberNav) {
    mobileToggle.addEventListener('click', () => {
      cyberNav.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        cyberNav.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. HOSTING PLAN TIER FILTER TOGGLE
  // --------------------------------------------------------------------------
  const tierBtns = document.querySelectorAll('.tier-toggle-btn');
  const planCards = document.querySelectorAll('.plan-card');

  tierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedTier = btn.getAttribute('data-tier');

      planCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedTier === 'all' || cardCat === selectedTier) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE HACKER TERMINAL CLI
  // --------------------------------------------------------------------------
  const terminalInput = document.getElementById('terminal-input');
  const termHistory = document.getElementById('term-history');
  const terminalBody = document.getElementById('terminal-body');
  const presetBtns = document.querySelectorAll('.term-preset-btn');

  const cliCommands = {
    help: `
<div class="term-line text-amber">AVAILABLE SYSTEM COMMANDS:</div>
<div class="term-line">  <span class="term-cmd">solutions</span>  - View 4-phase logical business problem-solving matrix</div>
<div class="term-line">  <span class="term-cmd">hosting</span>    - Compare High-End Enterprise (AWS/GCP) vs Budget VPS</div>
<div class="term-line">  <span class="term-cmd">products</span>   - List deployed systems (Wall-Dec, ERP Core, AI Search)</div>
<div class="term-line">  <span class="term-cmd">services</span>   - Overview of software & cloud engineering capabilities</div>
<div class="term-line">  <span class="term-cmd">status</span>     - Live system telemetry, cloud nodes, and uptime</div>
<div class="term-line">  <span class="term-cmd">contact</span>    - Transmission channels & direct email uplink</div>
<div class="term-line">  <span class="term-cmd">matrix</span>     - Run cyber telemetry diagnostics simulation</div>
<div class="term-line">  <span class="term-cmd">clear</span>      - Flush terminal history</div>`,

    solutions: `
<div class="term-line text-amber">[BUSINESS LOGIC METHODOLOGY]</div>
<div class="term-line">01. DECONSTRUCT: Identify operational bottlenecks, spreadsheet lag, inventory leakage.</div>
<div class="term-line">02. ARCHITECT: Model strict relational schemas (MySQL/MariaDB) and automated logic.</div>
<div class="term-line">03. CLOUD SCALE: Deploy to auto-scaling AWS/GCP or ultra-fast budget Linux VPS.</div>
<div class="term-line">04. HARDEN: Automated offsite backups, SSL, Fail2Ban, 99.99% uptime guarantee.</div>`,

    hosting: `
<div class="term-line text-amber">[CLOUD &amp; HOSTING INFRASTRUCTURE TIERS]</div>
<div class="term-line text-flame">&gt; TIER 1: HIGH-END ENTERPRISE (AWS &amp; GCP)</div>
<div class="term-line">  - Multi-AZ Elastic Load Balancers, CloudFront CDN, Aurora/Cloud SQL</div>
<div class="term-line">  - Auto-scaling Kubernetes/Docker clusters, unlimited concurrency.</div>
<div class="term-line text-flame">&gt; TIER 2: BUDGET-OPTIMIZED LEAN VPS</div>
<div class="term-line">  - Stripped Linux kernel, tuned Nginx with FastCGI microcache</div>
<div class="term-line">  - Sub-100ms response times for $5-$10/mo with zero overhead.</div>`,

    products: `
<div class="term-line text-amber">[FEATURED PRODUCTION ASSETS]</div>
<div class="term-line">01. Vehicle Market &amp; CRM: Old vehicle buy/sell inventory, RC transfer &amp; accounts ledger.</div>
<div class="term-line">02. Budget App (Kotlin): Mobile budget fixing, cash flow limits &amp; transaction tracking.</div>
<div class="term-line">03. Wall-Dec: Interior decor e-commerce, roll stock sync, dealer payments &amp; accounts reports.</div>
<div class="term-line">04. Accounts ERP Suite: Dealer ledger reconciliation, aging reports &amp; GST automated invoicing.</div>
<div class="term-line">05. MySQL Cloud Cluster: Containerized Docker database deployment with zero-loss backups.</div>
<div class="term-line">06. Neural AI Visual Search: Vector-similarity image matching engine (FastAPI/Python).</div>`,

    services: `
<div class="term-line text-amber">[CORE SERVICES PROVIDED]</div>
<div class="term-line">● Custom Business ERP &amp; Logic Automation</div>
<div class="term-line">● High-End AWS &amp; Google Cloud Architecture</div>
<div class="term-line">● Budget-Optimized VPS Server Setup ($5/mo with top performance)</div>
<div class="term-line">● MySQL Database Performance Tuning &amp; Schema Design</div>
<div class="term-line">● Full-Stack Web Development (React, Node.js, PHP, Python)</div>
<div class="term-line">● Zero-Downtime Server Migration &amp; Security Auditing</div>`,

    status: `
<div class="term-line text-amber">[SYSTEM TELEMETRY]</div>
<div class="term-line">● HOST: Rudra-CyberCore-Linux-x64</div>
<div class="term-line">● CLOUD REGIONS: AWS us-east-1 // GCP asia-south1 (Mumbai)</div>
<div class="term-line">● UPTIME TARGET: 99.99% // LATENCY: 12ms</div>
<div class="term-line">● SECURITY: Fail2Ban Active // Zero-Trust Access Active</div>
<div class="term-line">● STATUS: OPERATIONAL &amp; OPEN FOR BUSINESS CONSULTATIONS</div>`,

    contact: `
<div class="term-line text-amber">[DIRECT UPLINK CHANNELS]</div>
<div class="term-line">● Email: <a href="mailto:mruthramoorthi66@gmail.com" class="text-amber">mruthramoorthi66@gmail.com</a></div>
<div class="term-line">● GitHub: <a href="https://github.com/mruthramoorthi" target="_blank" class="text-amber">github.com/mruthramoorthi</a></div>
<div class="term-line">● Response Guarantee: Within 24 hours with architectural breakdown.</div>`,

    matrix: `
<div class="term-line text-flame">[RUNNING NEURAL DIAGNOSTIC STREAM...]</div>
<div class="term-line" style="color: #34d399; font-family: monospace;">
01001100 01001111 01000111 01001001 01000011 [ACID_OK]<br>
01000011 01001100 01001111 01010101 01000101 [AWS_GCP_LINKED]<br>
01010011 01000101 01010010 01010110 01000101 [VPS_LEAN_TUNED]<br>
01010011 01000101 01000011 01010101 01010010 [ENCRYPTION_MAX]
</div>
<div class="term-line text-amber">&gt;&gt; All systems green. Zero vulnerabilities detected.</div>`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      termHistory.innerHTML = '';
      if (terminalInput) terminalInput.value = '';
      return;
    }

    const commandRow = document.createElement('div');
    commandRow.className = 'term-line';
    commandRow.innerHTML = `<span class="term-user-prompt">rudra@core:~$</span> <span style="color: #fff;">${escapeHtml(rawCmd)}</span>`;
    termHistory.appendChild(commandRow);

    const responseRow = document.createElement('div');
    if (cliCommands[cmd]) {
      responseRow.innerHTML = cliCommands[cmd];
    } else {
      responseRow.innerHTML = `<div class="term-line" style="color: #ef4444;">Command not found: "${escapeHtml(rawCmd)}". Type <span class="term-cmd">help</span> for commands.</div>`;
    }
    termHistory.appendChild(responseRow);

    if (terminalInput) terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  // --------------------------------------------------------------------------
  // 5. CONTACT FORM & LIVE SMTP TRANSMISSION HANDLER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('cyber-contact-form');
  const contactStatus = document.getElementById('contact-status');
  const submitBtn = document.getElementById('contact-submit');

  if (contactForm && contactStatus && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="btn-text">ENCRYPTING &amp; TRANSMITTING SMTP...</span>';
      submitBtn.disabled = true;

      contactStatus.style.display = 'block';
      contactStatus.className = 'cyber-status-msg';
      contactStatus.style.background = 'rgba(245, 158, 11, 0.12)';
      contactStatus.style.border = '1px solid var(--accent-amber)';
      contactStatus.style.color = '#fbbf24';
      contactStatus.innerHTML = 'Connecting to secure Gmail SMTP server (smtp.gmail.com:465)... ⏳';

      const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        hosting_tier: document.getElementById('hosting-preference').value,
        message: document.getElementById('project-scope').value
      };

      try {
        let endpoint = '/api/contact';
        let response = null;

        try {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        } catch (fetchErr) {
          // If running directly under Apache without proxy, try send_mail.php
          endpoint = 'send_mail.php';
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
        }

        if (!response.ok) {
          // Retry with send_mail.php if /api/contact was 404/500
          if (endpoint !== 'send_mail.php') {
            endpoint = 'send_mail.php';
            response = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
          }
        }

        const result = await response.json();

        if (result.success) {
          contactStatus.style.background = 'rgba(16, 185, 129, 0.15)';
          contactStatus.style.border = '1px solid #10b981';
          contactStatus.style.color = '#34d399';
          contactStatus.innerHTML = `
            <strong>[TRANSMISSION DELIVERED TO INBOX]</strong><br>
            Your inquiry has been successfully sent to Rudra (<span style="color: #fbbf24;">mruthramoorthi66@gmail.com</span>).<br>
            <span style="color: #ffffff; font-size: 0.82rem;">A copy has been recorded with full details. Response time: &lt; 24 hours.</span>
          `;
          contactForm.reset();
        } else {
          throw new Error(result.message || 'SMTP Transmission failed');
        }
      } catch (err) {
        contactStatus.style.background = 'rgba(239, 68, 68, 0.15)';
        contactStatus.style.border = '1px solid #ef4444';
        contactStatus.style.color = '#f87171';
        contactStatus.innerHTML = `
          <strong>[TRANSMISSION NOTICE]</strong><br>
          ${escapeHtml(err.message || 'Error communicating with mail server.')}<br>
          <span style="color: #e2d9cf; font-size: 0.82rem;">Direct Email: <a href="mailto:mruthramoorthi66@gmail.com" style="color: #fbbf24; text-decoration: underline;">mruthramoorthi66@gmail.com</a></span>
        `;
      } finally {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. ACTIVE NAV LINK ON SCROLL
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  function updateScrollNav() {
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);

      if (activeLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(item => item.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateScrollNav);
});
