
let playBtn = document.getElementById('play-btn')
let timerEl = document.getElementById('timer')

//getElementsByClassName sempre devolve uma colecao de elementos enquanto id devolve um unico elemento
let humanHands = document.getElementsByClassName('human-hand');
let robotHands = document.getElementsByClassName('robot-hand');
console.log('Robot Hands', robotHands)
console.log(robotHands[0])
let bubble = document.getElementById('bubble')


const countDownStart = 10;

let countDown = countDownStart;
let isCounting = false;
let timer = null;
timerEl.innerText = countDown

const startGameTimer = () => {
    countDown = countDownStart
    timerEl.innerText = countDown
    isCounting = true

    timer = setInterval(() => {
        countDown--
        timerEl.innerText = countDown

        if (countDown === 0) {
            clearInterval(timer)
            isCounting = false
        }
    }, 1000)
}


const handlePlayBtnClick = () => {
    // verificar se o timer já começou ou não
    if (isCounting) {
        return
    }

    // start game timer
    startGameTimer()

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
    let type = handElClicked.dataset.type
    console.log('clicou na mao', handElClicked, type)
    // esconder as outras mãos

    // humanHands é uma coleção de elementos
    // hand é um elemento
    for (let hand of humanHands) {
        if (hand != handElClicked) {
            hand.style.display = 'none'
        }
    }

    let typeToNumber = {
        rock: 0,
        paper: 1,
        scissors: 2
    }
    return typeToNumber[type]
}


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

    // parar o timer (o setInterval)
    clearInterval(timer)
    isCounting = false

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
    // mostrar o resultado
}

for (let hand of humanHands) {
    hand.addEventListener('click', handleHandClick)
}



//
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