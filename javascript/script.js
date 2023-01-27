let quiz = undefined;
let Quizz_atual;
let quantidade_Quizz;
let numero_Acertos = 0;

function criarQuizz(mudar) {
    mudar = document.querySelector(".container_principal");
    mudar.classList.add("desativado");

    mudar = document.querySelector(".container-criacao");
    mudar.classList.remove("desativado");

    mudar = document.querySelector(".pagina1-criacao");
    mudar.classList.remove("desativado");
}

let titulo = undefined;
let urlImagem = undefined;
let qtdePerguntas = undefined;
let qtdeNiveis = undefined;

function passarPagDois(mudar) {
    mudar = document.querySelector(".pagina1-criacao");
    mudar.classList.add("desativado");

    mudar = document.querySelector(".pagina2-criacao");
    mudar.classList.remove("desativado");

    titulo = document.getElementById("titulo").value;
    urlImagem = document.getElementById("p1-url").value;
    qtdePerguntas = document.getElementById("qtde-perguntas").value;
    qtdeNiveis = document.getElementById("qtde-niveis").value;

    const criarPerguntas = document.querySelector(".pagina2-criacao");

    for (let i = 0; i < qtdePerguntas; i++) {
        criarPerguntas.innerHTML += `
    <div class="pergunta-fechada"><span class='nome-pergunta'>Pergunta ${i + 1
            }</span>
        <img src="./ícones/editar.png" alt="" onclick='abrirPergunta(this)'>
    </div>
    `;
    }

    criarPerguntas.innerHTML += `<button onclick="passarPagTres()">Prosseguir para criar níveis</button>`;

    quiz = { title: `${titulo}`, image: `${urlImagem}`, questions: [] };
}

function passarPagTres(mudar) {
    mudar = document.querySelector(".pagina2-criacao");
    mudar.classList.add("desativado");

    mudar = document.querySelector(".pagina3-criacao");
    mudar.classList.remove("desativado");

    const todasPerguntas = document.querySelectorAll(".pergunta");
    let perguntas = undefined;

    for (let i = 0; i < todasPerguntas.length; i++) {
        perguntas = {
            title: `${todasPerguntas[i].querySelectorAll("input")[0].value}`,
            color: `${todasPerguntas[i].querySelectorAll("input")[1].value}`,
            answers: [
                {
                    text: `${todasPerguntas[i].querySelectorAll("input")[2].value}`,
                    image: `${todasPerguntas[i].querySelectorAll("input")[3].value}`,
                    isCorrectAnswer: true,
                },
                {
                    text: `${todasPerguntas[i].querySelectorAll("input")[4].value}`,
                    image: `${todasPerguntas[i].querySelectorAll("input")[5].value}`,
                    isCorrectAnswer: false,
                },
            ],
        };

        if (
            todasPerguntas[i].querySelectorAll("input")[6].value &&
            todasPerguntas[i].querySelectorAll("input")[7].value !== ""
        ) {
            perguntas.answers.push({
                text: `${todasPerguntas[i].querySelectorAll("input")[6].value}`,
                image: `${todasPerguntas[i].querySelectorAll("input")[7].value}`,
                isCorrectAnswer: false,
            });
        }

        if (
            todasPerguntas[i].querySelectorAll("input")[8].value &&
            todasPerguntas[i].querySelectorAll("input")[9].value !== ""
        ) {
            perguntas.answers.push({
                text: `${todasPerguntas[i].querySelectorAll("input")[8].value}`,
                image: `${todasPerguntas[i].querySelectorAll("input")[9].value}`,
                isCorrectAnswer: false,
            });
        }
    }
    quiz.questions.push(perguntas);

    console.log(quiz);
}

function abrirPergunta(elemento) {
    const perguntaFechada = elemento.parentNode;
    perguntaFechada.classList.remove("pergunta-fechada");

    const pergunta = elemento.parentNode.querySelector(".nome-pergunta");

    perguntaFechada.innerHTML = `<div class='pergunta'>
  <div class="pergunta-infos">${pergunta.innerHTML}
                <div class="pergunta-input margin-top-12px">
                    <input type="text" placeholder="Texto da pergunta" id='texto-pergunta'>
                    <input type="text" placeholder="Cor de fundo da pergunta" id='cor-pergunta'>
                </div>
                <span class="margin-top-28px">Resposta correta</span>
                <div class="pergunta-input margin-top-24px">
                    <input type="text" placeholder="Resposta correta" id='resposta-correta'>
                    <input type="text" placeholder="URL da imagem" id='img-correta'>
                </div>
                <span class="margin-top-28px">Respostas incorretas</span>
                <div class="pergunta-input margin-top-14px">
                    <input type="text" placeholder="Resposta incorreta 1" id='resposta-incorreta1'>
                    <input type="text" placeholder="URL da imagem 1" id='img-incorreta1'>
                </div>
                <div class="pergunta-input margin-top-33px">
                    <input type="text" placeholder="Resposta incorreta 2" id='resposta-incorreta2'>
                    <input type="text" placeholder="URL da imagem 2" id='img-incorreta2'>
                </div>
                <div class="pergunta-input margin-top-33px">
                    <input type="text" placeholder="Resposta incorreta 3" id='resposta-incorreta3'>
                    <input type="text" placeholder="URL da imagem 3" id='img-incorreta3'>
                </div>     
                </div>  
                </div>            
                `;
}

function puxaQuizz() {
    const promise = axios.get(
        "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
    );

    promise.then(percorre);
}

function sucessoQuizz(promise) {
    console.log(promise);
}

