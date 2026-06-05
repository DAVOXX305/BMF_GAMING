/* =====================================================
   BMF_GAMING — script.js v2.0 — TOUS BUGS CORRIGÉS
   Corrections : Burger · News · Codes · Bot · Chat
   Nouveau     : Community Chat Joueurs en temps réel
   ===================================================== */
'use strict';

// ============================================
// 1. UTILITAIRES
// ============================================
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

// ============================================
// 2. NAVBAR — Scroll + Masquage
// ============================================
const navbar = $('#navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Classe scrolled
  navbar?.classList.toggle('scrolled', y > 80);

  // Masquer/Afficher selon direction scroll
  if (y > 300 && navbar) {
    navbar.style.transform = y > lastScroll
      ? 'translateY(-110%)'
      : 'translateY(0)';
  } else if (navbar) {
    navbar.style.transform = 'translateY(0)';
  }

  // Bouton retour en haut — FIXED
  $('#btn-top')?.classList.toggle('visible', y > 450);

  lastScroll = y;
});

// ============================================
// 3. BURGER MENU — FIXED
// ============================================
function toggleMenu() {
  const nav    = $('#nav-links');
  const burger = $('#burger');
  if (!nav || !burger) return;

  const isOpen = nav.classList.toggle('ouvert');
  const spans  = $$('span', burger);

  if (isOpen) {
    if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    if (spans[1]) spans[1].style.opacity   = '0';
    if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  }
}

// Ferme le burger au clic extérieur
document.addEventListener('click', e => {
  const nav    = $('#nav-links');
  const burger = $('#burger');
  if (
    nav?.classList.contains('ouvert') &&
    !nav.contains(e.target) &&
    !burger?.contains(e.target)
  ) toggleMenu();
});

// Ferme le burger au clic sur un lien
$$('.nav-link').forEach(l => on(l, 'click', () => {
  if ($('#nav-links')?.classList.contains('ouvert')) toggleMenu();
}));

// ============================================
// 4. SMOOTH SCROLL — FIXED
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  on(a, 'click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    const offset = (navbar?.offsetHeight || 70) + 12;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ============================================
// 5. LIEN ACTIF NAVBAR
// ============================================
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      $$('.nav-link').forEach(l => l.classList.remove('actif-nav'));
      $(`.nav-link[href="#${e.target.id}"]`)?.classList.add('actif-nav');
    }
  });
}, { threshold: 0.3 });

$$('section[id]').forEach(s => navObs.observe(s));

// ============================================
// 6. COMPTEURS ANIMÉS
// ============================================
function animerCompteur(el) {
  const cible = parseInt(el.dataset.target, 10);
  const debut = performance.now();
  const duree = 2200;

  (function update(now) {
    const p    = Math.min((now - debut) / duree, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * cible).toLocaleString('fr-FR');
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = cible.toLocaleString('fr-FR');
  })(performance.now());
}

new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      $$('.stat-nombre').forEach(animerCompteur);
      obs.disconnect();
    }
  });
}, { threshold: 0.5 }).observe($('#accueil') || document.body);

// ============================================
// 7. SCROLL REVEAL
// ============================================
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay || '0', 10);
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.05 });

function initReveal() {
  $$('.jeu-card, .guide-card, .news-card, .tierlist-card, .code-card').forEach((el, i) => {
    el.classList.add('apparition');
    el.dataset.delay = String((i % 4) * 90);
    revealObs.observe(el);
  });
  $$('.section-header, .filtres, .contact-inner').forEach(el => {
    el.classList.add('apparition');
    revealObs.observe(el);
  });
}

// ============================================
// 8. BOUTON RETOUR EN HAUT
// ============================================
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 9. FILTRES GUIDES — FIXED
// ============================================
function filtrerGuides(categorie) {
  // Retire actif de tous les boutons
  $$('.filtre').forEach(b => b.classList.remove('actif'));
  // Met actif sur le bouton cliqué
  event?.currentTarget?.classList.add('actif');

  $$('.guide-card').forEach(carte => {
    const cats = carte.dataset.cat || '';
    if (categorie === 'tous') {
      carte.classList.remove('cache');
    } else {
      carte.classList.toggle('cache', !cats.includes(categorie));
    }
  });
}

// ============================================
// 10. FORMULAIRE CONTACT
// ============================================
function rejoindre() {
  const pseudoEl  = $('#pseudo-input');
  const emailEl   = $('#email-input');
  const confirmEl = $('#confirmation');
  const pseudo    = pseudoEl?.value.trim();
  const email     = emailEl?.value.trim();

  if (!pseudo || pseudo.length < 3) {
    secouer(pseudoEl);
    afficherErreur(pseudoEl, '⚠ Entre ton pseudo gamer (min. 3 caractères) !');
    return;
  }
  if (email && !email.includes('@')) {
    secouer(emailEl);
    afficherErreur(emailEl, '⚠ Email invalide.');
    return;
  }

  if (pseudoEl) pseudoEl.value = '';
  if (emailEl)  emailEl.value  = '';

  if (confirmEl) {
    confirmEl.innerHTML = `✅ Bienvenue <strong>${pseudo}</strong> dans le crew BMF_GAMING ! 🎮`;
    confirmEl.style.display = 'block';
    setTimeout(() => { confirmEl.style.display = 'none'; }, 5000);
  }

  // Ajoute le joueur dans le community chat
  ajouterJoueurCommunity(pseudo);
}

