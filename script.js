let ordem_para_apertar = []
let ordem_apertada = []
let pontuacao = 0
        
let tentativas = 0

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
            controle_btn = false
            game_over()
            return
        }
    }
    if(ordem_para_apertar.length==ordem_apertada.length){       
        ajustando_pontuação()
        next_level()
    }
}

function clickaaa(color){
    if(controle_btn == false){
        return
    }
    else{
        ordem_apertada[ordem_apertada.length] = color
        criandoElemeneto_COlor(color).classList.add('selected')
        setTimeout(()=>{
            criandoElemeneto_COlor(color).classList.remove('selected');
            checando_a_ordem();
        },250)
    }
}

function indo_para_o_game(){
    const elementos_ocultos = document.querySelectorAll('.start_none')
    for(i=0;i<elementos_ocultos.length;i++){
        elementos_ocultos[i].style.display = 'flex'
        document.querySelector('#alert_manual').style.display = 'none'
    }
}


function ajustando_pontuação(){
    const paragrafo = document.createElement('h2')
        paragrafo.textContent = `${pontuacao}`;
        while(document.querySelector('#jesuis').lastChild){
            document.querySelector('#jesuis').removeChild(document.querySelector('#jesuis').lastChild);
        }
        document.querySelector('#jesuis').appendChild(paragrafo)
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
    tentativas++
    ordem_para_apertar = []
    ordem_apertada = []
    ajustando_pontuação()
}

function play_game(){
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
        game_over()
        controle_btn = false
    }
}