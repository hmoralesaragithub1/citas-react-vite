import { useState, useEffect } from "react";
import Error from "./Error";
import ErrorChildren from "./ErrorChildren";

const Form = (props) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false);

  const { pacientes, setPacientes, paciente } = props;

  /*solo volvera a renderizar este componente si lo que ponemos en useEffect cambio
  es decir cada vez que paciente cambie*/
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  useEffect(() => {
    console.log("nuevo paciente");
  }, [pacientes]);

  /** tambien sino ponemos nada en dependencias solo se ejecuta cuando el componente esta listo*/
  useEffect(() => {
    console.log("Componente Form Listo");
  }, []);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      setError(true);
    } else {
      setError(false);

      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,
      };

      if (paciente.id) {
        objetoPaciente.id = paciente.id;

        const pacientesActualizado = pacientes.map((p) =>
          p.id === paciente.id ? objetoPaciente : p
        );

        setPacientes(pacientesActualizado);
        setPacientes({});
      } else {
        objetoPaciente.id = generarId();
        /* esta es la forma, genero un nuevo arreglo y se asigna automaticamente
       con setPacientes al arreglo pacientes*/
        setPacientes([...pacientes, objetoPaciente]);
      }

      /*nunca hacer esto*/
      //pacientes.push(objetoPaciente);

      /*limpiamos el form*/
      setNombre("");
      setPropietario("");
      setEmail("");
      setFecha("");
      setSintomas("");
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento de pacientes
      </h2>

      <p className="text-xl mt-5 text-center mb-10">
        Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error mensaje="Todos los campos deben ser llenados" />}

        {/*Cuando queremos pasar bastante codigo html es mejor usar children en
        lugar de props*/}

        {/* error && (
          <ErrorChildren>
            <p>Todos los campos deben ser llenados</p>
          </ErrorChildren>
        ) */}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre mascota {nombre}
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(word) => {
              console.log("nombre", word.target.value);
              setNombre(word.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => {
              setPropietario(e.target.value);
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha de alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            rows="3"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full cursor-pointer p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Form;
