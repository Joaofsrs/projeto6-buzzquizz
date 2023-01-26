let ArmazenaQuizz = document.querySelector(".agrupaQuizzes");

let quiz = undefined;

function criarQuizz(mudar) {
  mudar = document.querySelector(".container_principal");
  mudar.classList.add("desativado");

  mudar = document.querySelector(".container-criacao");
  mudar.classList.remove("desativado");

  mudar = document.querySelector(".pagina1-criacao");
  mudar.classList.remove("desativado");
}

function passarPagDois(mudar) {
  mudar = document.querySelector(".pagina1-criacao");
  mudar.classList.add("desativado");

  mudar = document.querySelector(".pagina2-criacao");
  mudar.classList.remove("desativado");
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

    ArmazenaQuizz.innerHTML += `<div class="quizz"><img src="${imagem}" alt="">
        <h3> ${titulo}</h3>
    </div>`;
  }

  console.log(perguntaFechada);
}

puxaQuizz();
