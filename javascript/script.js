let ArmazenaQuizz = document.querySelector('.agrupaQuizzes');

function criarQuizz(mudar) {
    mudar = document.querySelector('.container_principal')
    mudar.classList.add('desativado');
    mudar = document.querySelector('.container-criacao')
    mudar.classList.remove('desativado')
    mudar = document.querySelector('.pagina1-criacao')
    mudar.classList.remove('desativado')
}

function passarPagDois(mudar){
    mudar = document.querySelector('.pagina1-criacao')
    mudar.classList.add('desativado');
    mudar = document.querySelector('.pagina2-criacao')
    mudar.classList.remove('desativado')
}

function passarPagTres(mudar){
    mudar = document.querySelector('.pagina2-criacao')
    mudar.classList.add('desativado');
    mudar = document.querySelector('.pagina3-criacao')
    mudar.classList.remove('desativado')
}


function puxaQuizz(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');

  promise.then(percorre);
}

function sucessoQuizz(promise){
    console.log(promise)
}



function percorre (promise){
    for(i=0; i<promise.data.length; i++){

        let id = promise.data[i].id;
        let titulo = promise.data[i].title;
        let imagem = promise.data[i].image;

        ArmazenaQuizz.innerHTML +=`<div class="quizz"><img src="${imagem}" alt="">
        <h3> ${titulo}</h3>
    </div>`
        
    }
    
}

puxaQuizz();