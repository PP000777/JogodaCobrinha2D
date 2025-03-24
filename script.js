const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let rodando = true
let gameOverr = false

const teclasPressionadas = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};
document.addEventListener('keydown', (e) => {
    for (let tecla in teclasPressionadas) {
        if (teclasPressionadas.hasOwnProperty(e.code)) {
            teclasPressionadas[tecla] = false;
        }
    }
    if (teclasPressionadas.hasOwnProperty(e.code)) {
        teclasPressionadas[e.code] = true;
    }
});


class Entidade {
    constructor(x, y, largura, altura,cor) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}


class Cobra extends Entidade {
    #cor
    constructor(x, y, largura, altura,cor) {
        super(x, y, largura, altura,cor)
    }
    atualizar() {
        if (teclasPressionadas.KeyW) {
            this.y -= 7
        } else if (teclasPressionadas.KeyS) {
            this.y += 7
        } else if (teclasPressionadas.KeyA) {
            this.x -= 7
        } else if (teclasPressionadas.KeyD) {
            this.x += 7
        }
    }
    verificarColisao(comida) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.#houveColisao(comida)
        }
    }
    #houveColisao(comida) {
        comida.x = Math.random() * canvas.width - 10
        comida.y = Math.random() * canvas.height - 10
    }
}
class Comida extends Entidade {
    constructor(cor) {
        super(Math.random() * canvas.width - 10, Math.random() * canvas.height - 10, 20, 20, cor)
    }
}

function gameOver() {
    if(gameOverr = true){
    alert('Game Over!')
    location.reload()
}
}

function verificarcolisaoParede(){
    if (cobra.x < 0 || cobra.x > canvas.width - cobra.largura || cobra.y < 0 || cobra.y > canvas.height - cobra.altura) {
        gameOver()
        rodando = false
        gameOverr = true
    }
}


const cobra = new Cobra(100, 200, 20, 20, 'green')
const comida = new Comida('red')


function loop() {
    if(!rodando){
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    cobra.desenhar(ctx, cobra.cor)
    cobra.atualizar()
    comida.desenhar(ctx, comida.cor)
    cobra.verificarColisao(comida)
    verificarcolisaoParede()
    
    requestAnimationFrame(loop)
}
loop()