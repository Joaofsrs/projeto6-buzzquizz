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