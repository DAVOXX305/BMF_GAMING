/* =====================================================
   BMF_GAMING — script.js
   Fichier     : script.js
   Créateur    : BMF Davoxx
   Description : Toutes les fonctionnalités du site
                 + Chat Gaming Bot BMF_GAMING
   ===================================================== */

'use strict';

// ============================================
// 1. UTILITAIRES GLOBAUX
// ============================================

/**
 * Sélecteur raccourci — remplace document.querySelector
 * @param {string} sel    — Sélecteur CSS
 * @param {Element} parent — Parent optionnel
 */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

/**
 * Ajoute un écouteur de façon sécurisée (sans planter si l'élément est null)
 */
const on = (el, event, fn) => el && el.addEventListener(event, fn);


// ============================================
// 2. NAVBAR — Scroll + Hide/Show + Burger
// ============================================

const navbar = $('#navbar');
let dernierScroll = 0;

window.addEventListener('scroll', () => {
  const scrollActuel = window.scrollY;

  // Ajoute la classe scrolled après 80px de défilement
  if (scrollActuel > 80) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Cache/montre la navbar selon la direction du scroll
  if (scrollActuel > 250) {
    if (scrollActuel > dernierScroll) {
      // Scroll vers le bas → cache la navbar
      navbar.style.transform = 'translateY(-110%)';
    } else {
      // Scroll vers le haut → montre la navbar
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    if (navbar) navbar.style.transform = 'translateY(0)';
  }

  dernierScroll = scrollActuel;
});

/**
 * Ouvre/Ferme le menu burger sur mobile
 */
function toggleMenu() {
  const navLinks = $('#nav-links');
  const burger   = $('#burger');

  navLinks?.classList.toggle('ouvert');
  burger?.classList.toggle('actif');

  // Anime les 3 barres burger → croix X
  const spans = $$('span', burger);
  if (burger?.classList.contains('actif')) {
    if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    if (spans[1]) spans[1].style.opacity   = '0';
    if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    if (spans[0]) spans[0].style.transform = '';
    if (spans[1]) spans[1].style.opacity   = '';
    if (spans[2]) spans[2].style.transform = '';
  }
}

// Ferme le menu burger si on clique en dehors
document.addEventListener('click', e => {
  const nav    = $('#nav-links');
  const burger = $('#burger');
  if (
    nav?.classList.contains('ouvert') &&
    !nav.contains(e.target) &&
    !burger?.contains(e.target)
  ) {
    toggleMenu();
  }
});

// Ferme le menu burger au clic sur un lien
$$('.nav-link').forEach(link => {
  on(link, 'click', () => {
    const nav = $('#nav-links');
    if (nav?.classList.contains('ouvert')) toggleMenu();
  });
});


// ============================================
// 3. SMOOTH SCROLL — Liens d'ancre fluides
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id     = link.getAttribute('href');
    const cible  = document.querySelector(id);
    if (!cible) return;

    const hauteurNav = navbar?.offsetHeight || 70;
    const posTop = cible.getBoundingClientRect().top + window.scrollY - hauteurNav - 12;

    window.scrollTo({ top: posTop, behavior: 'smooth' });
  });
});


// ============================================
// 4. LIEN ACTIF DANS LA NAVBAR
// Le lien correspondant à la section visible
// reçoit la classe "actif-nav" automatiquement
// ============================================

const toutesSections = $$('section[id]');

const obsSection = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('.nav-link').forEach(l => l.classList.remove('actif-nav'));
      const lienActif = $(`.nav-link[href="#${entry.target.id}"]`);
      lienActif?.classList.add('actif-nav');
    }
  });
}, { threshold: 0.38 });

toutesSections.forEach(s => obsSection.observe(s));


// ============================================
// 5. COMPTEURS ANIMÉS (Hero Stats)
// Les chiffres défilent de 0 vers leur valeur
// ============================================

/**
 * Anime un compteur de 0 vers data-target
 * @param {HTMLElement} el - Élément avec data-target
 */
function animerCompteur(el) {
  const cible    = parseInt(el.dataset.target, 10);
  const duree    = 2400;
  const pas      = 16;
  const etapes   = duree / pas;
  const increment = cible / etapes;
  let courant    = 0;

  const timer = setInterval(() => {
    courant += increment;
    if (courant >= cible) {
      el.textContent = cible.toLocaleString('fr-FR');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(courant).toLocaleString('fr-FR');
    }
  }, pas);
}

// Lance les compteurs quand le hero devient visible
const obsHero = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('.stat-nombre').forEach(animerCompteur);
      obsHero.disconnect(); // Une seule fois suffit
    }
  });
}, { threshold: 0.5 });

const sectionHero = $('#accueil');
if (sectionHero) obsHero.observe(sectionHero);


// ============================================
// 6. SCROLL REVEAL — Apparition en cascade
// Les cartes et sections apparaissent au scroll
// ============================================

const obsReveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delai = parseInt(entry.target.dataset.delay || '0', 10);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delai);
    }
  });
}, { threshold: 0.08 });

// Applique l'animation + délais en cascade aux éléments
$$('.jeu-card, .guide-card, .news-card, .tierlist-card, .code-card').forEach((el, i) => {
  el.classList.add('apparition');
  el.dataset.delay = String((i % 4) * 95); // Cascade par groupe de 4
  obsReveal.observe(el);
});

// En-têtes de sections et filtres
$$('.section-header, .filtres, .contact-inner').forEach(el => {
  el.classList.add('apparition');
  obsReveal.observe(el);
});


// ============================================
// 7. BOUTON RETOUR EN HAUT
// ============================================

const btnTop = $('#btn-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 450) {
    btnTop?.classList.add('visible');
  } else {
    btnTop?.classList.remove('visible');
  }
});

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ============================================
// 8. FILTRES GUIDES
// Filtre les guides par catégorie au clic
// ============================================

function filtrerGuides(categorie) {
  // Met à jour le bouton actif
  $$('.filtre').forEach(btn => btn.classList.remove('actif'));
  if (event?.target) event.target.classList.add('actif');

  const cartes = $$('.guide-card');

  cartes.forEach(carte => {
    if (categorie === 'tous') {
      carte.classList.remove('cache');
      return;
    }
    const cats = carte.dataset.cat || '';
    if (cats.includes(categorie)) {
      carte.classList.remove('cache');
    } else {
      carte.classList.add('cache');
    }
  });
}


// ============================================
// 9. FORMULAIRE CONTACT
// Validation + Message de confirmation animé
// ============================================

function rejoindre() {
  const champPseudo  = $('#pseudo-input');
  const champEmail   = $('#email-input');
  const confirmation = $('#confirmation');

  const pseudo = champPseudo?.value.trim();
  const email  = champEmail?.value.trim();

  // Validation pseudo obligatoire
  if (!pseudo) {
    secouer(champPseudo);
    afficherErreur(champPseudo, '⚠ Entre ton pseudo gamer !');
    return;
  }
  if (pseudo.length < 3) {
    secouer(champPseudo);
    afficherErreur(champPseudo, '⚠ Minimum 3 caractères.');
    return;
  }

  // Validation email (optionnel mais doit être valide si rempli)
  if (email && !email.includes('@')) {
    secouer(champEmail);
    afficherErreur(champEmail, '⚠ Email invalide.');
    return;
  }

  // Succès — réinitialise les champs
  if (champPseudo) champPseudo.value = '';
  if (champEmail)  champEmail.value  = '';

  if (confirmation) {
    confirmation.innerHTML = `✅ Bienvenue dans le crew <strong>BMF_GAMING</strong>, <em>${pseudo}</em> !`;
    confirmation.style.display = 'block';
    confirmation.style.animation = 'fadeInUp 0.4s ease';
    setTimeout(() => {
      confirmation.style.display = 'none';
    }, 5000);
  }
}

