let buildUserCard = (users) => {

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

}
