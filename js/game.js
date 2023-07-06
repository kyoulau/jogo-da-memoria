const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

//arays imagens
const albuns = [
    'adrenaline',
    'around',
    'bsides',
    'covers',
    'diamonds',
    'eros',
    'stn',
    'vinil',
    'gore',
    'koinoyokan',
    'likelinux',
    'ohms',
    'whitepony'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
//retorna o elemento e salva dentro da const card

//revelar carta 
let firstCard = '';
let secondCard = '';

//fim  jogo
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
  
    if (disabledCards.length === 26) {
      clearInterval(this.loop);
      alert(`Parabéns, ${spanPlayer.innerHTML} ! Seu tempo foi de: ${timer.innerHTML}`);
    }
  }

//checar cartas
const checkCards = () => {
    const firstAlbum = firstCard.getAttribute('data-album');
    const secondAlbum = secondCard.getAttribute('data-album');

    if (firstAlbum === secondAlbum) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
    
        firstCard = '';
        secondCard = '';
    
        checkEndGame();
    
      } else {
        setTimeout(() => {
    
          firstCard.classList.remove('reveal-card');
          secondCard.classList.remove('reveal-card');
    
          firstCard = '';
          secondCard = '';
    
        }, 500);
      }
    
    }

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
      return;
    }
  
    if (firstCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
  
    } else if (secondCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
  
      checkCards();
  
    }
  }

//criação de novas cartas
const createCard = (albun) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${albun}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.setAttribute('data-album', albun);
    card.addEventListener('click', revealCard);
    
    return card;
}

//funcao carregar jogo
const loadGame = () => {

    const duplicateAlbuns = [...albuns, ...albuns];

    const shuffledArray = duplicateAlbuns.sort(() => Math.random() - 0.5);
    duplicateAlbuns.forEach((albun) => {
        const card = createCard(albun);
        grid.appendChild(card);
    }); 
}

//tempo
const startTimer = () => {
 this.loop = setInterval(() =>{
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime +1;
  }, 1000);
}

//nome player
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

