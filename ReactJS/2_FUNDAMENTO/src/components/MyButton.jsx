const MyButton = () => {
  const MyFirstButton = () => {
    alert("Você clicou");
    console.log("Você clicou no botão");
  };

  const renderSomething = (x) => {
    if (x) {
      return <h1>Renderizando isso...</h1>;
    } else {
      return <h1>Posso renderizar isso tambem...</h1>;
    }
  };

  return (
    <div>
      <div>
        <button onClick={MyFirstButton}>Clique aqui!</button>
      </div>
      <div>
        <button onClick={() => alert("Você clicou aqui novamente")}>
          Clique aqui novamente
        </button>
      </div>
      {renderSomething(true)}
      {renderSomething(false)}
    </div>
  );
};

export default MyButton;
