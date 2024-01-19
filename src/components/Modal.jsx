import { useEffect, useState } from "react";
import IconoCerrar from "../img/cerrar.svg";
import Mensaje from "./Mensaje";
import { generarId } from "../helpers";

function Modal({
  setModal,
  animarModal,
  setAnimarModal,
  setGastos,
  gastos,
  gastoEditar,
  setGastoEditar,
}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    if (gastoEditar) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setKey(gastoEditar.key);
    }
  }, []);

  const cerrarModal = () => {
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
      setGastoEditar(null);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son requeridos");
      return;
    }

    if (gastoEditar) {
      const newGasto = { nombre, cantidad, categoria, key };
      const newGastos = gastos.map((g) =>
        g.key == newGasto.key ? { ...newGasto, fecha: g.fecha } : g
      );
      setGastos(newGastos);
    } else {
      setGastos([
        ...gastos,
        { key: generarId(), nombre, cantidad, categoria, fecha: Date.now() },
      ]);
    }

    cerrarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={IconoCerrar} onClick={cerrarModal} />
      </div>
      <form
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>Nuevo gasto</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="casa">Casa</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="hidden" value={key} />

        <input
          type="submit"
          value={`${gastoEditar ? "Editar" : "Añadir"} gasto`}
        />
      </form>
    </div>
  );
}

export default Modal;
