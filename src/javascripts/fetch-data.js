'use strict';

document.addEventListener('DOMContentLoaded', function() {

  let url = 'https://jsonplaceholder.typicode.com/users',
      content = document.getElementById('js-content'),
      jsSearch = document.getElementById('js-search'),
      searchElm = document.getElementById('js-search-input'),
      searchedText = searchElm.value ? searchElm.value : "";

  fetchContent(url);

  searchElm.addEventListener('search', () => {
    searchedText = searchElm.value ? searchElm.value : "";
    resetFilter();
    hideMessage();
  }, false);

  searchElm.addEventListener('keyup', () => {
    searchedText = searchElm.value ? searchElm.value : "";
    if(!searchedText) {
      resetFilter();
      jsSearch.disabled = true;
    } else {
      jsSearch.disabled = false;
    }
  }, false);

  jsSearch.addEventListener('click', () => {
    searchedText = searchElm.value ? searchElm.value : "";
    fetchContent(url, searchedText);
  }, false);

});


let fetchContent = (url, searchedText) => {

  fetch(url)
    .then(function(response) {
      document.getElementById('js-spinner').style.opacity = '0';
      return response.json();
    })
    .then(function(data) {

      let content = document.getElementById("js-content");
      document.getElementById('js-content').style.opacity = '1';

      if(searchedText) {
        let results = filterContent(data, searchedText);
      } else {
        for (let i = 0; i < data.length; i++) {

          let users = {
            id: data[i].id,
            city: data[i].address.city,
            company: data[i].company.name,
            email: data[i].email,
            name: data[i].name,
            phone: data[i].phone,
            website: data[i].website
          }

          let userCardHtml = buildUserCard(users);
          content.innerHTML += userCardHtml;
        }
      }

    })
    .catch(function(error) {
      console.error('Error:', error);
    });

}
