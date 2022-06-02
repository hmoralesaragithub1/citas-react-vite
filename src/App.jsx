import { useState, useEffect } from "react";
import logo from "./logo.svg";

import Header from "./components/Header";
import Form from "./components/Form";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [];
    setPacientes(pacientesLS);
  }, []);

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const eliminarPaciente = (id) => {
    const pacientesConEliminacion = pacientes.filter((p) => p.id !== id);
    setPacientes(pacientesConEliminacion);
  };

  return (
    <div className="container mx-auto mt-20 ml-20">
      <Header isAdmin={false} numero={2} nombre="Mi header" />
      <div className="mt-12 md:flex">
        <Form
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  );
}

export default App;
