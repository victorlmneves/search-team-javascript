let hideMessage = (results) => {

  if(results === 0) {
    document.getElementById('js-no-results').style.display = "flex";;
  } else {
    document.getElementById('js-no-results').style.display = "none";;
  }

}
