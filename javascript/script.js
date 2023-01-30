let quiz = undefined;
let Quizz_atual;
let quantidade_Quizz;
let numero_Acertos = 0;

let idQuiz;

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
  titulo = document.getElementById("titulo").value;
  urlImagem = document.getElementById("p1-url").value;
  qtdePerguntas = document.getElementById("qtde-perguntas").value;
  qtdeNiveis = document.getElementById("qtde-niveis").value;

  if (
    titulo.length < 20 ||
    titulo.length > 65 ||
    qtdePerguntas === "" ||
    qtdePerguntas < 3 ||
    isNaN(qtdePerguntas) ||
    qtdeNiveis === "" ||
    qtdeNiveis < 2 ||
    isNaN(qtdeNiveis)
  ) {
    return alert("Por favor, preencha os dados corretamente");
  }

  mudar = document.querySelector(".pagina1-criacao");
  mudar.classList.add("desativado");

  mudar = document.querySelector(".pagina2-criacao");
  mudar.classList.remove("desativado");

  const criarPerguntas = document.querySelector(".pagina2-criacao");

  for (let i = 0; i < qtdePerguntas; i++) {
    criarPerguntas.innerHTML += `
    <div class="pergunta-fechada"><span class='nome-pergunta'>Pergunta ${
      i + 1
    }</span>
    <img src="./ícones/editar.png" alt="" onclick='abrirPergunta(this)' id='edit-pergunta'>
    </div>
    `;
  }

  criarPerguntas.innerHTML += `<button onclick="passarPagTres()">Prosseguir para criar níveis</button>`;

  quiz = {
    title: `${titulo}`,
    image: `${urlImagem}`,
    questions: [],
    levels: [],
  };

  const primeiraPergunta = document.getElementById("edit-pergunta");

  abrirPergunta(primeiraPergunta);
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

function passarPagTres(mudar) {
  console.log(qtdeNiveis);

  if (document.querySelector(".pergunta-fechada") !== null) {
    return alert("Por favor, preencha todos os campos");
  }

  const todasPerguntas = document.querySelectorAll(".pergunta");
  let perguntas = undefined;

  for (let i = 0; i < todasPerguntas.length; i++) {
    const input = todasPerguntas[i].querySelectorAll("input");

    if (
      input[0].value.length < 20 ||
      input[0].value === "" ||
      input[1].value.length !== 7 ||
      input[1].value.startsWith("#") === false ||
      input[1].value.replace(/[^a-fA-f0-9#]/g, "") !== input[1].value ||
      input[2].value === "" ||
      input[4] === "" ||
      input[5] === ""
    ) {
      return alert("Por favor, preencha os dados corretamente");
    }

    perguntas = {
      title: `${input[0].value}`,
      color: `${input[1].value}`,
      answers: [
        {
          text: `${input[2].value}`,
          image: `${input[3].value}`,
          isCorrectAnswer: true,
        },
        {
          text: `${input[4].value}`,
          image: `${input[5].value}`,
          isCorrectAnswer: false,
        },
      ],
    };

    if (input[6].value && input[7].value !== "") {
      perguntas.answers.push({
        text: `${input[6].value}`,
        image: `${input[7].value}`,
        isCorrectAnswer: false,
      });
    }

    if (input[8].value && input[9].value !== "") {
      perguntas.answers.push({
        text: `${input[8].value}`,
        image: `${input[9].value}`,
        isCorrectAnswer: false,
      });
    }
    quiz.questions.push(perguntas);
  }

  console.log(quiz);

  const criarNiveis = document.querySelector(".pagina3-criacao");

  for (let i = 0; i < qtdeNiveis; i++) {
    criarNiveis.innerHTML += `
        <div class="nivel-fechado">
            <span class='nome-nivel'>Nível ${i + 1}</span>
            <img src="./ícones/editar.png" alt="" onclick='abrirNivel(this)' id='edit-nivel'>
        </div>
    `;
  }

  criarNiveis.innerHTML +=
    "<button onclick='finalizarCriacaoQuiz()'>Finalizar Quizz</button>";

  mudar = document.querySelector(".pagina2-criacao");
  mudar.classList.add("desativado");

  mudar = document.querySelector(".pagina3-criacao");
  mudar.classList.remove("desativado");

  const primeiroNivel = document.getElementById("edit-nivel");
  abrirNivel(primeiroNivel);
}

function abrirNivel(elemento) {
  const nivelFechado = elemento.parentNode;
  nivelFechado.classList.remove("nivel-fechado");

  const nomeNivel = nivelFechado.querySelector(".nome-nivel");

  nivelFechado.innerHTML = `
        <div class='nivel'>
            <div class="nivel-infos">${nomeNivel.innerHTML}
                <div class="nivel-input">
                    <input type="text" placeholder="Título do nível">
                    <input type="text" placeholder="% de acerto mínima" class='porcentagem'>
                    <input type="text" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
                </div>
            </div>
        </div>`;
}

function finalizarCriacaoQuiz() {
  if (document.querySelector(".nivel-fechado") !== null) {
    return alert("Por favor, preencha todos os campos");
  }

  const todosNiveis = document.querySelectorAll(".nivel");
  let niveis = undefined;

  const porcentagem = document.querySelectorAll(".porcentagem");
  const porcentagens = [];

  for (let u = 0; u < todosNiveis.length; u++) {
    porcentagens.push(porcentagem[u].value);
  }

  console.log(porcentagens);

  for (let i = 0; i < todosNiveis.length; i++) {
    const input = todosNiveis[i].querySelectorAll("input");

    if (
      input[0].value.length < 10 ||
      isNaN(input[1].value) ||
      input[1].value < 0 ||
      input[1].value > 100 ||
      input[3].value.length < 30 ||
      porcentagens.includes("0") === false
    ) {
      return alert("Por favor, preencha os dados corretamente");
    }

    niveis = {
      title: `${input[0].value}`,
      image: `${input[2].value}`,
      text: `${input[3].value}`,
      minValue: Number(input[1].value),
    };

    quiz.levels.push(niveis);
  }

  console.log(quiz);

  document.querySelector(".pagina3-criacao").classList.add("desativado");
  document.querySelector(".pagina4-criacao").classList.remove("desativado");

  document
    .querySelector(".pagina4-img img")
    .setAttribute("src", `${urlImagem}`);

  document.querySelector(".titulo-quiz").innerHTML = `${titulo}`;

  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    quiz
  );
  promessa.then(sucessoEnvioQuiz);
}

function sucessoEnvioQuiz(quiz) {
  alert("quiz enviado nessa porra");

  console.log(quiz.data.id);

  idQuiz = quiz.data.id;
}

function acessarQuiz() {
  document.querySelector(".pagina4-criacao").classList.add("desativado");
  document.querySelector(".container-criacao").classList.add("desativado");
  document.querySelector(".container_quizz").classList.remove("desativado");

  pegaQuizz(idQuiz);
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
    ArmazenaQuizz.innerHTML = '<div class="texto" onclick="puxaQuizz()"><h2>Todos os Quizzes</h2></div>';
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
        let vector_answers = Quizz_atual.data.questions[i].answers;
        vector_answers.sort(function(){return Math.random() - 0.5})
        for (let j = 0; j < vector_answers.length; j++) {
            let isCorrect = 'errada';
            if (vector_answers[j].isCorrectAnswer) {
                isCorrect = "certa";
            }
            elemento_html += `
                <div class="opcao ${isCorrect}" onclick="verificaClick(this);">
                    <img src="${vector_answers[j].image}">
                    <p>${vector_answers[j].text}</p>
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