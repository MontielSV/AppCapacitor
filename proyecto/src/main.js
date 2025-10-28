const retosBase = [
  { texto: "♻️ Recicla 5 botellas", badge: "♻️", puntos: 10 },
  { texto: "🚲 Usa la bici 3 veces", badge: "🚲", puntos: 15 },
  { texto: "🌱 Planta una semilla", badge: "🌱", puntos: 20 }
];

let retos = JSON.parse(localStorage.getItem("retos")) || retosBase;
let completados = JSON.parse(localStorage.getItem("completados")) || [];
let puntos = parseInt(localStorage.getItem("puntos")) || 0;
let nombre = localStorage.getItem("nombre") || "Montiel";

function guardarDatos() {
  localStorage.setItem("retos", JSON.stringify(retos));
  localStorage.setItem("completados", JSON.stringify(completados));
  localStorage.setItem("puntos", puntos);
  localStorage.setItem("nombre", nombre);
}

/* ---------- RENDERIZADO DE RETOS ---------- */
function renderRetos() {
  const contenedor = document.getElementById("lista-retos");
  contenedor.innerHTML = "";
  retos.forEach((reto, index) => {
    const div = document.createElement("div");
    div.className = "reto";
    const completado = completados.includes(reto.badge);
    div.innerHTML = `
      <span style="${completado ? 'text-decoration: line-through; opacity:0.6;' : ''}">
        ${reto.texto}
      </span>
      <button data-index="${index}" ${completado ? 'disabled' : ''}>✔️</button>
    `;
    contenedor.appendChild(div);
  });

  contenedor.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      completarReto(parseInt(btn.dataset.index));
    });
  });
}

/* ---------- COMPLETAR RETOS ---------- */
function completarReto(index) {
  const reto = retos[index];
  if (!completados.includes(reto.badge)) {
    completados.push(reto.badge);
    puntos += reto.puntos;
    guardarDatos();
    renderBadges();
    renderRetos();
    renderPerfil();
  }
}

/* ---------- BADGES ---------- */
function renderBadges() {
  const contenedor = document.getElementById("lista-badges");
  contenedor.innerHTML = "";
  completados.forEach((emoji) => {
    const div = document.createElement("div");
    div.className = "badge";
    div.textContent = emoji;
    contenedor.appendChild(div);
  });
}

/* ---------- PERFIL ---------- */
function calcularNivel(puntos) {
  return Math.floor(puntos / 50) + 1;
}

function renderPerfil() {
  document.getElementById("nombre-usuario").textContent = nombre;
  document.getElementById("puntos").textContent = puntos;
  const nivel = calcularNivel(puntos);
  document.getElementById("nivel").textContent = nivel;

  const progreso = (puntos % 50) * 2;
  document.getElementById("xp").style.width = `${progreso}%`;
}

/* ---------- AÑADIR RETOS ---------- */
function agregarReto(texto) {
  const nuevo = { texto, badge: "🏅", puntos: 10 };
  retos.push(nuevo);
  guardarDatos();
  renderRetos();
}

/* ---------- CONSEJOS ALEATORIOS ---------- */
const consejos = [
  "Apaga las luces cuando no las necesites 💡",
  "Lleva tu propia bolsa reutilizable 🛍️",
  "Reduce el consumo de plástico ♻️",
  "Camina o usa transporte público 🚶‍♂️",
  "Ahorra agua al cepillarte los dientes 🚰",
  "Reutiliza frascos y envases de vidrio 🫙",
  "Evita productos con exceso de empaque 📦",
  "Compra frutas y verduras locales 🍎",
  "Usa botellas reutilizables en lugar de desechables 🧴",
  "Recicla papel, cartón y plástico correctamente 📄",
  "Desconecta aparatos que no estés usando 🔌",
  "Usa focos LED de bajo consumo 💡",
  "Evita imprimir documentos innecesarios 🖨️",
  "Haz compost con tus residuos orgánicos 🌾",
  "Participa en jornadas de limpieza comunitaria 🧹",
  "No tires aceite por el desagüe 🛢️",
  "Usa productos de limpieza biodegradables 🧼",
  "Prefiere ropa de segunda mano o intercambios 👕",
  "Repara antes de reemplazar 🔧",
  "Apoya marcas sostenibles y responsables 🌍",
  "Cultiva tus propias plantas o huerto urbano 🪴",
  "Evita el uso de pajillas plásticas 🥤",
  "Usa transporte compartido cuando sea posible 🚗",
  "Lava la ropa con agua fría para ahorrar energía 🧺",
  "Evita dejar el grifo abierto innecesariamente 🚿",
  "Recicla tus dispositivos electrónicos correctamente 📱",
  "Lleva tu propio recipiente si compras comida para llevar 🍱",
  "Usa servilletas de tela en vez de papel 🧻",
  "Evita el uso de globos en celebraciones 🎈",
  "Apoya iniciativas ecológicas en tu comunidad 🤝",
  "Educa a otros sobre el cuidado del planeta 📚",
  "Haz pausas digitales para reducir tu huella energética 🖥️",
  "Usa apps para monitorear tu consumo de energía 📊"
];

