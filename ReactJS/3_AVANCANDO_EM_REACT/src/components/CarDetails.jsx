
const CarDetails = ({brand, km, color, year, newCar}) => {
  return (
    <div>
        <h3>Car Details</h3>
        <ul>
            <li><i>Marca:</i> {brand}</li>
            <li><i>KM:</i> {km}</li>
            <li><i>Cor:</i> {color}</li>
            <li><i>Ano:</i> {year}</li>
        </ul>
        {newCar && <p>Este carro é novo!</p> }
    </div>
  )
}

export default CarDetails