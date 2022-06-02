function Header(props) {
  const { isAdmin, numero, nombre } = props;

  console.log("isAdmin", isAdmin);
  return (
    <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
      Seguimiento Pacientes {""} con Github {""}
      <span className="text-indigo-600">Veterinaria</span>
    </h1>
  );
}

export default Header;