/**
 * Animation de secousse sur un champ invalide
 * @param {HTMLElement} el - Le champ à secouer
 */
function secouer(el) {
  if (!el) return;
  el.style.borderColor = 'var(--rouge)';
  el.style.animation   = 'shake 0.42s ease';
  setTimeout(() => {
    el.style.animation   = '';
    el.style.borderColor = '';
  }, 500);
}

/**
 * Affiche un message d'erreur stylisé sous un champ
 * @param {HTMLElement} el - Le champ concerné
 * @param {string} message - Le message à afficher
 */
function afficherErreur(el, message) {
  // Supprime l'ancien message s'il existe
  el?.parentElement?.querySelector('.erreur-msg')?.remove();

  const msg = document.createElement('span');
  msg.className   = 'erreur-msg';
  msg.textContent = message;
  msg.style.cssText = `
    color: var(--rouge);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.70rem;
    letter-spacing: 1px;
    display: block;
    margin-top: 5px;
    animation: fadeInUp 0.3s ease;
  `;
  el?.insertAdjacentElement('afterend', msg);
  setTimeout(() => msg.remove(), 3200);
}


// ============================================
// 10. COPIER UN CODE AU CLIC
// Clic sur un .code-valeur → copie dans presse-papiers
// ============================================

document.addEventListener('click', e => {
  if (e.target.classList.contains('code-valeur')) {
    const code = e.target.textContent.trim();

    navigator.clipboard.writeText(code).then(() => {
      const original = e.target.textContent;
      e.target.textContent = '✅ COPIÉ !';
      e.target.style.color = 'var(--vert)';
      e.target.style.borderColor = 'rgba(0,255,136,0.50)';

      setTimeout(() => {
        e.target.textContent   = original;
        e.target.style.color   = '';
        e.target.style.borderColor = '';
      }, 1800);
    }).catch(() => {
      // Fallback si clipboard API non dispo
      e.target.style.color = 'var(--rouge)';
      setTimeout(() => { e.target.style.color = ''; }, 1500);
    });
  }
});


// ============================================
// 11. EFFET LUMINEUX SUR LES CARTES
// La lumière suit la position de la souris
// ============================================

$$('.jeu-card, .tierlist-card, .news-card, .guide-card').forEach(carte => {
  carte.addEventListener('mousemove', e => {
    const rect = carte.getBoundingClientRect();
    const x = ((e.clientX - rect.left)  / rect.width)  * 100;
    const y = ((e.clientY - rect.top)   / rect.height) * 100;

    carte.style.background = `
      radial-gradient(circle at ${x}% ${y}%,
        rgba(0,212,255,0.055) 0%,
        rgba(10,12,20,0.88)   55%
      )
    `;
  });

  carte.addEventListener('mouseleave', () => {
    carte.style.background = '';
  });
});


// ============================================
// 12. CHARGEMENT DYNAMIQUE (depuis data.js)
// Injecte les news et codes dans le DOM
// ============================================

/**
 * Génère et injecte les cartes de news
 * Les données viennent de BMF_NEWS dans data.js
 */
function chargerNews() {
  const container = $('#news-container');
  if (!container || typeof BMF_NEWS === 'undefined') return;

  container.innerHTML = BMF_NEWS.map((news, i) => `
    <article class="news-card apparition" data-delay="${(i % 3) * 90}">
      <div class="news-categorie">${news.emoji} ${news.categorie}</div>
      <h4>${news.titre}</h4>
      <p>${news.description}</p>
      <span class="news-date">${news.date}</span>
    </article>
  `).join('');

  $$('#news-container .news-card').forEach(el => obsReveal.observe(el));
}

/**
 * Génère et injecte les cartes de codes
 * Les données viennent de BMF_CODES dans data.js
 */
function chargerCodes() {
  const container = $('#codes-container');
  if (!container || typeof BMF_CODES === 'undefined') return;

  container.innerHTML = BMF_CODES.map((code, i) => `
    <div class="code-card apparition" data-delay="${(i % 4) * 80}">
      <span class="code-jeu">${code.jeu}</span>
      <span class="code-valeur" title="Cliquer pour copier">${code.code}</span>
      <span class="code-recompense">🎁 ${code.recompense}</span>
      <span class="code-expire">⏳ Expire : ${code.expire}</span>
    </div>
  `).join('');

  $$('#codes-container .code-card').forEach(el => obsReveal.observe(el));
}


// ============================================
// 13. 💬 CHAT GAMING BMF — COMPLET & DÉTAILLÉ
// ─────────────────────────────────────────────
// Bot intelligent avec base de connaissances
// couvrant tous les jeux du site
// ============================================

// ── 13.1 BASE DE CONNAISSANCES GAMING COMPLÈTE ──

