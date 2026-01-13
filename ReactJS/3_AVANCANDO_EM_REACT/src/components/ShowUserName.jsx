
const ShowUserName = (props) => {
  return (
    <div>
        <h3>Props</h3>
        <p>Seu nome é: {props.name} </p>
    </div>
  )
}

export default ShowUserName


// Props extrai o valor do elemento pai para o filho 
// Nome diretamente no elemento, variavel ou useState declarados no App.jsx
// Em ShowUserName.jsx declaramos com o props > const ShowUserName = (props)