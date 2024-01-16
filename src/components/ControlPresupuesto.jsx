import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const formatPresupuesto = (c) => {
  return c.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const ControlPresupuesto = ({ presupuesto,setPresupuesto, gastos,setGastos,setIsValidPresupuesto}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastos = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    setGastado(totalGastos);
    setDisponible(presupuesto - totalGastos);
  }, [gastos]);

  const handleResetApp=()=>{
    const resultado=confirm("Deseas reiniciar presupuestos y gastos?")
  
    if (resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        value={(gastado / presupuesto) * 100}
        text={`${((gastado / presupuesto) * 100).toFixed(2)}%`}
        styles={buildStyles({
          pathColor: gastado > presupuesto ? "#DC2626" : "#3B82F6",
          trailColor: "#F5F5F5",
          textColor: gastado > presupuesto ? "#DC2626" : "#3B82F6",
        })}
      />
      <div className="contenido-presupuesto">
        <button
          className="reset-app"
          type="button"
          onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatPresupuesto(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {formatPresupuesto(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatPresupuesto(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
