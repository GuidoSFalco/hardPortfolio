<template>
    <div>
      <canvas ref="abacoCanvas" width="400" height="200"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.drawAbaco();
    },
    methods: {
      drawAbaco() {
        const canvas = this.$refs.abacoCanvas;
        const ctx = canvas.getContext("2d");
  

        // Dibuja las barras horizontales del ábaco
        for (var i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.rect(50, 40 + i * 30, 300, 10);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }

        // Dibuja las cuentas (bolas) en las barras
        for (var i = 1; i < 3; i++) {
            for (var j = 1; j < 5; j++) {
                ctx.beginPath();
                // ctx.arc(70 + i * 30, 45 + j * 30, 10, 0, 2 * Math.PI);
                ctx.ellipse(100 + j*40, 25 + i*50, 20, 35, Math.PI / 2, 0, 2 * Math.PI);
                // ctx.ellipse(100, 155, 20, 35, Math.PI / 2, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
  
      },
    },
  };
  </script>
  
  <style>
  /* Estilos CSS para el componente Abaco.vue */
  </style>
  