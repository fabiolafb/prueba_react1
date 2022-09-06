import React, { useState, useEffect } from "react";
// import bandera from '../src/assets/img/bandera_3v.jpg';
//import moment from "moment";
 
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
            <h3 className="titulo">Buscador de feriado</h3>
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
          <div className="buscador_div">  
            <h3 className="titulo">Filtrar feriado</h3>
            <select className="buscador_input" id="date" >
                    <option value=""> <i>Mes del año</i> </option>
                    <option value="">Enero</option>
                    <option value="">Febrero</option>
                    <option value="">Marzo</option>
                    <option value="">Abril</option>
                    <option value="">Mayo</option>
                    <option value="">Junio</option>
                    <option value="">Julio</option>
                    <option value="">Agosto</option>
                    <option value="">Septiembre</option>
                    <option value="">Octubre</option>
                    <option value="">Noviembre</option>
                    <option value="">Diciembre</option>
            </select>
            <select className="buscador_input" id="extra" >
                    <option value=""><i>Tipo de feriado</i> </option>
                    <option value="">Civil</option>
                    <option value="">Religioso</option>
                    <option value="">Irrenunciable</option>
             </select>
          </div>
        </main>

        {/* Seccion cards */}
        <section>
            {listaFeriados.filter((lista) => {
          if (buscando === "") {
            return lista;
          } else if (lista.title.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ||
            lista.date.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ||
            lista.extra.toLocaleLowerCase().includes(buscando.toLocaleLowerCase()) ) {
            return lista;
          }
          }).map(f => 
          <div className="card" key={f} >
            <div className="col p-1"  >
              <h5 className="card-title"><b>{f.title}</b> </h5>
              <h5 className="card-subtitle mb-1 "> Fecha: {f.date} </h5>
              <p className="card-text">Tipo de feriado: <b>{f.extra}</b> </p>
            </div>
          </div>
          )}
        </section>

        
    </>
     )
 
}

export default MiApi