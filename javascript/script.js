let quiz = undefined;

let ArmazenaQuizz = document.querySelector(".agrupaQuizzes");

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
    <div class="pergunta-fechada"><span class='nome-pergunta'>Pergunta ${
      i + 1
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
  for (i = 0; i < promise.data.length; i++) {
    let id = promise.data[i].id;
    let titulo = promise.data[i].title;
    let imagem = promise.data[i].image;

    ArmazenaQuizz.innerHTML += `<div id="${id}" class="quizz" onclick="getQuizz(this);"><img src="${imagem}" alt="">
        <h3> ${titulo}</h3>
    </div>`;
  }
}

function carregaQuizz(Quizz){
    let tela_quizz = document.querySelector(".container_quizz")
    let elemento_html = '';
    console.log(Quizz.data);

    tela_quizz.innerHTML += `
        <div class="nome_quizz">
            <div class="escurecido"></div>
            <img src="${Quizz.data.image}">
            <h2>${Quizz.data.title}</h2>
        </div>
        <div class="corpo_quizz">
            
        </div>
    `

    
    let corpo_pg = document.querySelector(".corpo_quizz");

    /*
        <div class="resultado_quizz">
                <div class="top_resultado">
                    <h3>88% de acerto: Você é praticamente um aluno de Hogwarts!</h3>
                </div>
                <div class="corpo_resposta">
                    <img src="./imagens/resultado.png">
                    <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão
                        abaixo para usar o vira-tempo e reiniciar este teste.</p>
                </div>
            </div>
            <div class="botoes_quizz">
                <button class="reiniciar_quizz">Reiniciar Quizz</button>
                <button class="voltar_home">Voltar pra home</button>
            </div>
    */
    for(let i = 0; i < Quizz.data.questions.length; i++){
        
        elemento_html += `
        <div class="responder_quizz">
            <div class="top_responder" style="background-color: ${Quizz.data.questions[i].color};">
                <h3>${Quizz.data.questions[i].title}</h3>
            </div>
            <div class="opcoes">
        `;
        for(let j = 0; j < Quizz.data.questions[i].answers.length; j++){
            elemento_html += `
                <div class="opcao">
                    <img src="${Quizz.data.questions[i].answers[j].image}">
                    <p>${Quizz.data.questions[i].answers[j].text}</p>
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
    console.log(corpo_pg);
}

function deuCerto(Element_id){
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${Element_id}`);
    promessa.then(carregaQuizz);

    //style="background-color: #FFFFFF;"
}

function getQuizz(thisElement){
    console.log(thisElement.id)
    const tela_principal = document.querySelector(".container_principal");
    tela_principal.classList.add("desativado");
    const tela_quizz = document.querySelector(".container_quizz");
    tela_quizz.classList.remove("desativado");
    deuCerto(thisElement.id);
}

puxaQuizz();