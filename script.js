const container = document.querySelector('#container');
const start_btn = document.querySelector('#btn_play');
let game = false;
let ordem = []
let count_click = 0

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
    setTimeout( () => {
        document.querySelector(`#${cor}`).classList.add('highlight');
    }, 200)
    setTimeout( () => {
        document.querySelector(`#${cor}`).classList.remove('highlight');
    }, 600)
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
            if(!game) return;
            highlight_color(div_color.id)
            if(div_color.id !== ordem[count_click]){
                ordem = []
                alert("PERDEU")
                game = false
                count_click = 0
                return
            }

            count_click += 1
            if(count_click === ordem.length){
                add_color()
                count_click = 0
                for(const color of ordem){
                    highlight_color(color)
                }
            }
        }
    }
}

start_btn.onclick = () => {
    if(game) return
    add_color();
    for(const color of ordem){
        highlight_color(color)
    }
    game = true;
}