const BMF_KB = {

  // ── GÉNÉRAL & SALUTATIONS ──
  general: [
    {
      patterns: ['bonjour', 'salut', 'hello', 'yo', 'hey', 'coucou', 'bonsoir', 'hi'],
      reponse: `👋 <b>Salut gamer !</b> Bienvenue sur le chat de <b>BMF_GAMING</b> !<br><br>
Je suis le bot de BMF Davoxx. Je connais tous les jeux du site et je peux t'aider avec :<br>
- 🟥 Roblox (Sailor Piece, Blox Fruits, etc.)<br>
- 🎯 Fortnite · 🔫 COD · ⛏ Minecraft<br>
- ⚔ Clash of Clans · 🌸 Genshin · 🚀 Among Us<br><br>
Pose ta question ou clique sur une suggestion !`
    },
    {
      patterns: ['merci', 'thx', 'thanks', 'super', 'cool', 'nickel', 'parfait', 'top', 'genial'],
      reponse: `😎 <b>Avec plaisir !</b> C'est ça BMF_GAMING — aider les gamers à progresser !<br><br>
Si tu as d'autres questions, je suis là. Pense aussi à rejoindre la communauté en bas de page pour les guides exclusifs ! 🔥`
    },
    {
      patterns: ['aide', 'help', 'que peux tu faire', 'comment ca marche'],
      reponse: `🎮 <b>Voici ce que je peux faire pour toi :</b><br><br>
📖 <b>Guides</b> → Stratégies, progression, boss<br>
🏆 <b>Tier Lists</b> → Classements mis à jour<br>
🎁 <b>Codes</b> → Codes gratuits actifs<br>
💡 <b>Tips</b> → Astuces pour progresser<br>
⚔ <b>Boss</b> → Stratégies de combat<br><br>
Exemple de questions :<br>
<em>"Comment passer Ascension 4 ?"</em><br>
<em>"Meilleur loadout COD ?"</em><br>
<em>"Codes Blox Fruits ?"</em>`
    },
    {
      patterns: ['code', 'codes gratuit', 'codes actifs', 'codes disponibles'],
      reponse: `🎁 <b>Codes Gratuits BMF_GAMING</b><br><br>
Tous les codes actifs sont dans la section <b>🎁 Codes Gratuits</b> du site.<br><br>
Je peux aussi te donner les codes d'un jeu précis ! Lequel ?<br>
- 🍎 Blox Fruits<br>
- 🌟 Anime Adventures<br>
- 🐾 Pet Simulator X<br>
- 🏠 Brookhaven<br>
- 🌸 Genshin Impact`
    },
    {
      patterns: ['update', 'mise a jour', 'news', 'nouveaute', 'patch'],
      reponse: `🔄 <b>Updates & News</b><br><br>
Toutes les mises à jour sont dans la section <b>🔥 Dernières News</b> du site.<br><br>
BMF_GAMING est mis à jour régulièrement. La <b>barre d'annonce</b> tout en haut affiche les dernières infos en temps réel !`
    },
  ],

  // ── ROBLOX GÉNÉRAL ──
  roblox: [
    {
      patterns: ['roblox', 'c est quoi roblox', 'robux'],
      reponse: `🟥 <b>Roblox — La Plateforme</b><br><br>
Roblox est une plateforme de jeux en ligne où la communauté crée des jeux variés. Gratuit à jouer, avec les <b>Robux</b> comme monnaie premium.<br><br>
BMF_GAMING couvre les jeux Roblox les plus populaires :<br>
⛵ Sailor Piece &nbsp;|&nbsp; 🍎 Blox Fruits<br>
🌟 Anime Adventures &nbsp;|&nbsp; 🐾 Pet Sim X<br>
🏙 Da Hood &nbsp;|&nbsp; 🏠 Brookhaven<br>
🐣 Adopt Me &nbsp;|&nbsp; Et bien plus !`
    },
  ],

  // ── SAILOR PIECE ──
  sailorpiece: [
    {
      patterns: ['sailor piece', 'sailorpiece'],
      reponse: `⛵ <b>Sailor Piece — Guide BMF</b><br><br>
RPG anime sur Roblox inspiré de One Piece. BMF_GAMING couvre tout :<br>
- Progression et Ascensions<br>
- Farming de boss (Alucard, Aizen)<br>
- Builds et stratégies<br><br>
Tu as une question précise ? Exemples :<br>
<em>"Comment passer Ascension 4 ?"</em><br>
<em>"Comment battre Alucard ?"</em><br>
<em>"Drops d'Aizen ?"</em>`
    },
    {
      patterns: ['ascension 4', 'ascension iv', 'asc 4', 'passer ascension'],
      reponse: `🏆 <b>Guide Ascension 4 — Sailor Piece</b><br><br>
<b>Prérequis :</b> Niveau minimum 450<br><br>
<b>Étapes obligatoires :</b><br>
1️⃣ Farmer <b>Alucard</b> (Sailor Island) :<br>
&nbsp;&nbsp;→ Épée Fantôme + Manteau des Ombres<br>
2️⃣ Farmer <b>Aizen</b> (Hollow Island) :<br>
&nbsp;&nbsp;→ Zanpakuto Brisé + Haori de Capitaine<br>
3️⃣ Parler au PNJ <b>Yami</b> à la Citadelle<br>
4️⃣ Compléter le donjon final<br><br>
💡 <b>Conseil BMF :</b> Farm Alucard en premier — son drop rate (8%) est meilleur qu'Aizen (6%).`
    },
    {
      patterns: ['alucard', 'boss alucard', 'sailor island boss'],
      reponse: `⚔ <b>Boss Alucard — Sailor Island</b><br><br>
📍 <b>Localisation :</b> Zone Nord-Est de Sailor Island<br>
⏱ <b>Respawn :</b> 15 minutes<br>
❤️ <b>HP :</b> ~850 000<br>
🎯 <b>Drops :</b><br>
- Épée Fantôme → taux 8%<br>
- Manteau des Ombres → taux 5%<br>
- Grimoire Alucard → taux 2% (rare)<br><br>
⚠️ <b>Attaques dangereuses :</b><br>
- Drain Vital → récupère ses HP, reste à distance<br>
- Nova Sombre → AoE circulaire, déplacez-vous<br><br>
💡 <b>Stratégie BMF :</b> Comp distance recommandée. Apporte des potions de résistance magique.`
    },
    {
      patterns: ['aizen', 'boss aizen', 'hollow island', 'hollow'],
      reponse: `👁 <b>Boss Aizen — Hollow Island</b><br><br>
📍 <b>Localisation :</b> Château Central de Hollow Island<br>
⏱ <b>Respawn :</b> 20 minutes<br>
❤️ <b>HP :</b> ~1 200 000<br>
🎯 <b>Drops :</b><br>
- Zanpakuto Brisé → taux 6%<br>
- Haori de Capitaine → taux 4%<br>
- Reiatsu Noir → taux 1.5% (très rare)<br><br>
⚠️ <b>Phases de combat :</b><br>
- Phase 1 (100-50% HP) : Attaques normales<br>
- Phase 2 (50-0% HP) : Active Bankai → TRÈS dangereux<br><br>
💡 <b>Stratégie BMF :</b> Bouge constamment en phase 2. Apporte des potions de vitesse + soins.`
    },
  ],

  // ── BLOX FRUITS ──
  bloxfruits: [
    {
      patterns: ['blox fruits', 'bloxfruits'],
      reponse: `🍎 <b>Blox Fruits — Guide BMF</b><br><br>
Un des RPG Roblox les plus populaires. BMF_GAMING couvre :<br>
- Tier list des fruits<br>
- Meilleurs spots de grinding<br>
- Codes actifs<br>
- Progression et builds<br><br>
Tu veux des infos sur quoi ? Exemples :<br>
<em>"Meilleur fruit Blox Fruits ?"</em><br>
<em>"Codes Blox Fruits ?"</em><br>
<em>"Où farmer Blox Fruits ?"</em>`
    },
    {
      patterns: ['meilleur fruit', 'quel fruit blox', 'tier list fruit', 'tier list blox'],
      reponse: `🍎 <b>Tier List Fruits — Blox Fruits</b><br><br>
👑 <b>Tier SS (Broken) :</b><br>
Dragon · Leopard · Kitsune<br><br>
🥇 <b>Tier S :</b><br>
Dough · Spirit · Venom · Phoenix<br><br>
🥈 <b>Tier A :</b><br>
Shadow · Rumble · Magma · Quake<br><br>
🥉 <b>Tier B :</b><br>
Buddha · Flame · Ice · Sand<br><br>
📉 <b>Tier C :</b><br>
Smoke · Spike · Chop<br><br>
💡 PvP → <b>Leopard</b> | Farm → <b>Dragon</b> | Débutant → <b>Magma</b>`
    },
    {
      patterns: ['code blox', 'codes blox fruits'],
      reponse: `🎁 <b>Codes Blox Fruits Actifs</b><br><br>
- <code>BIGNEWS</code> → 2x EXP 24h<br>
- <code>THEGREATACE</code> → Beli Boost 20min<br>
- <code>ENVYARMY</code> → XP Boost 20min<br>
- <code>Magicbus</code> → 2x EXP 20min<br>
- <code>Sub2CaptainMaui</code> → EXP Boost<br><br>
⚠️ Les codes expirent rapidement ! Vérifie la section Codes du site régulièrement.`
    },
    {
      patterns: ['farm blox', 'grind blox', 'ou farmer blox', 'spot farm blox'],
      reponse: `⚔ <b>Meilleurs Spots de Farm — Blox Fruits</b><br><br>
🟢 <b>Débutant (Niv 1-100) :</b><br>
Île des Pirates → Monkey Island<br><br>
🟡 <b>Milieu (Niv 100-700) :</b><br>
Skylands → Magma Village → Colosseum<br><br>
🔴 <b>Avancé (Niv 700-1500) :</b><br>
Haunted Castle → Underwater City<br><br>
💀 <b>End Game (Niv 1500+) :</b><br>
Sea of Treats → Floating Turtle → Mirror Fractal<br><br>
💡 Toujours farm avec Auto-Skill actif + Fruit en Z/X pour max EXP.`
    },
  ],

  // ── ANIME ADVENTURES ──
  animeadventures: [
    {
      patterns: ['anime adventures', 'anime adventure'],
      reponse: `🌟 <b>Anime Adventures — Guide BMF</b><br><br>
Tower Defense anime sur Roblox. BMF_GAMING couvre :<br>
- Tier list des unités<br>
- Stratégies de défense<br>
- Codes actifs<br><br>
💡 <b>Conseil rapide :</b> Les unités Mythic/Legendary sont indispensables pour les stages difficiles. Farm les Summons régulièrement !`
    },
  ],

  // ── FORTNITE ──
  fortnite: [
    {
      patterns: ['fortnite'],
      reponse: `🎯 <b>Fortnite — Guide BMF</b><br><br>
Battle Royale de Epic Games. BMF_GAMING couvre :<br>
- Builds compétitifs<br>
- Tier list des armes<br>
- Stratégies ranked<br>
- Edits et techniques avancées<br><br>
Tu veux des infos sur quoi ? Exemples :<br>
<em>"Build compétitif Fortnite ?"</em><br>
<em>"Meilleure arme Fortnite ?"</em><br>
<em>"Comment monter en ranked ?"</em>`
    },
    {
      patterns: ['build fortnite', 'building fortnite', 'construire fortnite', 'edit fortnite', '90s fortnite'],
      reponse: `🔨 <b>Guide Build Compétitif — Fortnite</b><br><br>
🧱 <b>Techniques fondamentales :</b><br>
- <b>Ramp Rush</b> → Rampe + Mur pour avancer sous protection<br>
- <b>90s</b> → Monter rapidement en hauteur (Rampe+Mur+Sol x4)<br>
- <b>Box Fight</b> → Cube 1x1 en combat rapproché<br>
- <b>High Ground</b> → Toujours chercher la hauteur<br><br>
✂️ <b>Edits rapides :</b><br>
- Window edit (mur) → Tirer + Reset<br>
- Floor edit → Tomber sur l'ennemi<br>
- Door edit → Sortie rapide<br><br>
💡 <b>Ordre d'apprentissage BMF :</b><br>
90s → Box Fight → Edits → Ramp Rush → Combos`
    },
    {
      patterns: ['arme fortnite', 'meilleure arme fortnite', 'tier list fortnite', 'loadout fortnite'],
      reponse: `🎯 <b>Tier List Armes — Fortnite</b><br><br>
👑 <b>Tier S :</b><br>
Sniper Bolt-Action · AR Exo-Serie<br><br>
🥇 <b>Tier A :</b><br>
Shotgun Pompe Pro · SMG Rapide<br><br>
🥈 <b>Tier B :</b><br>
Pistolet Pro · Fusil de Précision<br><br>
📉 <b>Tier C :</b><br>
Revolver · LMG · Minigun<br><br>
🎒 <b>Loadout optimal BMF :</b><br>
AR + Shotgun + Sniper + SMG + Soins`
    },
    {
      patterns: ['ranked fortnite', 'rang fortnite', 'monter rang fortnite'],
      reponse: `📊 <b>Guide Ranked Fortnite — BMF Tips</b><br><br>
🎯 <b>Stratégie de base :</b><br>
- Atterris loin du bus pour farm tranquille<br>
- Évite les combats tôt dans la game<br>
- Priorise les soins et les ressources<br>
- Joue le edge du storm<br><br>
⚡ <b>Tips avancés :</b><br>
- High ground avant les fights<br>
- Place toujours un mur avant de tirer<br>
- Un Kill = +100 SR, une Victoire = +450 SR<br><br>
💡 <b>Conseil BMF :</b> Survival > Kills en bas de classement.`
    },
  ],

  // ── CALL OF DUTY ──
  cod: [
    {
      patterns: ['call of duty', 'cod', 'warzone', 'modern warfare', 'black ops'],
      reponse: `🔫 <b>Call of Duty — Guide BMF</b><br><br>
BMF_GAMING couvre COD en détail :<br>
- Multijoueur (TDM, DOM, SnD, Ranked)<br>
- Warzone Battle Royale<br>
- Meilleurs loadouts<br>
- Stratégies par map<br><br>
Questions possibles :<br>
<em>"Meilleur loadout COD ?"</em><br>
<em>"Comment monter en ranked COD ?"</em><br>
<em>"Stratégie SnD ?"</em>`
    },
    {
      patterns: ['loadout cod', 'meilleur loadout cod', 'arme cod', 'classe cod', 'setup cod'],
      reponse: `🔫 <b>Meilleurs Loadouts COD — BMF Selection</b><br><br>
⚡ <b>Loadout Agressif (SMG)</b><br>
Arme : Rival-9 / Striker-9<br>
Accessoires : Suppressor · Long Barrel · Extended Mag · Vertical Grip<br>
Atout : Combat rapproché imbattable<br><br>
🎯 <b>Loadout Long Portée (AR)</b><br>
Arme : MCW / Holger-26<br>
Accessoires : 4x Scope · Bipod · Precision Barrel<br>
Atout : Dominer les grandes maps<br><br>
💥 <b>Loadout SnD (Sniper)</b><br>
Arme : MORS / Longbow<br>
Accessoires : 12x Scope · Tac Laser · Stock léger<br><br>
💡 <b>Conseil BMF :</b> Adapte selon la map !<br>
Shipment → SMG · Karachi → AR · Sub Base → Sniper`
    },
    {
      patterns: ['ranked cod', 'rang cod', 'monter rang cod', 'sr cod'],
      reponse: `📊 <b>Guide Ranked Play — Call of Duty</b><br><br>
🎯 <b>Règles d'or pour progresser :</b><br>
1. <b>Objectif avant kills</b> → Capture zones, plante bombes<br>
2. <b>Communication</b> → Utilise le système de ping<br>
3. <b>Connais les angles</b> → Chaque map a ses spots clés<br>
4. <b>Play safe</b> → Évite les deaths inutiles<br>
5. <b>Armes méta</b> → Utilise les meilleures classes<br><br>
🏆 <b>Modes les plus rentables en SR :</b><br>
1er → Search & Destroy (victoire = max SR)<br>
2ème → Hardpoint (objectif = bonus SR)<br>
3ème → Control<br><br>
💡 <b>Conseil BMF :</b> 5 victoires SR > 10 games KD positif.`
    },
    {
      patterns: ['strategie snd', 'search destroy', 'tips snd'],
      reponse: `💣 <b>Stratégie Search & Destroy — COD</b><br><br>
🎯 <b>En Attaque :</b><br>
- Split l'équipe → 3 A-Site / 2 B-Site<br>
- Fake plant pour attirer les défenseurs<br>
- Plante la bombe même si 1v1 → force le défuse<br>
- Smoke + Flash avant d'entrer dans un site<br><br>
🛡 <b>En Défense :</b><br>
- Tiens les angles clés des deux sites<br>
- Ne rush jamais seul en début de round<br>
- Garde 1 joueur pour défuse silencieux<br>
- Rotate rapidement quand le plant est confirmé<br><br>
💡 <b>Conseil BMF :</b> La communication > le skill en SnD.`
    },
  ],

  // ── MINECRAFT ──
  minecraft: [
    {
      patterns: ['minecraft'],
      reponse: `⛏ <b>Minecraft — Guide BMF</b><br><br>
Le jeu bac à sable emblématique. BMF_GAMING couvre :<br>
- Guide de survie débutant<br>
- Builds et architectures<br>
- Meilleures seeds 2026<br>
- Redstone et mécanismes<br><br>
Questions possibles :<br>
<em>"Débuter sur Minecraft ?"</em><br>
<em>"Meilleures seeds Minecraft ?"</em><br>
<em>"Comment trouver des diamants ?"</em>`
    },
    {
      patterns: ['debuter minecraft', 'debut minecraft', 'premiere nuit', 'survie minecraft', 'guide debutant minecraft'],
      reponse: `🌙 <b>Guide Survie Débutant — Minecraft</b><br><br>
📋 <b>Les 10 premières minutes :</b><br>
1️⃣ Coupe des arbres → crafting table + hache bois<br>
2️⃣ Mine de la pierre → outils en pierre<br>
3️⃣ Collecte de nourriture (animaux, baies)<br>
4️⃣ Construis un abri AVANT la nuit (7 min)<br>
5️⃣ Fabrique un lit → skip la nuit<br>
6️⃣ Mine du charbon → torches<br>
7️⃣ Creuse jusqu'au niveau Y:-54 pour les diamants<br><br>
⚠️ <b>Règle d'or :</b> Ne jamais miner directement vers le bas !<br>
💡 <b>Conseil BMF :</b> Creuse en escalier en zigzag pour maximiser l'exploration.`
    },
    {
      patterns: ['diamant minecraft', 'trouver diamant', 'ou sont les diamants'],
      reponse: `💎 <b>Guide Diamants — Minecraft 1.21</b><br><br>
📍 <b>Niveau optimal :</b> Y: -54 à Y: -58<br><br>
⛏ <b>Technique de minage :</b><br>
- Technique des branches (Branch Mining)<br>
- Tunnels espacés de 2 blocs<br>
- Torches tous les 8 blocs<br><br>
🔧 <b>Outils recommandés :</b><br>
- Pioche en Fer minimum<br>
- Enchantement Fortune III → 2-3x plus de diamants<br>
- Enchantement Efficacité V → mine plus vite<br><br>
💡 <b>Conseil BMF :</b> Évite les grottes lors du minage — risque de chute de lave.`
    },
    {
      patterns: ['seed minecraft', 'meilleure seed', 'seed 2026'],
      reponse: `🗺 <b>Meilleures Seeds Minecraft 2026</b><br><br>
🏔 <b>Seed Villages :</b> <code>-1789428733</code><br>
→ 3 villages + forteresse proche du spawn<br><br>
💎 <b>Seed Diamants :</b> <code>2111844826</code><br>
→ Mine de diamants visible dès le spawn<br><br>
🏝 <b>Seed Île Tropicale :</b> <code>-7853516656</code><br>
→ Belle île avec forêt de bambous<br><br>
🏰 <b>Seed Bastion :</b> <code>1887126555</code><br>
→ Spawn face à un château de bastion<br><br>
🌋 <b>Seed Biomes Variés :</b> <code>4837753</code><br>
→ 8 biomes différents autour du spawn`
    },
  ],

  // ── CLASH OF CLANS ──
  coc: [
    {
      patterns: ['clash of clans', 'coc', 'clashofclans'],
      reponse: `⚔ <b>Clash of Clans — Guide BMF</b><br><br>
Jeu de stratégie mobile de Supercell. BMF_GAMING couvre :<br>
- Compositions d'attaque par TH<br>
- Designs de bases anti-3 étoiles<br>
- Stratégies Clan Wars<br>
- Guide de progression<br><br>
Questions possibles :<br>
<em>"Meilleure attaque TH16 ?"</em><br>
<em>"Comment progresser vite ?"</em><br>
<em>"Meilleure base défensive ?"</em>`
    },
    {
      patterns: ['attaque th16', 'th16', 'town hall 16'],
      reponse: `🏆 <b>Guide Attaque TH16 — Clash of Clans</b><br><br>
💥 <b>Compo #1 — Super Barbarians (Facile)</b><br>
- 10 Super Barbarians + 5 Witches + 5 Healers<br>
- Sorts : Rage x2 · Heal x2 · Freeze x2<br>
- Héros : Barb King devant, Archer Queen derrière<br><br>
💥 <b>Compo #2 — Dragons Électro (Avancé)</b><br>
- 10 Dragons + 5 Electro Dragons<br>
- Sorts : Lightning x4 · Rage x2 · Haste x1<br>
- Idéal contre les bases centrées<br><br>
💥 <b>Compo #3 — Root Rider (Méta)</b><br>
- 5 Root Riders + 10 Super Giants<br>
- Sorts : Rage x3 · Poison x2<br>
- Destroy les défenses extérieures en premier<br><br>
💡 <b>Règle BMF :</b> Commence toujours par des "funneling troops" !`
    },
    {
      patterns: ['progresser coc', 'niveau th', 'progression clash'],
      reponse: `📈 <b>Guide Progression — Clash of Clans</b><br><br>
🚀 <b>Règles d'or BMF :</b><br>
1. <b>Builders TOUJOURS occupés</b> → Ne laisse jamais un builder inactif<br>
2. <b>Labo TOUJOURS actif</b> → Une recherche permanente<br>
3. <b>Ne rush pas le TH</b> → Max les défenses et troupes d'abord<br>
4. <b>Rejoins un bon clan</b> → Clan Wars = ressources gratuites<br>
5. <b>Complete les achievements</b> → Gems gratuites<br><br>
⚡ <b>Ordre de priorité des upgrades :</b><br>
Défenses → Troupes → Bâtiments ressources`
    },
  ],

  // ── GENSHIN IMPACT ──
  genshin: [
    {
      patterns: ['genshin', 'genshin impact'],
      reponse: `🌸 <b>Genshin Impact — Guide BMF</b><br><br>
RPG open-world de HoYoverse. BMF_GAMING couvre :<br>
- Builds complets par personnage<br>
- Compositions d'équipe optimales<br>
- Tier list mise à jour<br>
- Guides de donjons et boss<br><br>
Questions possibles :<br>
<em>"Build Hu Tao ?"</em><br>
<em>"Tier list Genshin ?"</em><br>
<em>"Meilleure équipe Genshin ?"</em>`
    },
    {
      patterns: ['build hu tao', 'hutao', 'hu tao'],
      reponse: `🌸 <b>Build Hu Tao — Genshin Impact</b><br><br>
⚔ <b>Rôle :</b> DPS Pyro Principal<br><br>
🗡 <b>Armes (du meilleur au budget) :</b><br>
- Bâton de Homa (BiS)<br>
- Lanze de Drachenkampf<br>
- Dragon's Bane (budget)<br><br>
🎭 <b>Artefacts :</b> 4x Crimson Witch of Flames<br>
- Sablier : HP%<br>
- Calice : Pyro DMG Bonus%<br>
- Tiare : Crit DMG (si Crit Rate ≥ 60%)<br><br>
👥 <b>Team optimale :</b><br>
Hu Tao · Yelan · Zhongli · Albedo<br><br>
💡 <b>Rotation BMF :</b> Zhongli Shield → Yelan E → Hu Tao E → Normal Attacks → Burst`
    },
    {
      patterns: ['tier list genshin', 'meilleur perso genshin', 'personnage genshin'],
      reponse: `🏆 <b>Tier List Genshin Impact — Actuelle</b><br><br>
👑 <b>Tier SS (Meta absolue) :</b><br>
Furina · Neuvillette<br><br>
🥇 <b>Tier S :</b><br>
Raiden Shogun · Hu Tao · Kazuha · Yelan · Nahida<br><br>
🥈 <b>Tier A :</b><br>
Xiao · Ayaka · Itto · Cyno · Wanderer<br><br>
🥉 <b>Tier B :</b><br>
Xiangling · Bennett · Fischl · Sucrose<br><br>
📉 <b>Tier C :</b><br>
Amber · Lisa · Kaeya · Noelle<br><br>
💡 <b>Note BMF :</b> Même les personnages C peuvent être efficaces avec un build parfait !`
    },
    {
      patterns: ['resine genshin', 'resin genshin', 'stamina genshin', 'comment farmer genshin'],
      reponse: `⚡ <b>Guide Résine — Genshin Impact</b><br><br>
La Résine (160 max) est la ressource principale pour farmer.<br><br>
💡 <b>Priorité d'utilisation :</b><br>
1. Domaines d'artefacts (x20 résine)<br>
2. Boss hebdomadaires (x30 résine)<br>
3. Boss normaux (x40 résine)<br>
4. Donjon leylines (x20 résine)<br><br>
⏱ <b>Régénération :</b> 1 résine toutes les 8 minutes<br>
→ 160 résine en ~21h si tu pars de 0<br><br>
💡 <b>Conseil BMF :</b> Utilise ta résine chaque jour — ne la laisse jamais au max !`
    },
  ],

  // ── AMONG US ──
  amongus: [
    {
      patterns: ['among us', 'among us tips', 'impostor', 'imposteur', 'crewmate'],
      reponse: `🚀 <b>Among Us — Guide BMF</b><br><br>
Jeu de déduction multijoueur. BMF_GAMING couvre :<br>
- Tips pour gagner en imposteur<br>
- Stratégies crewmate<br>
- Guide des rôles spéciaux<br>
- Astuces de sabotage<br><br>
Questions possibles :<br>
<em>"Comment gagner en imposteur ?"</em><br>
<em>"Tips crewmate ?"</em><br>
<em>"Meilleure stratégie de sabotage ?"</em>`
    },
    {
      patterns: ['gagner imposteur', 'tips imposteur', 'jouer imposteur', 'comment impostor'],
      reponse: `🔪 <b>Guide Imposteur — Among Us</b><br><br>
🎭 <b>Règle d'or : Agis comme un Crewmate !</b><br><br>
✅ <b>À faire absolument :</b><br>
- Fake les tâches visuelles (Réacteur, Télécharger...)<br>
- Mémorise tes "alibis" de déplacement<br>
- Crée une alliance avec 1 joueur dès le début<br>
- Kill dans des zones peu fréquentées<br>
- Utilise les évents pour éliminer discrètement<br><br>
🚨 <b>Sabotages les plus efficaces :</b><br>
- <b>Réacteur</b> → 30sec pour régler → panic générale<br>
- <b>Lumières</b> → Vision réduite → kills faciles<br>
- <b>O2</b> → Deux endroits en même temps → divise l'équipe<br><br>
❌ <b>Erreurs fatales à éviter :</b><br>
- Suivre quelqu'un de trop près<br>
- Voter trop vite lors d'un meeting<br>
- Saboter sans plan de kill derrière`
    },
  ],

};


