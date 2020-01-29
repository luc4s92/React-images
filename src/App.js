import React, { Component } from 'react';

import './App.css';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';
class App extends Component{
  constructor(){
    super()
    this.state = {
        termino: '',
        imagenes : [],
        pagina: ''
    };
  }
scroll = () =>{
  const elemento = document.querySelector('.jumbotron');
  elemento.scrollIntoView('smooth', 'start');
}
paginaAnterior = ()=> {
   //leer el state de la pagina actual
   let pagina = this.state.pagina;

   // si la pagina es uno ya no ir hacia atras
   if (pagina === 1) return null;
   //resta uno a la pagina actual
   
   pagina--;
   //agregar el cambio al state
   this.setState({
     pagina
   }, () =>{
      this.consultarApi();
      this.scroll();
   });
   //console.log(pagina);
  
}

paginaSiguiente = () =>{
  //leer el state de la pagina actual
  let pagina = this.state.pagina;
  //sumar uno a la pagina actual
  pagina++;
  //agregar el cambio al state
  this.setState({
    pagina
  }, () => {
    this.consultarApi();
    this.scroll();
  });
  //console.log(pagina);
}

consultarApi = () =>{
  const termino = this.state.termino;
  const pagina = this.state.pagina;
  const url = `https://pixabay.com/api/?key=15052922-45b7749e64f0af673e320bf27&q=${termino}&per_page=30&page=${pagina}`; //importante las comillas "al revez" `` para que tomr el query de la consulta

  //console.log(url);
  fetch(url)
      .then(respuesta => respuesta.json() )
      .then(resultado => this.setState( { imagenes: resultado.hits } ))
}

datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () =>{
      this.consultarApi();
    })
}

render() {
  return (
    <div className="app container">
      
        <div className="jumbotron">
              <p className="lead text-center">Buscador de imagenes</p>

              < Buscador 
                datosBusqueda={this.datosBusqueda}
              />
        </div>
          <div className="row justify-content-center" >
              <Resultado 
                imagenes={this.state.imagenes}
                paginaAnterior={this.paginaAnterior}
                paginaSiguiente={this.paginaSiguiente}
              />
          </div>
      </div>

  );
}
}
export default App;
