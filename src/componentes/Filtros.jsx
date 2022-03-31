import { useState, useEffect } from 'react'



function Filtros({filtro, setFiltro}) {
 

  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select
                    value = {filtro}
                    onChange = {e => setFiltro(e.target.value)}
                >
                    <option value="">--Todas las categorías--</option>
                    <option value="comida">Comida</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="casa">Gastos de la casa(expensas, abl, etc)</option>
                    <option value="gastos">gastos</option>
                    <option value="ocio">ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div> 
        </form>
    </div>
  )
}

export default Filtros