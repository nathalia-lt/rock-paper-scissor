import HandsView from './HandsView.js'
import Counter from './Counter.js'




//model, é uma regra de negócio do meu jogo. tambem se comunica com outros servicos, como API, banco de dados. So funciona pq tem o model. SQLite, é banco de dados, um backend para cada usuario (o usuario usa quando nao tem acesso a internet).


//nao usar arrow function, por causa do scope
let Game = {
    playBtn: document.getElementById('play-btn'),
    resultDiv: document.getElementById('result'),


    init: function () {
        this.playBtn.addEventListener('click', this.handlePlayBtnClick)

        for (let hand of HandsView.humanHands) {
            hand.addEventListener('click', this.handleHandClick)
        }
        console.log('Game initialized')
    },

    handlePlayBtnClick: function () {
        // start game timer
        Game.resultDiv.style.display = 'none'
        Game.resultDiv.innerText = ''
        Counter.start()
        HandsView.startNewGame()
    },

    parseHandTypeToNumber: function (type) {
        let typeToNumber = {
            rock: 0,
            paper: 1,
            scissors: 2
        }
        return typeToNumber[type]
    },

    pickRandomRobotHand: function () {
        //pick a random hand for the robot
        let hand = Math.floor(Math.random() * 3); // 0, 1, 2
        return hand
    },

    handleHandClick: function (ev) {
        let handElClicked = ev.currentTarget
        let typeHandRobot = Game.pickRandomRobotHand()

        HandsView.humanPickedHand(handElClicked, typeHandRobot)

        Counter.stop();

        let type = handElClicked.dataset.type
        let typeHandHuman = Game.parseHandTypeToNumber(type)


        let result = Game.processResult(typeHandHuman, typeHandRobot)
        console.log('Resultado', result)
        // mostrar o resultado
        Game.resultDiv.style.display = 'block'
        Game.resultDiv.innerText = result
    },

    processResult: function (typeHandHuman, typeHandRobot) {
        console.log('typeHandHuman', typeHandHuman)
        console.log('typeHandRobot', typeHandRobot)
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

        let result = resultMap[typeHandHuman][typeHandRobot]

        let resultText = {
            0: 'Empate',
            1: 'Você ganhou',
            '-1': 'Você perdeu'
        }

        return resultText[result]
    }

}

Game.init()








//MVC (model, view, controler)
//Model = liga o controle com o view, processar o que o usuario quer entregar para view. Model é o que "faz" o meu codigo funcionar
//controler tipo um garcon = pede para o model fazer alguma coisa controle do usuario (dentro do contoler eu chamo o o view e o model), chama, uma funcao, gerencia. A marioria das vezes o controler so chama funcoes


//quando falando de handle estamos tratando de uma interacao com o usuario
//Math.random()



//----------------------------------------------------------------------

//Transformar em objeto showhand e hidehand
//Objeto para area do robo e para area do humano

//objeto pode ter propriedades e metodos
//propriedades: valores
//metodos = funcoes

//model: é so logica, que é a nossa regra de negocio. como o funcionamento do programa em si.as regras sao a logica do model.
//no meu objeto eu posso colocar view e model juntos?
//o meu objeto seria um controler, ja que junto os dois? sim, mas fiquei confusa ja que a maioria das vezes o controler so chama as funcoes.



