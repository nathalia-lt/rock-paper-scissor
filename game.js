
let playBtn = document.getElementById('play-btn') // View
// let timerEl = document.getElementById('timer') //view

//getElementsByClassName sempre devolve uma colecao de elementos enquanto id devolve um unico elemento
let humanHands = document.getElementsByClassName('human-hand'); //view
let robotHands = document.getElementsByClassName('robot-hand'); //view
console.log('Robot Hands', robotHands)
console.log(robotHands[0])
let bubble = document.getElementById('bubble'); //view


// const countDownStart = 10; //model, é uma regra de negócio do meu jogo. tambem se comunica com outros servicos, como API, banco de dados. So funciona pq tem o model. SQLite, é banco de dados, um backend para cada usuario.

// let countDown = countDownStart; //model
// let isCounting = false; //model
// let timer = null; //model
// timerEl.innerText = countDown //view



//eu tenho muitas views que nao vale a pena fazer funcao por serem muito pequenas, entao vou colocar como objeto.
//objeto pode ter propriedades e metodos
//propriedades: valores
//metodos = funcoes
// let view = {
//     playBtn: document.getElementById('play-btn'),
//     timer: timerObj
// }


//this é o objeto, relacionado ao proprio objeto.
// let CounterView = {
//     timerEl: document.getElementById('timer'),
//     update: (value) => {
//         this.timerEl.innerText = value
//     }
// }


const COUNT_DOWN_START = 10;
//dentro de obj nao temos const, mas para sinalizar que queremos tratar ela como constante colocamos letra maiuscula.
let Counter = {
    //tudo que tem as variaveis abaixo, colocamos o this(couter)
    // COUNT_DOWN_START: 10, //NAO POSSO ALTERAR O VALOR
    countDown: 10,
    isCounting: false,
    timer: null,
    timerEl: document.getElementById('timer'),
    start: () => {
        // verificar se o timer já começou ou não
        if (this.isCounting) {
            return
        }
        this.countDown = COUNT_DOWN_START //model
        this.isCounting = true //model
        this.updateView() 
        this.timer = setInterval(() => this.decrease(), 1000)

    },
    stop:() => {
        clearInterval(this.timer)//model
        this.isCounting = false //model
    },
    decrease:() => {
        this.countDown-- //model    
        this.updateView()
        if (this.countDown === 0) { //model
            this.stop()
        }
    },
    updateView: () => {
        this.timerEl.innerText = this.countDown //view
    }
}


//dentro dessa funcao eu tenho model e view, entao provavelmente possa ser um controler


//essa funcao é um controler, a maioria das vezes so chama as funcoes
const handlePlayBtnClick = () => {
    // start game timer
    Counter.start()
    startGameView()
}




//objto para result coloca o score dentro e alterar o view de acordo.
// TEMA DE CASA abaixo, transformar em obj
//dois methodos show hand, hide hand
// pensar em um objeto para area do robo e area do humano
const startGameView = () =>{
    // show human hands
    for (let hand of humanHands) {
        hand.style.display = 'block';
    }
    // show robot bubble
    bubble.style.display = 'block'
    // hide robot hands
    for (let hand of robotHands) {
        hand.style.display = 'none'
    }
}


const dealWithHumanHand = (handElClicked) => {
    // saber qual mão foi clicada
    let type = handElClicked.dataset.type // View
    console.log('clicou na mao', handElClicked, type)
    // esconder as outras mãos

    // humanHands é uma coleção de elementos
    // hand é um elemento
    for (let hand of humanHands) { // View
        if (hand != handElClicked) {
            hand.style.display = 'none' //podemos pensar no metodo no objeto para isso
        }
    }

    let typeToNumber = {
        rock: 0,
        paper: 1,
        scissors: 2
    }
    return typeToNumber[type]
}

//MVC (model, view, controler)
//Model = liga o controle com o view, processar o que o usuario quer entregar para view
//controler tipo um garcon = pede para o model fazer alguma coisa controle do usuario (dentro do contoler eu chamo o o view e o model), chama, uma funcao, gerencia,


//quando falando de handle estamos tratando de uma interacao com o usuario
//Math.random()
const handleHandClick = (ev) => {
    let handElClicked = ev.currentTarget
    let typeHandHuman = dealWithHumanHand(handElClicked)
    // esconder o bubble
    bubble.style.display = 'none'
    // escolher a mão do robô
    let typeHandRobot = Math.floor(Math.random() * 3);

    // mostrar a mão do robo correspondente
    robotHands[typeHandRobot].style.display = 'block'

    Counter.stop();

    let result = processResult(typeHandHuman, typeHandRobot)
    // mostrar o resultado
}

for (let hand of humanHands) {
    hand.addEventListener('click', handleHandClick)
}

const processResult = (typeHandHuman, typeHandRobot) =>{
     //a linha e o jogador e a coluna o robot
    //primeiro numero jogador, segundo numero robot
    //0 empate, -1 robot, 1 player
    // verificar quem ganhou
    // pedra/pedra, pedra/papel, pedra/tesoura
    // papel/pedra, papel/papel, papel/tesoura
    // tesoura/pedra, tesoura/papel, tesoura/tesoura
    let resultMap = [
        [0, -1, 1],
        [1, 0, -1],
        [-1, 1, 0]
    ]


    console.log('typeHandHuman', typeHandHuman)
    console.log('typeHandRobot', typeHandRobot)

    let result = resultMap[typeHandHuman][typeHandRobot]
    console.log('Resultado', result)

    let resultText = {
        0: 'Empate',
        1: 'Você ganhou',
        '-1': 'Você perdeu'
    }

    console.log('Resultado', resultText[result])
    return resultText[result]
    

}


// fn(param, param, param)
// addEventListener(type, listener)
// addEventListener(type, listener)
// addEventListener('click', ()=>{})
// addEventListener('click', handlePlayClick)
playBtn.addEventListener('click', handlePlayBtnClick)

// setTimeout => executa uma função uma vez depois de um tempo
// setInterval => executa uma função várias vezes a cada intervalo de tempo
// setInterval(funcao que vai ser executada, tempo em milisegundos)
// let timer = setInterval(() => {
//     console.log('Executando setInterval')
// }, 1000)

// setTimeout(() => {
//     console.log('Executando setTimeout')
//     clearInterval(timer)
// }, 10000)