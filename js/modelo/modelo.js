/*
 * Modelo
 */
const storage = window.localStorage;

var Modelo = function() {
  if (!storage.getItem('preguntas')) {
    storage.setItem('preguntas', '[]');
  }
  this.preguntas = JSON.parse(storage.getItem('preguntas'));
  this.ultimoId = this.obtenerUltimoId();

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);

  this.preguntaEliminada = new Evento(this);

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length >0){
      var ultimaPregunta = this.preguntas[this.preguntas.length -1];
      return ultimaPregunta.id;
    }else{
      return 0;
    }
  },



  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function (id) {    
    for (let i = 0; i < this.preguntas.length; i++) {
      const pregunta = this.preguntas[i];
      if (pregunta.id === id) {
        this.preguntas.splice(i, 1);
        this.guardar(); 
        this.preguntaEliminada.notificar();
        break;
      }
    }
  },
  obtenerPregunta: function (nombrePregunta) {
    for (let i = 0; i < this.preguntas.length; i++) {
      const pregunta = this.preguntas[i];
      if(pregunta.textoPregunta === nombrePregunta) {
        return pregunta;
      }
    }
  },

  agregarVoto: function (pregunta, respuestaSeleccionada) {
    for (let i = 0; i < this.preguntas.length; i++) {
      const preguntaActual = this.preguntas[i];
      if (preguntaActual.id === pregunta.id) {
        for (let h = 0; h < preguntaActual.cantidadPorRespuesta.length; h++) {
          const respuesta = preguntaActual.cantidadPorRespuesta[h];
          if(respuesta.textoRespuesta === respuestaSeleccionada) {
            respuesta.cantidad += 1;
          }
        }
      }
      
    }
  },

  //se guardan las preguntas
  guardar: function () {
    storage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

};
