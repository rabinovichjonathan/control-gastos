import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"



function ControlPresupuesto({gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto}) {
    const[porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


   useEffect(() => {
        const totalGastado = gastos.reduce ((total, gasto) => gasto.cantidad + total, 0)
        setGastado(totalGastado)

        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible)

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
            
   }, [gastos])
   
   
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS'
        })
       
        
        
    }
    const handleReset = () =>{
        const resultado = confirm('¿Desea realmente reiniciar la app?')
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
           <CircularProgressbar
               styles = {buildStyles({
                    pathColor : porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    trailColor :'#F5F5F5F5'
               

               })}
               value = {porcentaje}
               text = {`${porcentaje} % gastado` }
           />
              
           
           
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app'
                type='button'
                onClick={handleReset}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
        
        
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
       
        
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>    
        
    </div>
        
   
  )
}

export default ControlPresupuesto