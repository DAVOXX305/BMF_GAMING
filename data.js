/* =====================================================
   BMF_GAMING — data.js
   Fichier     : data.js
   Créateur    : BMF Davoxx
   Description : Base de données centrale du site.
                 Contient TOUTES les données dynamiques :
                 ─ BMF_NEWS    → Actualités gaming
                 ─ BMF_CODES   → Codes gratuits actifs
                 ─ BMF_GUIDES  → Méta-données des guides
                 ─ BMF_JEUX    → Infos des jeux couverts
                 ─ BMF_CONFIG  → Config générale du site
   ─────────────────────────────────────────────────────
   📌 COMMENT AJOUTER UNE NEWS ?
      1. Ajoute un objet au tableau BMF_NEWS
      2. Respecte EXACTEMENT la structure ci-dessous
      3. Sauvegarde → Live Server actualise tout seul
   ─────────────────────────────────────────────────────
   📌 COMMENT AJOUTER UN CODE ?
      1. Ajoute un objet au tableau BMF_CODES
      2. Remplis jeu, code, recompense, expire
      3. Sauvegarde → le code apparaît sur le site
   ===================================================== */

'use strict';


// ============================================================
// ⚙️ BMF_CONFIG — Configuration générale du site
// Modifie ici pour changer les infos globales du site
// ============================================================

const BMF_CONFIG = {
  nom:         'BMF_GAMING',
  createur:    'BMF Davoxx',
  version:     '1.0.0',
  annee:       2026,
  description: 'Le guide ultime pour tous les gamers',
  discord:     '#',
  youtube:     '#',
  twitter:     '#',
  tiktok:      '#',

  // Statistiques affichées dans le hero (data-target dans HTML)
  stats: {
    guides:        500,
    jeux_couverts: 15,
    gamers:        8500,
    codes_actifs:  200,
  },

  // Textes de la barre d'annonce défilante
  // Modifie ces textes pour annoncer tes updates
  annonces: [
    '🔥 NOUVEAU — Guide Ascension 4 Sailor Piece disponible',
    '⚡ Codes Blox Fruits mis à jour',
    '🎯 Tier List Fortnite Saison actuelle',
    '🌸 Build Hutao Genshin Impact',
    '🚀 Tips Imposteur Among Us',
    '⛏ Seed Minecraft 1.21 ajouté',
    '⚔ Stratégie Clash of Clans TH16',
    '🍎 Nouveau spot de farm Blox Fruits',
    '🐾 Codes Pet Simulator X actifs',
    '💀 Guide Da Hood — Survival Tips',
  ],
};


// ============================================================
// 🎮 BMF_JEUX — Données de chaque jeu couvert
// Utilisé pour les cartes et les pages de jeux
// ============================================================

