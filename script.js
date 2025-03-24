const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');
const pontuacaoElement = document.getElementById('pontuacao');
const pontuacaoMaximaElement = document.getElementById('pontuacaomax');

let rodando = true;
let gameOverr = false;
let pontuacao = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') || 0;

pontuacaoMaximaElement.textContent = `Pontuação Máxima = ${pontuacaoMaxima}`;

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
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }
    
    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Cobra extends Entidade {
    #cor;
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor);
    }
    
    atualizar() {
        if (teclasPressionadas.KeyW) {
            this.y -= 7;
        } else if (teclasPressionadas.KeyS) {
            this.y += 7;
        } else if (teclasPressionadas.KeyA) {
            this.x -= 7;
        } else if (teclasPressionadas.KeyD) {
            this.x += 7;
        }
    }
    
    verificarColisao(comida) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.#houveColisao(comida);
        }
    }
    
    #houveColisao(comida) {
        comida.x = Math.random() * (canvas.width - 20);
        comida.y = Math.random() * (canvas.height - 20);
        pontuacao++;
        pontuacaoElement.textContent = `Pontuação = ${pontuacao}`;
        
        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;
            pontuacaoMaximaElement.textContent = 'Pontuação Máxima = ${pontuacaoMaxima}';
            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima);
        }
    }
}

class Comida extends Entidade {
    constructor(cor) {
        super( Math.random() * (canvas.width - 20),Math.random() * (canvas.height - 20),20,20, cor);
    }
}

function gameOver() {
    if (gameOverr) {
        alert('Game Over! Sua pontuação: ${pontuacao}');
        location.reload();
    }
}

function verificarcolisaoParede() {
    if (
        cobra.x < 0 ||
        cobra.x > canvas.width - cobra.largura ||
        cobra.y < 0 ||
        cobra.y > canvas.height - cobra.altura
    ) {
        gameOverr = true;
        gameOver();
        rodando = false;
    }
}

const cobra = new Cobra(100, 200, 20, 20, 'green');
const comida = new Comida('red');

function loop() {
    if (!rodando) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cobra.desenhar();
    cobra.atualizar();
    comida.desenhar();
    cobra.verificarColisao(comida);
    verificarcolisaoParede();
    
    requestAnimationFrame(loop);
}

loop();