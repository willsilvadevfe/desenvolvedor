import MyComponent from "./MyComponent";

const TemplateExpressions = () => {
  const data = {
    name: "Willian",
    age: 32,
    work: "Auditor",
    country: "Brasil",
  };

  return (
    <div>
      <p>Olá seja bem-vindo, {data.name}</p>
      <p>Você tem {data.age} anos de idade</p>
      <p>Sua função no mercado de trabalho é {data.work}</p>
      <p>Você mora no {data.country}</p>
      <MyComponent />
    </div>
  );
};

export default TemplateExpressions;
