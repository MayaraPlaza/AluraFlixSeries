addBtn.addEventListener('click', () => {
  const movieName = movieNameInput.value;
  const movieURL  = movieURLInput.value;

  if(verifyParameters(movieName, movieURL)) {
    addNewMovie(movieName, movieURL);
  }
});

const movieNameInput = document.querySelector('#movie-name');
const movieURLInput  = document.querySelector('#movie-url');
const cardsList      = document.querySelector('.cards-list');
const errorElement   = document.querySelector('.error')

const moviesList = [
  {
    id: 1,
    name: "Breaking Bad",
    url: "https://images.justwatch.com/poster/8594406/s332/kausi-2"
  },
  {
    id: 2,
    name: "Suits",
    url: "https://br.web.img2.acsta.net/pictures/14/03/28/10/18/433386.jpg"
  },
  {
    id: 3,
    name: "Stranger Things",
    url: "https://www.guiadasemana.com.br/contentFiles/system/pictures/2016/7/165817/original/poster.jpg"
  },
  {
    id: 4,
    name: "The Umbrella Academy",
    url: "https://br.web.img3.acsta.net/pictures/18/12/10/14/01/0178829.jpg"
  },
  {
    id: 5,
    name: "Pretty Little Liars",
    url: "https://m.media-amazon.com/images/I/714pFN3OxoL._AC_SL1500_.jpg"
  },
  {
    id: 6,
    name: "Supernatural",
    url: "https://m.media-amazon.com/images/I/81q83ZvroSL._SY445_.jpg"
  },
  {
    id: 7,
    name: "The Boys",
    url: "https://cdna.artstation.com/p/assets/images/images/020/067/604/large/diiego-designer-the-boys-copia.jpg?1566234003"
  },
  {
  id: 8,
    name: "You",
    url: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/855/public/media/image/2019/01/MV5BMjM0MDA2NDEzNF5BMl5BanBnXkFtZTgwODYzNjg4NTM%40._V1_SY1000_CR0%2C0%2C666%2C1000_AL_.jpg?itok=6fYcv0rz"
  },
  {
    id: 9,
      name: "Dark",
      url: "https://fr.web.img2.acsta.net/c_310_420/pictures/17/11/10/12/18/2448823.jpg"
    },
    {
      id: 10,
        name: "Better Call Saul",
        url: "https://flxt.tmsimg.com/assets/p15677306_b_v8_aa.jpg"
      },
      {
      id: 11,
        name: "Euphoria",
        url: "https://br.web.img3.acsta.net/pictures/19/06/18/12/06/4123858.jpg"
      },
      {
        id: 12,
          name: "Elite",
          url: "https://seuladogeek.com.br/wp-content/uploads/2022/03/Elite-serie-poster.jpg"
        },
];

updateDisplayedMovies()

function addNewMovie(movieName, movieURL) {
  const movie = {
    id: moviesList.length + 1,
    name: movieName,
    url: movieURL
  }

  moviesList.push(movie)

  updateDisplayedMovies();
}

function verifyParameters(name, url) {
  if(!name) {
    errorElement.textContent = 'É necessário colocar o nome do Filme/Série.'
    return false;
  }

  if(!(url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg'))) {
    errorElement.textContent = 'É necessário colocar um link de uma imagem .jpg, .png ou .jpeg'
    return false;
  }

  for(let i in moviesList) {
    if(url == moviesList[i].url || name == moviesList[i].name) {
      errorElement.textContent = 'Este filme já existe na lista, tente adicionar um novo.'
      return false;
    }
  }

  errorElement.textContent = '';
  return true;
}

function createCardElement(movieName, imageURL, movieID) {
  const cardDiv      = document.createElement('div');
  const cardImg      = document.createElement('img');
  const cardTitle    = document.createElement('span');
  const removeButton = document.createElement('button');

  cardImg.src = imageURL;

  if(movieName.length > 20) {
    cardTitle.textContent = movieName.substr(0,21) + "...";
  } else {
    cardTitle.textContent = movieName;
  }

  cardDiv.setAttribute('class', 'card');
  cardDiv.setAttribute('onmouseover', 'mouseOver(event)');
  cardDiv.setAttribute('onmouseout', 'mouseOut(event)');
  cardDiv.setAttribute('title', movieName);

  removeButton.setAttribute('class', 'fa-solid fa-trash-can');
  removeButton.setAttribute('onclick', `removeMovie(${movieID})`);
  removeButton.setAttribute('title', 'Remover Filme/Série');

  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(removeButton);
  cardDiv.appendChild(cardTitle);

  return cardDiv;
}

function updateMoviesId() {
  for(let i in moviesList) {
    const ID = Number(i) + 1;

    moviesList[i].id = ID;
  }
}

function updateDisplayedMovies() {
  cardsList.innerHTML = '';

  moviesList.forEach((movie) => {
    const cardElement = createCardElement(movie.name, movie.url, movie.id);

    cardsList.appendChild(cardElement);
  })
}

function removeMovie(id) {
  const index = id - 1;

  moviesList.splice(index, 1);

  updateMoviesId();
  updateDisplayedMovies();
}

function mouseOver(event) {
  const allCards = document.querySelectorAll('.card');
  const target = event.target.offsetParent;

  allCards.forEach((card) => {
    if(card == target) {
      card.classList.add('show-remove')
      return;
    }

    card.classList.add('blur')
  })
}

function mouseOut(event) {
  const allCards = document.querySelectorAll('.card');
  const target = event.target.offsetParent;

  allCards.forEach((card) => {
    if(card == target) {
      card.classList.remove('show-remove')
      return;
    }

    card.classList.remove('blur')
  })
}