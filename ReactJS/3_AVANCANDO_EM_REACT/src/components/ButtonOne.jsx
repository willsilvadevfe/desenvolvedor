
const ButtonOne = (props) => {
  return (
    <div>
        <button onClick={() => (alert('First button active!'))}>{props.name}</button>
    </div>
  )
}

export default ButtonOne