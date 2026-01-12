import { useState } from "react";

const ListRender = () => {
  const [list] = useState(["Mathias", "Julia", "Allan", "Monique", "Gustavo"]);

  const [users, setUsers] = useState([
    {id: 1, name: "Mathias", age: 23},
    {id: 2, name: "Joana", age: 27},
    {id: 3, name: "Monique", age: 34},
    {id: 4, name: "Allan", age: 22},
  ])

  const deleteRandom = () =>{ //Função para deletar users aleatório
    const randomNumber = Math.floor(Math.random() * 5)

    setUsers((prevUsers) => {
      return prevUsers.filter((users) => randomNumber !== users.id)
    })
  }

  return (
    <div>
      <ul>
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <ul>
        {users.map((users) => (
            <li key={users.id}>
                {users.name} - {users.age}
            </li>
        ))}
          
      </ul>
      <button onClick={deleteRandom}>Delete random user</button>
    </div>
  );
};

export default ListRender;