function percorre(promise) {
    let ArmazenaQuizz = document.querySelector(".agrupaQuizzes");
    ArmazenaQuizz.innerHTML = '';
    for (i = 0; i < promise.data.length; i++) {
        let id = promise.data[i].id;
        let titulo = promise.data[i].title;
        let imagem = promise.data[i].image;

        ArmazenaQuizz.innerHTML += `<div id="${id}" class="quizz" onclick="getQuizz(this);"><img src="${imagem}" alt="">
            <h3> ${titulo}</h3>
        </div>`;
    }
}

function verificaFim() {
    const nuemroDeRespondidos = document.querySelectorAll(".respondido");
    if (nuemroDeRespondidos.length === quantidade_Quizz) {
        const pocento_acerto = Math.round((numero_Acertos / quantidade_Quizz) * 100);
        let level_selecionado;
        for (let i = 0; i < Quizz_atual.data.levels.length; i++) {
            if (Quizz_atual.data.levels[i].minValue <= pocento_acerto) {
                level_selecionado = Quizz_atual.data.levels[i];
            }
        }
        const tela_quizz = document.querySelector(".corpo_quizz");
        tela_quizz.innerHTML += `
        <div class="resultado_quizz">
            <div class="top_resultado">
                <h3>${pocento_acerto}% de acerto: ${level_selecionado.title}</h3>
            </div>
        <div class="corpo_resposta">
                <img src="${level_selecionado.image}">
                <p>${level_selecionado.text}</p>
            </div>
        </div>
        <div class="botoes_quizz">
            <button class="reiniciar_quizz" onclick="reiniciaQuizz();">Reiniciar Quizz</button>
            <button class="voltar_home" onclick="voltaHome();">Voltar pra home</button>
        </div>
        `
        const resultado = document.querySelector(".resultado_quizz");
        setTimeout(function () {
            resultado.scrollIntoView();
        }, 2000);
    } else {
        const listaRespondidos = document.querySelectorAll(".responder_quizz");
        for (let i = 0; i < listaRespondidos.length; i++) {
            if (!listaRespondidos[i].classList.contains("respondido")) {
                setTimeout(function () {
                    listaRespondidos[i].scrollIntoView();
                }, 2000);
                break;
            }
        }
    }
}

function verificaClick(elementoClicado) {
    if (!elementoClicado.parentNode.parentNode.classList.contains("respondido")) {
        elementoClicado.parentNode.parentNode.classList.add("respondido");
        const listaElementos = elementoClicado.parentNode.querySelectorAll(".opcao");
        if (elementoClicado.classList.contains("certa")) {
            numero_Acertos++;
        }
        for (let i = 0; i < listaElementos.length; i++) {
            if (listaElementos[i].classList.contains("certa")) {
                listaElementos[i].style = "color:#009C22";
            } else {
                listaElementos[i].style = "color:#FF4B4B";
            }
            if (listaElementos[i] !== elementoClicado) {
                listaElementos[i].classList.add("opaco");
            }
        }
        verificaFim();
    }
}

function carregaQuizz(Quizz) {
    Quizz_atual = Quizz;
    numero_Acertos = 0;
    const tela_quizz = document.querySelector(".container_quizz");
    tela_quizz.innerHTML = '';
    let elemento_html = '';

    tela_quizz.innerHTML += `
        <header>
            <h1>BuzzQuizz</h1>
        </header>
        <div class="nome_quizz">
            <div class="escurecido"></div>
            <img src="${Quizz_atual.data.image}">
            <h2>${Quizz_atual.data.title}</h2>
        </div>
        <div class="corpo_quizz">
            
        </div>
    `;

    const corpo_pg = document.querySelector(".corpo_quizz");

    for (let i = 0; i < Quizz_atual.data.questions.length; i++) {
        elemento_html += `
        <div class="responder_quizz">
            <div class="top_responder" style="background-color: ${Quizz_atual.data.questions[i].color};">
                <h3>${Quizz_atual.data.questions[i].title}</h3>
            </div>
            <div class="opcoes">
        `;
        for (let j = 0; j < Quizz_atual.data.questions[i].answers.length; j++) {
            let isCorrect = 'errada';
            if (Quizz_atual.data.questions[i].answers[j].isCorrectAnswer) {
                isCorrect = "certa";
            }
            elemento_html += `
                <div class="opcao ${isCorrect}" onclick="verificaClick(this);">
                    <img src="${Quizz_atual.data.questions[i].answers[j].image}">
                    <p>${Quizz_atual.data.questions[i].answers[j].text}</p>
                </div>
            `;
        }
        elemento_html += `
            </div>
        </div>
        `;
        corpo_pg.innerHTML += elemento_html;
        elemento_html = '';
    }

    quantidade_Quizz = document.querySelectorAll(".responder_quizz").length;
}
function reiniciaQuizz() {
    const scroll = document.querySelector(".nome_quizz");
    scroll.scrollIntoView();
    carregaQuizz(Quizz_atual);
}
function voltaHome(){
    console.log("passou");
    const containerQuizz = document.querySelector(".container_quizz");
    containerQuizz.classList.add("desativado");
    const paginaPrincipal = document.querySelector(".container_principal");
    paginaPrincipal.classList.remove("desativado");
    puxaQuizz();
}
function pegaQuizz(Element_id) {
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${Element_id}`);
    promessa.then(carregaQuizz);
}

function getQuizz(thisElement) {
    const tela_principal = document.querySelector(".container_principal");
    tela_principal.classList.add("desativado");
    const tela_quizz = document.querySelector(".container_quizz");
    tela_quizz.classList.remove("desativado");
    pegaQuizz(thisElement.id);
}

puxaQuizz();