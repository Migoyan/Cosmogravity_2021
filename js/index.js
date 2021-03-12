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

// permet de faire défiler les images comme un diaporama
function suivante() {
  document.getElementById("image_defile").getElementsByTagName("img")[I].style.display = "none";
  I < Imax ? I++ : I = 0;
  document.getElementById("image_defile").getElementsByTagName("img")[I].style.display = "inline";
  setTimeout(suivante, 4E3)
}
