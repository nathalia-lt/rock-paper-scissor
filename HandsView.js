
let HandsView = {
    humanHands: document.getElementsByClassName('human-hand'), //view
    robotHands: document.getElementsByClassName('robot-hand'), //view
    bubble: document.getElementById('bubble'), //view

    startNewGame: function () {
        // show all human hands
        for (let hand of this.humanHands) {
            hand.style.display = 'block';
        }
        // show robot bubble
        this.bubble.style.display = 'block'
        // hide robot hands
        for (let hand of this.robotHands) {
            hand.style.display = 'none'
        }
    },

    humanPickedHand: function (handElClicked, robotHand)  {
        //Hide the 2 left human hands
        let type = handElClicked.dataset.type // View

        for (let hand of this.humanHands) { // View
            if (hand != handElClicked) {
                hand.style.display = 'none' //podemos pensar no metodo no objeto para isso
            }
        }

        //show the chosen robot hand
        this.robotHands[robotHand].style.display = 'block' //estou pegando a lista e selecionando o elemento 0,1 ou 2.

        //hide bubble
        this.bubble.style.display = 'none'
    },
}

export default HandsView