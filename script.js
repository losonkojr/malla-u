const malla = {
  "I Semestre": [
    "Sociología Educacional con enfoque de género",
    "Filosofía Educacional",
    "Psicología Educacional",
    "Políticas de Inclusión y Enfoque de Derecho",
    "Competencias Comunicativas",
    "Inglés I",
    "Práctica I"
  ],
  "II Semestre": [
    "Sociedad, Cultura y Educación",
    "Tecnologías para el Aprendizaje",
    "Bases Neurobiológicas y Neurociencias",
    "Diversidad Educativa I",
    "Inglés II",
    "Formación Integral",
    "Práctica II"
  ],
  "III Semestre": [
    "Currículum Educacional",
    "Cognición y Lenguaje",
    "Diversidad Educativa II",
    "Atención Temprana y Psicomotricidad",
    "Inglés III",
    "Formación Integral",
    "Práctica III"
  ],
  "IV Semestre": [
    "Didáctica General",
    "Tecnologías para la Inclusión",
    "Trayectorias Evolutivas Diversas",
    "Diversificación Curricular",
    "Psicología del Desarrollo Emocional",
    "Inglés IV",
    "Práctica IV"
  ],
  "V Semestre": [
    "Evaluación para el Aprendizaje",
    "Bases Curriculares de Ciencias Naturales",
    "Bases Curriculares de Historia, Geografía y Ciencias Sociales",
    "Bases Curriculares de Matemática",
    "Bases Curriculares de Lenguaje y Comunicación",
    "Práctica V"
  ],
  "VI Semestre": [
    "Gestión del Trabajo Colaborativo Interdisciplinario",
    "Familia y Comunidad",
    "Evaluación de las Funciones Cognitivas",
    "Evaluación de las Habilidades Matemáticas",
    "Evaluación de las Habilidades de Lectura y Escritura",
    "Formación Integral",
    "Formación Integral"
  ],
  "VII Semestre": [
    "Investigación Educacional",
    "Gestión Educacional y Liderazgo Escolar",
    "Intervención Psicopedagógica para el Desarrollo de las Funciones Cognitivas",
    "Intervención Psicopedagógica para el Aprendizaje Matemático",
    "Intervención Psicopedagógica para el Aprendizaje de la Lectura y Escritura",
    "Práctica VI"
  ],
  "VIII Semestre": [
    "Proyecto de Grado",
    "Orientación, Educación y Convivencia Escolar",
    "Ética y Autocuidado Personal",
    "Intervención Psicopedagógica para las Dificultades Atencionales y Conductuales",
    "Intervención Psicopedagógica para las Dificultades del Espectro Autista",
    "Práctica VII"
  ],
  "IX Semestre": [
    "Actividad de Titulación I",
    "Electivo I",
    "Electivo II",
    "Práctica Profesional I"
  ],
  "X Semestre": [
    "Actividad de Titulación II",
    "Electivo III",
    "Electivo IV",
    "Práctica Profesional II"
  ]
};

// Aquí defines las relaciones de prerrequisitos usando los mismos IDs que generas en crearMalla
const prerequisitos = [
  { from: "ramo-I_Semestre-Sociología_Educacional_con_enfoque_de_género", to: "ramo-II_Semestre-Sociedad,_Cultura_y_Educación" },
  { from: "ramo-II_Semestre-Sociedad,_Cultura_y_Educación", to: "ramo-III_Semestre-Currículum_Educacional" },
  // Agrega aquí las demás relaciones de prerrequisitos que necesites
];