// ── 13.2 MOTEUR DE RECHERCHE DE RÉPONSE ──

/**
 * Trouve la meilleure réponse selon le message entré
 * Normalise le texte (minuscules, sans accents, sans ponctuation)
 * @param {string} message - Message brut de l'utilisateur
 * @returns {string} - Réponse en HTML
 */
function trouverReponse(message) {
  // Normalisation : minuscules + suppression accents + ponctuation
  const msg = message
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Parcourt toutes les catégories et patterns
  for (const categorie of Object.values(BMF_KB)) {
    for (const entree of categorie) {
      for (const pattern of entree.patterns) {
        const cleanPattern = pattern
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

        if (msg.includes(cleanPattern)) {
          return entree.reponse;
        }
      }
    }
  }

  // Réponse par défaut si aucun pattern trouvé
  return `🤔 <b>Je n'ai pas trouvé de réponse précise à ta question.</b><br><br>
Essaie de reformuler ou pose une question sur :<br>
- ⛵ Sailor Piece / Ascension 4 / Alucard / Aizen<br>
- 🍎 Blox Fruits / Tier List Fruits / Codes<br>
- 🎯 Fortnite / Build / Ranked<br>
- 🔫 COD / Loadout / SnD<br>
- ⛏ Minecraft / Diamants / Seeds<br>
- ⚔ Clash of Clans / Attaque TH16<br>
- 🌸 Genshin / Build Hu Tao / Tier List<br>
- 🚀 Among Us / Imposteur<br><br>
<em>Exemple : "Meilleur fruit Blox Fruits ?" ou "Guide Ascension 4"</em>`;
}


