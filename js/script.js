const nomePersonagem = document.querySelector('.nome')
const alturaPersonagem = document.querySelector('.altura')
const pesoPersonagem = document.querySelector('.peso')
const botaoProximo = document.querySelector('.btn-proximo')
const botaoAnterior = document.querySelector('.btn-anterior')
const personagemImg = document.querySelector(".imagem")

let escolherPersonagem = 1;

const fetchPersonagem = async (personagem) => {

    const APIpersonagem = await fetch(`https://swapi.dev/api/people/${personagem}`);

    if (APIpersonagem.status === 200) {

        const dados = await APIpersonagem.json();
        console.log(dados)
        return dados;
    }
}

const mostrarPersonagem = async (personagem) => {

    const dados = await fetchPersonagem(personagem);
    nomePersonagem.innerHTML = dados.name
    alturaPersonagem.innerHTML = `Altura - ${dados.height}`
    pesoPersonagem.innerHTML = `Peso - ${dados.mass}`
    
    personagemImg.src = `./image/${escolherPersonagem}.png`

    const films = dados.films
    const lista = document.querySelector('#filmes')
    lista.innerHTML = ''

    for (i in films){
        const APIfilme = await fetch(films[i]);
            if (APIfilme.status === 200) {
            const dadosfilme = await APIfilme.json();
            console.log(dadosfilme)

            li = document.createElement('li')
            li.innerHTML = dadosfilme.title
            lista.append(li)
        }
    }
}

botaoAnterior.addEventListener('click', () => {
    if (escolherPersonagem > 1){
        escolherPersonagem -= 1;
        mostrarPersonagem(escolherPersonagem);
    }
});
botaoProximo.addEventListener('click', () => {
    escolherPersonagem += 1;
    mostrarPersonagem(escolherPersonagem);
    console.log(escolherPersonagem)
});

mostrarPersonagem(escolherPersonagem)
// console.log('teste' , escolherPersonagem)