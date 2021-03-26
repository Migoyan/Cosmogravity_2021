/* Fichier pour rasemble les fonction du zoom et autre bouton des simulation */



// Fonction bouton pause
// tirer du dossier calcul_trajectoire_inter_photon
function pausee(compteur,mobile,mobilefactor) {

    if (mobile.pause == false) {
        mobile.pause = true;
        document.getElementById("pau").src = "Images/lecture.png";
        document.getElementById("pau").title = texte.pages_trajectoire.bouton_lecture;
        document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_enpause;
        clearInterval(mobile.myInterval);
    } 
    else {
      if(mobile.peuxonrelancer == true) {
      mobile.pause = false;
      document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_encours;
      document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
      document.getElementById("pau").src = "Images/pause.png";
      mobile.myInterval = setInterval(animate.bind(null,compteur,mobile,mobilefactor), 10/6);
      }
    }
  }