// ── 13.3 CRÉATION DU WIDGET CHAT ──

// État global du chat
const chatState = {
  isOpen:   false,
  isTyping: false,
  unread:   0,
};

/**
 * Crée et injecte le widget chat complet dans le body
 */
function creerChatWidget() {
  const widget = document.createElement('div');
  widget.id = 'bmf-chat';
  widget.innerHTML = `

    <!-- ─── Bouton flottant ─── -->
    <button
      class="chat-bubble"
      id="chat-bubble"
      onclick="toggleChat()"
      aria-label="Ouvrir le chat gaming BMF"
    >
      <span class="chat-bubble-icone">💬</span>
      <span class="chat-badge" id="chat-badge" style="display:none">1</span>
    </button>

    <!-- ─── Fenêtre principale ─── -->
    <div class="chat-window" id="chat-window" role="dialog" aria-label="Chat BMF_GAMING">

      <!-- Header avec avatar, statut, actions -->
      <div class="chat-header">
        <div class="chat-header-gauche">
          <div class="chat-avatar">BMF</div>
          <div class="chat-header-texte">
            <span class="chat-nom">BMF Gaming Bot</span>
            <span class="chat-statut">
              <span class="chat-point-vert"></span>En ligne
            </span>
          </div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-btn-action" onclick="viderChat()" title="Effacer la conversation">🗑</button>
          <button class="chat-btn-action" onclick="toggleChat()"  title="Fermer">✕</button>
        </div>
      </div>

      <!-- Corps — zone des messages -->
      <div class="chat-corps" id="chat-corps"></div>

      <!-- Suggestions rapides -->
      <div class="chat-suggestions" id="chat-suggestions">
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">⛵ Sailor Piece</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">🍎 Blox Fruits</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">💡 Ascension 4</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">🎯 Fortnite</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">🔫 Call of Duty</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">⛏ Minecraft</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">🌸 Genshin</button>
        <button class="chat-sugg" onclick="envoyerSuggestion(this)">🎁 Codes gratuits</button>
      </div>

      <!-- Zone de saisie + bouton envoi -->
      <div class="chat-footer">
        <input
          type="text"
          id="chat-input"
          class="chat-input"
          placeholder="Pose ta question gaming..."
          maxlength="200"
          autocomplete="off"
          onkeydown="handleKeyChat(event)"
        />
        <button class="chat-btn-envoyer" onclick="envoyerMessage()" aria-label="Envoyer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
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

  // Injecte les styles CSS du chat
  injecterStylesChat();

  // Message d'accueil automatique du bot
  ajouterMessageBot(
    `👋 <b>Salut gamer !</b> Je suis le bot de <b>BMF_GAMING</b>.<br><br>
Je connais tous les jeux du site et je peux t'aider avec des guides, tips, codes et stratégies.<br><br>
Clique sur une suggestion ou pose directement ta question ! 🎮`,
    false
  );
}


// ── 13.4 ACTIONS DU CHAT ──

/** Ouvre ou ferme la fenêtre du chat */
function toggleChat() {
  chatState.isOpen = !chatState.isOpen;
  const fenetre = $('#chat-window');
  const badge   = $('#chat-badge');

  if (chatState.isOpen) {
    fenetre?.classList.add('ouvert');
    chatState.unread = 0;
    if (badge) badge.style.display = 'none';
    // Focus sur l'input après l'animation d'ouverture
    setTimeout(() => $('#chat-input')?.focus(), 300);
  } else {
    fenetre?.classList.remove('ouvert');
  }
}

/** Gère la touche Entrée dans l'input */
function handleKeyChat(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    envoyerMessage();
  }
}

/** Envoie le message de l'utilisateur et déclenche la réponse du bot */
function envoyerMessage() {
  const input   = $('#chat-input');
  const message = input?.value.trim();
  if (!message || chatState.isTyping) return;

  // Affiche le message de l'utilisateur
  ajouterMessageUser(message);
  input.value = '';

  // Cache les suggestions après le premier message
  const sugg = $('#chat-suggestions');
  if (sugg) sugg.style.display = 'none';

  // Simule le délai de réflexion/frappe du bot (réaliste)
  chatState.isTyping = true;
  afficherIndicateurTyping();

  const delai = 750 + Math.random() * 700; // 750ms à 1450ms
  setTimeout(() => {
    cacherIndicateurTyping();
    chatState.isTyping = false;
    const reponse = trouverReponse(message);
    ajouterMessageBot(reponse);
  }, delai);
}

/** Envoie une suggestion prédéfinie */
function envoyerSuggestion(btn) {
  const input = $('#chat-input');
  if (!input) return;
  // Retire l'emoji du début du texte
  const texte = btn.textContent.replace(/^[\u{1F000}-\u{1FFFF}]\s/u, '').trim();
  input.value = texte;
  envoyerMessage();
}

/** Efface tous les messages et remet les suggestions */
function viderChat() {
  const corps = $('#chat-corps');
  if (corps) corps.innerHTML = '';
  chatState.unread = 0;

  const sugg = $('#chat-suggestions');
  if (sugg) sugg.style.display = 'flex';

  ajouterMessageBot(`🔄 Conversation effacée. Comment puis-je t'aider gamer ? 🎮`);
}


