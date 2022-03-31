import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import BtnCerrar from '../img/cerrar.svg'



function Modal({setModal, setAnimarModal, animarModal, guardarGasto, gastoEditar, setGastoEditar}) {
    const[nombre, setNombre] = useState('')
    const[cantidad, setCantidad] = useState('')
    const[categoria, setCategoria] = useState('')
    const[mensaje, setMensaje] = useState('')
    const[id, setId] = useState('')
    const[fecha, setFecha] = useState('')
    
    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            
          }
    }, [])

    const ocultarModal = ()=>{
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(()=>{
            setModal(false)
        },500)
    }
    const handleSubmit = e =>{
        e.preventDefault()
        if([nombre, cantidad, categoria].includes('')){
           setMensaje('Todos los campos son obligatorios');
           setTimeout(() =>{
               setMensaje('')
           },3000)
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
        setAnimarModal(false)
        setTimeout(()=>{
            setModal(false)
        },500)
    } 

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img
              src={BtnCerrar}  
              alt='boton de cerrar'
              onClick={ocultarModal}  
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"} `}>
            <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
            <div className='campo'>
                <label htmlFor="nombre">Nombre gasto</label>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <input 
                    id="nombre"
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad gasto</label>
                <input 
                    id="cantidad"
                    type="number"
                    placeholder='Añade la cantidad del gasto'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />

            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                  <option value="">--Seleccione--</option>
                  <option value="comida">Comida</option>
                  <option value="ahorro">Ahorro</option>
                  <option value="casa">Gastos de la casa(expensas, abl, etc)</option>
                  <option value="gastos">gastos</option>
                  <option value="ocio">ocio</option>
                  <option value="salud">Salud</option>
                  <option value="suscripciones">Suscripciones</option>     
                </select>

            </div>
            <input 
                type="submit"
                value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'}
            />
        </form>
    </div>
        
   
  )
}

export default Modal