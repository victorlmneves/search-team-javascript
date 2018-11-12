(function() {
  const MODULE_NAME = 'cartrack',
        NAMESPACE = 'ct';

  window[NAMESPACE] = window[NAMESPACE] || {};

  window[NAMESPACE][MODULE_NAME] = {

      init: () => {
        let url = 'https://jsonplaceholder.typicode.com/users',
            jsonData = [];
        return window[NAMESPACE][MODULE_NAME].fetchContent(url);
      },

      fetchContent: (url, searchedText) => {

        let content = document.getElementById('js-content'),
            jsSearch = document.getElementById('js-search'),
            searchElm = document.getElementById('js-search-input')

        searchElm.addEventListener('search', () => {
          searchedText = searchElm.value ? searchElm.value : "";
          window[NAMESPACE][MODULE_NAME].resetFilter();
          window[NAMESPACE][MODULE_NAME].hideMessage();
        }, false)

        searchElm.addEventListener('keyup', () => {
          searchedText = searchElm.value ? searchElm.value : "";
          if(!searchedText) {
            window[NAMESPACE][MODULE_NAME].resetFilter();
            jsSearch.disabled = true;
          } else {
            jsSearch.disabled = false;
          }
        }, false)

        jsSearch.addEventListener('click', () => {
          searchedText = searchElm.value ? searchElm.value : "";
          window[NAMESPACE][MODULE_NAME].filterContent(searchedText);
        }, false)

        fetch(url)
          .then(function(response) {
            document.getElementById('js-spinner').style.opacity = '0';
            return response.json();
          })
          .then(function(data) {

            document.getElementById('js-content').style.opacity = '1';
            jsonData = data;

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

              let userCardHtml = window[NAMESPACE][MODULE_NAME].buildUserCard(users);
              content.innerHTML += userCardHtml;
            }

          })
          .catch(function(error) {
            console.error('Error:', error);
          })

      },

      buildUserCard: (users) => {

        let html = `<div class="users__content">
                      <div class="users__item users__item--user" data-name="${users.name}">${users.name}</div>
                      <div class="users__item">${users.company}</div>
                      <div class="users__item"><a class="users__link" href="mailto:${users.email}">${users.email}</a></div>
                      <div class="users__item"><a class="users__link" href="tel:${users.phone}">${users.phone}</a></div>
                      <div class="users__item">${users.website}</div>
                      <div class="users__item users__item--address">${users.city}</div>
                      <a href="tel:${users.phone}" class="users__button">
                        <i class="icon-phone"></i>
                        Contact
                      </a>
                    </div>`;
        return html;

      },

      filterContent: (searchedText) => {

        let j = 0,
            results = 0,
            searchName = "name",
            searchEmail = "email",
            searchVal = searchedText.toLowerCase(),
            content = document.getElementById('js-content'),
            nodes = document.getElementById('js-content').childNodes;

        for (let i=0; i < jsonData.length; i++) {

          j++;
          if (!jsonData[i][searchName].toLowerCase().includes(searchVal) && !jsonData[i][searchEmail].toLowerCase().includes(searchVal)) {
            if (nodes[j].nodeName.toLowerCase() === 'div') {
              nodes[j].style.display = "none";
            }
          } else {
            if (nodes[j].nodeName.toLowerCase() === 'div') {
              results++;
              nodes[j].style.display = "block";
            }
          }

        }

        window[NAMESPACE][MODULE_NAME].hideMessage(results);

      },

      resetFilter: () => {

        let cards = document.getElementsByClassName('users__content').length,
            nodes = document.getElementById('js-content').childNodes;

        for (let i=0; i < cards; i++) {
          if (nodes[i].nodeName.toLowerCase() === 'div') {
            nodes[i].style.display = "block";
          }
        }

      },

      hideMessage: (results) => {

        if(results === 0) {
          document.getElementById('js-no-results').style.display = "flex";;
        } else {
          document.getElementById('js-no-results').style.display = "none";;
        }

      }

  };

  window[NAMESPACE][MODULE_NAME].init();

})();