function nuevoConsejo() {
  const consejo = consejos[Math.floor(Math.random() * consejos.length)];
  document.getElementById("consejo").textContent = consejo;
}

/* ---------- RANKING LOCAL ---------- */
function renderRanking() {
  const usuarios = [
    { nombre: "Lucía", puntos: 500 },
    { nombre: "Andrés", puntos: 460 },
    { nombre: "Valentina", puntos: 410 },
    { nombre: "Carlos", puntos: 375 },
    { nombre: "Diana", puntos: 330 },
    { nombre: "Julián", puntos: 280 },
    { nombre: "Laura", puntos: 210 },
    { nombre: "Esteban", puntos: 160 },
    { nombre: "Sara", puntos: 120 },
    { nombre: "Miguel", puntos: 95 },
    { nombre: nombre, puntos }
  ].sort((a, b) => b.puntos - a.puntos);

  const lista = document.getElementById("lista-ranking");
  lista.innerHTML = "";
  usuarios.forEach((u, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${u.nombre} — ${u.puntos} pts`;
    lista.appendChild(li);
  });
}

/* ---------- SECCIONES ---------- */
function cambiarSeccion(id) {
  document.querySelectorAll(".seccion").forEach((sec) => sec.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");

  if (id === "perfil") renderPerfil();
  if (id === "ranking") renderRanking();
  if (id === "explorar") nuevoConsejo();
}

/* ---------- REINICIO ---------- */
function resetear() {
  if (confirm("¿Seguro que quieres reiniciar tu progreso?")) {
    retos = [...retosBase];
    completados = [];
    puntos = 0;
    guardarDatos();
    renderRetos();
    renderBadges();
    renderPerfil();
  }
}

/* ---------- CONFIGURACIÓN ---------- */
function guardarNombre() {
  const input = document.getElementById("nombre-input");
  if (input.value.trim()) {
    nombre = input.value.trim();
    guardarDatos();
    renderPerfil();
    alert("Nombre actualizado 🌿");
  }
}

function limpiarDatos() {
  if (confirm("¿Deseas borrar todos tus datos?")) {
    localStorage.clear();
    location.reload();
  }
}

/* ---------- INICIO ---------- */
window.addEventListener("DOMContentLoaded", () => {
  renderRetos();
  renderBadges();
  renderPerfil();

  document.getElementById("form-reto").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("nuevo-reto");
    if (input.value.trim() !== "") {
      agregarReto(input.value.trim());
      input.value = "";
    }
  });

  document.getElementById("reset").addEventListener("click", resetear);
  document.getElementById("nuevo-consejo").addEventListener("click", nuevoConsejo);
  document.getElementById("guardar-nombre").addEventListener("click", guardarNombre);
  document.getElementById("limpiar-datos").addEventListener("click", limpiarDatos);

  document.querySelectorAll("nav button").forEach((btn) => {
    btn.addEventListener("click", () => cambiarSeccion(btn.dataset.section));
  });
});

/* ---------- MODO CLARO / OSCURO ---------- */
const botonTema = document.getElementById("toggle-tema");
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
  document.body.classList.add("oscuro");
  botonTema.textContent = "☀️ Modo claro";
}

botonTema.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  const modoOscuro = document.body.classList.contains("oscuro");

  botonTema.textContent = modoOscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
  localStorage.setItem("tema", modoOscuro ? "oscuro" : "claro");
});
