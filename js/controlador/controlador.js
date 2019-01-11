/*
 * Controlador
 */
const Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    if(typeof(pregunta) !== 'string' || pregunta.trim().length == 0) {
      alert('ERROR - La pregunta no puede estar vacia');
      return;
    }
    if(respuestas && Array.isArray(respuestas) && respuestas.length > 0) {
      const repsFil = respuestas.filter(resp => resp.textoRespuesta.trim().length > 0);
      if(repsFil.length > 0) {
        this.modelo.agregarPregunta(pregunta, repsFil);
      }
      else {
        alert('ERROR - La pregunta debe poseer Respuestas');  
      }
      
    } 
    else {
      alert('ERROR - La pregunta debe poseer Respuestas');
    }
  },
  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(Number(id));
  },
  borrarTodasPreguntas: function () {
    this.modelo.borrarTodasPreguntas();
  },
  editarPregunta: function (idPregunta, pregunta, respuestas) {
    if(typeof(pregunta) !== 'string' || pregunta.trim().length == 0) {
      alert('ERROR - La pregunta no puede estar vacia');
      return;
    }
    this.modelo.editarPregunta(Number(idPregunta), pregunta, respuestas);
  },
  agregarVoto: function (idPregunta, textoRespuesta) {
    if(idPregunta && textoRespuesta) {
      this.modelo.sumarVotoRespuesta(Number(idPregunta), textoRespuesta);
    }
  }
};
