import React, { useState, useEffect } from "react";
import moment from "moment";
moment.locale("es");

const MiApi = () => {
  //Asigna estado para recibir datos del array
  const [listaFeriados, setListaFeriados] = useState([]);
  // Asignar estado para la búsqueda
  const [buscando, setBuscando] = useState("");
  // Asignar estado filtro
  const [filtradoFeriados, setFiltradoFeriados] = useState("");
  // Asignar estado par
  const [invertirFeriados, setInvertirFeriados] = useState("");

  //Usar el hook useEffect para modificar
  useEffect(() => {
    obtenerFeriados();
  }, []);

  //Función que llama a la API
  const obtenerFeriados = async () => {
    const url = "https://api.victorsanmartin.com/feriados/en.json";
    const response = await fetch(url); //recibe respuesta
    const { data } = await response.json(); //respuesta formateada como json
    //console.log(data)
    setListaFeriados(data);
  };

  return (
    <>
      <main>
        {/* Seccion filtrado */}
        <div className="buscador_div">
          <h4 className="titulo">Buscador de feriado</h4>
          <input
            type="text"
            className="buscador_input"
            placeholder="Buscar feriado"
            value={buscando}
            onChange={(e) => {
              setBuscando(e.target.value);
            }}
          />
        </div>
        <div className="buscador_div">
          <h4 className="titulo">Filtrar por tipo feriado</h4>
          <select
            className="buscador_input"
            id="type"
            onChange={(e) => setFiltradoFeriados(e.target.value)}
            value={filtradoFeriados}
          >
            <option value="Civil">Civil</option>
            <option value="Religioso">Religioso</option>
          </select>
        </div>
        <button
          type="button"
          value="invertirFeriados"
          onClick={(i) => setInvertirFeriados(listaFeriados.reverse())}
        >
          Invertir orden
        </button>
      </main>

      {/* Seccion cards */}
      <section>
        {listaFeriados
          .filter((lista) => {
            if (buscando === "" && filtradoFeriados === "") {
              return lista;
            } else if (
              buscando === "" &&
              lista.type.includes(filtradoFeriados)
            ) {
              return lista;
            } else if (
              filtradoFeriados === "" &&
              (lista.title
                .toLocaleLowerCase()
                .includes(buscando.toLocaleLowerCase()) ||
                lista.date
                  .toLocaleLowerCase()
                  .includes(buscando.toLocaleLowerCase()) ||
                lista.type
                  .toLocaleLowerCase()
                  .includes(buscando.toLocaleLowerCase()))
            ) {
              return lista;
            }
          })
          .map((f, i) => (
            <div className="card" key={i}>
              <div className="col p-1">
                <h5 className="card-title">
                  <b>{f.title}</b>{""}{""}
                </h5>
                <h5 className="card-subtitle mb-1"> Fecha: {f.date} </h5>
                <p className="card-text">
                  Tipo de feriado: <b>{f.type}</b>{" "}
                </p>
              </div>
            </div>
          ))}
        {}
      </section>
    </>
  );
};

export default MiApi;
