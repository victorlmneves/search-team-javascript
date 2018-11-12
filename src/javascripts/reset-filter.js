let resetFilter = () => {

  var cards = document.getElementsByClassName('users__content').length,
      nodes = document.getElementById('js-content').childNodes;

  for (let i=0; i < cards; i++) {
    if (nodes[i].nodeName.toLowerCase() === 'div') {
      nodes[i].style.display = "block";
    }
  }

}
