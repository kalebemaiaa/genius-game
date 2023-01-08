const container = document.querySelector('#container');
const start_btn = document.querySelector('#btn_play');
const pontuacao_view = document.querySelector('#pontuacao_view');
let game = false;
let btnColors = false;
let ordem = []
let count_click = 0
let pontuacao = 0

const botoes = {
    'red': {
        'hexadecimal': '#f53b57',
        'radius': 'top-left'
    },
    'green': {
        'hexadecimal': '#0be881',
        'radius': 'top-right'
    },
    'yellow': {
        'hexadecimal': '#ffd32a',
        'radius': 'bottom-left'
    },
    'blue': {
        'hexadecimal': '#3c40c6',
        'radius': 'bottom-right'
    }
};

const lista_cores = Object.keys(botoes);

const add_color = () => {
    const new_cor = lista_cores[Math.floor(Math.random() * lista_cores.length)];
    ordem.push(new_cor)
}

const highlight_color = (cor) => {
    const corEscolhida = document.querySelector(`#${cor}`)
    const audio = new Audio(`./Buttons/${cor}.wav`)
    corEscolhida.classList.add('highlight');

    setTimeout(() => {
        corEscolhida.classList.remove('highlight');
        audio.play()
    }, 300)
}

const highlightOrdem = () => {
    btnColors = false;
    for(let i = 0; i < ordem.length; i++) {
        setTimeout( () => {
            if(ordem[i] === undefined) return;
            highlight_color(ordem[i])
        }, (i + 1) * 700)
    }
}

window.onload = () => {
    for(const color in botoes){
        const div_color = document.createElement('div');
        div_color.classList.add('color');
        div_color.id = color ;
        div_color.style.cssText += `background-color: ${botoes[color].hexadecimal};` ;
        div_color.style.cssText += `border-${botoes[color].radius}-radius: 100%;`;
        container.appendChild(div_color);

        div_color.onclick = () => {
            if(!game || !btnColors) return;
            highlight_color(color);

            if(div_color.id !== ordem[count_click]){
                ordem = []
                game = false
                btnColors = false
                count_click = 0
                pontuacao = 0
                pontuacao_view.textContent = `Pontuação: ${pontuacao}`;
                return 
            }

            count_click++;

            if(count_click === ordem.length){
                console.log('acertou tudo')
                add_color()
                pontuacao += 100
                pontuacao_view.textContent = `Pontuação: ${pontuacao}`;
                count_click = 0
                highlightOrdem()
                btnColors = true
            }
        }
    }
}

start_btn.onclick = () => {
    if(game) {
        ordem = []
        game = false
        btnColors = false
        count_click = 0
        pontuacao = 0
        pontuacao_view.textContent = `Pontuação: ${pontuacao}`;
        return
    }
    add_color();
    for(const color of ordem){
        highlight_color(color)
    }
    game = true;
    btnColors = true
}
