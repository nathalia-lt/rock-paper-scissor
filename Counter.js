const COUNT_DOWN_START = 10;
//dentro de obj nao temos const, mas para sinalizar que queremos tratar ela como constante colocamos letra maiuscula.
let Counter = {
    //tudo que tem as variaveis abaixo, colocamos o this(couter)
    // COUNT_DOWN_START: 10, //NAO POSSO ALTERAR O VALOR
    countDown: 10,
    isCounting: false,
    timer: null,
    timerEl: document.getElementById('timer'),
    start: function ()  {
        // verificar se o timer já começou ou não
        if (this.isCounting) {
            return
        }
        this.countDown = COUNT_DOWN_START //model
        this.isCounting = true //model
        this.updateView()
        this.timer = setInterval(() => this.decrease(), 1000)

    },
    stop: function ()  {
        clearInterval(this.timer)//model
        this.isCounting = false //model
    },
    decrease: function ()  {
        this.countDown-- //model    
        this.updateView()
        if (this.countDown === 0) { //model
            this.stop()
        }
    },
    updateView: function () {
        this.timerEl.innerText = this.countDown //view
    }
}

export default Counter