// ── 13.5 AFFICHAGE DES MESSAGES ──

/** Ajoute un message de l'utilisateur */
function ajouterMessageUser(texte) {
  const corps = $('#chat-corps');
  if (!corps) return;

  const div = document.createElement('div');
  div.className = 'chat-msg chat-msg-user';
  div.innerHTML = `
    <div class="chat-bulle">${echapperHTML(texte)}</div>
    <span class="chat-heure">${heureActuelle()}</span>
  `;
  corps.appendChild(div);
  scrollerChat();
}

/** Ajoute un message du bot */
function ajouterMessageBot(html, animer = true) {
  const corps = $('#chat-corps');
  if (!corps) return;

  const div = document.createElement('div');
  div.className = 'chat-msg chat-msg-bot' + (animer ? ' anim-chat' : '');
  div.innerHTML = `
    <div class="chat-bulle">${html}</div>
    <span class="chat-heure">${heureActuelle()}</span>
  `;
  corps.appendChild(div);
  scrollerChat();

  // Incrémente le badge si le chat est fermé
  if (!chatState.isOpen) {
    chatState.unread++;
    const badge = $('#chat-badge');
    if (badge) {
      badge.textContent = chatState.unread;
      badge.style.display = 'flex';
    }
  }
}

/** Affiche les 3 points de typing */
function afficherIndicateurTyping() {
  const corps = $('#chat-corps');
  if (!corps) return;

  const div = document.createElement('div');
  div.id        = 'chat-typing-indicator';
  div.className = 'chat-msg chat-msg-bot';
  div.innerHTML = `
    <div class="chat-bulle chat-bulle-typing">
      <span class="typing-pt"></span>
      <span class="typing-pt"></span>
      <span class="typing-pt"></span>
    </div>
  `;
  corps.appendChild(div);
  scrollerChat();
}

