<template>
    <div style="height: 100%">
        <v-row style="height: 90%" class="d-flex">
            <!-- Graficos de Estadisticas -->
            <v-col cols="4" class="d-flex justify-center py-10" style="min-width: 300px;">
                <v-card width="400px" height="100%" elevation="24" outlined class="justify-center">

                    <!-- Primer grafico -->
                    <v-row no-gutters class="pt-5">
                        <span class="mx-auto">Aciertos en traducción a morse</span>
                    </v-row>
                    <v-row no-gutters class="d-flex justify-center pt-5 px-5">
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
                    <v-row no-gutters class="d-flex justify-center pt-5 px-5">
                        <v-card color="success" width="50%" height=" 20" class="pl-2">
                            <span class="white--text">40%</span>
                        </v-card>
                        <v-card color="error" width="50%" height=" 20">
                            <span style="float: right;" class="white--text mr-2">40%</span>
                        </v-card>
                    </v-row>
                </v-card>
            </v-col>

            <!-- Input para practicar -->
            <v-col cols="4" class="py-10" style="min-width: 400px;">

                    <v-row no-gutters class="d-flex justify-center align-center">
                        <span>En texto</span>
                        <v-sheet class="pa-5">
                            <v-switch v-model="switchTipoTraduccion" class="ml-2" inset color="orange" @click="updateText"></v-switch>
                        </v-sheet>
                        <span>En morse</span>
                    </v-row>
                    <v-row no-gutters class="d-flex justify-center align-center">
                        <span>{{ cantidad }} dígitos</span>
                    </v-row>

                    <v-row>
                        <v-card width="100%" height="200px" elevation="4" outlined class="d-flex align-center">
                            <v-btn class="mr-auto" elevation="0" height="100%" @click="reduceQuantity">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <div v-for="item, index in pantalla">
                                <p style="font-size: 2rem;">{{ item }}</p>
                            </div>
                            <v-btn class="ml-auto" elevation="0" height="100%" @click="increaseQuantity">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-card>
                    </v-row>

                    <v-row class="mt-6">
                        <v-text-field v-model="ingreso" :prepend-icon="`${(switchTipoTraduccion) ? 'mdi-format-letter-case' : 'mdi-dots-horizontal'}`" outlined rounded dense placeholder="Ingrese la traducción"></v-text-field>
                    </v-row>

                    <v-row width="100%" class="mt-6 d-flex" style="justify-content: space-evenly;" v-if="(!switchTipoTraduccion)">
                        <v-btn elevation="4" @click="ingreso += '.'">
                            <p style="font-size: 2rem;">.</p>
                        </v-btn>
                        <v-btn elevation="4" @click="ingreso += ' '">
                            <v-icon>mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn elevation="4" @click="ingreso += '-'">
                            <p class="mt-4" style="font-size: 2rem;">-</p>
                        </v-btn>
                        <v-btn elevation="4" @click="removeValue">
                            <v-icon>mdi-arrow-u-left-bottom</v-icon>
                        </v-btn>
                    </v-row>
            </v-col>

            <!-- Configuracion -->
            <v-col cols="4" class="d-flex justify-center py-10" style="">
                <v-card width="40%" height="100%" elevation="24" outlined>

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1">
                            <v-switch v-model="habilitarLetras" inset color="orange" label="Habilitar Letras" @click="updateText"></v-switch>
                        </v-sheet>
                    </v-row>

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1">
                            <v-switch v-model="habilitarNumeros" inset color="info" label="Habilitar Números" @click="updateText"></v-switch>
                        </v-sheet>
                    </v-row>

                    <v-row no-gutters>
                        <v-sheet class="pa-5 ml-1">
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
    }
  },

};
</script>

<style>
@media (max-width: 600px) {
  body {
    background-color: blue;
  }
}
</style>