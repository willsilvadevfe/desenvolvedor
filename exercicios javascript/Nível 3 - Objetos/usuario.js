const user = [
  {
    name: "Willian",
    age: 33,
    email: "wsilva@teste.com",
    job: "Programmer",
  },

  {
    name: "John",
    age: 32,
    email: "Johhn@teste.com",
    job: "Full Stack Developer",
  },
  {
    name: "Mark",
    age: 45,
    email: "Marks@teste.com",
    job: "Back End Developer",
  },
];

function showUser(name) {
  const findUser = user.find((user) => user.name === name);

  if (findUser) {
    console.log("Name:", findUser.name);
    console.log("Age:", findUser.age);
    console.log("Job:", findUser.job);
  } else {
    console.log("User not found");
  }
}

showUser("John");