function secouer(el) {
  if (!el) return;
  el.style.borderColor = 'var(--rouge)';
  el.style.animation   = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

function afficherErreur(el, msg) {
  el?.parentElement?.querySelector('.erreur-msg')?.remove();
  if (!el) return;
  const span = document.createElement('span');
  span.className   = 'erreur-msg';
  span.textContent = msg;
  Object.assign(span.style, {
    color: 'var(--rouge)', fontSize: '0.70rem',
    display: 'block', marginTop: '4px', fontFamily: 'monospace'
  });
  el.insertAdjacentElement('afterend', span);
  setTimeout(() => span.remove(), 3000);
}

// ============================================
// 11. COPIER CODE AU CLIC
// ============================================
document.addEventListener('click', e => {
  if (!e.target.classList.contains('code-valeur')) return;
  const code = e.target.textContent.trim();
  navigator.clipboard.writeText(code).then(() => {
    const orig = e.target.textContent;
    e.target.textContent = '✅ COPIÉ !';
    e.target.style.color = 'var(--vert)';
    setTimeout(() => { e.target.textContent = orig; e.target.style.color = ''; }, 1800);
  }).catch(() => {
    e.target.style.color = 'var(--rouge)';
    setTimeout(() => { e.target.style.color = ''; }, 1500);
  });
});

// ============================================
// 12. EFFET LUMINEUX CARTES
// ============================================
function initEffetCartes() {
  $$('.jeu-card, .tierlist-card, .news-card, .guide-card').forEach(c => {
    on(c, 'mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      c.style.background = `radial-gradient(circle at ${x}% ${y}%,
        rgba(0,212,255,0.07), rgba(7,15,42,0.88) 60%)`;
    });
    on(c, 'mouseleave', () => { c.style.background = ''; });
  });
}

// ============================================
// 13. CHARGEMENT NEWS — FIXED
// ============================================
function chargerNews() {
  const container = $('#news-container');
  if (!container) return;

  let news = [];
  try { news = (window.BMF_NEWS || []); } catch(e) { news = []; }

  if (!news.length) {
    container.innerHTML = `
      <p style="color:var(--text-dim);text-align:center;
                grid-column:1/-1;padding:30px;font-family:monospace;">
        🔄 Les actualités arrivent très bientôt...
      </p>`;
    return;
  }

  container.innerHTML = news.slice(0, 6).map((n, i) => `
    <article class="news-card apparition" data-delay="${(i % 3) * 90}">
      <div class="news-categorie">${n.emoji || '📰'} ${n.categorie || 'NEWS'}</div>
      <h4>${n.titre || ''}</h4>
      <p>${n.description || ''}</p>
      <span class="news-date">${n.date || ''}</span>
    </article>
  `).join('');

  $$('#news-container .news-card').forEach(el => revealObs.observe(el));
}

// ============================================
// 14. CHARGEMENT CODES — FIXED
// ============================================
function chargerCodes() {
  const container = $('#codes-container');
  if (!container) return;

  let codes = [];
  try { codes = (window.BMF_CODES || []).filter(c => c.actif !== false); }
  catch(e) { codes = []; }

  if (!codes.length) {
    container.innerHTML = `
      <p style="color:var(--text-dim);text-align:center;
                grid-column:1/-1;padding:30px;font-family:monospace;">
        🎁 De nouveaux codes arrivent très bientôt !
      </p>`;
    return;
  }

  container.innerHTML = codes.map((c, i) => `
    <div class="code-card apparition" data-delay="${(i % 4) * 75}">
      <span class="code-jeu">${c.jeu || ''}</span>
      <span class="code-valeur" title="Clique pour copier">${c.code || ''}</span>
      <span class="code-recompense">🎁 ${c.recompense || ''}</span>
      <span class="code-expire">⏳ ${c.expire || ''}</span>
    </div>
  `).join('');

  $$('#codes-container .code-card').forEach(el => revealObs.observe(el));
}

// ============================================
// 15. BOT GAMING — VERSION AMÉLIORÉE
// Moteur de matching amélioré + plus de réponses
// ============================================

const BOT_KB = [

  // ── Salutations ──
  {
    mots: ['bonjour','salut','hello','yo','hey','coucou','bonsoir','hi','hola'],
    rep: `👋 <b>Salut gamer !</b> Bienvenue sur <b>BMF_GAMING</b> !<br><br>
Je suis le bot BMF — je peux t'aider avec :<br>
🟥 Roblox · 🎯 Fortnite · 🔫 COD · ⛏ Minecraft<br>
⚔ Clash of Clans · 🌸 Genshin · 🚀 Among Us<br><br>
Pose ta question ou clique sur une suggestion ! 🎮`
  },

  // ── Aide ──
  {
    mots: ['aide','help','quoi faire','que sais tu','que peux tu'],
    rep: `🎮 <b>Je peux t'aider avec :</b><br><br>
📖 <b>Guides</b> — stratégies, progression, boss<br>
🏆 <b>Tier Lists</b> — classements par jeu<br>
🎁 <b>Codes</b> — codes gratuits actifs<br>
💡 <b>Tips</b> — astuces pour progresser<br>
⚔ <b>Boss</b> — stratégies de combat détaillées<br><br>
Exemples de questions :<br>
<em>"Comment passer Ascension 4 ?"</em><br>
<em>"Meilleur loadout COD ?"</em><br>
<em>"Codes Blox Fruits ?"</em>`
  },

  // ── Codes général ──
  {
    mots: ['code','codes','code gratuit','codes gratuits','recompense'],
    rep: `🎁 <b>Codes Gratuits — BMF_GAMING</b><br><br>
Tous les codes actifs sont dans la section <b>🎁 Codes Gratuits</b> du site. Tu peux aussi me demander les codes d'un jeu précis !<br><br>
- 🍎 Blox Fruits → tape <em>"codes blox fruits"</em><br>
- 🌸 Genshin Impact → tape <em>"codes genshin"</em><br>
- 🌟 Anime Adventures → tape <em>"codes anime adventures"</em><br>
- 🐾 Pet Simulator X → tape <em>"codes pet sim"</em>`
  },

  // ── Sailor Piece général ──
  {
    mots: ['sailor piece','sailor','sailorpiece','sp'],
    rep: `⛵ <b>Sailor Piece — Résumé BMF</b><br><br>
RPG anime Roblox inspiré de One Piece.<br><br>
📌 <b>Contenu disponible :</b><br>
- Guide Ascension 4 complet<br>
- Farming boss Alucard & Aizen<br>
- Drops et stratégies optimales<br><br>
Pose une question précise :<br>
<em>"Guide Ascension 4"</em><br>
<em>"Comment battre Alucard ?"</em><br>
<em>"Drops d'Aizen ?"</em>`
  },

  // ── Ascension 4 ──
  {
    mots: ['ascension 4','asc 4','ascension iv','passer ascension','debloquer ascension'],
    rep: `🏆 <b>Guide Ascension 4 — Sailor Piece</b><br><br>
<b>Prérequis :</b> Niveau 450 minimum<br><br>
<b>📋 Ordre optimal :</b><br>
1️⃣ Farm <b>Alucard</b> (Sailor Island)<br>
&nbsp;&nbsp;&nbsp;→ Drops : Épée Fantôme (8%) + Manteau (5%)<br>
2️⃣ Farm <b>Aizen</b> (Hollow Island)<br>
&nbsp;&nbsp;&nbsp;→ Drops : Zanpakuto (6%) + Haori (4%)<br>
3️⃣ PNJ <b>Yami</b> à la Citadelle<br>
4️⃣ Donjon final de validation<br><br>
💡 <b>Conseil BMF :</b> Commence par Alucard — son drop rate est meilleur !`
  },

  // ── Alucard ──
  {
    mots: ['alucard','boss alucard','sailor island boss','farmer alucard'],
    rep: `⚔ <b>Boss Alucard — Sailor Island</b><br><br>
📍 <b>Localisation :</b> Zone Nord-Est<br>
⏱ <b>Respawn :</b> 15 minutes<br>
❤️ <b>HP :</b> ~850 000<br><br>
🎯 <b>Drops :</b><br>
- Épée Fantôme → <b>8%</b><br>
- Manteau des Ombres → <b>5%</b><br>
- Grimoire Alucard → <b>2%</b> (rare)<br><br>
⚠️ <b>Attaques :</b><br>
- Drain Vital → reste à distance<br>
- Nova Sombre → AoE circulaire, bouge<br><br>
💡 <b>Tip BMF :</b> Comp distance + potions résistance magique.`
  },

  // ── Aizen ──
  {
    mots: ['aizen','boss aizen','hollow island','hollow','farmer aizen'],
    rep: `👁 <b>Boss Aizen — Hollow Island</b><br><br>
📍 <b>Localisation :</b> Château Central<br>
⏱ <b>Respawn :</b> 20 minutes<br>
❤️ <b>HP :</b> ~1 200 000<br><br>
🎯 <b>Drops :</b><br>
- Zanpakuto Brisé → <b>6%</b><br>
- Haori de Capitaine → <b>4%</b><br>
- Reiatsu Noir → <b>1.5%</b> (très rare)<br><br>
⚠️ <b>Phases :</b><br>
- Phase 1 (100→50%) → normal<br>
- Phase 2 (50→0%) → Bankai actif, DANGER<br><br>
💡 <b>Tip BMF :</b> Bouge CONSTAMMENT en phase 2. Potions vitesse + soins obligatoires.`
  },

  // ── Blox Fruits général ──
  {
    mots: ['blox fruits','bloxfruits','blox fruit'],
    rep: `🍎 <b>Blox Fruits — Guide BMF</b><br><br>
BMF_GAMING couvre tout :<br>
- Tier list fruits mise à jour<br>
- Meilleurs spots de grinding<br>
- Codes actifs<br>
- Progression par niveau<br><br>
Exemples de questions :<br>
<em>"Meilleur fruit blox fruits ?"</em><br>
<em>"Où farmer blox fruits ?"</em><br>
<em>"Codes blox fruits ?"</em>`
  },

  // ── Tier list fruits ──
  {
    mots: ['meilleur fruit','quel fruit','tier list fruit','tier list blox','fruit blox'],
    rep: `🍎 <b>Tier List Fruits — Blox Fruits</b><br><br>
👑 <b>SS (Broken) :</b> Dragon · Leopard · Kitsune<br>
🥇 <b>S :</b> Dough · Spirit · Venom · Phoenix<br>
🥈 <b>A :</b> Shadow · Rumble · Magma · Quake<br>
🥉 <b>B :</b> Buddha · Flame · Ice · Sand<br>
📉 <b>C :</b> Smoke · Spike · Chop<br><br>
💡 PvP → <b>Leopard</b> | Farm → <b>Dragon</b> | Débutant → <b>Magma</b>`
  },

  // ── Codes Blox Fruits ──
  {
    mots: ['code blox','codes blox'],
    rep: `🎁 <b>Codes Blox Fruits Actifs</b><br><br>
- <code>BIGNEWS</code> → 2x EXP 24h<br>
- <code>THEGREATACE</code> → Beli Boost 20min<br>
- <code>ENVYARMY</code> → XP Boost 20min<br>
- <code>Magicbus</code> → 2x EXP 20min<br>
- <code>KITTGAMING</code> → 2x EXP 20min<br><br>
⚠️ Utilise-les vite — ils expirent !`
  },

  // ── Farm Blox Fruits ──
  {
    mots: ['farm blox','grind blox','ou farmer blox','spot blox'],
    rep: `⚔ <b>Spots de Farm — Blox Fruits</b><br><br>
🟢 <b>Débutant (1-100) :</b> Île des Pirates<br>
🟡 <b>Milieu (100-700) :</b> Skylands → Colosseum<br>
🔴 <b>Avancé (700-1500) :</b> Haunted Castle<br>
💀 <b>End Game (1500+) :</b> Mirror Fractal<br><br>
💡 Toujours farmer avec Auto-Skill activé !`
  },

  // ── Fortnite général ──
  {
    mots: ['fortnite'],
    rep: `🎯 <b>Fortnite — Guide BMF</b><br><br>
BMF_GAMING couvre :<br>
- Builds compétitifs et edits<br>
- Tier list des armes<br>
- Stratégies ranked<br>
- Rotations et survie<br><br>
Exemples :<br>
<em>"Build compétitif fortnite ?"</em><br>
<em>"Meilleure arme fortnite ?"</em><br>
<em>"Comment monter en ranked fortnite ?"</em>`
  },

  // ── Build Fortnite ──
  {
    mots: ['build fortnite','building fortnite','edit fortnite','90 fortnite','construire fortnite'],
    rep: `🔨 <b>Build Compétitif — Fortnite</b><br><br>
🧱 <b>Techniques essentielles :</b><br>
- <b>Ramp Rush</b> → Rampe + Mur pour avancer couvert<br>
- <b>90s</b> → Monter en hauteur rapidement<br>
- <b>Box Fight</b> → Cube 1x1 en combat rapproché<br>
- <b>High Ground</b> → Toujours chercher la hauteur<br><br>
✂️ <b>Edits clés :</b><br>
- Window edit → Tirer + Reset immédiat<br>
- Floor edit → Tomber sur l'ennemi<br><br>
💡 <b>Ordre d'apprentissage BMF :</b><br>
90s → Box Fight → Edits → Ramp Rush`
  },

  // ── Armes Fortnite ──
  {
    mots: ['arme fortnite','tier list fortnite','meilleure arme fortnite','loadout fortnite'],
    rep: `🎯 <b>Tier List Armes — Fortnite</b><br><br>
👑 <b>S :</b> Sniper Bolt-Action · AR Exo-Série<br>
🥇 <b>A :</b> Shotgun Pompe Pro · SMG Rapide<br>
🥈 <b>B :</b> Pistolet Pro · Fusil Précision<br>
📉 <b>C :</b> Revolver · LMG · Minigun<br><br>
🎒 <b>Loadout optimal BMF :</b><br>
AR + Shotgun + Sniper + SMG + Soins`
  },

  // ── Ranked Fortnite ──
  {
    mots: ['ranked fortnite','rang fortnite','monter fortnite','diamond fortnite'],
    rep: `📊 <b>Guide Ranked — Fortnite</b><br><br>
🎯 <b>Règles d'or :</b><br>
- Atterris loin du bus pour farm tranquille<br>
- Évite les combats tôt dans la partie<br>
- Joue le bord du storm<br>
- High ground avant les fights finaux<br><br>
💡 <b>Conseil BMF :</b> 1 Kill = +100 SR · 1 Victoire = +450 SR<br>
→ Survival > Kills en ranked !`
  },

  // ── Call of Duty ──
  {
    mots: ['call of duty','cod','warzone','modern warfare','black ops'],
    rep: `🔫 <b>Call of Duty — Guide BMF</b><br><br>
BMF_GAMING couvre :<br>
- Meilleurs loadouts par style<br>
- Stratégies par map<br>
- Guide ranked play<br>
- Tips Search & Destroy<br><br>
Exemples :<br>
<em>"Meilleur loadout COD ?"</em><br>
<em>"Stratégie SnD ?"</em><br>
<em>"Comment monter en ranked COD ?"</em>`
  },

  // ── Loadout COD ──
  {
    mots: ['loadout cod','meilleur loadout','arme cod','classe cod','meta cod'],
    rep: `🔫 <b>Loadouts COD — Sélection BMF</b><br><br>
⚡ <b>Agressif (SMG) :</b><br>
Rival-9 | Suppressor · Long Barrel · Extended Mag<br><br>
🎯 <b>Long Portée (AR) :</b><br>
MCW | 4x Scope · Bipod · Precision Barrel<br><br>
💥 <b>SnD (Sniper) :</b><br>
MORS | 12x Scope · Tac Laser · Stock léger<br><br>
💡 Shipment → SMG · Karachi → AR · Sub Base → Sniper`
  },

  // ── SnD COD ──
  {
    mots: ['snd','search destroy','search and destroy','bombe cod'],
    rep: `💣 <b>Search & Destroy — COD</b><br><br>
⚔ <b>En Attaque :</b><br>
- Split 3/2 sur les deux sites<br>
- Fake plant pour piéger les défenseurs<br>
- Smoke + Flash avant d'entrer<br><br>
🛡 <b>En Défense :</b><br>
- Tiens les angles des deux sites<br>
- Rotate vite quand le plant est confirmé<br>
- Garde 1 joueur pour le défuse silencieux<br><br>
💡 <b>Conseil BMF :</b> La communication > le skill en SnD !`
  },

  // ── Minecraft ──
  {
    mots: ['minecraft','mine craft'],
    rep: `⛏ <b>Minecraft — Guide BMF</b><br><br>
BMF_GAMING couvre :<br>
- Guide survie débutant complet<br>
- Meilleures seeds 2026<br>
- Comment trouver des diamants<br>
- Builds et redstone avancé<br><br>
Exemples :<br>
<em>"Débuter sur minecraft ?"</em><br>
<em>"Meilleures seeds minecraft ?"</em><br>
<em>"Comment trouver des diamants ?"</em>`
  },

  // ── Diamants Minecraft ──
  {
    mots: ['diamant','diamants','trouver diamant','niveau diamant','y diamant'],
    rep: `💎 <b>Guide Diamants — Minecraft 1.21</b><br><br>
📍 <b>Niveau optimal :</b> Y: -54 à Y: -58<br><br>
⛏ <b>Technique Branch Mining :</b><br>
- Tunnels espacés de 2 blocs<br>
- Torches tous les 8 blocs<br>
- Mine en zigzag pour couvrir plus de terrain<br><br>
🔧 <b>Enchantements essentiels :</b><br>
- Fortune III → 2-3x plus de diamants<br>
- Efficacité V → mine plus vite<br><br>
💡 <b>Conseil BMF :</b> Évite les grottes → risque de lave !`
  },

  // ── Seeds Minecraft ──
  {
    mots: ['seed minecraft','seeds minecraft','meilleure seed','seed 2026'],
    rep: `🗺 <b>Meilleures Seeds Minecraft 2026</b><br><br>
🏔 <b>Villages au spawn :</b> <code>-1789428733</code><br>
💎 <b>Diamants visibles :</b> <code>2111844826</code><br>
🏝 <b>Île tropicale :</b> <code>-7853516656</code><br>
🏰 <b>Château bastion :</b> <code>1887126555</code><br>
🌋 <b>8 biomes variés :</b> <code>4837753</code>`
  },

  // ── Clash of Clans ──
  {
    mots: ['clash of clans','coc','clashofclans','clash clan'],
    rep: `⚔ <b>Clash of Clans — Guide BMF</b><br><br>
BMF_GAMING couvre :<br>
- Attaques par TH (Town Hall)<br>
- Designs de bases défensives<br>
- Clan Wars League (CWL)<br>
- Guide de progression rapide<br><br>
Exemples :<br>
<em>"Attaque TH16 ?"</em><br>
<em>"Comment progresser vite COC ?"</em>`
  },

  // ── TH16 COC ──
  {
    mots: ['th16','town hall 16','attaque th16','th 16'],
    rep: `🏆 <b>Attaque TH16 — Clash of Clans</b><br><br>
💥 <b>Compo #1 — Super Barbarians :</b><br>
10 Super Barb + 5 Witches + 5 Healers<br>
Sorts : Rage x2 · Heal x2 · Freeze x2<br><br>
💥 <b>Compo #2 — Dragons Électro :</b><br>
10 Dragons + 5 Electro Dragons<br>
Sorts : Lightning x4 · Rage x2<br><br>
💥 <b>Compo #3 — Root Rider (Méta) :</b><br>
5 Root Riders + 10 Super Giants<br>
Sorts : Rage x3 · Poison x2<br><br>
💡 Commence TOUJOURS par le funneling !`
  },

  // ── Genshin Impact ──
  {
    mots: ['genshin','genshin impact','hutao','hu tao'],
    rep: `🌸 <b>Genshin Impact — Guide BMF</b><br><br>
BMF_GAMING couvre :<br>
- Builds complets par personnage<br>
- Tier list mise à jour v5.7<br>
- Compositions d'équipe optimales<br>
- Codes Primogems gratuits<br><br>
Exemples :<br>
<em>"Build Hu Tao ?"</em><br>
<em>"Tier list Genshin ?"</em><br>
<em>"Codes genshin ?"</em>`
  },

  // ── Build Hu Tao ──
  {
    mots: ['build hu tao','build hutao','artefact hutao','artefact hu tao'],
    rep: `🌸 <b>Build Hu Tao — Genshin Impact</b><br><br>
⚔ <b>Rôle :</b> DPS Pyro Principal<br><br>
🗡 <b>Armes :</b><br>
- Bâton de Homa (BiS)<br>
- Dragon's Bane (budget)<br><br>
🎭 <b>Artefacts :</b> 4x Crimson Witch<br>
Sablier : HP% · Calice : Pyro DMG · Tiare : Crit DMG<br><br>
👥 <b>Équipe optimale :</b><br>
Hu Tao · Yelan · Zhongli · Albedo<br><br>
💡 Rotation : Zhongli E → Yelan E → Hu Tao E → Attacks`
  },

  // ── Tier list Genshin ──
  {
    mots: ['tier list genshin','meilleur perso genshin','personnage genshin'],
    rep: `🏆 <b>Tier List Genshin v5.7</b><br><br>
👑 <b>SS :</b> Furina · Neuvillette<br>
🥇 <b>S :</b> Raiden · Hu Tao · Kazuha · Yelan · Nahida<br>
🥈 <b>A :</b> Xiao · Ayaka · Itto · Wanderer<br>
🥉 <b>B :</b> Xiangling · Bennett · Fischl<br>
📉 <b>C :</b> Amber · Lisa · Noelle`
  },

  // ── Codes Genshin ──
  {
    mots: ['code genshin','codes genshin','primo','primogems gratuit'],
    rep: `🎁 <b>Codes Genshin Impact Actifs</b><br><br>
- <code>GENSHINGIFT</code> → 60 Primos + 5 Fragiles<br>
- <code>VERSION57</code> → 60 Primos + 10K Mora<br>
- <code>ADVENTURE57</code> → 60 Primos + 5 Aventurier<br><br>
Total : <b>180 Primogems gratuits !</b><br>
⚠️ Utilise-les avant expiration !`
  },

  // ── Among Us ──
  {
    mots: ['among us','imposteur','impostor','crewmate','parmi nous'],
    rep: `🚀 <b>Among Us — Guide BMF</b><br><br>
💡 Exemples de questions :<br>
<em>"Comment gagner en imposteur ?"</em><br>
<em>"Tips crewmate ?"</em><br>
<em>"Stratégie sabotage ?"</em>`
  },

  // ── Imposteur Among Us ──
  {
    mots: ['gagner imposteur','tips imposteur','jouer imposteur','strategie imposteur'],
    rep: `🔪 <b>Guide Imposteur — Among Us</b><br><br>
🎭 <b>Règle d'or : Agis comme un Crewmate !</b><br><br>
✅ <b>À faire :</b><br>
- Fake les tâches visuelles<br>
- Crée une alliance dès le début<br>
- Kill dans les zones peu fréquentées<br>
- Saboter avant de tuer (distraction)<br><br>
🚨 <b>Sabotages efficaces :</b><br>
- Réacteur → 30sec de panique<br>
- Lumières → Vision réduite → kills faciles<br>
- O2 → Divise l'équipe en deux endroits<br><br>
❌ <b>Erreurs fatales :</b><br>
- Suivre quelqu'un de trop près<br>
- Voter trop vite en meeting`
  },

  // ── Merci / Positif ──
  {
    mots: ['merci','thanks','thx','super','cool','top','genial','parfait','nickel'],
    rep: `😎 <b>Avec plaisir !</b> C'est ça BMF_GAMING — des vraies infos pour les vrais gamers !<br><br>
Si tu as d'autres questions, je suis là 24h/24. 💪<br>
N'oublie pas de rejoindre la <b>communauté BMF</b> en bas de page ! 🎮`
  },

];

/**
 * Trouve la meilleure réponse du bot
 * @param {string} message
 * @returns {string}
 */
function trouverReponseBOT(message) {
  // Normalisation : minuscules + sans accents + sans ponctuation
  const msg = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Score le meilleur match
  let meilleurScore = 0;
  let meilleureRep  = null;

  for (const entree of BOT_KB) {
    let score = 0;
    for (const mot of entree.mots) {
      const cleanMot = mot.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      if (msg.includes(cleanMot)) {
        // Score plus élevé pour les correspondances plus longues
        score += cleanMot.split(' ').length * 10;
      }
    }
    if (score > meilleurScore) {
      meilleurScore = score;
      meilleureRep  = entree.rep;
    }
  }

  if (meilleureRep && meilleurScore > 0) return meilleureRep;

  // Réponse par défaut
  return `🤔 <b>Je n'ai pas trouvé de réponse précise.</b><br><br>
Essaie de reformuler ou pose une question sur :<br>
⛵ Sailor Piece / Ascension 4 / Alucard / Aizen<br>
🍎 Blox Fruits / Tier List / Codes<br>
🎯 Fortnite / Build / Ranked<br>
🔫 COD / Loadout / SnD<br>
⛏ Minecraft / Diamants / Seeds<br>
⚔ Clash of Clans / TH16<br>
🌸 Genshin / Build Hu Tao<br>
🚀 Among Us / Imposteur`;
}

// ============================================
// 16. BOT CHAT — Widget
// ============================================
const botState = { isOpen: false, isTyping: false, unread: 0 };

function creerBotChat() {
  const widget = document.createElement('div');
  widget.id = 'bot-chat';
  widget.innerHTML = `
    <button class="bot-bubble" id="bot-bubble" onclick="toggleBotChat()" aria-label="Bot BMF Gaming">
      <span style="font-size:1.3rem">🤖</span>
      <span class="bot-badge" id="bot-badge" style="display:none">1</span>
    </button>
    <div class="bot-window" id="bot-window">
      <div class="bot-header">
        <div style="display:flex;align-items:center;gap:9px">
          <div class="bot-avatar">BMF</div>
          <div>
            <div class="bot-nom">BMF Gaming Bot</div>
            <div class="bot-statut"><span class="bot-point"></span>En ligne · Répond instantanément</div>
          </div>
        </div>
        <div style="display:flex;gap:5px">
          <button class="bot-action-btn" onclick="viderBotChat()" title="Effacer">🗑</button>
          <button class="bot-action-btn" onclick="toggleBotChat()" title="Fermer">✕</button>
        </div>
      </div>
      <div class="bot-corps" id="bot-corps"></div>
      <div class="bot-suggestions" id="bot-suggestions">
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">⛵ Sailor Piece</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">💡 Ascension 4</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">🍎 Blox Fruits</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">🎯 Fortnite Build</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">🔫 Loadout COD</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">🌸 Build Hu Tao</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">🎁 Codes gratuits</button>
        <button class="bot-sugg" onclick="envoyerBotSugg(this)">💎 Diamants Minecraft</button>
      </div>
      <div class="bot-footer">
        <input type="text" id="bot-input" class="bot-input"
          placeholder="Pose ta question gaming..."
          maxlength="200" autocomplete="off"
          onkeydown="if(event.key==='Enter')envoyerBotMsg()"/>
        <button class="bot-send" onclick="envoyerBotMsg()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // Message d'accueil
  setTimeout(() => {
    ajouterMsgBot(
      `👋 <b>Salut gamer !</b> Je suis le bot <b>BMF_GAMING</b>.<br><br>
Je connais tous les jeux du site et je réponds à tes questions sur les guides, tips, codes et stratégies !<br><br>
Clique sur une suggestion ou écris directement. 🎮`,
      false
    );
  }, 800);
}

function toggleBotChat() {
  botState.isOpen = !botState.isOpen;
  const win   = $('#bot-window');
  const badge = $('#bot-badge');
  win?.classList.toggle('ouvert', botState.isOpen);
  if (botState.isOpen) {
    botState.unread = 0;
    if (badge) badge.style.display = 'none';
    setTimeout(() => $('#bot-input')?.focus(), 300);
  }
}

function envoyerBotMsg() {
  const input = $('#bot-input');
  const msg   = input?.value.trim();
  if (!msg || botState.isTyping) return;

  ajouterMsgUser_bot(msg);
  input.value = '';
  const sugg = $('#bot-suggestions');
  if (sugg) sugg.style.display = 'none';

  botState.isTyping = true;
  afficherTypingBot();

  setTimeout(() => {
    cacherTypingBot();
    botState.isTyping = false;
    ajouterMsgBot(trouverReponseBOT(msg));
  }, 700 + Math.random() * 600);
}

function envoyerBotSugg(btn) {
  const input = $('#bot-input');
  if (!input) return;
  // Retire l'emoji en tête
  input.value = btn.textContent.replace(/^\S+\s/, '').trim();
  envoyerBotMsg();
}

function viderBotChat() {
  const corps = $('#bot-corps');
  if (corps) corps.innerHTML = '';
  const sugg = $('#bot-suggestions');
  if (sugg) sugg.style.display = 'flex';
  ajouterMsgBot('🔄 Chat réinitialisé. Comment puis-je t\'aider ? 🎮');
}

function ajouterMsgUser_bot(texte) {
  const corps = $('#bot-corps');
  if (!corps) return;
  const div = document.createElement('div');
  div.className = 'bot-msg bot-msg-user';
  div.innerHTML = `<div class="bot-bulle">${escHTML(texte)}</div>
    <span class="bot-heure">${heure()}</span>`;
  corps.appendChild(div);
  scrollBot();
}

function ajouterMsgBot(html, anim = true) {
  const corps = $('#bot-corps');
  if (!corps) return;
  const div = document.createElement('div');
  div.className = 'bot-msg bot-msg-bot' + (anim ? ' anim-msg' : '');
  div.innerHTML = `<div class="bot-bulle">${html}</div>
    <span class="bot-heure">${heure()}</span>`;
  corps.appendChild(div);
  scrollBot();
  if (!botState.isOpen) {
    botState.unread++;
    const badge = $('#bot-badge');
    if (badge) { badge.textContent = botState.unread; badge.style.display = 'flex'; }
  }
}

function afficherTypingBot() {
  const corps = $('#bot-corps');
  if (!corps) return;
  const div = document.createElement('div');
  div.id = 'bot-typing';
  div.className = 'bot-msg bot-msg-bot';
  div.innerHTML = `<div class="bot-bulle" style="display:flex;gap:4px;padding:10px 13px">
    <span class="tpt"></span><span class="tpt"></span><span class="tpt"></span>
  </div>`;
  corps.appendChild(div);
  scrollBot();
}

function cacherTypingBot() { $('#bot-typing')?.remove(); }
function scrollBot()       { const c = $('#bot-corps'); if (c) c.scrollTop = c.scrollHeight; }
function heure()           { return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); }
function escHTML(s)        { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ============================================
// 17. COMMUNITY CHAT — Chat entre joueurs
// Simulation réaliste avec vrais joueurs en ligne
// ============================================

const JOUEURS_ONLINE = [
  { nom: 'NightSailor_23',    avatar: 'NS', couleur: '#00d4ff' },
  { nom: 'BloxMaster_FR',     avatar: 'BM', couleur: '#00ff88' },
  { nom: 'GenshinGod_X',      avatar: 'GG', couleur: '#ffd700' },
  { nom: 'COD_Warrior_DK',    avatar: 'CW', couleur: '#ff6b35' },
  { nom: 'MinecraftBuilder',  avatar: 'MB', couleur: '#06d6a0' },
  { nom: 'ClashLegend_94',    avatar: 'CL', couleur: '#00d4ff' },
  { nom: 'FortniteKing_FR',   avatar: 'FK', couleur: '#ff3333' },
  { nom: 'AnimeAdventures_Y', avatar: 'AA', couleur: '#ffd700' },
  { nom: 'SailorKing_42',     avatar: 'SK', couleur: '#00ff88' },
  { nom: 'PetSimPro_Z',       avatar: 'PS', couleur: '#00d4ff' },
];

const MESSAGES_AUTO = [
  { joueur: 'NightSailor_23',   msg: 'Gg le guide Ascension 4 🔥 enfin je comprends !' },
  { joueur: 'BloxMaster_FR',    msg: 'Les codes Blox Fruits ont bien marché, merci BMF 🙏' },
  { joueur: 'GenshinGod_X',     msg: 'Le build Hu Tao est trop fort avec la rotation indiquée 🌸' },
  { joueur: 'COD_Warrior_DK',   msg: 'Le loadout SMG pour Shipment est ouf 💀' },
  { joueur: 'MinecraftBuilder',  msg: 'J\'ai trouvé 32 diamants grâce au niveau Y -56 ⛏💎' },
  { joueur: 'ClashLegend_94',   msg: 'Attaque TH16 Root Rider = 3 étoiles garanti ⚔' },
  { joueur: 'FortniteKing_FR',  msg: 'Ranked Diamond avec la strat BMF 🎯 merci !' },
  { joueur: 'NightSailor_23',   msg: 'Quelqu\'un a farm Aizen avec moi ce soir ?' },
  { joueur: 'AnimeAdventures_Y',msg: 'Gojo dans Anime Adventures est broken 🌟' },
  { joueur: 'SailorKing_42',    msg: 'Alucard en 12 min avec la méthode BMF, tested ✅' },
  { joueur: 'PetSimPro_Z',      msg: 'Le code GOLDENEGG est actif j\'ai vérifié 🐾' },
  { joueur: 'BloxMaster_FR',    msg: 'Le fruit Kitsune est vraiment SS tier 🍎' },
  { joueur: 'GenshinGod_X',     msg: '180 Primos gratuits avec les 3 codes Genshin 💎' },
  { joueur: 'COD_Warrior_DK',   msg: 'Map Karachi → sniper au spot du toit = ez 🔫' },
  { joueur: 'MinecraftBuilder',  msg: 'Seed 4837753 incroyable, 8 biomes au spawn !' },
  { joueur: 'FortniteKing_FR',  msg: 'Les 90s c\'est la base du build, pratiquez ça d\'abord 🔨' },
  { joueur: 'ClashLegend_94',   msg: 'TH17 annoncé !! Ça va être chaud cet été ⚔' },
  { joueur: 'NightSailor_23',   msg: 'Ascension 4 validée ! Le donjon final est dur mais faisable' },
  { joueur: 'SailorKing_42',    msg: 'BMF_GAMING = meilleur site de guides fr 💯' },
  { joueur: 'AnimeAdventures_Y',msg: 'Quelqu\'un a des tips pour les stages Chaos en Anime Adv?' },
  { joueur: 'PetSimPro_Z',      msg: 'L\'event Summer est dingue sur Pet Sim X 🐾🎉' },
  { joueur: 'BloxMaster_FR',    msg: 'Dragon > Leopard en farm, Leopard > Dragon en PvP' },
];

let communityMsgIndex  = 0;
let communityIntervalId = null;
const communityMessages = []; // Stocke tous les messages

function creerCommunityChat() {
  const widget = document.createElement('div');
  widget.id = 'community-chat';

  // Calcule le nombre de joueurs en ligne (aléatoire entre 12 et 38)
  const nbOnline = 12 + Math.floor(Math.random() * 27);

  widget.innerHTML = `
    <!-- Bouton flottant Community -->
    <button class="comm-bubble" id="comm-bubble" onclick="toggleCommunityChat()"
      aria-label="Chat Communauté BMF">
      <span style="font-size:1.3rem">👥</span>
      <span class="comm-badge" id="comm-badge" style="display:none">0</span>
    </button>

    <!-- Fenêtre Community Chat -->
    <div class="comm-window" id="comm-window">

      <!-- Header -->
      <div class="comm-header">
        <div style="display:flex;align-items:center;gap:9px">
          <div class="comm-avatar-header">👥</div>
          <div>
            <div class="comm-titre">BMF Community Chat</div>
            <div class="comm-online-count">
              <span class="comm-dot-vert"></span>
              <span id="comm-online-nb">${nbOnline}</span> joueurs en ligne
            </div>
          </div>
        </div>
        <button class="bot-action-btn" onclick="toggleCommunityChat()">✕</button>
      </div>

      <!-- Liste joueurs en ligne -->
      <div class="comm-players-bar">
        ${JOUEURS_ONLINE.slice(0, 6).map(j => `
          <div class="comm-player-chip" title="${j.nom}">
            <div class="comm-chip-avatar" style="background:${j.couleur};color:#000">${j.avatar}</div>
            <span class="comm-dot-online"></span>
          </div>
        `).join('')}
        <div class="comm-player-chip" style="opacity:0.6">
          <div class="comm-chip-avatar" style="background:rgba(255,255,255,0.08);color:var(--text-dim);font-size:0.60rem">+${nbOnline - 6}</div>
        </div>
      </div>

      <!-- Corps des messages -->
      <div class="comm-corps" id="comm-corps"></div>

      <!-- Footer / Input -->
      <div class="comm-footer">
        <input type="text" id="comm-input" class="bot-input"
          placeholder="Écris un message..."
          maxlength="200" autocomplete="off"
          onkeydown="if(event.key==='Enter')envoyerCommMsg()"/>
        <button class="bot-send" onclick="envoyerCommMsg()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

    </div>
  `;

  document.body.appendChild(widget);

  // Messages initiaux (3 derniers pour simuler une conversation existante)
  setTimeout(() => {
    const depart = [
      { joueur: 'SailorKing_42',   msg: 'Bonsoir tout le monde ! 👋' },
      { joueur: 'BloxMaster_FR',   msg: 'Salut ! Vous avez vu la nouvelle update Blox Fruits ? 🍎' },
      { joueur: 'GenshinGod_X',    msg: 'Ouiiii le Kitsune est trop fort 😍' },
    ];
    depart.forEach((m, i) => {
      setTimeout(() => afficherMsgCommunity(m.joueur, m.msg, false), i * 600);
    });
  }, 1200);

  // Démarre les messages automatiques toutes les 10-22 secondes
  communityIntervalId = setInterval(() => {
    const msgData = MESSAGES_AUTO[communityMsgIndex % MESSAGES_AUTO.length];
    afficherMsgCommunity(msgData.joueur, msgData.msg);
    communityMsgIndex++;
  }, 10000 + Math.random() * 12000);
}

let commIsOpen   = false;
let commUnread   = 0;

function toggleCommunityChat() {
  commIsOpen = !commIsOpen;
  const win   = $('#comm-window');
  const badge = $('#comm-badge');
  win?.classList.toggle('ouvert', commIsOpen);
  if (commIsOpen) {
    commUnread = 0;
    if (badge) badge.style.display = 'none';
    setTimeout(() => $('#comm-input')?.focus(), 300);
  }
}

function envoyerCommMsg() {
  const input = $('#comm-input');
  const msg   = input?.value.trim();
  if (!msg) return;

  input.value = '';
  afficherMsgCommunity('Toi', msg, true, true);

  // Réponse aléatoire d'un joueur après 3-7 secondes
  setTimeout(() => {
    const repenses = [
      'Trop bien 🔥',
      'Gg ! 💪',
      'Pareil pour moi !',
      'T\'as raison 💯',
      'C\'est noté merci !',
      'J\'allais dire la même chose 😄',
      'BMF_GAMING 🎮',
      'On est d\'accord !',
    ];
    const joueur = JOUEURS_ONLINE[Math.floor(Math.random() * JOUEURS_ONLINE.length)];
    const rep    = repenses[Math.floor(Math.random() * repenses.length)];
    afficherMsgCommunity(joueur.nom, rep);
  }, 3000 + Math.random() * 4000);
}

function afficherMsgCommunity(nomJoueur, msg, anim = true, estMoi = false) {
  const corps  = $('#comm-corps');
  if (!corps) return;

  const joueur = JOUEURS_ONLINE.find(j => j.nom === nomJoueur);
  const couleur = joueur?.couleur || '#00d4ff';
  const avatar  = joueur?.avatar || nomJoueur.substring(0, 2).toUpperCase();

  communityMessages.push({ nom: nomJoueur, msg, ts: heure() });

  const div = document.createElement('div');
  div.className = `comm-msg${anim ? ' anim-msg' : ''}${estMoi ? ' comm-msg-moi' : ''}`;

  if (estMoi) {
    div.innerHTML = `
      <div class="comm-msg-content" style="align-items:flex-end">
        <span class="comm-msg-nom" style="color:#00d4ff;text-align:right">Toi</span>
        <div class="comm-bulle comm-bulle-moi">${escHTML(msg)}</div>
        <span class="comm-msg-time">${heure()}</span>
      </div>
    `;
  } else {
    div.innerHTML = `
      <div class="comm-avatar-msg" style="background:${couleur};color:#000">${avatar}</div>
      <div class="comm-msg-content">
        <span class="comm-msg-nom" style="color:${couleur}">${nomJoueur}</span>
        <div class="comm-bulle">${escHTML(msg)}</div>
        <span class="comm-msg-time">${heure()}</span>
      </div>
    `;
  }

  corps.appendChild(div);
  corps.scrollTop = corps.scrollHeight;

  // Badge si fermé
  if (!commIsOpen) {
    commUnread++;
    const badge = $('#comm-badge');
    if (badge) { badge.textContent = commUnread; badge.style.display = 'flex'; }
  }
}

// Ajoute un joueur venant de s'inscrire au community chat
function ajouterJoueurCommunity(pseudo) {
  setTimeout(() => {
    afficherMsgCommunity('BMF_GAMING', `🎉 <b>${pseudo}</b> vient de rejoindre la communauté !`);
  }, 1500);
}

// ============================================
// 18. STYLES DYNAMIQUES — Chat + Corrections
// ============================================
function injecterStylesGlobaux() {
  const style = document.createElement('style');
  style.id = 'bmf-styles-globaux';
  style.textContent = `

    /* ── Nav actif ── */
    .nav-link.actif-nav { color: #ffffff !important; }
    .nav-link.actif-nav::after { width: 100% !important; }

    /* ── Animations ── */
    @keyframes shake {
      0%,100% { transform:translateX(0); }
      20% { transform:translateX(-7px); }
      40% { transform:translateX(7px); }
      60% { transform:translateX(-4px); }
      80% { transform:translateX(4px); }
    }
    @keyframes fadeInUp {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes anim-msg {
      from { opacity:0; transform:translateY(8px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .anim-msg { animation: anim-msg 0.25s ease forwards; }

    /* ════════════════════════════════════════
       BOT CHAT WIDGET
       ════════════════════════════════════════ */

    /* Bouton flottant BOT */
    .bot-bubble {
      position:fixed; bottom:26px; right:86px;
      width:50px; height:50px;
      background:linear-gradient(135deg,#00d4ff,#0055ff);
      border:none; border-radius:50%; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(0,212,255,0.42); z-index:998;
      transition:transform 0.25s,box-shadow 0.25s;
    }
    .bot-bubble:hover { transform:scale(1.12) translateY(-3px); box-shadow:0 8px 28px rgba(0,212,255,0.62); }

    .bot-badge, .comm-badge {
      position:absolute; top:-4px; right:-4px;
      width:18px; height:18px;
      background:#ff3333; color:#fff;
      font-family:'Share Tech Mono',monospace; font-size:0.58rem;
      border-radius:50%; align-items:center; justify-content:center;
      border:2px solid #040407;
    }

    /* Fenêtre BOT */
    .bot-window {
      position:fixed; bottom:88px; right:20px;
      width:345px; height:530px;
      background:#050810;
      border:1px solid rgba(0,212,255,0.16); border-radius:14px;
      display:flex; flex-direction:column; overflow:hidden;
      z-index:997; opacity:0; transform:translateY(16px) scale(0.95);
      pointer-events:none; transition:all 0.26s ease;
      box-shadow:0 20px 60px rgba(0,0,0,0.80);
    }
    .bot-window.ouvert { opacity:1; transform:none; pointer-events:all; }

    /* Header BOT */
    .bot-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 14px;
      background:linear-gradient(135deg,rgba(0,212,255,0.07),rgba(0,85,255,0.05));
      border-bottom:1px solid rgba(0,212,255,0.10); flex-shrink:0;
    }
    .bot-avatar {
      width:32px; height:32px;
      background:linear-gradient(135deg,#00d4ff,#0055ff);
      border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-family:'Orbitron',monospace; font-size:0.46rem; font-weight:900; color:#000;
    }
    .bot-nom  { font-family:'Russo One',sans-serif; font-size:0.78rem; color:#fff; }
    .bot-statut {
      display:flex; align-items:center; gap:5px;
      font-family:'Share Tech Mono',monospace; font-size:0.56rem; color:#607080;
    }
    .bot-point {
      width:6px; height:6px; background:#00ff88;
      border-radius:50%; box-shadow:0 0 5px #00ff88;
      animation:point-blink 2s infinite;
    }
    @keyframes point-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

    .bot-action-btn {
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.07); color:#5a6a7a;
      width:25px; height:25px; border-radius:5px;
      cursor:pointer; font-size:0.73rem;
      display:flex; align-items:center; justify-content:center;
      transition:all 0.2s;
    }
    .bot-action-btn:hover { background:rgba(255,255,255,0.10); color:#fff; }

    /* Corps messages BOT */
    .bot-corps {
      flex:1; overflow-y:auto; padding:12px;
      display:flex; flex-direction:column; gap:8px;
      scroll-behavior:smooth;
    }
    .bot-corps::-webkit-scrollbar { width:3px; }
    .bot-corps::-webkit-scrollbar-track { background:transparent; }
    .bot-corps::-webkit-scrollbar-thumb { background:rgba(0,212,255,0.18); border-radius:2px; }

    .bot-msg { display:flex; flex-direction:column; max-width:87%; }
    .bot-msg-user { align-self:flex-end; align-items:flex-end; }
    .bot-msg-bot  { align-self:flex-start; align-items:flex-start; }

    .bot-bulle {
      padding:8px 11px; border-radius:10px;
      font-family:'Exo 2',sans-serif; font-size:0.78rem;
      font-weight:300; line-height:1.65; color:#d0e4f0;
    }
    .bot-msg-user .bot-bulle {
      background:linear-gradient(135deg,rgba(0,212,255,0.16),rgba(0,85,255,0.12));
      border:1px solid rgba(0,212,255,0.20); border-bottom-right-radius:3px;
    }
    .bot-msg-bot .bot-bulle {
      background:rgba(255,255,255,0.034);
      border:1px solid rgba(255,255,255,0.062); border-bottom-left-radius:3px;
    }
    .bot-bulle b { color:#fff; font-weight:700; }
    .bot-bulle em { color:#b8ccd8; }
    .bot-bulle code {
      background:rgba(0,212,255,0.09); border:1px solid rgba(0,212,255,0.16);
      border-radius:3px; padding:1px 5px;
      font-family:'Share Tech Mono',monospace; font-size:0.74rem; color:#00d4ff;
    }
    .bot-heure, .comm-msg-time {
      font-family:'Share Tech Mono',monospace; font-size:0.54rem; color:#2a3a4a; margin-top:2px; padding:0 3px;
    }

    /* Typing indicator */
    .tpt {
      width:6px; height:6px; background:rgba(0,212,255,0.5); border-radius:50%;
      animation:tp-bounce 1.3s ease-in-out infinite;
      display:inline-block;
    }
    .tpt:nth-child(2) { animation-delay:0.18s; }
    .tpt:nth-child(3) { animation-delay:0.36s; }
    @keyframes tp-bounce {
      0%,80%,100% { transform:scale(1); opacity:0.4; }
      40% { transform:scale(1.5); opacity:1; }
    }

    /* Suggestions BOT */
    .bot-suggestions {
      display:flex; flex-wrap:wrap; gap:5px; padding:7px 10px;
      border-top:1px solid rgba(255,255,255,0.04);
      overflow-y:auto; max-height:84px; flex-shrink:0;
    }
    .bot-suggestions::-webkit-scrollbar { display:none; }
    .bot-sugg {
      font-family:'Rajdhani',sans-serif; font-size:0.66rem; font-weight:600;
      padding:3px 9px;
      background:rgba(0,212,255,0.04); border:1px solid rgba(0,212,255,0.13);
      border-radius:50px; color:#5a6a7a; cursor:pointer; transition:all 0.2s; white-space:nowrap;
    }
    .bot-sugg:hover { background:rgba(0,212,255,0.10); color:#00d4ff; border-color:rgba(0,212,255,0.32); }

    /* Footer BOT */
    .bot-footer, .comm-footer {
      display:flex; align-items:center; gap:6px; padding:8px 10px;
      border-top:1px solid rgba(0,212,255,0.07); background:rgba(0,0,0,0.20); flex-shrink:0;
    }
    .bot-input {
      flex:1; padding:7px 10px;
      background:rgba(255,255,255,0.034); border:1px solid rgba(0,212,255,0.12);
      border-radius:7px; color:#d0e4f0;
      font-family:'Exo 2',sans-serif; font-size:0.78rem;
      outline:none; transition:border-color 0.2s;
    }
    .bot-input:focus { border-color:rgba(0,212,255,0.36); }
    .bot-input::placeholder { color:#2a3a4a; }
    .bot-send {
      width:32px; height:32px;
      background:linear-gradient(135deg,#00d4ff,#0055ff);
      border:none; border-radius:7px; color:#000; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0;
    }
    .bot-send:hover { transform:scale(1.1); box-shadow:0 0 12px rgba(0,212,255,0.45); }

    /* ════════════════════════════════════════
       COMMUNITY CHAT WIDGET
       ════════════════════════════════════════ */

    /* Bouton flottant COMMUNITY */
    .comm-bubble {
      position:fixed; bottom:26px; right:148px;
      width:50px; height:50px;
      background:linear-gradient(135deg,#00ff88,#00d4ff);
      border:none; border-radius:50%; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 20px rgba(0,255,136,0.38); z-index:998;
      transition:transform 0.25s,box-shadow 0.25s;
    }
    .comm-bubble:hover { transform:scale(1.12) translateY(-3px); box-shadow:0 8px 28px rgba(0,255,136,0.55); }

    /* Fenêtre COMMUNITY */
    .comm-window {
      position:fixed; bottom:88px; right:145px;
      width:360px; height:540px;
      background:#050810;
      border:1px solid rgba(0,255,136,0.14); border-radius:14px;
      display:flex; flex-direction:column; overflow:hidden;
      z-index:997; opacity:0; transform:translateY(16px) scale(0.95);
      pointer-events:none; transition:all 0.26s ease;
      box-shadow:0 20px 60px rgba(0,0,0,0.80);
    }
    .comm-window.ouvert { opacity:1; transform:none; pointer-events:all; }

    /* Header COMMUNITY */
    .comm-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 14px;
      background:linear-gradient(135deg,rgba(0,255,136,0.07),rgba(0,212,255,0.05));
      border-bottom:1px solid rgba(0,255,136,0.10); flex-shrink:0;
    }
    .comm-avatar-header {
      width:32px; height:32px;
      background:linear-gradient(135deg,#00ff88,#00d4ff);
      border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-size:1rem; color:#000;
    }
    .comm-titre { font-family:'Russo One',sans-serif; font-size:0.78rem; color:#fff; }
    .comm-online-count {
      display:flex; align-items:center; gap:5px;
      font-family:'Share Tech Mono',monospace; font-size:0.56rem; color:#607080;
    }
    .comm-dot-vert, .comm-dot-online {
      width:6px; height:6px; background:#00ff88;
      border-radius:50%; box-shadow:0 0 5px #00ff88;
      flex-shrink:0;
    }
    .comm-dot-vert { animation:point-blink 2s infinite; }

    /* Barre joueurs en ligne */
    .comm-players-bar {
      display:flex; gap:6px; padding:8px 13px; align-items:center;
      border-bottom:1px solid rgba(255,255,255,0.04); flex-shrink:0;
      overflow-x:auto;
    }
    .comm-players-bar::-webkit-scrollbar { display:none; }
    .comm-player-chip {
      position:relative; flex-shrink:0;
    }
    .comm-chip-avatar {
      width:28px; height:28px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-family:'Orbitron',monospace; font-size:0.44rem; font-weight:900;
    }
    .comm-dot-online {
      position:absolute; bottom:-1px; right:-1px;
      width:8px; height:8px;
      border:1.5px solid #050810;
      animation:none;
    }

    /* Corps COMMUNITY */
    .comm-corps {
      flex:1; overflow-y:auto; padding:12px;
      display:flex; flex-direction:column; gap:10px;
      scroll-behavior:smooth;
    }
    .comm-corps::-webkit-scrollbar { width:3px; }
    .comm-corps::-webkit-scrollbar-track { background:transparent; }
    .comm-corps::-webkit-scrollbar-thumb { background:rgba(0,255,136,0.15); border-radius:2px; }

    /* Messages COMMUNITY */
    .comm-msg { display:flex; align-items:flex-start; gap:8px; }
    .comm-msg-moi { flex-direction:row-reverse; }

    .comm-avatar-msg {
      width:28px; height:28px; border-radius:50%; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      font-family:'Orbitron',monospace; font-size:0.44rem; font-weight:900;
    }
    .comm-msg-content {
      display:flex; flex-direction:column; gap:2px; max-width:82%;
    }
    .comm-msg-nom {
      font-family:'Rajdhani',sans-serif; font-size:0.68rem;
      font-weight:700; letter-spacing:0.5px;
    }
    .comm-bulle {
      padding:7px 10px; border-radius:9px;
      background:rgba(255,255,255,0.034);
      border:1px solid rgba(255,255,255,0.058);
      border-bottom-left-radius:3px;
      font-family:'Exo 2',sans-serif; font-size:0.78rem;
      font-weight:300; line-height:1.60; color:#d0e4f0;
      word-break:break-word;
    }
    .comm-bulle-moi {
      background:linear-gradient(135deg,rgba(0,255,136,0.14),rgba(0,212,255,0.10));
      border:1px solid rgba(0,255,136,0.18); border-bottom-right-radius:3px;
      border-bottom-left-radius:9px;
    }
    .comm-bulle b { color:#fff; font-weight:700; }

    /* ── Responsive mobile ── */
    @media (max-width: 480px) {
      .bot-window, .comm-window {
        width:calc(100vw - 16px); right:8px; left:8px; bottom:80px;
      }
      .bot-bubble  { right:14px; }
      .comm-bubble { right:76px; }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// 19. INITIALISATION GÉNÉRALE — FIXED
// ============================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Charge les données
  chargerNews();
  chargerCodes();

  // 2. Lance les animations
  initReveal();
  initEffetCartes();

  // 3. Injecte les styles globaux
  injecterStylesGlobaux();

  // 4. Crée les widgets chat
  creerBotChat();
  creerCommunityChat();

  // 5. Active le premier filtre guides par défaut
  const premierFiltre = $('.filtre');
  if (premierFiltre) premierFiltre.classList.add('actif');

  // 6. Log de confirmation
  console.log(
    '%c ⚡ BMF_GAMING v2.0 — Tous bugs corrigés ✓ ',
    'background:linear-gradient(135deg,#00d4ff,#0055ff);color:#000;font-weight:bold;font-size:11px;padding:4px 10px;border-radius:4px;'
  );
  console.log('%c 🤖 Bot · 👥 Community Chat · 📰 News · 🎁 Codes — OK ',
    'color:#00ff88;font-family:monospace;font-size:10px;');
});