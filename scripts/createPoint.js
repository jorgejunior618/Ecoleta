function loadUfs() {
  const selectUf = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then( res => res.json() )
  .then( states => {
    for( const state of states) {
      selectUf.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  } )
}

function getCities(event) {
  const selectCity = document.querySelector('select[name=city]');
  const ufInput = document.querySelector('input[name=state]');

  const apiUrl =
  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`;

  ufInput.value = event.target.options[event.target.selectedIndex].text;
  selectCity.innerHTML = '<option value="">Selecione a Cidade</option>'
  selectCity.disabled = true;

  fetch(apiUrl)
  .then(res => res.json())
  .then(cities => {
    for( const city of cities ) {
      selectCity.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      selectCity.disabled = false;
    }
  })
}

loadUfs();

const selectUf = document.querySelector('select[name=uf]');

selectUf.addEventListener('change', e => getCities(e));


const colectItems = document.querySelectorAll('.items-grid li');
const itemsInput = document.querySelector('input[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  const itemId = Number(itemLi.dataset.id);

  itemLi.classList.toggle('selected');
  const alreadySelected = selectedItems.findIndex(item => item === itemId);

  if(alreadySelected >= 0) {
    const filteredList = selectedItems.filter(item => item !== itemId);
    selectedItems = filteredList;
  } else {
    selectedItems.push(itemId);
  }

  selectedItems.sort();

  itemsInput.value = selectedItems. join(', ');
}

colectItems.forEach(item => {
  item.addEventListener('click', handleSelectedItem);
});
