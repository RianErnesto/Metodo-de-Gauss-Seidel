var body = document.getElementById("box")
var main = document.getElementById("principal")
var matrix
var nextAprox
var previousAprox
var results
var quantity
var tolerancy
var checkCheck = true
var isConvergent = true
var decimal
var entrada

function print() {
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++){
            body.innerHTML += "<label>Incógnita <b>" + (j+1) + "</b> da Equação <b>" + (i+1) + "</b>:<input type='number' class='coeficientes'> </label><br>"
        }
        body.innerHTML += "<br>"
    }
    body.innerHTML += "<br>"
    for(var i = 0; i < quantity; i++){
        body.innerHTML += "<label>Resultado da Equação<b> " + (i+1) + "</b>:<input type='number' class='r'> </label><br>"
    }

    body.innerHTML += "<button id='confirmarIncognitas' onclick=pegarIncognitas()>Confirmar</button><br>"
    body.innerHTML += "<p>Tolerância = " + tolerancy + "</p>"
}

function pegarIncognitas() {
    let c = document.querySelectorAll(".coeficientes")
    let res = document.querySelectorAll(".r")

    results = new Array(quantity)
    matrix = new Array(quantity)

    body.innerHTML = ""
    
    //Resultados das Equações
    for(var i = 0; i < quantity; i++){
        results[i] = res[i].value
        // body.innerHTML += "<p>Resultado: " + results[i] + "</p>"
    }

    //Criando a Matriz e Recebendo os Valores
    for(var i = 0; i < quantity; i++){
        matrix[i] = new Array(quantity)
    }
    var count = 0
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++, count++){
            // body.innerHTML += "<p>Coeficiente: " + c[count].value + "</p>"
            matrix[i][j] = c[count].value
        }        
    }

    //Chamando a Função de Exibir Matriz
    exibirMatriz()
    ifConvergent(checarConvergencia())
}

function criarInput() {
    body.style.paddingTop = "20px"
    body.style.paddingBottom = "10px"
    body.style.borderTop = "2px solid black"
    body.style.marginTop = "20px"

    quantity = document.getElementById("incognita").value

    //Criando a matriz de aproximação
    nextAprox = new Array(quantity)
    previousAprox = new Array(quantity)

    tolerancy = document.getElementById("tolerancia").value
    if(tolerancy == "") tolerancy = 0

    decimal = document.getElementById("decimal").value
    if(decimal == "") decimal = 0

    entrada = document.getElementById("entrada").checked
    
    body.innerHTML = ""

    if(!entrada){
        for(var i = 0; i < quantity; i++){
            previousAprox[i] = 0
            nextAprox[i] = 0
        }

        print()
    }

    else {
        for(var i = 0; i < quantity; i++){
            body.innerHTML += "<label>Entrada <b>" + (i+1) + "</b>: <input type='number' class='e'> </label> <br>"
        }

        body.innerHTML += "<button id='confirmarEntrada' onclick='pegarEntrada()'>Confirmar</button><br> <br>"
    }
}

function pegarEntrada() {
    let ent = document.querySelectorAll(".e")
    for(var i = 0; i < quantity; i++){
        previousAprox[i] = ent[i].value
        nextAprox[i] = ent[i].value
    }
    // nextAprox = previousAprox
    print()
}

function checarConvergencia(){
    isConvergent = true
    for(var i = 0; i < quantity; i++){
        let sum = 0
        for(var j = 0; j < quantity; j++){
            if(i == j) continue
            else sum = sum + Math.abs(matrix[i][j])
        }
        if(sum >= Math.abs(matrix[i][i])){
            body.innerHTML += "<label>O método não é convergente porque a linha " + (i+1) + " não atende a condição</p>"
            isConvergent = false
            break
        }
        else continue
    }
    return isConvergent
}

//Exibindo a matriz
function exibirMatriz() {
    body.innerHTML +=  "<p>MATRIZ</p>"
    body.innerHTML += "<p>"
    for(var i = 0; i < quantity; i++){
        for(var j = 0; j < quantity; j++){
            body.innerHTML += matrix[i][j] + "   "
        }
        body.innerHTML += "<br>"
    }
    body.innerHTML += "</p>"
}

function calc(){
    for(var i = 0; i < quantity; i++){
        let sum = 0
        sum = sum + Number(results[i])
        for(var j = 0; j < quantity; j++){
            if(i==j) continue
            else sum = sum - matrix[i][j] * nextAprox[j]
        }
        sum = sum / matrix[i][i]
        sum = parseFloat(sum.toFixed(decimal))
        nextAprox[i] = sum
    }
}

function ifConvergent(checar){
    //Convergente
    if(checar){
        let l = 0
        while(true){
            l++
            calc()
            if(check()){
                body.innerHTML += "<p>x<sub>" + l + " = </sub>(" + nextAprox + ")</p>"
                continue
            }
            else{
                body.innerHTML += "</p>A Solução da Equação Linear é:<br> x<sub>" + l + " </sub>= (" + nextAprox + ")</p>"
                break
            }
        }
    }

    //Não convergente
    else body.innerHTML += "<label>O método não é convergente, por isso é impossível realizar o cálculo</label>"
}

function check(){
    for(var i = 0; i < quantity; i++){
        if(Math.abs(nextAprox[i] - previousAprox[i]) > tolerancy) checkCheck = false
        else continue
    }
    console.log(checkCheck)
    if(!checkCheck){
        for(var l = 0; l < quantity; l++){
            previousAprox[l] = nextAprox[l]
        }
        checkCheck = true
        return true
    }
    else return false
}