const BMF_JEUX = [

  // ─────────────────────────────
  // ROBLOX
  // ─────────────────────────────

  {
    id:          'sailor-piece',
    nom:         'Sailor Piece',
    plateforme:  'Roblox',
    icone:       '⛵',
    categorie:   'RPG Anime',
    description: 'Guide Ascension 4, farming boss Alucard sur Sailor Island et Aizen sur Hollow Island. Drops requis et stratégies optimales.',
    tags:        ['Guide', 'Tips', 'Avancé'],
    progression: 95,
    actif:       true,
    featured:    true,
    difficulte:  'Avancé',
    joueurs:     '1M+',
    derniere_maj: '2026-06-01',
  },

  {
    id:          'blox-fruits',
    nom:         'Blox Fruits',
    plateforme:  'Roblox',
    icone:       '🍎',
    categorie:   'RPG Action',
    description: 'Meilleurs fruits, zones de grinding, tier list complète et codes actifs mis à jour régulièrement.',
    tags:        ['Tier List', 'Codes', 'Guide'],
    progression: 90,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '5M+',
    derniere_maj: '2026-05-28',
  },

  {
    id:          'anime-adventures',
    nom:         'Anime Adventures',
    plateforme:  'Roblox',
    icone:       '🌟',
    categorie:   'Tower Defense',
    description: 'Meilleures unités, stratégies de défense, tier list complète et tous les codes actifs du moment.',
    tags:        ['Tier List', 'Codes', 'Guide'],
    progression: 80,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '2M+',
    derniere_maj: '2026-05-25',
  },

  {
    id:          'pet-simulator-x',
    nom:         'Pet Simulator X',
    plateforme:  'Roblox',
    icone:       '🐾',
    categorie:   'Simulation',
    description: 'Meilleurs pets, zones de farm optimales, valeurs d\'échange et codes gratuits à utiliser maintenant.',
    tags:        ['Codes', 'Guide', 'Trading'],
    progression: 75,
    actif:       true,
    featured:    false,
    difficulte:  'Débutant',
    joueurs:     '3M+',
    derniere_maj: '2026-05-20',
  },

  {
    id:          'da-hood',
    nom:         'Da Hood',
    plateforme:  'Roblox',
    icone:       '🏙',
    categorie:   'Action',
    description: 'Tips de survie, meilleures armes à utiliser, stratégies pour dominer et astuces de déplacement.',
    tags:        ['Tips', 'Avancé', 'Guide'],
    progression: 70,
    actif:       true,
    featured:    false,
    difficulte:  'Avancé',
    joueurs:     '1.5M+',
    derniere_maj: '2026-05-15',
  },

  {
    id:          'brookhaven',
    nom:         'Brookhaven',
    plateforme:  'Roblox',
    icone:       '🏠',
    categorie:   'Roleplay',
    description: 'Secrets cachés, astuces de roleplay, glitches connus et codes actifs à utiliser.',
    tags:        ['Codes', 'Secrets', 'Guide'],
    progression: 65,
    actif:       true,
    featured:    false,
    difficulte:  'Débutant',
    joueurs:     '10M+',
    derniere_maj: '2026-05-10',
  },

  {
    id:          'adopt-me',
    nom:         'Adopt Me',
    plateforme:  'Roblox',
    icone:       '🐣',
    categorie:   'Simulation',
    description: 'Meilleurs pets rares, conseils de trading, valeurs du marché actuelles et événements en cours.',
    tags:        ['Guide', 'Trading', 'Codes'],
    progression: 60,
    actif:       true,
    featured:    false,
    difficulte:  'Débutant',
    joueurs:     '20M+',
    derniere_maj: '2026-05-05',
  },

  // ─────────────────────────────
  // AUTRES JEUX
  // ─────────────────────────────

  {
    id:          'fortnite',
    nom:         'Fortnite',
    plateforme:  'PC / Console / Mobile',
    icone:       '🎯',
    categorie:   'Battle Royale',
    description: 'Builds compétitifs, strats ranked, tier list des armes et guide des skins.',
    tags:        ['Guide', 'Tier List', 'Avancé'],
    progression: 85,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '350M+',
    derniere_maj: '2026-05-30',
  },

  {
    id:          'call-of-duty',
    nom:         'Call of Duty',
    plateforme:  'PC / Console',
    icone:       '🔫',
    categorie:   'FPS',
    description: 'Meilleurs loadouts, stratégies par map, tips ranked et guide complet débutant.',
    tags:        ['Guide', 'Loadouts', 'Avancé'],
    progression: 80,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '150M+',
    derniere_maj: '2026-05-26',
  },

  {
    id:          'minecraft',
    nom:         'Minecraft',
    plateforme:  'PC / Console / Mobile',
    icone:       '⛏',
    categorie:   'Sandbox',
    description: 'Builds épiques, meilleures seeds 2026, guide de survie complet et redstone avancé.',
    tags:        ['Guide', 'Builds', 'Débutant'],
    progression: 88,
    actif:       true,
    featured:    false,
    difficulte:  'Débutant',
    joueurs:     '200M+',
    derniere_maj: '2026-05-22',
  },

  {
    id:          'clash-of-clans',
    nom:         'Clash of Clans',
    plateforme:  'Mobile',
    icone:       '⚔',
    categorie:   'Stratégie',
    description: 'Meilleures attaques, designs de bases, stratégies de clan et progression TH.',
    tags:        ['Guide', 'Stratégie', 'Base Design'],
    progression: 75,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '500M+',
    derniere_maj: '2026-05-18',
  },

  {
    id:          'genshin-impact',
    nom:         'Genshin Impact',
    plateforme:  'PC / Console / Mobile',
    icone:       '🌸',
    categorie:   'RPG',
    description: 'Builds complets par personnage, compositions d\'équipe, tier list et guides de donjons.',
    tags:        ['Tier List', 'Builds', 'Avancé'],
    progression: 82,
    actif:       true,
    featured:    false,
    difficulte:  'Intermédiaire',
    joueurs:     '60M+',
    derniere_maj: '2026-05-29',
  },

  {
    id:          'among-us',
    nom:         'Among Us',
    plateforme:  'PC / Mobile',
    icone:       '🚀',
    categorie:   'Party Game',
    description: 'Tips pour gagner en imposteur, stratégies crewmate, guide des rôles et astuces.',
    tags:        ['Tips', 'Guide', 'Débutant'],
    progression: 70,
    actif:       true,
    featured:    false,
    difficulte:  'Débutant',
    joueurs:     '100M+',
    derniere_maj: '2026-05-12',
  },

];