function crearMalla() {
  const contenedor = document.getElementById("malla");
  let total = 0, aprobados = 0;

  for (const [semestre, ramos] of Object.entries(malla)) {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;

    const boton = document.createElement("button");
    boton.textContent = "✓ Marcar semestre";

    const grid = document.createElement("div");
    grid.className = "grid";

    boton.onclick = () => marcarSemestre(grid);

    header.appendChild(titulo);
    header.appendChild(boton);
    semDiv.appendChild(header);

    for (const ramo of ramos) {
      const id = `ramo-${semestre}-${ramo}`.replace(/\s+/g, "_");
      const asignatura = document.createElement("div");
      asignatura.className = "asignatura";
      asignatura.textContent = ramo;
      asignatura.id = id;

      // Estilo base (morado claro)
      asignatura.style.backgroundColor = "#db88fd";
      asignatura.style.color = "#fff";

      total++;

      if (localStorage.getItem(id) === "aprobado") {
        asignatura.classList.add("aprobada");
        asignatura.style.backgroundColor = "#c8e6c9";
        asignatura.style.color = "#1b5e20";
        aprobados++;
      }

      asignatura.onclick = () => {
        if (asignatura.classList.contains("aprobada")) {
          asignatura.classList.remove("aprobada");
          asignatura.style.backgroundColor = "#db88fd";
          asignatura.style.color = "#fff";
          localStorage.removeItem(id);
          aprobados--;
        } else {
          asignatura.classList.add("aprobada");
          asignatura.style.backgroundColor = "#c8e6c9";
          asignatura.style.color = "#1b5e20";
          localStorage.setItem(id, "aprobado");
          aprobados++;
        }
        actualizarProgreso(total, aprobados);
      };

      grid.appendChild(asignatura);
    }

    semDiv.appendChild(grid);
    contenedor.appendChild(semDiv);
  }

  actualizarProgreso(total, aprobados);
}

function actualizarProgreso(total, aprobados) {
  const porcentaje = Math.round((aprobados / total) * 100);
  const barra = document.getElementById("progreso");
  barra.textContent = `${porcentaje}% completado (${aprobados}/${total})`;
}

function marcarSemestre(grid) {
  const asignaturas = grid.querySelectorAll(".asignatura");
  const todasAprobadas = [...asignaturas].every(a => a.classList.contains("aprobada"));

  asignaturas.forEach(a => {
    const id = `ramo-${a.parentElement.previousSibling.textContent}-${a.textContent}`.replace(/\s+/g, "_");
    if (todasAprobadas) {
      a.classList.remove("aprobada");
      a.style.backgroundColor = "#db88fd";
      a.style.color = "#fff";
      localStorage.removeItem(id);
    } else {
      a.classList.add("aprobada");
      a.style.backgroundColor = "#c8e6c9";
      a.style.color = "#1b5e20";
      localStorage.setItem(id, "aprobado");
    }
  });

  const total = document.querySelectorAll(".asignatura").length;
  const aprobados = document.querySelectorAll(".asignatura.aprobada").length;
  actualizarProgreso(total, aprobados);
}

function dibujarFlechas() {
  // Quitar SVG si existe para refrescar
  let svg = document.getElementById("svg-flechas");
  if (svg) svg.remove();

  // Crear SVG
  svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", "svg-flechas");
  svg.style.position = "absolute";
  svg.style.top = "0";
  svg.style.left = "0";
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.pointerEvents = "none"; // para que no interfiera con clicks
  svg.style.zIndex = "0";

  // Insertar svg antes del contenedor de malla para que quede debajo
  const contenedor = document.getElementById("malla");
  contenedor.style.position = "relative";
  contenedor.parentElement.insertBefore(svg, contenedor);

  prerequisitos.forEach(({ from, to }) => {
    const elemFrom = document.getElementById(from);
    const elemTo = document.getElementById(to);
    if (!elemFrom || !elemTo) return;

    const contenedorRect = contenedor.getBoundingClientRect();
    const fromRect = elemFrom.getBoundingClientRect();
    const toRect = elemTo.getBoundingClientRect();

    const startX = fromRect.right - contenedorRect.left;
    const startY = fromRect.top + fromRect.height / 2 - contenedorRect.top;
    const endX = toRect.left - contenedorRect.left;
    const endY = toRect.top + toRect.height / 2 - contenedorRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    line.setAttribute("stroke", "#6a0dad");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrowhead)");

    svg.appendChild(line);
  });

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "10");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("fill", "#6a0dad");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M0,0 L10,3.5 L0,7 Z");

  marker.appendChild(path);
  defs.appendChild(marker);
  svg.appendChild(defs);
}

window.onload = () => {
  crearMalla();
  setTimeout(dibujarFlechas, 100);
};
