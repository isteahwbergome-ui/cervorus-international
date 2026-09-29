const projects = [
  {
    title: "Bonjour Taxi Super Center",
    category: "web",
    tag: "Création de site web",
    image: "assets/bonjour-taxi-website.jpg",
    person: "Wilkenson Bergome · Developer",
    description: "Conception d'une interface web moderne destinée à présenter une entreprise, ses produits, ses informations et ses moyens de contact sur une plateforme claire et responsive."
  },
  {
    title: "DS Création — Les Pionnières",
    category: "design",
    tag: "Design graphique",
    image: "assets/ds-creation.jpg",
    person: "D'ammischaddaï Paul · Designer",
    description: "Création d'un visuel événementiel avec composition graphique, hiérarchie typographique, traitement de l'image et mise en valeur des informations essentielles."
  },
  {
    title: "Collection de créations graphiques",
    category: "design",
    tag: "Design graphique",
    image: "assets/steve-portfolio.jpg",
    person: "Steve Utyle · Videographer & Designer",
    description: "Sélection de créations graphiques explorant plusieurs univers visuels : publicité, mode, automobile, divertissement, produits et communication de marque."
  },
  {
    title: "Carte digitale CERVORUS",
    category: "digital",
    tag: "Carte digitale",
    image: "assets/carte-digitale.jpg",
    person: "Dervely Jean-Noel · Responsable Cartes Digitales",
    description: "Exemple de conception d'une carte digitale premium avec une identité visuelle élégante. L'aperçu public utilise des données masquées pour protéger les informations sensibles."
  },
  {
    title: "Campagne de communication digitale",
    category: "marketing",
    tag: "Marketing digital",
    image: "assets/marketing-bonjour-taxi.jpg",
    person: "Wilkenson Bergome · Responsable Marketing Digital",
    description: "Exemple de travail de marketing digital autour de contenus promotionnels destinés aux réseaux sociaux : mise en avant de produits, publications commerciales, visibilité de l'entreprise et communication avec l'audience."
  },
  {
    title: "Portrait & contenu vidéo",
    category: "video",
    tag: "Vidéo & contenu",
    image: "assets/steve.jpg",
    person: "Steve Utyle · Videographer & Designer",
    description: "Exemple de production visuelle mettant l'accent sur le portrait, la direction artistique et la qualité d'image pour des contenus destinés à la communication digitale."
  }
];

const team = [
  { name:"Schinaider Florestant", role:"PDG", image:"assets/schinaider.jpg", skills:["Direction","Vision stratégique"] },
  { name:"Yabens-Kely Felix", role:"DG", image:"assets/yabens-kely.jpg", skills:["Gestion","Coordination"] },
  { name:"Wilkenson Bergome", role:"Developer & Responsable Marketing Digital", image:"assets/wilkenson.jpg", skills:["Web","Marketing digital"] },
  { name:"D'ammischaddaï Paul", role:"Designer", image:"assets/dammischaddai.jpg", skills:["Design graphique","Création visuelle"] },
  { name:"Steve Utyle", role:"Videographer & Designer", image:"assets/steve.jpg", skills:["Vidéo","Design"] },
  { name:"Dervely Jean-Noel", role:"Responsable Cartes Digitales", image:"assets/dervely.jpg", skills:["Cartes digitales","Solutions digitales"] }
];

const portfolioGrid = document.getElementById("portfolioGrid");
const teamGrid = document.getElementById("teamGrid");
const filters = document.querySelectorAll(".filter");
const modal = document.getElementById("projectModal");
const modalMedia = document.getElementById("modalMedia");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPerson = document.getElementById("modalPerson");

function renderProjects(filter="all"){
  const list = filter === "all" ? projects : projects.filter(p => p.category === filter);
  portfolioGrid.innerHTML = list.map(p => `
    <article class="project reveal" data-index="${projects.indexOf(p)}" tabindex="0" role="button" aria-label="Voir ${p.title}">
      <div class="project-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="project-view">Voir le projet ↗</span>
      </div>
      <div class="project-info">
        <div class="project-tag">${p.tag}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-person">${p.person}</div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project").forEach(card => {
    const open = () => openProject(projects[Number(card.dataset.index)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); }});
  });
  observeReveals();
}

function renderTeam(){
  teamGrid.innerHTML = team.map(member => `
    <article class="member reveal">
      <div class="member-photo"><img src="${member.image}" alt="${member.name}" loading="lazy"><div class="member-overlay"><span>Profil CERVORUS</span></div></div>
      <div class="member-info">
        <div class="member-index">CERVORUS · ÉQUIPE</div>
        <h3>${member.name}</h3>
        <div class="member-role">${member.role}</div>
        <div class="member-skills">${member.skills.map(s => `<span>${s}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
  observeReveals();
}

function openProject(project){
  modalCategory.textContent = project.tag;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalPerson.textContent = `Réalisé par · ${project.person}`;
  modalMedia.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

document.getElementById("modalCta").addEventListener("click", closeModal);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.textContent = isOpen ? "×" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
}));

const backToTop = document.getElementById("backToTop");
const progress = document.getElementById("pageProgress");
window.addEventListener("scroll", () => {
  document.getElementById("siteHeader").classList.toggle("scrolled", window.scrollY > 25);
  backToTop.classList.toggle("show", window.scrollY > 600);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}, {passive:true});
backToTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

document.getElementById("year").textContent = new Date().getFullYear();

let revealObserver;
function observeReveals(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  if(revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

renderProjects();
renderTeam();
observeReveals();
