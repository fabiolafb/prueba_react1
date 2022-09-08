import React, { useState, useEffect } from "react";
import moment from "moment";
moment.locale('es')

 
const MiApi = () => {
    const [listaFeriados, setListaFeriados] = useState([])
    // Asignar estado búsqueda
    const [buscando, setBuscando] = useState("")
    // Asignar estado filtro
    const [filtradoFeriados, setFiltradoFeriados] = useState();

    //Usar hook useEffect
    useEffect(() => {
    obtenerFeriados();
     }, []);
    
     //Función que consulta la API
    const obtenerFeriados = async () => {
       const url = 'https://api.victorsanmartin.com/feriados/en.json';
       const response = await fetch(url)
       const {data} = await response.json()
       //console.log(data)
       setListaFeriados(data).reverse();
    }
   
    const capturaExtraFeriados = function(e) {
      const opcion = e.target.value;
      setFiltradoFeriados(opcion).reverse();
   }

    
     return (
      <>
        <main>
          {/* Seccion filtrado */}
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
              <option value={-1}> <i>Mes del año</i> </option>
              <option value="Enero">Enero</option>
              <option value="Febrero">Febrero</option>
              <option value="Marzo">Marzo</option>
              <option value="Abril">Abril</option>
              <option value="Mayo">Mayo</option>
              <option value="Junio">Junio</option>
              <option value="Julio">Julio</option>
              <option value="Agosto">Agosto</option>
              <option value="Septiembre">Septiembre</option>
              <option value="Octubre">Octubre</option>
              <option value="Noviembre">Noviembre</option>
              <option value="Diciembre">Diciembre</option>
            </select>

            <select className="buscador_input" id="extra" onClick={capturaExtraFeriados}>
              <option value={-1}>Tipo de feriado</option>
              <option value="Civil">Civil</option>
              <option value="Religioso">Religioso</option>
              <option value="Irrenunciable">Irrenunciable</option>
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
          };
          
          }).map(f => 
          <div className="card" key={f} >
            <div className="col p-1"  >
              <h5 className="card-title"><b>{f.title}</b> </h5>
              <h5 className="card-subtitle mb-1" id="fecha"> Fecha: {f.date}</h5>
              <p className="card-text" >Tipo de feriado: <b>{f.extra}</b> </p>
            </div>
          </div>
          )}
          {}
        </section>
      </>
    )
 
}

export default MiApi