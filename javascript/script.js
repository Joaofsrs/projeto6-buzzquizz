let quiz = undefined;

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
  console.log(quiz);
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

  console.log(perguntaFechada);
}
