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

function sucessoEnvioQuiz() {
  alert("quiz enviado nessa porra");
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