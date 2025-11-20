// ========================================
//           DATOS INICIALES
// ========================================
const DB_KEY = "ecopuntos-v2";

const defaultDB = {
  me: {
    name: "Usuario",
    points: 0,
    activity: []
  },
  objects: [
    { name: "botella de vidrio", instr: "Lavar y llevar al contenedor verde.", cat: "vidrio" },
    { name: "caja de cartón", instr: "Doblar y llevar al contenedor azul.", cat: "papel" },
    { name: "lata de aluminio", instr: "Enjuagar y llevar al contenedor amarillo.", cat: "plastico" },
    { name: "periódico viejo", instr: "Mantener seco y depositar en el contenedor azul.", cat: "papel" },
    { name: "frasco de vidrio", instr: "Retirar etiquetas y lavar antes de llevar al contenedor verde.", cat: "vidrio" },
    { name: "cáscaras de vegetales", instr: "Depositarlas en el contenedor marrón o compostaje.", cat: "organico" },
    { name: "tetra pak", instr: "Enjuagar y depositar en el contenedor amarillo.", cat: "plastico" },
    { name: "revista", instr: "Doblarla o apilar y llevar al contenedor azul.", cat: "papel" },
    { name: "jarra rota", instr: "Llevar a punto limpio, no al contenedor verde.", cat: "vidrio" },
    { name: "bolsas biodegradables", instr: "Depositar en el contenedor marrón.", cat: "organico" },
    { name: "envase de shampoo", instr: "Lavar bien y llevar al contenedor amarillo.", cat: "plastico" },
    { name: "cuaderno usado", instr: "Retirar espiral metálico y depositar en el contenedor azul.", cat: "papel" },
    { name: "botella de vino", instr: "Lavar y llevar al contenedor verde.", cat: "vidrio" },
    { name: "residuos de café", instr: "Pueden ir al contenedor marrón o compost casero.", cat: "organico" },
    { name: "bandejas de icopor", instr: "Lavar y depositar en puntos especiales para icopor.", cat: "plastico" },
    { name: "cajas de cereal", instr: "Aplanar y llevar al contenedor azul.", cat: "papel" },
    { name: "vasos de vidrio rotos", instr: "Llevar a punto limpio, nunca al contenedor verde.", cat: "vidrio" },
    { name: "restos de pan", instr: "Depositar en el contenedor marrón.", cat: "organico" },
    { name: "botellas de jabón líquido", instr: "Enjuagar y llevar al contenedor amarillo.", cat: "plastico" },
    { name: "hojas de cuaderno", instr: "Separar del espiral y llevar al contenedor azul.", cat: "papel" },
    { name: "botellas verdes de cerveza", instr: "Lavar y llevar a contenedor verde.", cat: "vidrio" },
    { name: "botella PET", instr: "Enjuagar y llevar a contenedor amarillo.", cat: "plastico" }
  ],
  tips: [
    "Lava los envases antes de reciclar.",
    "No mezcles vidrio con cerámica.",
    "Aplasta botellas plásticas para ahorrar espacio.",
    "Separa residuos orgánicos para reducir olores.",
    "Limpia los envases antes de reciclar.",
    "Reutiliza frascos de vidrio como recipientes.",
    "Compra productos con menos empaque.",
    "Evita bolsas plásticas de un solo uso.",
    "Lleva tus propios recipientes cuando compres a granel.",
    "Haz compost con restos de frutas y verduras.",
    "Repara objetos antes de desecharlos.",
    "Evita botellas pequeñas, usa envases grandes reutilizables.",
    "Donar ropa ayuda a reducir basura textil.",
    "Lava y seca papel antes de reciclarlo.",
    "El vidrio es 100% reciclable infinitas veces.",
    "Clasifica baterías y llévalas a puntos especiales.",
    "Usa bolsas de tela cuando vayas al mercado.",
    "Nunca mezcles orgánicos con reciclables.",
    "Compra productos hechos con materiales reciclados.",
    "Reduce impresión de papel usando medios digitales.",
    "Aplasta cajas antes de llevarlas al contenedor.",
    "Evita pajillas plásticas.",
    "Reutiliza frascos como materas.",
    "El aluminio se recicla infinitamente.",
    "Los aceites usados no van al desagüe.",
    "Separa cartón limpio del muy sucio.",
    "Usa servilletas de tela.",
    "No eches vidrio roto en el contenedor verde.",
    "Haz manualidades con materiales reciclados.",
    "Limpia tus reciclables para evitar contaminación.",
    "Clasifica la basura diariamente.",
    "Separa el papel limpio del sucio."
  ],
  users: [
    { name: "Ana", points: 120 },
    { name: "Carlos", points: 150 },
    { name: "María", points: 210 },
    { name: "Julián", points: 80 },
    { name: "Fernanda", points: 305 },
    { name: "Mateo", points: 60 },
    { name: "Camila", points: 190 },
    { name: "Sofía", points: 260 },
    { name: "Jorge", points: 110 },
    { name: "Samuel", points: 70 },
    { name: "Paula", points: 220 },
    { name: "Valentina", points: 175 },
    { name: "Luis", points: 90 }
  ]
  
};