/** Supprime l'indicateur de typing */
function cacherIndicateurTyping() {
  $('#chat-typing-indicator')?.remove();
}


// ── 13.6 UTILITAIRES DU CHAT ──

/** Défile vers le bas du chat */
function scrollerChat() {
  const corps = $('#chat-corps');
  if (corps) corps.scrollTop = corps.scrollHeight;
}

/** Retourne l'heure actuelle formatée HH:MM */
function heureActuelle() {
  return new Date().toLocaleTimeString('fr-FR', {
    hour:   '2-digit',
    minute: '2-digit'
  });
}

/** Échappe le HTML pour sécuriser les messages utilisateur */
function echapperHTML(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}


// ── 13.7 STYLES DU CHAT (injectés dynamiquement) ──

function injecterStylesChat() {
  const style = document.createElement('style');
  style.id = 'bmf-chat-styles';
  style.textContent = `

    /* ── Bouton flottant ── */
    .chat-bubble {
      position: fixed;
      bottom: 26px; right: 86px;
      width: 52px; height: 52px;
      background: linear-gradient(135deg, #00d4ff 0%, #0055ff 100%);
      border: none; border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 22px rgba(0,212,255,0.42);
      z-index: 998;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .chat-bubble:hover {
      transform: scale(1.12) translateY(-3px);
      box-shadow: 0 8px 30px rgba(0,212,255,0.65);
    }
    .chat-bubble-icone { font-size: 1.4rem; line-height: 1; }

    .chat-badge {
      position: absolute; top: -4px; right: -4px;
      width: 19px; height: 19px;
      background: #ff3333; color: #fff;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.60rem;
      border-radius: 50%;
      align-items: center; justify-content: center;
      border: 2px solid #040407;
    }

    /* ── Fenêtre ── */
    .chat-window {
      position: fixed;
      bottom: 88px; right: 20px;
      width: 355px; height: 545px;
      background: #050810;
      border: 1px solid rgba(0,212,255,0.18);
      border-radius: 16px;
      display: flex; flex-direction: column;
      overflow: hidden;
      z-index: 997;
      box-shadow:
        0 22px 65px rgba(0,0,0,0.80),
        0 0 0 1px rgba(0,212,255,0.06);
      opacity: 0;
      transform: translateY(18px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.26s ease, transform 0.26s ease;
    }
    .chat-window.ouvert {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* ── Header ── */
    .chat-header {
      display: flex; align-items: center;
      justify-content: space-between;
      padding: 13px 15px;
      background: linear-gradient(135deg,
        rgba(0,212,255,0.07),
        rgba(0,85,255,0.05)
      );
      border-bottom: 1px solid rgba(0,212,255,0.12);
      flex-shrink: 0;
    }
    .chat-header-gauche {
      display: flex; align-items: center; gap: 10px;
    }
    .chat-avatar {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, #00d4ff, #0055ff);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Orbitron', monospace;
      font-size: 0.50rem; font-weight: 900;
      color: #000; letter-spacing: 1px;
      flex-shrink: 0;
    }
    .chat-header-texte {
      display: flex; flex-direction: column; gap: 1px;
    }
    .chat-nom {
      font-family: 'Russo One', sans-serif;
      font-size: 0.80rem; color: #ffffff;
    }
    .chat-statut {
      display: flex; align-items: center; gap: 5px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.58rem; color: #607080;
    }
    .chat-point-vert {
      width: 6px; height: 6px;
      background: #00ff88; border-radius: 50%;
      box-shadow: 0 0 5px #00ff88;
      animation: point-pulse 2.2s ease-in-out infinite;
    }
    @keyframes point-pulse {
      0%,100% { opacity: 1; }
      50% { opacity: 0.35; }
    }
    .chat-header-actions {
      display: flex; gap: 5px;
    }
    .chat-btn-action {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      color: #5a6a7a;
      width: 26px; height: 26px;
      border-radius: 6px;
      cursor: pointer; font-size: 0.75rem;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .chat-btn-action:hover {
      background: rgba(255,255,255,0.10);
      color: #ffffff;
    }

    /* ── Corps des messages ── */
    .chat-corps {
      flex: 1; overflow-y: auto;
      padding: 13px;
      display: flex; flex-direction: column; gap: 9px;
      scroll-behavior: smooth;
    }
    .chat-corps::-webkit-scrollbar { width: 3px; }
    .chat-corps::-webkit-scrollbar-track { background: transparent; }
    .chat-corps::-webkit-scrollbar-thumb {
      background: rgba(0,212,255,0.20);
      border-radius: 2px;
    }

    /* ── Messages ── */
    .chat-msg {
      display: flex; flex-direction: column;
      max-width: 86%;
    }
    .anim-chat {
      animation: chat-apparaitre 0.26s ease forwards;
    }
    @keyframes chat-apparaitre {
      from { opacity: 0; transform: translateY(7px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .chat-msg-user {
      align-self: flex-end; align-items: flex-end;
    }
    .chat-msg-bot {
      align-self: flex-start; align-items: flex-start;
    }
    .chat-bulle {
      padding: 9px 12px;
      border-radius: 11px;
      font-family: 'Exo 2', sans-serif;
      font-size: 0.80rem;
      font-weight: 300;
      line-height: 1.66;
      color: #d0e4f0;
    }
    .chat-msg-user .chat-bulle {
      background: linear-gradient(135deg,
        rgba(0,212,255,0.16),
        rgba(0,85,255,0.12)
      );
      border: 1px solid rgba(0,212,255,0.20);
      border-bottom-right-radius: 3px;
    }
    .chat-msg-bot .chat-bulle {
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.065);
      border-bottom-left-radius: 3px;
    }
    .chat-bulle b    { color: #ffffff; font-weight: 700; }
    .chat-bulle em   { color: #b8ccd8; font-style: italic; }
    .chat-bulle code {
      background: rgba(0,212,255,0.09);
      border: 1px solid rgba(0,212,255,0.16);
      border-radius: 3px; padding: 1px 5px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.76rem; color: #00d4ff;
    }
    .chat-heure {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.56rem; color: #334455;
      margin-top: 2px; padding: 0 3px;
    }

    /* ── Indicateur typing (3 points) ── */
    .chat-bulle-typing {
      display: flex; align-items: center;
      gap: 4px; padding: 10px 13px;
    }
    .typing-pt {
      width: 6px; height: 6px;
      background: rgba(0,212,255,0.55);
      border-radius: 50%;
      animation: typing-rebond 1.3s ease-in-out infinite;
    }
    .typing-pt:nth-child(2) { animation-delay: 0.18s; }
    .typing-pt:nth-child(3) { animation-delay: 0.36s; }
    @keyframes typing-rebond {
      0%,80%,100% { transform: scale(1);   opacity: 0.45; }
      40%          { transform: scale(1.45); opacity: 1; }
    }

    /* ── Suggestions rapides ── */
    .chat-suggestions {
      display: flex; flex-wrap: wrap; gap: 5px;
      padding: 8px 11px;
      border-top: 1px solid rgba(255,255,255,0.04);
      flex-shrink: 0;
      overflow-y: auto; max-height: 88px;
    }
    .chat-suggestions::-webkit-scrollbar { display: none; }
    .chat-sugg {
      font-family: 'Rajdhani', sans-serif;
      font-size: 0.68rem; font-weight: 600;
      letter-spacing: 0.5px;
      padding: 4px 10px;
      background: rgba(0,212,255,0.04);
      border: 1px solid rgba(0,212,255,0.14);
      border-radius: 50px;
      color: #5a6a7a;
      cursor: pointer; transition: all 0.2s;
      white-space: nowrap;
    }
    .chat-sugg:hover {
      background: rgba(0,212,255,0.11);
      color: #00d4ff;
      border-color: rgba(0,212,255,0.34);
    }

    /* ── Footer / Input ── */
    .chat-footer {
      display: flex; align-items: center; gap: 7px;
      padding: 9px 11px;
      border-top: 1px solid rgba(0,212,255,0.08);
      background: rgba(0,0,0,0.22);
      flex-shrink: 0;
    }
    .chat-input {
      flex: 1; padding: 8px 11px;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(0,212,255,0.13);
      border-radius: 8px;
      color: #d0e4f0;
      font-family: 'Exo 2', sans-serif;
      font-size: 0.80rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .chat-input:focus {
      border-color: rgba(0,212,255,0.38);
    }
    .chat-input::placeholder { color: #334455; }

    .chat-btn-envoyer {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, #00d4ff, #0055ff);
      border: none; border-radius: 8px;
      color: #000; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .chat-btn-envoyer:hover {
      transform: scale(1.10);
      box-shadow: 0 0 14px rgba(0,212,255,0.48);
    }

    /* ── Responsive mobile ── */
    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 16px);
        right: 8px; left: 8px;
        bottom: 80px;
      }
      .chat-bubble { right: 14px; }
    }
  `;

  document.head.appendChild(style);
}


