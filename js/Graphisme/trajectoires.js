// fixe un bug d'actualisation du bouton rebond entre 2 rafraichissements sauvages
function init_rebond(){
  document.getElementById("rebondd").className = "myButton2";
  document.getElementById("boutton_ammorti").value = "0";
}

// actualisation bouton trajectoire complete quand pression
function pressionBouttonTrajectoireComplete() {
  if (document.getElementById("r1").className == "myButton2") {
    document.getElementById("r1").className = "myButton";
    document.getElementById("r2").className = "myButton2";
  }
}

// actualisation bouton trajectoire simple quand pression
function pressionBouttonTrajectoireSimple() {
  if (document.getElementById("r2").className == "myButton2") {
    document.getElementById("r2").className = "myButton";
    document.getElementById("r1").className = "myButton2";
  }
}

// actualisation bouton rebond quand pression
function changerBouttonRebond() {
  if (document.getElementById("rebondd").className == "myButton2") {
    document.getElementById("rebondd").className = "myButton";
  } else {
    document.getElementById("rebondd").className = "myButton2";
  }
}



// actualisation bouton observateur quand pression
function pressionBouttonObservateur() {
  if (document.getElementById("r3").className == "myButton2") {
    document.getElementById("r3").className = "myButton";
    document.getElementById("r4").className = "myButton2";
  }
}

// actualisation bouton mobile quand pression
function pressionBouttonMobile() {
  if (document.getElementById("r4").className == "myButton2") {
    document.getElementById("r4").className = "myButton";
    document.getElementById("r3").className = "myButton2";
  }
}




// affichage de la barre du coefficient d'amortissement quand rebond
function ammort() {
  if (document.getElementById("boutton_ammorti").value == "0") {
    document.getElementById("boutton_ammorti").value = "1";
    document.getElementById("barre_reb").style.display = "block";
    document.getElementById("plusvi").disabled = true;
    document.getElementById("moinsvi").disabled = true;
    document.getElementById('ammorti').innerHTML=document.getElementById("reb").value;

  } else {
    document.getElementById("boutton_ammorti").value = "0";
    document.getElementById("barre_reb").style.display = "none";
    document.getElementById("plusvi").disabled = false;
    document.getElementById("moinsvi").disabled = false;
  }
}

// affichage de la barre du coefficient d'amortissement quand rebond dans photon (plus vraiment utile maintenant)
function ammort_photon() {
  if (document.getElementById("boutton_ammorti").value == "0") {
    document.getElementById("boutton_ammorti").value = "1";
    document.getElementById("plusvi").disabled = true;
    document.getElementById("moinsvi").disabled = true;
  } else {
    document.getElementById("boutton_ammorti").value = "0";
    document.getElementById("plusvi").disabled = false;
    document.getElementById("moinsvi").disabled = false;
  }
}

// actualisation de la valeur sélectionnée du coefficient d'amortissement pour visuel avec chiffre
function ammortUpdate(val){
  document.getElementById('ammorti').innerHTML=val/100;
}