// ========================================
//          CARGAR Y GUARDAR
// ========================================
function loadDB() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : structuredClone(defaultDB);
}

function saveDB() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

let db = loadDB();

// ========================================
//               NAVEGACIÓN
// ========================================
const navBtns = document.querySelectorAll(".nav-btn");
const panels = document.querySelectorAll(".panel");

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    panels.forEach(p => p.classList.remove("visible"));
    document.getElementById(btn.dataset.target).classList.add("visible");
  });
});

// ========================================
//             SUGERENCIAS
// ========================================
function renderSuggestions() {
  const cont = document.getElementById("suggestions");
  cont.innerHTML = "";
  db.objects.slice(0, 6).forEach(o => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = o.name;
    chip.onclick = () => search(o.name);
    cont.appendChild(chip);
  });
}
renderSuggestions();

// ========================================
//             BUSCAR OBJETO
// ========================================
const result = document.getElementById("result");
const recycleActions = document.getElementById("recycle-actions");
const bin = document.getElementById("recycle-bin");
const binLabel = document.getElementById("bin-label");
const binIcon = document.querySelector(".bin-icon");

let current = null;

function search(text) {
  const q = text.toLowerCase().trim();
  const item = db.objects.find(o => o.name.toLowerCase().includes(q));
  current = item;

  if (!item) {
    result.classList.remove("hidden");
    result.innerHTML = `<h3>No encontrado</h3><p>Puedes agregarlo en la sección ➕.</p>`;
    recycleActions.classList.add("hidden");
    return;
  }

  result.classList.remove("hidden");
  recycleActions.classList.remove("hidden");

  result.innerHTML = `
    <h3>${item.name}</h3>
    <p>${item.instr}</p>
  `;

  const catColors = {
    plastico: { class: "bin-yellow", text: "Envases (Amarillo)" },
    papel: { class: "bin-blue", text: "Papel / Cartón (Azul)" },
    vidrio: { class: "bin-green", text: "Vidrio (Verde)" },
    organico: { class: "bin-brown", text: "Orgánico (Marrón)" }
  };

  const cfg = catColors[item.cat];

  bin.classList.remove("hidden");
  binIcon.className = "bin-icon " + cfg.class;
  binLabel.textContent = cfg.text;
}

document.getElementById("search-btn").onclick = () =>
  search(document.getElementById("search").value);

// ========================================
//            MARCAR RECICLADO
// ========================================
document.getElementById("mark-recycled").onclick = () => {
  if (!current) return;

  db.me.points += 10;
  db.me.activity.unshift(`Recicló ${current.name} (+10 pts)`);

  const user = db.users.find(u => u.name === db.me.name);
  if (user) user.points = db.me.points;
  else db.users.push({ name: db.me.name, points: db.me.points });

  saveDB();
  renderProfile();
  renderRanking();
};

// ========================================
//             AGREGAR OBJETO
// ========================================
document.getElementById("add-form").onsubmit = e => {
  e.preventDefault();

  const name = document.getElementById("add-name").value;
  const instr = document.getElementById("add-instr").value;
  const cat = document.getElementById("add-cat").value;

  db.objects.unshift({ name, instr, cat });
  db.me.activity.unshift(`Agregó ${name}`);

  saveDB();
  renderSuggestions();
  renderProfile();

  alert("Objeto agregado correctamente");

  e.target.reset();
};

// ========================================
//             CONSEJOS ALEATORIOS
// ========================================
function showRandomTip() {
  const tip = db.tips[Math.floor(Math.random() * db.tips.length)];
  document.getElementById("random-tip").textContent = tip;
}
showRandomTip();

document.getElementById("btn-random-tip").onclick = showRandomTip;

document.getElementById("form-add-tip").onsubmit = e => {
  e.preventDefault();
  const txt = document.getElementById("new-tip").value.trim();
  if (txt) db.tips.push(txt);
  saveDB();
  e.target.reset();
  showRandomTip();
};

// ========================================
//             RANKING
// ========================================
function renderRanking() {
  const list = document.getElementById("ranking-list");
  list.innerHTML = "";

  [...db.users]
    .sort((a, b) => b.points - a.points)
    .forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.name} — ${u.points} pts`;
      list.appendChild(li);
    });
}
renderRanking();

// ========================================
//             PERFIL EDITABLE
// ========================================
function renderProfile() {
  document.getElementById("profile-name").value = db.me.name;
  document.getElementById("profile-points").textContent = db.me.points + " pts";

  document.getElementById("avatar").textContent = db.me.name
    .slice(0, 2)
    .toUpperCase();

  const ul = document.getElementById("profile-activity");
  ul.innerHTML = "";
  db.me.activity.slice(0, 10).forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    ul.appendChild(li);
  });
}
renderProfile();

document.getElementById("save-profile").onclick = () => {
  const newName = document.getElementById("profile-name").value.trim();
  if (newName) db.me.name = newName;
  saveDB();
  renderProfile();
};
