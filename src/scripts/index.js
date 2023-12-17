const resultContainer = document.querySelector(`.catalog__list`);
const loading = document.querySelector(`.loading`);
const navList = document.querySelector(`.nav__list`);


const searchParams = {
  url: `https://api.discogs.com/database/`,
  token: {
    secret: `mNHcAvOinUcwHakAVnJbLZDKTHMXfogm`,
    key: 'vDFrSJVinLBdseXePtFc'
  },
  param: {
    key: `&key=`,
    search: `search?q=`,
    secret: `&secret=`,
  }
};

const {
  url,
  token: { key, secret },
  param: { keyParam, secretParam, searchParam }
} = searchParams;



const onSubmitLoading = () => {
  loading.innerHTML =
    `<span class="loading__loader"></span>`;
};


const render = (item) => {

  loading.innerHTML = '';

  const li = document.createElement(`li`);
  li.classList.add(`catalog__item`);
  li.innerHTML =
    `<div class="catalog__img-wrap">
      <img
      src="${item['cover_image']}"
      width="190" height="190"
      alt="${item['title']}"
      loading="lazy">
    </div>
    <h2>${item['title']}</h2>`

  return li;
};


const getRelease = async (style) => {

  try {
    // evt.preventDefault();

    onSubmitLoading();

    // const searchValue = evt.target.elements[`searchInput`].value;

    const resp = await fetch(`${url}search?q=${style}&key=${key}&secret=${secret}`);
    let data = await resp.json();

    const {pagination, results} = data;

    results.forEach(res => resultContainer.appendChild(render(res)))

    return results;
  }

  catch(err) {
    console.log(`Ошибка ${err}`)
  }
};


const onSubmit = (style) => {
  resultContainer.innerHTML = '';
  loading.innerHTML = '';

  onSubmitLoading();
  getRelease(style).then(d => d);
}

document.querySelector('form').addEventListener('submit', onSubmit);


navList.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  let style = evt.target.textContent;
  let searchInput = document.getElementById(`searchInput`);

  searchInput.value = style;
  onSubmit(style);
});

async function ff () {
  let resp = await fetch(`https://api.discogs.com/database/search?q=acid&key=${key}&secret=${secret}&page=200&per_page=50`)
  let res = await resp.json();

}

ff().then(d => d)


