import { useState } from "react";

const ManageData = () => {
    const [userData, setUserData] = useState(0)
    const data = [
        {
            nome: 'Willian',
            idade: 32,
            nacionalidade: 'Brasileiro',
            sexo: 'Masculino'
        },
        {
            nome: 'Mathias',
            idade: 18,
            nacionalidade: 'Espanhol',
            sexo: 'Masculino'
        },
        {
            nome: 'Joana',
            idade: 27,
            nacionalidade: 'Chilena',
            sexo: 'Feminino'
        }
    ]




  return <div>
        <h3>Dados de usuarios</h3>
        <p>Nome: {data[userData].nome}</p>
        <p>Idade: {data[userData].idade}</p>
        <p>Nacionalidade: {data[userData].nacionalidade}</p>
        <p>Sexo: {data[userData].sexo}</p>
        <button onClick={() => setUserData(userData + 1)}>Próximo usuario</button>
        <button onClick={() => setUserData(userData - 1)}>Usuario anterior</button>
  </div>;
};

export default ManageData;
