function avertissement_trajectoire() {
  var texte = o_recupereJson();
  var span = document.getElementById("txt_avertissement_trajectoire");
  span.innerHTML = texte.pages_trajectoire.avertissement;
  if(span.style.display == "none" || span.style.display == "") {
    span.style.display = "inline";
  } else {
    span.style.display = "none";
  }
}


function avertissement_univers() {
  var texte = o_recupereJson();
  var span = document.getElementById("txt_avertissement_univers");
  span.innerHTML = texte.page_univers_general.avertissement;
  //console.log(span.style.display);
  if(span.style.display == "none" || span.style.display == "") {
    span.style.display = "inline";
  } else {
    span.style.display = "none";
  }
}