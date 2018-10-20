/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);

  this.modelo.preguntaEliminada = new evento(this);

};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if (this.preguntas.length >0){
      var ultimaPregunta = this.pregunta[this.preguntas.length -1];
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
  borrarPregunta: function () {
    for (let i = 0; i < this.preguntas.length; i++) {
      var pregunta = this.preguntas[i];
      this.pregunta.splice(indice, 1);
      break;
    }
    this.preguntaEliminada.notificar();  

  },
  //se guardan las preguntas
  guardar: function () {
  },
};
