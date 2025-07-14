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
    "Práctica final"
  ]
};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  for (const [semestre, ramos] of Object.entries(malla)) {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    semDiv.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid";

    for (const ramo of ramos) {
      const id = `ramo-${semestre}-${ramo}`.replace(/\s+/g, "_");

      const asignatura = document.createElement("div");
      asignatura.className = "asignatura";
      asignatura.textContent = ramo;

      // Estado guardado
      if (localStorage.getItem(id) === "aprobado") {
        asignatura.classList.add("aprobada");
      }

      asignatura.onclick = () => {
        if (asignatura.classList.contains("aprobada")) {
          asignatura.classList.remove("aprobada");
          localStorage.removeItem(id);
        } else {
          asignatura.classList.add("aprobada");
          localStorage.setItem(id, "aprobado");
        }
      };

      grid.appendChild(asignatura);
    }

    semDiv.appendChild(grid);
    contenedor.appendChild(semDiv);
  }
}

window.onload = crearMalla;
