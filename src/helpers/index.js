export function generarId() {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

export function formatearFecha(fecha) {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return fechaNueva.toLocaleString("es-ES", opciones);
}
