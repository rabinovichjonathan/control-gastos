import { object } from 'prop-types'
import { useState, useEffect } from 'react'
import Header from './componentes/Header'
import ListadoGastos from './componentes/ListadoGastos'
import Modal from './componentes/Modal'
import Filtros from './componentes/Filtros'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
 const[presupuesto, setPresupuesto] = useState(
   Number(localStorage.getItem('presupuesto')) ?? 0
 )
 const[isValidPresupuesto, setIsValidPresupuesto] = useState(false);
 const[modal, setModal] = useState(false);
 const[animarModal, setAnimarModal] = useState(false);
 const[gastos, setGastos] = useState(
   localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
 )
 const[gastoEditar, setGastoEditar] = useState({})
 const[filtro, setFiltro] = useState('')
 const[gastosFiltrados, setgastosFiltrados] = useState([])

 useEffect(() =>{
  if(Object.keys(gastoEditar).length > 0){
    setModal(true);
    setTimeout(()=>{
     setAnimarModal(true)
    },500)
  }
 
 }, [gastoEditar])

 useEffect(() => {
  localStorage.setItem('presupuesto', presupuesto ?? 0)
 }, [presupuesto])

 useEffect(() => {
  localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
 }, [gastos])

 useEffect(() => {
  if(filtro){
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setgastosFiltrados(gastosFiltrados)
  }
 }, [filtro])

 useEffect(() => {
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
  if(presupuestoLS > 0){
    setIsValidPresupuesto(true)
  }
 },[])
 const handleNuevoGasto = ()=> {
   setModal(true);
   setGastoEditar({})
   setTimeout(()=>{
    setAnimarModal(true)
   },500)
 }

 const guardarGasto = gasto => {
  if(gasto.id){
    const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados)
    
  }else{
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto])
  }
  
   
 }

 const eliminarGasto = (id) =>{
   const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
   setGastos(gastosActualizados);
 }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        gastos = {gastos}
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto ={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
         <main>
            <Filtros 
              filtro = {filtro}
              setFiltro = {setFiltro}
            />
            <ListadoGastos 
              gastos = {gastos}
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro = {filtro}
              gastosFiltrados = {gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>   
      )}
      {modal && <Modal setModal={setModal} setAnimarModal={setAnimarModal} animarModal = {animarModal} guardarGasto = {guardarGasto} gastoEditar = {gastoEditar} setGastoEditar = {setGastoEditar}/>}  
    </div>
  )
}

export default App
