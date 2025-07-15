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

function colorPorAsignatura(nombre) {
  const n = nombre.toLowerCase();
  if (n.includes("inglés")) return "#f9c89f"; // Inglés 🧡
  if (n.includes("integral") || n.includes("ética") || n.includes("familia")) return "#c3e8c2"; // Formación Integral 💚
  if (n.includes("práctica") || n.includes("nivel") || n.includes("evaluación de las funciones")) return "#f5e69d"; // Prácticas 💛
  if (n.includes("electivo") || n.includes("proyecto") || n.includes("titulación")) return "#f7a8a8"; // Titulación ❤️
  if (
    n.includes("diversidad") || n.includes("intervención") || n.includes("cognición") ||
    n.includes("trayectorias") || n.includes("atención") || n.includes("autista")
  ) return "#9dcff1"; // Especialidad 🔵
  return "#c7b3e5"; // Pedagógica-Profesional 💜
}

function crearMalla() {
  const contenedor = document.getElementById("malla");
  let total = 0, aprobados = 0;
  const semestres = Object.entries(malla);

  for (let i = 0; i < semestres.length; i++) {
    const [semestre, ramos] = semestres[i];
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;

    const grid = document.createElement("div");
    grid.className = "grid";

    header.appendChild(titulo);

    let desbloqueado = i === 0 || semestreDesbloqueado(semestres[i - 1][0], semestres[i - 1][1]);

    if (desbloqueado) {
      const boton = document.createElement("button");
      boton.textContent = "✓ Marcar semestre";
      boton.onclick = (e) => {
        const grid = e.target.closest(".semestre").querySelector(".grid");
        marcarSemestre(grid);
      };
      header.appendChild(boton);
    }

    semDiv.appendChild(header);

    for (const ramo of ramos) {
      const id = `ramo-${semestre}-${ramo}`.replace(/\s+/g, "_");
      const asignatura = document.createElement("div");
      asignatura.className = "asignatura";
      asignatura.textContent = ramo;

      total++;

      if (desbloqueado) {
        const color = colorPorAsignatura(ramo);
        asignatura.style.backgroundColor = color;
        asignatura.style.color = "#000";

        if (localStorage.getItem(id) === "aprobado") {
          asignatura.classList.add("aprobada");
          asignatura.style.backgroundColor = "#c8e6c9";
          asignatura.style.color = "#1b5e20";
          aprobados++;
        }

        asignatura.onclick = () => {
          if (asignatura.classList.contains("aprobada")) {
            asignatura.classList.remove("aprobada");
            asignatura.style.backgroundColor = color;
            asignatura.style.color = "#000";
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
      } else {
        asignatura.style.backgroundColor = "#ccc";
        asignatura.style.color = "#666";
        asignatura.style.cursor = "not-allowed";
      }

      grid.appendChild(asignatura);
    }

    semDiv.appendChild(grid);
    contenedor.appendChild(semDiv);
  }

  actualizarProgreso(total, aprobados);
}

function semestreDesbloqueado(nombreAnterior, ramos) {
  return ramos.every(ramo => {
    const id = `ramo-${nombreAnterior}-${ramo}`.replace(/\s+/g, "_");
    return localStorage.getItem(id) === "aprobado";
  });
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
    const color = colorPorAsignatura(a.textContent);
    if (todasAprobadas) {
      a.classList.remove("aprobada");
      a.style.backgroundColor = color;
      a.style.color = "#000";
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
  location.reload();
}

window.onload = crearMalla;
