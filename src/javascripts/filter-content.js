let filterContent = (data, searchedText) => {

  var j = 0,
      results = 0,
      searchName = "name",
      searchEmail = "email",
      searchVal = searchedText.toLowerCase(),
      content = document.getElementById('js-content'),
      nodes = document.getElementById('js-content').childNodes;

  for (let i=0; i < data.length; i++) {

    j++;
    if (!data[i][searchName].toLowerCase().includes(searchVal) && !data[i][searchEmail].toLowerCase().includes(searchVal)) {
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

  hideMessage(results);

}
