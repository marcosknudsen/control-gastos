import Gasto from "./Gasto";

function ListadoGastos({ gastos, setGastoEditar, eliminarGasto, filtro }) {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>
      {gastos
        .filter((g) => filtro == "" || filtro == g.categoria)
        .map((gasto) => (
          <Gasto
            key={gasto.key}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        ))}
    </div>
  );
}

export default ListadoGastos;
