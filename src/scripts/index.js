const searchParams = {
  url: 'https://api.discogs.com/database/',
  token: {
    secret: 'mNHcAvOinUcwHakAVnJbLZDKTHMXfogm',
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


const resultContainer = document.querySelector('.catalog__list');
const loading = document.querySelector('.loading');

const onSubmitStart = () => {
  loading.innerHTML = `<span class="loading__loader"></span>
                       <span>Loading...</span>`
};


const render = (item) => {
  loading.innerHTML = '';

  const li = document.createElement('li');
  li.classList.add(`catalog__item`);
  li.innerHTML = `<div class="catalog__img-wrap">
                    <img
                        src="${item['cover_image']}"
                        width="190" height="190"
                        alt="${item['title']}"
                        loading="lazy">
                  </div>
                  <h2>${item['title']}</h2>`

  return li;
};

const getRelease = async (evt) => {

  try {
    evt.preventDefault();
    onSubmitStart();

    const searchValue = evt.target.elements[`searchInput`].value;

    const resp = await fetch(`${url}search?q=${searchValue}&key=${key}&secret=${secret}`);
    let data = await resp.json();

    const {pagination, results} = data;

    results.forEach(res => resultContainer.appendChild(render(res)))

    return results;
  }

  catch(err) {
    console.log(`Ошибка ${err}`)
  }
};


const onSubmit = (evt) => {
  resultContainer.innerHTML = ``;
  onSubmitStart();
  getRelease(evt).then(d => d);
}

document.querySelector('form').addEventListener('submit', onSubmit);






