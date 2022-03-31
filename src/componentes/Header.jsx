import { useState } from 'react'
import NuevoFomulario from './NuevoFormulario'
import ControlPresupuesto from './ControlPresupuesto'


function Header({presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) {
 

  return (
    <header>
        <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
           <ControlPresupuesto
            gastos = {gastos} 
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setGastos = {setGastos}
            setIsValidPresupuesto = {setIsValidPresupuesto}
          />
        ) : (
          <NuevoFomulario 
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            setIsValidPresupuesto = {setIsValidPresupuesto}
          /> 
        )}
        
    </header>    
  )
}

export default Header