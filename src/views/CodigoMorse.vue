<template>
    <div style="height: 700px">
        <v-row class="d-flex">
            <!-- Graficos de Estadisticas -->
            <v-col cols="4" class="estadisticas d-flex justify-center py-10" style="min-width: 300px;">
                <v-card width="400px" height="max-content" outlined class="tarjeta justify-center" @mousemove="rotateCard" @mouseleave="resetCard">

                    <!-- Primer grafico -->
                    <v-row no-gutters class="pt-15">
                        <span class="mx-auto">Aciertos en traducción a morse</span>
                    </v-row>
                    <v-row no-gutters class="d-flex justify-center pt-5 px-10">
                        <v-card color="success" width="50%" height=" 20" class="pl-2">
                            <span class="white--text">50%</span>
                        </v-card>
                        <v-card color="error" width="50%" height=" 20">
                            <span style="float: right;" class="white--text mr-2">50%</span>
                        </v-card>
                    </v-row>

                    <!-- Segundo Grafico -->
                    <v-row no-gutters class="mt-10 pt-5">
                        <span class="mx-auto">Aciertos en traducción a texto</span>
                    </v-row>
                    <v-row no-gutters class="d-flex justify-center pt-5 px-10 pb-10">
                        <v-card color="success" width="50%" height=" 20" class="pl-2">
                            <span class="white--text">50%</span>
                        </v-card>
                        <v-card color="error" width="50%" height=" 20">
                            <span style="float: right;" class="white--text mr-2">50%</span>
                        </v-card>
                    </v-row>
                </v-card>
            </v-col>

            <!-- Input para practicar -->
            <v-col cols="4" class="py-10" style="min-width: 400px;">

                    <v-row no-gutters class="d-flex justify-center align-center">
                        <span>En texto</span>
                        <v-sheet class="pa-5" style=" background: transparent;">
                            <v-switch v-model="switchTipoTraduccion" class="ml-2" inset color="orange" @click="updateText"></v-switch>
                        </v-sheet>
                        <span>En morse</span>
                    </v-row>
                    <v-row no-gutters class="d-flex justify-center align-center">
                        <span>{{ cantidad }} dígitos</span>
                    </v-row>

                    <v-row no-gutters>
                        <v-col class="d-flex" cols="2">
                            <v-btn width="60px" height="60px" rounded class="my-auto mr-auto" elevation="4" @click="reduceQuantity" style="background-color: white;">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </v-col>
                        
                        <v-col cols="8">
                            <v-card width="100%" height="200px" elevation="4" outlined class="d-flex align-center">
                                <div v-for="item, index in pantalla">
                                    <p style="font-size: 2rem;">{{ item }}</p>
                                </div>
                            </v-card>
                        </v-col>

                        <v-col class="d-flex" cols="2">
                            <v-btn width="60px" height="60px" rounded class="my-auto ml-auto" elevation="4" @click="increaseQuantity" style="background-color: white;">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row class="mt-6">
                        <v-text-field v-model="ingreso" :prepend-icon="`${(switchTipoTraduccion) ? 'mdi-format-letter-case' : 'mdi-dots-horizontal'}`" outlined rounded dense :placeholder="`${(switchTipoTraduccion) ? 'Ingrese la traducción usando mayúsculas' : 'Asegurese de agregar un espacio entre cada traducción'}`"></v-text-field>
                    </v-row>

                    <v-row width="100%" class="mt-6 d-flex" style="justify-content: space-evenly;" v-if="(!switchTipoTraduccion)">
                        <v-btn height="50px" rounded color="blue" elevation="8" @click="ingreso += '.'">
                            <p class="white--text px-4" style="font-size: 2rem;">.</p>
                        </v-btn>
                        <v-btn height="50px" rounded color="orange" elevation="8" @click="ingreso += ' '">
                            <v-icon class="px-4 mb-2" color="white">mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn height="50px" rounded color="green" elevation="8" @click="ingreso += '-'">
                            <p class="white--text mt-4 px-4" style="font-size: 2rem;">-</p>
                        </v-btn>
                        <v-btn height="50px" rounded color="error" elevation="8" @click="removeValue">
                            <v-icon class="px-4">mdi-arrow-u-left-bottom</v-icon>
                        </v-btn>
                    </v-row>
            </v-col>

            <!-- Configuracion -->
            <v-col cols="4" class="d-flex justify-center py-10">
                <v-card class="tarjeta configuracion" min-width="200px" width="40%" height="max-content" outlined
                @mousemove="rotateCard" @mouseleave="resetCard">

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1" style="background-color: transparent;">
                            <v-switch v-model="habilitarLetras" inset color="orange" label="Habilitar Letras" @click="updateText"></v-switch>
                        </v-sheet>
                    </v-row>

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1" style="background-color: transparent;">
                            <v-switch v-model="habilitarNumeros" inset color="info" label="Habilitar Números" @click="updateText"></v-switch>
                        </v-sheet>
                    </v-row>

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1" style="background-color: transparent;">
                            <v-switch v-model="habilitarSimbolos" inset color="indigo" label="Habilitar Símbolos" @click="updateText"></v-switch>
                        </v-sheet>
                    </v-row>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  name: 'CodigoMorse',

  components: {
  },
  data: () => ({
    alfabeto: {
        enTexto: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
        enMorse: ['.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....', '..', '.---', '-.-', '.-..', '--', '-.', '--.--', '---', '.--.', '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-', '-.--', '--..'],
    },
    numeros: {
        enTexto: "01234567890123456789",
        enMorse: ['-----', '.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.', '-----', '.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.'],
    },
    simbolos: {
        enTexto: ",.=:!?",
        enMorse: ['--..--', '.-.-.-', '-...-', '---...', '-.-.--', '..--..'],
    },

    habilitarLetras: false,
    habilitarNumeros: false,
    habilitarSimbolos: false,
    switchTipoTraduccion: false,

    texto: '',
    textoAMostrar: '',
    morse: [],
    morseAMostrar: [],
    cantidad: 0,

    pantalla: '',
    ingreso: '',
  }),
  watch: {
    ingreso() {
        this.confirmTraduction()
    },
  },
  methods: {
    updateText() {
        this.resetValues()

        // Incorpora en los valores de Morse y de Texto el "Alfabeto"
        if (this.habilitarLetras == true) {
            this.texto += this.alfabeto.enTexto

            for (let i = 0; i < this.alfabeto.enMorse.length; i++) {
                this.morse.push(this.alfabeto.enMorse[i])
            }
        }

        // Incorpora en los valores de Morse y de Texto los "Numeros"
        if (this.habilitarNumeros == true) {
            this.texto += this.numeros.enTexto

            for (let i = 0; i < this.numeros.enMorse.length; i++) {
                this.morse.push(this.numeros.enMorse[i])
            }
        }

        // Incorpora en los valores de Morse y de Texto los "Simbolos"
        if (this.habilitarSimbolos == true) {
            this.texto += this.simbolos.enTexto

            for (let i = 0; i < this.simbolos.enMorse.length; i++) {
                this.morse.push(this.simbolos.enMorse[i])
            }
        }

        // Pantalla en texto
        if (this.switchTipoTraduccion == false) {

            if (this.texto != '' || this.morse.length != 0) {
                for (let i = 0; i < this.cantidad; i++) {
                    let aleatorio = Math.floor(Math.random() * this.texto.length)
                    this.textoAMostrar += this.texto.charAt(aleatorio)
                    this.morseAMostrar.push(this.morse[aleatorio])
                    this.pantalla = this.textoAMostrar
                }
            }
            // Pantalla en morse
        } else {

            if (this.texto != '' || this.morse.length != 0) {
                for (let i = 0; i < this.cantidad; i++) {
                    let aleatorio = Math.floor(Math.random() * this.texto.length)
                    this.textoAMostrar += this.texto.charAt(aleatorio)
                    this.morseAMostrar += (this.morse[aleatorio])
                    this.pantalla += (this.morse[aleatorio] + ` | `)
                } 
            }
        }
    },

    confirmTraduction() {
        let traduccionAMorse = ''
        let traduccionATexto = ''

        if (this.switchTipoTraduccion == false) {
            for (let i = 0; i < this.morseAMostrar.length; i++) {
                traduccionAMorse += this.morseAMostrar[i] + " "
            }
                
            if (this.ingreso == traduccionAMorse.trim()) {
                this.ingreso = ''
                this.updateText()
                console.log("traduccion correcta")
            }
            
        } else {
            for (let i = 0; i < this.textoAMostrar.length; i++) {
                traduccionATexto += this.textoAMostrar[i]
            }

            if (this.ingreso == traduccionATexto) {
                this.ingreso = ''
                this.updateText()
                console.log("traduccion correcta")
            }
        }
    },

    reduceQuantity() {
        this.resetValues()
        this.cantidad--
        this.updateText()
    },
    increaseQuantity() {
        this.resetValues()
        this.cantidad++
        this.updateText()
    },

    resetValues() {
        this.texto = ''
        this.textoAMostrar = ''
        this.morse = []
        this.morseAMostrar = []
        this.pantalla = ''
    },

    // al escribir en codigo morse, te permite reemplazar la tecla para quitar un caracter
    removeValue() {
        this.ingreso = this.ingreso.slice(0, -1)
    },

    rotateCard(event) {
      const card = event.currentTarget;
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const angleX = (event.clientY - cardCenterY) / 10;
      const angleY = (event.clientX - cardCenterX) / -10;
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;

      console.log(event)
    },

    resetCard(event) {
  const card = event.currentTarget;
  card.style.transform = 'none';
}
  },

};
</script>

<style>
    .tarjeta {
        border: none;
        border-radius: 2rem !important;
        /* box-shadow: 0px 57px 7px -27px rgba(0,0,0,0.1); */
        box-shadow: 20px 20px 40px 0px #d0d0d0;
        /* transition: all .5s ease !important; */
    }

    /* .tarjeta:hover {
        box-shadow: 0px 65px 5px -35px rgba(0,0,0,0.1);
        transform: translateY(-10px);
    } */
    
@media (max-width: 1300px) {
    .estadisticas {
        margin-left: 60px;
    }
  .configuracion {
    margin-left: 300px !important;
  }
}
</style>