// ============================================
// 14. STYLES GLOBAUX SUPPLÉMENTAIRES
// (Injectés dynamiquement — nav actif, shake, fadeIn)
// ============================================

(function injecterStylesGlobaux() {
  const style = document.createElement('style');
  style.id = 'bmf-global-styles';
  style.textContent = `

    /* Lien actif dans la navbar */
    .nav-link.actif-nav {
      color: #ffffff !important;
    }
    .nav-link.actif-nav::after {
      width: 100% !important;
    }

    /* Animation shake pour validation formulaire */
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-7px); }
      40%      { transform: translateX(7px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }

    /* Animation fadeInUp */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();


// ============================================
// 15. INITIALISATION GLOBALE
// Tout est lancé ici au chargement du DOM
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Charge les données dynamiques depuis data.js
  chargerNews();
  chargerCodes();

  // Crée le widget chat complet
  creerChatWidget();

  // Log de confirmation dans la console navigateur
  console.log(
    '%c ⚡ BMF_GAMING — Script v1.0 chargé ',
    [
      'background: linear-gradient(135deg, #00d4ff, #0055ff)',
      'color: #000000',
      'font-family: monospace',
      'font-weight: bold',
      'font-size: 12px',
      'padding: 5px 10px',
      'border-radius: 4px'
    ].join(';')
  );
});
