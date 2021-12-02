let ordem_para_apertar = []
let ordem_apertada = []
let pontuacao = 0

const btn_blue = document.querySelector('#color_azul') 
const btn_yellow = document.querySelector('#color_amarelo') 
const btn_red = document.querySelector('#color_vermelho')
const btn_green = document.querySelector('#color_verde')

function gerar_ordem(){
    let ordem = Math.floor(Math.random()*4)
    ordem_para_apertar[ordem_para_apertar.length]= ordem
    
    ordem_apertada = []

    for(let i in ordem_para_apertar){
        let elementColor = criandoElemeneto_COlor(ordem_para_apertar[i])
        highlight_COLOR(elementColor, Number(i)+1)
    }
}

function highlight_COLOR(element,numero){
    numero = numero * 500
    setTimeout(()=>{
        element.classList.add('selected')
    },numero-250)
    setTimeout(()=>{
        element.classList.remove('selected')
    },numero-20)
}

function checando_a_ordem(){
    for(let i in ordem_apertada){
        if(ordem_apertada[i]!= ordem_para_apertar[i]){
            game_over()
            break
        }
    }
    if(ordem_para_apertar.length==ordem_apertada.length){
        
        const paragrafo = document.createElement('p')
        paragrafo.textContent = pontuacao
        document.querySelector('#jesuis').appendChild(paragrafo)
        next_level()
    }
}

function clickaaa(color){
    console.log(`CLICKEI NO ${color}`)
    ordem_apertada[ordem_apertada.length] = color
    criandoElemeneto_COlor(color).classList.add('selected')
    let audio = new Audio('./audio1.mp3');
    //audio.play();
    setTimeout(()=>{
        criandoElemeneto_COlor(color).classList.remove('selected');
        checando_a_ordem();
    },250)
}


function criandoElemeneto_COlor(color){
    if(color==0){
        return btn_green
    }
    else if(color==1){
        return btn_red
    }
    else if(color==2){
        return btn_yellow
    }
    else if(color==3){
        return btn_blue
    }
}

function next_level(){
    pontuacao = pontuacao+10
    
    gerar_ordem()
}
function game_over(){
    alert('GAME OVER')
    pontuacao = 0
    ordem_para_apertar = []
    ordem_apertada = []

    
    controle_btn = false
}

function play_game(){
    alert('SEJA BEM VINDO\nBOM GAME!')
    pontuacao = 0

    next_level()
}

let controle_btn = false

function off_on_button(){
    if(controle_btn==false){
        play_game()
        controle_btn = true
    }
    else{
    }
    controlando_cor_btn()
}

function controlando_cor_btn(){
    if(controle_btn == false){
        document.querySelector('#center_element').style.backgroundColor = "#fff"
    }
    else{

    }
}