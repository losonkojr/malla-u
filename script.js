function mostrarInfo(nombre, requisitos, creditos) {
  const box = document.getElementById("info-box");
  box.innerHTML = `
    <h2>${nombre}</h2>
    <p><strong>Requisitos:</strong> ${requisitos}</p>
    <p><strong>Créditos:</strong> ${creditos}</p>
  `;
  box.classList.remove("oculto");
}
