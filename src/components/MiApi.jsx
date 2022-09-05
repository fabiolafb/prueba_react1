import React, { useState, useEffect } from "react";
// import bandera from '../src/assets/img/bandera_3v.jpg';
import moment from "moment";
 
const MiApi = () => {
    const [listaFeriados, setListaFeriados] = useState([])
    // Asignar estado búsqueda
    const [buscando, setBuscando] = useState("")

    //Usar hook useEffect
    useEffect(() => {
    obtenerFeriados();
     }, []);
    
     //Función que consulta la API
    const obtenerFeriados = async () => {
       const url = 'https://api.victorsanmartin.com/feriados/en.json';
       const response = await fetch(url)
       const {data} = await response.json()
       console.log(data)
       setListaFeriados(data).reverse();
    }
   
     return (
      <>
        <header>
           <h1> Feriados de Chile Año 2022</h1>
           {/* <img src={ bandera } alt="" />  */}
           {/* <img className="bandera" src={"public/bandera.png"} /> */}
        </header>
        <main>
          <div className="buscador_div">  
            <h4 className="titulo">Buscador de feriado</h4>
            <input      
              type="text"
              className="buscador_input"
              placeholder="Buscar feriado"
              value={buscando}
              onChange={(e) => {
                setBuscando(e.target.value)}
              }
            />
          </div>

          {/* Seccion cards */}
          <section>
            {listaFeriados.filter((lista) => {
          if (buscando === "") {
            return lista;
          } else if (lista.title.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ||
            lista.date.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ||
            lista.type.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ) {
            return lista;
          }
          }).map(f => 
          <div className="card" key={f} >
            <div className="col p-1"  >
              <h5 className="card-title"><b>{f.title}</b> </h5>
              <h5 className="card-subtitle mb-1 "> Fecha: {f.date} </h5>
              <p className="card-text">Tipo de feriado: <b>{f.type}</b> </p>
            </div>
          </div>
          )}
          </section>

        </main>
    </>
     )
 
}

export default MiApi