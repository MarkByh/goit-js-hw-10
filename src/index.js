import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from "./fetchCountries";
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const inputCounryName = document.getElementById('search-box')
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputCounryName.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))




function onInput(event) {
    event.preventDefault();
    const countryName = event.target.value.trim();
    if(!countryName) {
        clearBox()
        return;
    }

    fetchCountries(countryName)
    .then(data => {
        if(data.length > 10) {
            clearBox();
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
            return;
        }
        renderCountries(data);
    }).catch(error=>{
        clearBox();
        console.log('error');
    })
}

function renderCountries(elem) {
    let renderList = '';
    let renderCountry = "";
    clearBox()
    if (elem.length === 1) {
       renderCountry= renderCountryInfo(elem);
    countryInfo.innerHTML = renderCountry;
    }
    else{
        renderList = rendercountryList(elem);
     
     countryList.innerHTML = renderList;
    }
    elem.innerHTML = '';     
}


function rendercountryList(elem) {
    return elem.map(({ name, flags }) =>
        `<li class="country-list-item">
        <img class="country-list-img" 
        src="${flags.svg}" 
        alt="${name.official}" 
        width="30" 
        height="20">
        ${name.official}
        </li>`
    ).join('');
    
}
function renderCountryInfo(elem){
    return elem.map(({capital, name, flags, population,  languages }) =>
        `<div class="country">
        <img src="${flags.svg}" alt="${name.official}"  width="70" 
        height="50">
        <h2 class="countryName">${name.official}</h2>
        </div>
        <ul>
          <li><p>Capital: ${capital}</p>  </li>
          <li><p>Population: ${population}</p> </li>
          <li><p>Languages: ${Object.values(languages)}</p> </li>
        </ul>`
    ).join('');
}

function clearBox() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}