//Ajustando o tamanho da tela

var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criarTempo = 1500 //variavel criada com um tempo definido para usar no setInterval, com isso apenas musdamos elas alguma vezes
//dependendo da dificuldade que o usuario escolhe!!

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal'){
    criarTempo = 1500

}else if( nivel === 'dificil'){
    criarTempo = 1000

}else if (nivel === 'chucknorris'){
    criarTempo = 750

}


function ajustarTelaDoJogo() { //com isso eu pego o a altura e largura da página, usando um console.log
    // isso ajuda a escolher melhor o calculo das posições aleatorias que ela tem, para que ela não saida tela
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustarTelaDoJogo()

var cronometro = setInterval(function () { //criamos a variavel que vai ser nosso cronometro e setamos ela com o setInterval, que recebe valores
    // em ms, como jogamos ali em cima (se o nivel for normal o tempo vai ser 1500) colocamos dentro de uma função e definimos que o tempo vai ser -=1

    tempo -= 1

    if (tempo < 0) { //se conseguirmos zerar o cronometro, chegando no número zero, ganhamos o jogo e somos direcionados para a página "vitoria.html"
        clearInterval(cronometro) //usamos isso para zerar o cronometro
        clearInterval(criarBarata) //zerar as baratas
        alert('Você acabou com as baratas!!')
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)





function posicaoBarata() { //aqui declaramos todas as posições em que a barata pode aparecer

    if (document.getElementById('barata')) {
        document.getElementById('barata').remove() //removendo se o elemento quando o mesmo for cliado

        if (vidas > 3) {
            window.location.href = "fim-do-jogo.html" //se perder as 3 vidas, é levado até a página de fim de jogo
        } else {
            document.getElementById('v' + vidas).src = "/imagens/coracao_vazio.png" //declaramos aqui qual será a imagem do coração vazio
           
            vidas++
        }



    }




    //GERANDO POSIÇÕES PARA ELA APARECER

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoX < 0 ? 0 : posicaoY


    var barata = document.createElement('img') //criamos nossa barata e com esse código, a barata fica se movendo e quando ela recebe um click, ela é deletada
    barata.src = 'imagens/barata-1.png'
    barata.className = tamanhoBarata() + ' ' + ladoAleatorio() 
    barata.style.left = posicaoX + 'px'
    barata.style.top = posicaoY + 'px'
    barata.style.position = 'absolute'
    barata.id = 'barata'
    barata.onclick = function () {
        this.remove()
    }


    document.body.appendChild(barata) //nossa querida baratinha
    
}


function tamanhoBarata() {
    var classe = Math.floor(Math.random() * 3) //aqui falamos que a barata vai ter 3 possiveis tamanhos, que foi definidido no style.css
    switch (classe) {
        case 0:
            return 'barata1'
        case 1:
            return 'barata2'
        case 2:
            return 'barata3'

    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2) //aqui definimos o dois lado no qual a barata pode aparecer, também declarada no css
    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'

    }

}
