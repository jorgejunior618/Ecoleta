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

  fetch(apiUrl)
  .then(res => res.json())
  .then(cities => {
    for( const city of cities ) {
      selectCity.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      selectCity.disabled = false;
    }
  })
}

loadUfs();

const selectUf = document.querySelector('select[name=uf]');

selectUf.addEventListener('change', e => getCities(e));
