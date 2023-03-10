const URl = 'https://restcountries.com/v3.1/name/';
import Notiflix from 'notiflix';
function fetchCountries(name) {
    return   fetch( `${URl}${name}?fields=name,capital,population,flags,languages`)
    .then(response => { 
    if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    return response.json();})
    
}


export default fetchCountries;