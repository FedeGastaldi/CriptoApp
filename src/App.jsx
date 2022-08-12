import { useState , useEffect } from 'react'
import styled from '@emotion/styled'
import imagenCripto from "./img/imagen-criptos.png" //PARA IMPORTAR LA IMAGEN DESDE LA CARPETA AL APP.JSX   
import Formulario from './componentes/Formulario'
import Resultado from './componentes/Resultado'

// EN STYLED COMPONENTS, LOS COMPONENTES COMIENZAS EN MAYUSCULAS SIEMPRE.
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto; //PARA CENTRARLO
  width: 90%; //PARA QUE NO TOME LA PANTALA COMPLETA
  @media (min-width: 992px) { // STYLED COMPONENTS SOPORTA MEDIAQUERIES
    display: grid;
    grid-template-columns: repeat(2, 1fr); //CREAMOS DOS COLUMNAS
    column-gap: 2rem;
  }


`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
  
`

const Heading = styled.h1 ` 
  font-family: "Lato", sans-serif;
  color: #FFF; 
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after { //PARA CREAR ESA LINEA ABAJO DEL HEADING
      content: '';
      width: 500px;
      height: 6px;
      background-color: #66A2FE;
      display: block;
      margin: 10px auto 0 auto;
  }

`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const cotizarCripto = async() => {
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` //INYECTAMOS LAS MONEDAS Y CRIPTOS EN LA URL

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

      }
      cotizarCripto()
    }
  }, [monedas])
  

  return (
    <Contenedor> 
      <Imagen
        src= {imagenCripto}
        alt = "imagenes criptomonedas"
      />
      <div>
          <Heading>Ingresa una moneda para cotizarla a Criptomoneda</Heading>
          <Formulario
            setMonedas = {setMonedas}
          />
          {resultado.PRICE && <Resultado resultado={resultado}/>} 
      </div>

    </Contenedor>
  )
}

export default App