// ============================================================
// 🔥 BMF_NEWS — Actualités gaming
// ─────────────────────────────────────────────────────────────
// Structure obligatoire de chaque news :
// {
//   id          : Identifiant unique (string)
//   emoji       : Emoji qui s'affiche avant la catégorie
//   categorie   : Texte de la catégorie (ex: "UPDATE")
//   jeu         : Nom du jeu concerné
//   titre       : Titre accrocheur de la news
//   description : Description courte (1-2 phrases max)
//   date        : Date en texte (ex: "01 Juin 2026")
//   type        : 'hot' | 'update' | 'tip' | 'event' | 'patch'
//   lien        : URL vers le guide complet ('#' si pas encore dispo)
// }
// ─────────────────────────────────────────────────────────────
// ➕ POUR AJOUTER UNE NEWS :
//    Copie un bloc ci-dessous, colle-le EN PREMIER dans le
//    tableau (les plus récentes en tête de liste) et modifie.
// ============================================================

const BMF_NEWS = [

  // ──────────────────────────────────────────
  // NEWS ROBLOX — SAILOR PIECE
  // ──────────────────────────────────────────

  {
    id:          'news-001',
    emoji:       '🔥',
    categorie:   'GUIDE COMPLET',
    jeu:         'Sailor Piece',
    titre:       'Guide Ascension 4 — Drops, Boss & Stratégie Optimale',
    description: 'Tout ce qu\'il faut savoir pour passer Ascension 4 efficacement : ordre des boss, drops requis et stratégie BMF testée et approuvée.',
    date:        '01 Juin 2026',
    type:        'hot',
    lien:        '#',
  },

  {
    id:          'news-002',
    emoji:       '⚔',
    categorie:   'BOSS UPDATE',
    jeu:         'Sailor Piece',
    titre:       'Aizen — Drop Rate Confirmé & Nouveau Spot de Farm',
    description: 'Les drop rates d\'Aizen sur Hollow Island ont été revus dans le patch 2.4. Zanpakuto Brisé passe à 6%, Haori de Capitaine à 4%.',
    date:        '29 Mai 2026',
    type:        'update',
    lien:        '#',
  },

  {
    id:          'news-003',
    emoji:       '⚡',
    categorie:   'TIP AVANCÉ',
    jeu:         'Sailor Piece',
    titre:       'Méthode BMF — Farmer Alucard en 12 Minutes Chrono',
    description: 'La méthode exacte utilisée par BMF Davoxx pour clear Alucard rapidement et maximiser les drops Épée Fantôme en une session.',
    date:        '27 Mai 2026',
    type:        'tip',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS ROBLOX — BLOX FRUITS
  // ──────────────────────────────────────────

  {
    id:          'news-004',
    emoji:       '🍎',
    categorie:   'PATCH NOTES',
    jeu:         'Blox Fruits',
    titre:       'Update 25 — Nouveau Fruit Kitsune & Île Secrète',
    description: 'L\'update 25 de Blox Fruits introduit le fruit Kitsune (SS Tier), une nouvelle île cachée et deux nouveaux boss end-game.',
    date:        '30 Mai 2026',
    type:        'patch',
    lien:        '#',
  },

  {
    id:          'news-005',
    emoji:       '🎁',
    categorie:   'CODES ACTIFS',
    jeu:         'Blox Fruits',
    titre:       '5 Nouveaux Codes Blox Fruits — EXP & Beli Boost',
    description: '5 codes viennent d\'être publiés par le développeur. Double EXP 24h et Beli Boost inclus. Utilisez-les avant expiration !',
    date:        '28 Mai 2026',
    type:        'hot',
    lien:        '#',
  },

  {
    id:          'news-006',
    emoji:       '🏆',
    categorie:   'TIER LIST',
    jeu:         'Blox Fruits',
    titre:       'Tier List Fruits — Mise à Jour Post-Update 25',
    description: 'Kitsune entre directement en SS Tier. Le fruit Dragon reste S mais perd sa domination absolue. Nouvelle tier list complète disponible.',
    date:        '25 Mai 2026',
    type:        'update',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS ROBLOX — ANIME ADVENTURES
  // ──────────────────────────────────────────

  {
    id:          'news-007',
    emoji:       '🌟',
    categorie:   'NOUVEAUTÉ',
    jeu:         'Anime Adventures',
    titre:       'Nouveau Personnage Gojo Satoru — Build & Tier Position',
    description: 'Gojo Satoru vient d\'être ajouté dans Anime Adventures. Il entre directement en S Tier avec sa technique Hollow Purple dévastatrice.',
    date:        '26 Mai 2026',
    type:        'update',
    lien:        '#',
  },

  {
    id:          'news-008',
    emoji:       '🎁',
    categorie:   'CODES ACTIFS',
    jeu:         'Anime Adventures',
    titre:       '3 Codes Anime Adventures — Gemmes & Invocations Gratuites',
    description: '3 nouveaux codes donnent des gemmes et des invocations gratuites. Parfait pour obtenir les nouvelles unités Mythic de la mise à jour.',
    date:        '24 Mai 2026',
    type:        'hot',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS ROBLOX — PET SIMULATOR X
  // ──────────────────────────────────────────

  {
    id:          'news-009',
    emoji:       '🐾',
    categorie:   'ÉVÉNEMENT',
    jeu:         'Pet Simulator X',
    titre:       'Événement Summer 2026 — Nouveau Pet Exclusif Disponible',
    description: 'L\'événement estival est lancé ! Un nouveau pet exclusif Legendary est disponible en farm. Codes de l\'event déjà actifs sur BMF_GAMING.',
    date:        '01 Juin 2026',
    type:        'event',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — FORTNITE
  // ──────────────────────────────────────────

  {
    id:          'news-010',
    emoji:       '🎯',
    categorie:   'SAISON NOUVELLE',
    jeu:         'Fortnite',
    titre:       'Chapitre 6 Saison 3 — Nouvelles Armes & Tier List',
    description: 'La nouvelle saison de Fortnite introduit 8 nouvelles armes. Notre tier list complète est déjà disponible avec le loadout méta recommandé.',
    date:        '31 Mai 2026',
    type:        'patch',
    lien:        '#',
  },

  {
    id:          'news-011',
    emoji:       '⚡',
    categorie:   'TIP RANKED',
    jeu:         'Fortnite',
    titre:       'Guide Ranked S3 — Monter Diamond avec Cette Stratégie',
    description: 'La stratégie BMF pour passer Diamond en ranked : zones d\'atterrissage optimales, rotations et gestion des points de survie expliqués.',
    date:        '29 Mai 2026',
    type:        'tip',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — CALL OF DUTY
  // ──────────────────────────────────────────

  {
    id:          'news-012',
    emoji:       '🔫',
    categorie:   'PATCH NOTES',
    jeu:         'Call of Duty',
    titre:       'Patch 1.42 — Nerf Rival-9 & Buff MCW Confirmés',
    description: 'Le SMG Rival-9 reçoit un nerf de dégâts de 8%. Le MCW reçoit un buff de précision. Notre guide loadout a été mis à jour en conséquence.',
    date:        '28 Mai 2026',
    type:        'patch',
    lien:        '#',
  },

  {
    id:          'news-013',
    emoji:       '💣',
    categorie:   'GUIDE MAP',
    jeu:         'Call of Duty',
    titre:       'Nouvelle Map Karachi — Angles, Rotations & Spots Clés',
    description: 'La map Karachi revient dans la rotation ranked. Guide complet des angles dominants, rotations optimales et spots de snipe confirmés.',
    date:        '25 Mai 2026',
    type:        'update',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — MINECRAFT
  // ──────────────────────────────────────────

  {
    id:          'news-014',
    emoji:       '⛏',
    categorie:   'UPDATE JAVA',
    jeu:         'Minecraft',
    titre:       'Snapshot 26w22a — Nouveau Biome & Structure Souterraine',
    description: 'Un nouveau biome souterrain cristallin vient d\'être ajouté dans la dernière snapshot. Nouveau minerai exclusif inclus avec 3 nouveaux mobs.',
    date:        '27 Mai 2026',
    type:        'update',
    lien:        '#',
  },

  {
    id:          'news-015',
    emoji:       '🏔',
    categorie:   'SEEDS 2026',
    jeu:         'Minecraft',
    titre:       '10 Meilleures Seeds Minecraft 1.21 — Sélection BMF',
    description: 'Notre sélection des 10 meilleures seeds 2026 : villages à spawn, forteresses proches, mines de diamants visibles et biomes variés.',
    date:        '22 Mai 2026',
    type:        'tip',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — CLASH OF CLANS
  // ──────────────────────────────────────────

  {
    id:          'news-016',
    emoji:       '⚔',
    categorie:   'MAJ MAJEURE',
    jeu:         'Clash of Clans',
    titre:       'Town Hall 17 Annoncé — Nouvelles Défenses & Troupes',
    description: 'Supercell vient d\'annoncer le Town Hall 17 pour l\'été 2026. 4 nouvelles défenses, 2 nouvelles troupes et une nouvelle arme du château de clan.',
    date:        '30 Mai 2026',
    type:        'hot',
    lien:        '#',
  },

  {
    id:          'news-017',
    emoji:       '🏆',
    categorie:   'CLAN WARS',
    jeu:         'Clash of Clans',
    titre:       'Clan Wars League — Stratégie Légendaire Tier Confirmée',
    description: 'Guide complet pour atteindre le Légendaire Tier en CWL : composition optimale, bases war défensives et stratégies d\'attaque par niveau TH.',
    date:        '23 Mai 2026',
    type:        'tip',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — GENSHIN IMPACT
  // ──────────────────────────────────────────

  {
    id:          'news-018',
    emoji:       '🌸',
    categorie:   'VERSION 5.7',
    jeu:         'Genshin Impact',
    titre:       'Version 5.7 — Nouveau Personnage Cyno Refonte & Events',
    description: 'La version 5.7 arrive avec une refonte de Cyno (nouvelles mécaniques), 2 nouveaux events et une bannière double 5 étoiles limitée.',
    date:        '01 Juin 2026',
    type:        'update',
    lien:        '#',
  },

  {
    id:          'news-019',
    emoji:       '💎',
    categorie:   'PRIMOS GRATUITS',
    jeu:         'Genshin Impact',
    titre:       '180 Primos Gratuits — Codes & Events à ne pas rater',
    description: '3 codes actifs donnent 180 Primogems gratuitement. Plus 2 events limités offrant chacun 80 Primos supplémentaires cette semaine.',
    date:        '28 Mai 2026',
    type:        'hot',
    lien:        '#',
  },

  // ──────────────────────────────────────────
  // NEWS — AMONG US
  // ──────────────────────────────────────────

  {
    id:          'news-020',
    emoji:       '🚀',
    categorie:   'NOUVEAUX RÔLES',
    jeu:         'Among Us',
    titre:       'Nouveau Rôle Tracker — Guide Complet & Stratégies',
    description: 'Le rôle Tracker vient d\'être ajouté. Guide complet : comment l\'utiliser efficacement pour repérer l\'imposteur sans se faire remarquer.',
    date:        '20 Mai 2026',
    type:        'update',
    lien:        '#',
  },

];


// ============================================================
// 🎁 BMF_CODES — Codes gratuits actifs
// ─────────────────────────────────────────────────────────────
// Structure obligatoire de chaque code :
// {
//   id         : Identifiant unique (string)
//   jeu        : Nom du jeu affiché sur la carte
//   code       : Le code exact à entrer dans le jeu
//   recompense : Description de la récompense obtenue
//   expire     : Date d'expiration ou 'Permanent' ou 'Bientôt'
//   actif      : true = affiché / false = masqué
//   categorie  : 'roblox' | 'pc' | 'mobile'
// }
// ─────────────────────────────────────────────────────────────
// ➕ POUR AJOUTER UN CODE :
//    Copie un bloc, colle-le EN PREMIER dans le tableau,
//    change actif à true. Pour désactiver : actif: false
// ============================================================

const BMF_CODES = [

  // ──────────────────────────────────────────
  // CODES — BLOX FRUITS
  // ──────────────────────────────────────────

  {
    id:          'code-001',
    jeu:         '🍎 Blox Fruits',
    code:        'BIGNEWS',
    recompense:  'Double XP pendant 24 heures',
    expire:      'Bientôt',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-002',
    jeu:         '🍎 Blox Fruits',
    code:        'THEGREATACE',
    recompense:  'Beli Boost +50% pendant 20 min',
    expire:      '15 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-003',
    jeu:         '🍎 Blox Fruits',
    code:        'ENVYARMY',
    recompense:  'XP Boost +2x pendant 20 min',
    expire:      '30 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-004',
    jeu:         '🍎 Blox Fruits',
    code:        'Magicbus',
    recompense:  'Double XP pendant 20 min',
    expire:      'Permanent',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-005',
    jeu:         '🍎 Blox Fruits',
    code:        'KITTGAMING',
    recompense:  'Double XP pendant 20 min',
    expire:      'Permanent',
    actif:       true,
    categorie:   'roblox',
  },

  // ──────────────────────────────────────────
  // CODES — ANIME ADVENTURES
  // ──────────────────────────────────────────

  {
    id:          'code-006',
    jeu:         '🌟 Anime Adventures',
    code:        'WELCOME2026',
    recompense:  '300 Gemmes gratuites',
    expire:      '20 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-007',
    jeu:         '🌟 Anime Adventures',
    code:        'NEWWORLD',
    recompense:  '2x Summoning Tickets',
    expire:      '10 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-008',
    jeu:         '🌟 Anime Adventures',
    code:        'GOJOSATORU',
    recompense:  '500 Gemmes + 1 Ticket Rare',
    expire:      '25 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  // ──────────────────────────────────────────
  // CODES — PET SIMULATOR X
  // ──────────────────────────────────────────

  {
    id:          'code-009',
    jeu:         '🐾 Pet Simulator X',
    code:        'SUMMER2026',
    recompense:  '1 Million de Coins + 1 Egg',
    expire:      '31 Juillet 2026',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-010',
    jeu:         '🐾 Pet Simulator X',
    code:        'BIGUPDATE',
    recompense:  '2x Coins pendant 15 min',
    expire:      'Permanent',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-011',
    jeu:         '🐾 Pet Simulator X',
    code:        'GOLDENEGG',
    recompense:  '1 Golden Egg + 500K Coins',
    expire:      '18 Juin 2026',
    actif:       true,
    categorie:   'roblox',
  },

  // ──────────────────────────────────────────
  // CODES — BROOKHAVEN
  // ──────────────────────────────────────────

  {
    id:          'code-012',
    jeu:         '🏠 Brookhaven',
    code:        'BROOKHAVEN2026',
    recompense:  'Pack de vêtements exclusif',
    expire:      'Permanent',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-013',
    jeu:         '🏠 Brookhaven',
    code:        'SECRETHOUSE',
    recompense:  'Maison secrète débloquée',
    expire:      '01 Juillet 2026',
    actif:       true,
    categorie:   'roblox',
  },

  // ──────────────────────────────────────────
  // CODES — ADOPT ME
  // ──────────────────────────────────────────

  {
    id:          'code-014',
    jeu:         '🐣 Adopt Me',
    code:        'ADOPTME2026',
    recompense:  '300 Bucks + 1 Common Egg',
    expire:      'Permanent',
    actif:       true,
    categorie:   'roblox',
  },

  {
    id:          'code-015',
    jeu:         '🐣 Adopt Me',
    code:        'SUMMEREGG',
    recompense:  '1 Summer Egg Exclusif',
    expire:      '15 Juillet 2026',
    actif:       true,
    categorie:   'roblox',
  },

  // ──────────────────────────────────────────
  // CODES — GENSHIN IMPACT
  // ──────────────────────────────────────────

  {
    id:          'code-016',
    jeu:         '🌸 Genshin Impact',
    code:        'GENSHINGIFT',
    recompense:  '60 Primogems + 5 Fragiles',
    expire:      '10 Juin 2026',
    actif:       true,
    categorie:   'pc',
  },

  {
    id:          'code-017',
    jeu:         '🌸 Genshin Impact',
    code:        'VERSION57',
    recompense:  '60 Primogems + 10 000 Mora',
    expire:      '20 Juin 2026',
    actif:       true,
    categorie:   'pc',
  },

  {
    id:          'code-018',
    jeu:         '🌸 Genshin Impact',
    code:        'ADVENTURE57',
    recompense:  '60 Primogems + 5 Aventurier',
    expire:      '25 Juin 2026',
    actif:       true,
    categorie:   'pc',
  },

  // ──────────────────────────────────────────
  // CODES — CLASH OF CLANS
  // ──────────────────────────────────────────

  {
    id:          'code-019',
    jeu:         '⚔ Clash of Clans',
    code:        'SUMMER2026COC',
    recompense:  '5 Gemmes + 1 Speed Up Builder',
    expire:      '31 Juillet 2026',
    actif:       true,
    categorie:   'mobile',
  },

];


// ============================================================
// 📖 BMF_GUIDES — Méta-données des guides publiés
// ─────────────────────────────────────────────────────────────
// Permet à script.js de générer dynamiquement les guides
// Structure : { id, jeu, titre, description, niveau,
//               duree, vues, categorie, date, lien }
// ============================================================

const BMF_GUIDES = [

  // ── SAILOR PIECE ──
  {
    id:          'guide-001',
    jeu:         'Sailor Piece',
    icone:       '⛵',
    titre:       'Guide Ascension 4 — Drops, Boss & Stratégie',
    description: 'Tous les drops requis, boss à farmer dans l\'ordre et stratégie optimale pour passer Ascension 4.',
    niveau:      'avance',
    categorie:   'roblox avance',
    duree:       '15 min',
    vues:        '2 400',
    date:        '01 Juin 2026',
    lien:        '#',
  },

  {
    id:          'guide-002',
    jeu:         'Sailor Piece',
    icone:       '👁',
    titre:       'Vaincre Aizen — Hollow Island — Guide Complet',
    description: 'Stratégie complète pour farmer Aizen efficacement et obtenir tous ses drops en minimum de temps.',
    niveau:      'avance',
    categorie:   'roblox avance',
    duree:       '10 min',
    vues:        '1 900',
    date:        '29 Mai 2026',
    lien:        '#',
  },

  // ── BLOX FRUITS ──
  {
    id:          'guide-003',
    jeu:         'Blox Fruits',
    icone:       '🍎',
    titre:       'Débuter sur Blox Fruits — Guide Complet Débutant',
    description: 'Quel fruit choisir au départ, où farmer et comment progresser rapidement sans se perdre.',
    niveau:      'debutant',
    categorie:   'roblox debutant',
    duree:       '10 min',
    vues:        '5 100',
    date:        '25 Mai 2026',
    lien:        '#',
  },

  {
    id:          'guide-004',
    jeu:         'Blox Fruits',
    icone:       '🍎',
    titre:       'Tier List Fruits Complète — Post Update 25',
    description: 'Classement complet des fruits mis à jour après l\'update 25. Kitsune entre en SS Tier.',
    niveau:      'avance',
    categorie:   'roblox avance',
    duree:       '8 min',
    vues:        '3 800',
    date:        '28 Mai 2026',
    lien:        '#',
  },

  // ── PET SIMULATOR X ──
  {
    id:          'guide-005',
    jeu:         'Pet Simulator X',
    icone:       '🐾',
    titre:       'Débuter sur Pet Simulator X — Les Bases',
    description: 'Quels pets garder, où farmer les premiers points et comment bien utiliser ses codes dès le départ.',
    niveau:      'debutant',
    categorie:   'roblox debutant',
    duree:       '8 min',
    vues:        '2 100',
    date:        '20 Mai 2026',
    lien:        '#',
  },

  // ── FORTNITE ──
  {
    id:          'guide-006',
    jeu:         'Fortnite',
    icone:       '🎯',
    titre:       'Build Compétitif Fortnite — Techniques Avancées',
    description: 'Techniques de build avancées, edits rapides et rotations optimales pour le ranked S3.',
    niveau:      'avance',
    categorie:   'fps avance',
    duree:       '20 min',
    vues:        '4 500',
    date:        '31 Mai 2026',
    lien:        '#',
  },

  // ── CALL OF DUTY ──
  {
    id:          'guide-007',
    jeu:         'Call of Duty',
    icone:       '🔫',
    titre:       'Loadout Parfait COD — Méta Post-Patch 1.42',
    description: 'Les meilleures configurations d\'armes pour chaque style de jeu après le dernier patch.',
    niveau:      'avance',
    categorie:   'fps avance',
    duree:       '8 min',
    vues:        '3 200',
    date:        '28 Mai 2026',
    lien:        '#',
  },

  // ── MINECRAFT ──
  {
    id:          'guide-008',
    jeu:         'Minecraft',
    icone:       '⛏',
    titre:       'Guide Survie Débutant — Les 10 Premières Minutes',
    description: 'Les 10 premières choses à faire pour survivre ta première nuit et progresser vite en 2026.',
    niveau:      'debutant',
    categorie:   'debutant',
    duree:       '12 min',
    vues:        '7 800',
    date:        '22 Mai 2026',
    lien:        '#',
  },

  // ── CLASH OF CLANS ──
  {
    id:          'guide-009',
    jeu:         'Clash of Clans',
    icone:       '⚔',
    titre:       'Attaque TH16 — 3 Étoiles Garanti',
    description: 'Composition d\'armée optimale, timing de déploiement et stratégie pour 3 étoiles garantis en TH16.',
    niveau:      'avance',
    categorie:   'avance',
    duree:       '14 min',
    vues:        '1 800',
    date:        '23 Mai 2026',
    lien:        '#',
  },

  // ── GENSHIN IMPACT ──
  {
    id:          'guide-010',
    jeu:         'Genshin Impact',
    icone:       '🌸',
    titre:       'Build Hu Tao — Artefacts, Armes & Team Complète',
    description: 'Artefacts optimaux, armes recommandées et composition d\'équipe pour maximiser les dégâts de Hu Tao.',
    niveau:      'avance',
    categorie:   'rpg avance',
    duree:       '18 min',
    vues:        '3 700',
    date:        '29 Mai 2026',
    lien:        '#',
  },

];


// ============================================================
// 📊 BMF_TIERLISTS — Données des tier lists
// ============================================================

const BMF_TIERLISTS = {

  bloxFruits: {
    jeu:          'Blox Fruits',
    titre:        '🍎 Blox Fruits — Tier List Fruits',
    derniere_maj: '28 Mai 2026',
    tiers: {
      SS: ['Dragon', 'Leopard', 'Kitsune'],
      S:  ['Dough', 'Spirit', 'Venom', 'Phoenix'],
      A:  ['Shadow', 'Rumble', 'Magma', 'Quake'],
      B:  ['Buddha', 'Flame', 'Ice', 'Sand'],
      C:  ['Smoke', 'Spike', 'Chop'],
    },
  },

  genshin: {
    jeu:          'Genshin Impact',
    titre:        '🌸 Genshin Impact — Tier List Personnages',
    derniere_maj: '01 Juin 2026',
    tiers: {
      SS: ['Furina', 'Neuvillette'],
      S:  ['Raiden Shogun', 'Hu Tao', 'Kazuha', 'Yelan', 'Nahida'],
      A:  ['Xiao', 'Ayaka', 'Itto', 'Cyno', 'Wanderer'],
      B:  ['Xiangling', 'Bennett', 'Fischl', 'Sucrose'],
      C:  ['Amber', 'Lisa', 'Kaeya', 'Noelle'],
    },
  },

  fortnite: {
    jeu:          'Fortnite',
    titre:        '🎯 Fortnite — Tier List Armes',
    derniere_maj: '31 Mai 2026',
    tiers: {
      S:  ['Sniper Bolt-Action', 'AR Exo-Série'],
      A:  ['Shotgun Pompe Pro', 'SMG Rapide'],
      B:  ['Pistolet Pro', 'Fusil Précision'],
      C:  ['Revolver', 'LMG', 'Minigun'],
    },
  },

  sailorPiece: {
    jeu:          'Sailor Piece',
    titre:        '⛵ Sailor Piece — Tier List Fruits de Démon',
    derniere_maj: '01 Juin 2026',
    tiers: {
      S:  ['Haki de l\'Armement', 'Fruit de la Lumière', 'Fruit du Feu'],
      A:  ['Fruit du Vent', 'Fruit du Magma'],
      B:  ['Fruit de la Glace', 'Fruit du Sable'],
      C:  ['Fruit de la Fumée', 'Fruit de la Vigne'],
    },
  },

};


// ============================================================
// 🔍 FONCTIONS D'ACCÈS AUX DONNÉES
// Permettent à script.js d'interagir avec les données
// ============================================================

/**
 * Retourne toutes les news actives triées par date (plus récente en premier)
 * @param {number} limite - Nombre max de news à retourner (0 = toutes)
 * @returns {Array} - Tableau de news
 */
function getNews(limite = 0) {
  const news = [...BMF_NEWS];
  return limite > 0 ? news.slice(0, limite) : news;
}

/**
 * Retourne tous les codes actifs
 * @param {string} categorie - Filtre par catégorie ('roblox'|'pc'|'mobile'|'tous')
 * @returns {Array} - Tableau de codes actifs
 */
function getCodes(categorie = 'tous') {
  const codes = BMF_CODES.filter(c => c.actif);
  if (categorie === 'tous') return codes;
  return codes.filter(c => c.categorie === categorie);
}

/**
 * Retourne les guides filtrés par catégorie
 * @param {string} categorie - Catégorie des guides
 * @returns {Array} - Tableau de guides
 */
function getGuides(categorie = 'tous') {
  if (categorie === 'tous') return BMF_GUIDES;
  return BMF_GUIDES.filter(g => g.categorie.includes(categorie));
}

/**
 * Retourne un jeu par son id
 * @param {string} id - L'id du jeu
 * @returns {Object|null}
 */
function getJeu(id) {
  return BMF_JEUX.find(j => j.id === id) || null;
}

/**
 * Retourne la tier list d'un jeu
 * @param {string} jeu - 'bloxFruits'|'genshin'|'fortnite'|'sailorPiece'
 * @returns {Object|null}
 */
function getTierList(jeu) {
  return BMF_TIERLISTS[jeu] || null;
}

/**
 * Compte le nombre de codes actifs pour un jeu donné
 * @param {string} nomJeu - Nom du jeu
 * @returns {number}
 */
function compterCodesJeu(nomJeu) {
  return BMF_CODES.filter(c =>
    c.actif && c.jeu.toLowerCase().includes(nomJeu.toLowerCase())
  ).length;
}


// ============================================================
// ✅ CONFIRMATION DE CHARGEMENT
// Affiché dans la console pour confirmer que data.js est OK
// ============================================================

console.log(
  '%c 📦 BMF_GAMING — data.js chargé ',
  [
    'background: linear-gradient(135deg, #00ff88, #00d4ff)',
    'color: #000000',
    'font-family: monospace',
    'font-weight: bold',
    'font-size: 11px',
    'padding: 4px 10px',
    'border-radius: 4px',
  ].join(';')
);

console.log(
  `%c 📰 ${BMF_NEWS.length} news  |  🎁 ${BMF_CODES.filter(c=>c.actif).length} codes actifs  |  📖 ${BMF_GUIDES.length} guides  |  🎮 ${BMF_JEUX.length} jeux `,
  'color: #00d4ff; font-family: monospace; font-size: 10px;'
);
