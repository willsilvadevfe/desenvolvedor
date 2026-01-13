const ButtonTwo = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          alert("Second button active!");
        }}
      >
        {props.name}
      </button>
    </div>
  );
};

export default ButtonTwo;
