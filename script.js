const malla = {
  "1° Semestre": [
    "Competencias Comunicativas (FIP)",
    "Sociedad, Cultura y Educación",
    "Tecnologías para el Aprendizaje",
    "Cognición y Lenguaje",
    "Atención Temprana y Psicomotricidad",
    "Formación Integral en Actividades Extraprogramáticas"
  ],
  "2° Semestre": [
    "Sociología Educacional con Enfoque de Género",
    "Filosofía Educacional",
    "Psicología Educacional",
    "Familia y Comunidad",
    "Inglés Comunicacional I (FIP)",
    "Formación Integral Oferta Institucional"
  ],
  "3° Semestre": [
    "Bases Curriculares de Historia, Geografía y Ciencias Sociales",
    "Currículum Educacional",
    "Didáctica General",
    "Evaluación para el Aprendizaje",
    "Tecnologías para la Inclusión",
    "Inglés Comunicacional II (FIP)"
  ],
  "4° Semestre": [
    "Diversidad Educativa I",
    "Intervención Psicopedagógica para el Desarrollo de Funciones Cognitivas",
    "Evaluación de las Funciones Cognitivas",
    "Práctica I: Exploración del Sistema Educativo",
    "Formación Integral Oferta Institucional",
    "Ética y Autocuidado Profesional"
  ],
  "5° Semestre": [
    "Diversidad Educativa II",
    "Psicología del Desarrollo Socioemocional",
    "Trayectorias Evolutivas Diversas",
    "Evaluación de Habilidades Matemáticas",
    "Práctica II: Diversidad y Contextos Educativos",
    "Inglés Comunicacional III (FIP)"
  ],
  "6° Semestre": [
    "Bases Curriculares de Ciencias Naturales",
    "Intervención Psicopedagógica para el Aprendizaje Matemático",
    "Bases Curriculares de Lenguaje y Comunicación",
    "Evaluación de las Habilidades de Lectura y Escritura",
    "Práctica III: Diversidad y Educación Especial",
    "Inglés Comunicacional IV (FIP)"
  ],
  "7° Semestre": [
    "Gestión Educacional y Liderazgo Escolar",
    "Bases Curriculares de Matemática",
    "Evaluación Psicopedagógica",
    "Práctica IV: Diversidad y Desarrollo Socioemocional",
    "Intervención Psicopedagógica para el Aprendizaje de la Lectura y Escritura",
    "Electivo I"
  ],
  "8° Semestre": [
    "Intervención Psicopedagógica para las Dificultades Atencionales y Conductuales",
    "Práctica V: Diseño y Apoyos Curriculares Inclusivos",
    "Electivo II",
    "Electivo III",
    "Electivo IV",
    "Actividad de Titulación I"
  ],
  "9° Semestre": [
    "Práctica Profesional I",
    "Práctica Nivel Inicial",
    "Práctica Nivel Intermedio",
    "Intervención Psicopedagógica para las Dificultades del Espectro Autista",
    "Actividad de Titulación II"
  ],
  "10° Semestre": [
    "Práctica Profesional II",
    "Práctica Nivel Avanzado",
    "Proyecto de Grado - Investigación Educacional",
    "Gestión del Trabajo Colaborativo Interdisciplinario",
    "Políticas de Inclusión y Enfoque de Derecho",
    "Orientación, Educación y Convivencia Escolar"
  ]
};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  for (const [semestre, ramos] of Object.entries(malla)) {
    const id = semestre.replace(/[^\w]/g, '_');

    const semestreDiv = document.createElement("div");
    semestreDiv.className = "semestre";
    semestreDiv.id = id;

    const header = document.createElement("div");
    header.className = "semestre-header";
    header.innerHTML = `<h2>${semestre}</h2><button onclick="marcarSemestre('${id}')">Marcar como listo</button>`;
    semestreDiv.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";

    for (const ramo of ramos) {
      const asignatura = document.createElement("div");
      asignatura.className = "asignatura";
      asignatura.textContent = ramo;
      asignatura.onclick = () => mostrarInfo(ramo);
      grid.appendChild(asignatura);
    }

    semestreDiv.appendChild(grid);
    contenedor.appendChild(semestreDiv);
  }

  // Restaurar estados guardados
  document.querySelectorAll(".semestre").forEach(sem => {
    const id = sem.id;
    if (localStorage.getItem(id) === 'listo') {
      sem.classList.add("listo");
    }
  });
}

function mostrarInfo(nombre) {
  const box = document.getElementById("info-box");
  box.innerHTML = `<h2>${nombre}</h2>`;
  box.classList.remove("oculto");
}

function marcarSemestre(id) {
  const sem = document.getElementById(id);
  const yaListo = sem.classList.contains('listo');
  if (yaListo) {
    sem.classList.remove('listo');
    localStorage.removeItem(id);
  } else {
    sem.classList.add('listo');
    localStorage.setItem(id, 'listo');
  }
}

window.onload = crearMalla;
