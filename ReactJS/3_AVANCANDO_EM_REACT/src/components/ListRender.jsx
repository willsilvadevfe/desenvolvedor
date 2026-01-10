import { useState } from "react";

const ListRender = () => {
  const [list] = useState(["Mathias", "Julia", "Allan", "Monique", "Gustavo"]);

  const [users] = useState([
    {id: 21, name: "Mathias", age: 23},
    {id: 1231, name: "Joana", age: 27},
    {id: 4566, name: "Monique", age: 34},
    {id: 45, name: "Allan", age: 22},
  ])

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
    </div>
  );
};

export default ListRender;
