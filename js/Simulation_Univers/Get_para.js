// variable globale selectionnant la serie de valeurs voulues
var serieBDD = [];
var imageBDD = [];
// pas de commentaire en json donc explications :
// 4 modèles : Einstein Sitter, Weinberg, De Sitter, Courbure
// renommes en matiere, rayonnement, constante cosmologique et courbure

// la premiere image canvas fr, la deuxieme eng

// constantes pour la creation de fenetres
const DimFen600x650Res = "width=600,height=650,toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes,left=500";
const DimFen1500x900Res = "width=1500,height=900,toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,copyhistory=no,resizable=no,left=400"; //creation d'une nouvelle fenetre avec dimensions 1400x900
const DimFen550x450NoRes = "width=550,height=450,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no";

/*
		Fonctions gerant l'ouverture et l'envoi de données entre les pages calculs annexes/simulation et paramètre/simulation
		+ fonctions de récupération pour json (banque de données)
*/

// fonction s'occupant de la base de donnée en .json
function choisiSerieDansBDD(numeroSerie) {
  var req = new XMLHttpRequest(); // requete pour l'ouverture
  var texte;
  // recupere le fichier .json
  // le false est important car sinon mauvaise synchronisation, get pour reception
  req.open("GET", "js/Simulation_Univers/bdd.json", false);

  // synchronisation
  req.onreadystatechange = function() {
    // req.readyState : toutes les données ont été réceptionnées à 4
    // req.status : tout c'est bien déroulé à 200
    if (req.readyState === 4 && req.status === 200) {
      // conversion en string du .json
      texte = JSON.parse(req.responseText);
      // recupereration de la serie voulue et initialisation de serieBDD
      serieBDD = [parseFloat(texte.modeles_monofl[numeroSerie].Om0),
        parseFloat(texte.modeles_monofl[numeroSerie].Or0),
        parseFloat(texte.modeles_monofl[numeroSerie].Ol0),
        parseFloat(texte.modeles_monofl[numeroSerie].Ok0)
      ];
      imageBDD = [texte.modeles_monofl[numeroSerie].chemin_graphe,
        texte.modeles_monofl[numeroSerie].chemin_graphe_eng
      ];
    }
  }; // la fonction de prise en charge
  // le send est vide pour le GET, existe aussi POST pour ecriture
  req.overrideMimeType('application/json');
  req.send();
}

// identifie le choix de la serie de valeurs pour la liste deroulante et renvoi la serie dans valeurs_types.html
function choixSerie() {
  var e = document.getElementById("type_valeurs");
  var choix = e.selectedIndex;
  // -1 correspond au "choisissez une serie..."
  if (choix != 0) {
    choix--;
    choisiSerieDansBDD(choix);
  }
}

// Recupération des valeurs issues d'une autre page et ouverture de page

function ouvre_calcMonofluide() {
  // recuperation des variables de la page simulation
  k = document.getElementById("k_p").value;
  c = document.getElementById("c_p").value;
  G = document.getElementById("G_p").value;
  h = document.getElementById("h_p").value;
  type = document.getElementById("typeannee").value;
  T0 = document.getElementById("T0calc").value;
  H0 = document.getElementById("H0calc").value;
  Om = document.getElementById("Omcalc").value;
  Ol = document.getElementById("Olcalc").value;
  Or = document.getElementById("Orcalc").value;
  Ok = document.getElementById("Okcalc").value;
  const_cosmo = document.getElementById("lambda_cosmo_const").value;


  // Stockage des valeurs
  sessionStorage.setItem("T0", T0);
  sessionStorage.setItem("H0", H0);
  sessionStorage.setItem("Om", Om);
  sessionStorage.setItem("Ol", Ol);
  sessionStorage.setItem("Or", Or);
  sessionStorage.setItem("Ok", Ok);
  sessionStorage.setItem("k", k);
  sessionStorage.setItem("c", c);
  sessionStorage.setItem("G", G);
  sessionStorage.setItem("h", h);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("const_cosmo",const_cosmo);

  // Ouverture de la fenêtre
  window.open("Calculs_monofluides.html", "childWindow", DimFen1500x900Res); //nouvelles dimensions
}

function ouvre_calcMonofluideNoire() {
  // recuperation des variables de la page simulation
  k = document.getElementById("k_p").value;
  c = document.getElementById("c_p").value;
  G = document.getElementById("G_p").value;
  h = document.getElementById("h_p").value;
  type = document.getElementById("typeannee").value;
  T0 = document.getElementById("T0calc").value;
  H0 = document.getElementById("H0calc").value;
  Om = document.getElementById("Omcalc").value;
  Ol = document.getElementById("Olcalc").value;
  Or = document.getElementById("Orcalc").value;
  Ok = document.getElementById("Okcalc").value;
  w0 = document.getElementById("omega0").value;
  w1 = document.getElementById("omega1").value;


  // Stockage des valeurs
  sessionStorage.setItem("T0", T0);
  sessionStorage.setItem("H0", H0);
  sessionStorage.setItem("Om", Om);
  sessionStorage.setItem("Ol", Ol);
  sessionStorage.setItem("Or", Or);
  sessionStorage.setItem("Ok", Ok);
  sessionStorage.setItem("k", k);
  sessionStorage.setItem("c", c);
  sessionStorage.setItem("G", G);
  sessionStorage.setItem("h", h);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("w0", w0);
  sessionStorage.setItem("w1", w1);


  // Ouverture de la fenêtre
  window.open("Calculs_monofluides_noire.html", "childWindow", DimFen1500x900Res); //nouvelles dimensions
}

function ouvre_calc() {
  // recuperation des variables de la page simulation
  k = document.getElementById("k_p").value;
  c = document.getElementById("c_p").value;
  G = document.getElementById("G_p").value;
  h = document.getElementById("h_p").value;
  type = document.getElementById("typeannee").value;
  T0 = document.getElementById("T0calc").value;
  H0 = document.getElementById("H0calc").value;
  Om = document.getElementById("Omcalc").value;
  Ol = document.getElementById("Olcalc").value;
  Or = document.getElementById("Orcalc").value;
  Ok = document.getElementById("Okcalc").value;
  rfc = document.getElementById("liste").value;
  const_cosmo = document.getElementById("lambda_cosmo_const").value;
  uplat = false;
  if (document.getElementById("univ_plat").checked) {
    uplat = true;
  }
  // Stockage des valeurs
  sessionStorage.setItem("T0", T0);
  sessionStorage.setItem("H0", H0);
  sessionStorage.setItem("Om", Om);
  sessionStorage.setItem("Ol", Ol);
  sessionStorage.setItem("Or", Or);
  sessionStorage.setItem("Ok", Ok);
  sessionStorage.setItem("k", k);
  sessionStorage.setItem("c", c);
  sessionStorage.setItem("G", G);
  sessionStorage.setItem("h", h);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("rfc", rfc);
  sessionStorage.setItem("univ_plat", uplat);
  sessionStorage.setItem("const_cosmo",const_cosmo);
  // Ouverture de la fenêtre
  window.open("Calculs.html", "childWindow", DimFen1500x900Res); //nouvelles dimensions
}

function ouvre_calc_Noire() {
  // recuperation des variables de la page simulation
  k = document.getElementById("k_p").value;
  c = document.getElementById("c_p").value;
  G = document.getElementById("G_p").value;
  h = document.getElementById("h_p").value;
  type = document.getElementById("typeannee").value;
  T0 = document.getElementById("T0calc").value;
  H0 = document.getElementById("H0calc").value;
  Om = document.getElementById("Omcalc").value;
  Ol = document.getElementById("Olcalc").value;
  Or = document.getElementById("Orcalc").value;
  Ok = document.getElementById("Okcalc").value;
  rfc = document.getElementById("liste").value;
  w0 = document.getElementById("omega0").value;
  w1 = document.getElementById("omega1").value;
  uplat = false;
  if (document.getElementById("univ_plat").checked) {
    uplat = true;
  }
  console.log(Om, Ol);
  // Stockage des valeurs
  sessionStorage.setItem("T0", T0);
  sessionStorage.setItem("H0", H0);
  sessionStorage.setItem("Om", Om);
  sessionStorage.setItem("Ol", Ol);
  sessionStorage.setItem("Or", Or);
  sessionStorage.setItem("Ok", Ok);
  sessionStorage.setItem("k", k);
  sessionStorage.setItem("c", c);
  sessionStorage.setItem("G", G);
  sessionStorage.setItem("h", h);
  sessionStorage.setItem("type", type);
  sessionStorage.setItem("rfc", rfc);
  sessionStorage.setItem("univ_plat", uplat);
  sessionStorage.setItem("w0", w0);
  sessionStorage.setItem("w1", w1);
  // Ouverture de la fenêtre
  window.open("Calculs_noire.html", "childWindow", DimFen1500x900Res); //nouvelles dimensions
}

function param() {
  var fene = window.open("Parametres.html", "childWindow", DimFen550x450NoRes);
}

function monofluide() {
  var fene = window.open("Simulation_univers_monofluides.html", "_self");
}

function monofluide_noire() {
  var fene = window.open("Simulation_univers_monofluides_noire.html", "_self");
}

// enregistrement des valeurs des constantes

function enregis() {
  window.opener.document.getElementById("k_p").value = document.getElementById("k").value;
  window.opener.document.getElementById("c_p").value = document.getElementById("c").value;
  window.opener.document.getElementById("G_p").value = document.getElementById("G").value;
  window.opener.document.getElementById("h_p").value = document.getElementById("h").value;
  window.opener.document.getElementById("typeannee").value = document.getElementById("type_annee").value;
  // pour que la fonction puisse fonctionner sur 8 pages différentes de simulation
  // en utilisant seulement 1 page constante pour chaque langue

  // cas sans energie noire
  if (window.opener.document.getElementById("omegalambda0")) {
    window.opener.update_omegar0_simu();
    window.opener.update_omegak0_simu();
  }
  // cas monofluides
  else if (window.opener.document.getElementById("affichage")) {
    window.opener.updateTemperatureWeinberg();
    window.opener.afficheSerie();
  }

  // cas energie noire
  else {
    window.opener.update_omegar0_simu_noir();
    window.opener.update_omegak0_simu_noir();
  }
  window.close();
}

// On recupere la valeur 0,1,2 ou 3 de la liste deroulante correspondant aux valeurs respectives des series du .json
// pour initialiser les valeurs de T,H,omegam,omegalambda de valeurs_types.html vers simulation_univers.html
function enregis_liste_valeurs() {
  remplaceValeurParDefaut(document.getElementById("Omcalc"), serieBDD[0]);
  remplaceValeurParDefaut(document.getElementById("Orcalc"), serieBDD[1]);
  remplaceValeurParDefaut(document.getElementById("Olcalc"), serieBDD[2]);
  remplaceValeurParDefaut(document.getElementById("Okcalc"), serieBDD[3]);
}

function remplaceValeurParDefaut(input, valeur) {
  var x = input;
  x.value = valeur;
}

// Transfert les valeurs calculées sur calculs annexes vers la page simulation et trace

function transfert_simu(path) {
  if (path == 0) {
    if (calculs != 0) {
      window.opener.document.getElementById("T0").value = Number(document.getElementById('Tz1').innerHTML);
      window.opener.document.getElementById("H0").value = Number(document.getElementById('Hz1').innerHTML);
      window.opener.document.getElementById("omegam0").value = Number(document.getElementById('Omz1').innerHTML);
      window.opener.document.getElementById("omegalambda0").value = Number(document.getElementById('Olz1').innerHTML);
      window.opener.document.getElementById("resultat_omegar0").innertHtml = Number(document.getElementById('Orz1').innerHTML);
      window.opener.document.getElementById("resultat_omegak0").innerHTML = Number(document.getElementById('Okz1').innerHTML);
      window.opener.document.getElementById("trace").click();
    } else {
      alert("Aucunes valeurs pour effectuer le tracé ! Lancez un calcul !");
    }
  }
  if (path == 1) {
    if (calculs != 0) {
      window.opener.document.getElementById("T0").value = Number(document.getElementById('Tz2').innerHTML);
      window.opener.document.getElementById("H0").value = Number(document.getElementById('Hz2').innerHTML);
      window.opener.document.getElementById("omegam0").value = Number(document.getElementById('Omz2').innerHTML);
      window.opener.document.getElementById("omegalambda0").value = Number(document.getElementById('Olz2').innerHTML);
      window.opener.document.getElementById("resultat_omegar0").innertHtml = Number(document.getElementById('Orz2').innerHTML);
      window.opener.document.getElementById("resultat_omegak0").innerHTML = Number(document.getElementById('Okz2').innerHTML);
      window.opener.document.getElementById("trace").click();
    } else {
      alert("Aucunes valeurs pour effectuer le tracé ! Lancez un calcul !");
    }
  }

}

function transfert_simu_mono() {
  if (calculs != 0) {
    window.opener.document.getElementById("T0calc").value = Number(document.getElementById('Tz1').innerHTML);
    window.opener.document.getElementById("H0calc").value = Number(document.getElementById('Hz1').innerHTML);
    window.opener.document.getElementById("Omcalc").value = Number(document.getElementById('Omz1').innerHTML);
    window.opener.document.getElementById("Olcalc").value = Number(document.getElementById('Olz1').innerHTML);
    window.opener.document.getElementById("Orcalc").innertHtml = Number(document.getElementById('Orz1').innerHTML);
    window.opener.document.getElementById("Okcalc").innerHTML = Number(document.getElementById('Okz1').innerHTML);
    window.opener.document.getElementById("trace").click();
  } else {
    alert("Aucunes valeurs pour effectuer le tracé ! Lancez un calcul !");
  }
}

function transfert_calcu(update1, choix) {
  document.getElementById("T0_annexes").value = sessionStorage.getItem("T0");
  document.getElementById("H0_annexes").value = sessionStorage.getItem("H0");
  document.getElementById("omegam0_annexes").value = sessionStorage.getItem("Om");
  document.getElementById("resultat_omegar0_annexes").value = sessionStorage.getItem("Or");
  document.getElementById("resultat_omegak0_annexes").value = sessionStorage.getItem("Ok");
  document.getElementById("k_p").value = sessionStorage.getItem("k");
  document.getElementById("h_p").value = sessionStorage.getItem("h");
  document.getElementById("G_p").value = sessionStorage.getItem("G");
  document.getElementById("c_p").value = sessionStorage.getItem("c");
  document.getElementById("typeannee").value = sessionStorage.getItem("type");

  // pour ne pas renvoyer de valeur qui n'existe pas dans monofluides
  if (window.opener.document.getElementById("T0")) {
    document.getElementById("resultat_omegar0_annexes").value = sessionStorage.getItem("rfc");
  }

  // choix=1 correspond à l'univers sans énergie sombre, 2 avec énergie sombre
  if (choix == 1) {
    document.getElementById("omegalambda0_annexes").value = sessionStorage.getItem("Ol");
    document.getElementById("lambda_cosmo_const").value = sessionStorage.getItem("const_cosmo");
  } else {
    document.getElementById("omegaDE0_annexes").value = sessionStorage.getItem("Ol");
    document.getElementById("omega0_annexes").value = sessionStorage.getItem("w0");
    document.getElementById("omega1_annexes").value = sessionStorage.getItem("w1");
  }
  // si la case univers plat est cochée alors on renvoie la case cochée
  var univPlat = sessionStorage.getItem("univ_plat");

  //Pour calc annexes monofluide il faux verifier que element univ_plat ne soit pas null sinon probleme puisque l'element n'existe pas
  if (univPlat == "true" && document.getElementById("univ_plat")!=null) {
    document.getElementById("univ_plat").checked = true;
  }
  update1();
}

// fonction qui ne fait rien, indispensable pour que transfert_calcu()
//fonctionne dans monofluides avec le paramètre update1()
function rien() {}

// Reset des valeurs

function Reset_para() {
  document.getElementById("k").value = 1.38064852e-23;
  document.getElementById("c").value = 299792458;
  document.getElementById("G").value = 6.67385e-11;
  document.getElementById("h").value = 6.62607004e-34;
  document.getElementById("type_annee").value = "Grégorienne";
  window.opener.document.getElementById("k_p").value = document.getElementById("k").value;
  window.opener.document.getElementById("c_p").value = document.getElementById("c").value;
  window.opener.document.getElementById("G_p").value = document.getElementById("G").value;
  window.opener.document.getElementById("h_p").value = document.getElementById("h").value;
  window.opener.document.getElementById("typeannee").value = document.getElementById("type_annee").value;
}

// Retour à la page précédente

function retour_simu() {
  window.close("Calculs.html");
}

function retour_noire() {
  window.close("Calculs_noire.html");
}

function retour() {
  window.close("Paramètres.html");
}

function retourSimulation() {
  window.open("Simulation_univers.html", "_self");
}

function retourSimulationNoire() {
  window.open("Simulation_univers_noire.html", "_self");
}

// MONOFLUIDES

// Affichage

function affichageComplet() {
  afficheSerie();
  afficheImage();
}

// affiche la série de valeurs selectionnee dans une zone de texte dans valeurs_types.html
function afficheSerie() {
  choixSerie();
  var chaine = "&Omega;<sub>Λ0</sub> = ";
  if (document.getElementById("omega0")) {
    chaine = "&Omega;<sub>DE0</sub> = ";
  }
  document.getElementById("affichage").innerHTML = "&Omega;<sub>m0</sub> = " + serieBDD[0] +
    " ; " + "&Omega;<sub>r0</sub> = " + serieBDD[1] + "<br/>" + chaine + serieBDD[2] +
    " ; " + "&Omega;<sub>k0</sub> = " + serieBDD[3] + "<br/>" + "T<sub>0</sub> = " + document.getElementById("T0calc").value + " K";
}

// <label>&nbsp;&nbsp; H<sub>0</sub> (km.s<sup>-1</sup>.Mpc<sup>-1</sup>) =  </label>
// size="10"

function afficheValeurs_calcul_mono() {
  document.getElementById("affichage").innerHTML = "&Omega;<sub>m0</sub> = " + document.getElementById("omegam0_annexes").value +
    " ; " + "&Omega;<sub>r0</sub> = " + document.getElementById("resultat_omegar0_annexes").value + "<br/>" +
    "&Omega;<sub>Λ0</sub> = " + document.getElementById("omegalambda0_annexes").value + " ; " + "&Omega;<sub>k0</sub> = " +
    document.getElementById("resultat_omegak0_annexes").value + "<br/>" + "H<sub>0</sub> = " + document.getElementById("H0_annexes").value + " km.s<sup>-1</sup>.Mpc<sup>-1</sup>" +
    "<br/>" + "T<sub>0</sub> = " + document.getElementById("T0_annexes").value + " K";
}

function afficheValeurs_calcul_mono_noire() {
  document.getElementById("affichage").innerHTML = "&Omega;<sub>m0</sub> = " + document.getElementById("omegam0_annexes").value +
    " ; " + "&Omega;<sub>r0</sub> = " + document.getElementById("resultat_omegar0_annexes").value + "<br/>" +
    "&Omega;<sub>DE0</sub> = " + document.getElementById("omegaDE0_annexes").value + " ; " + "&Omega;<sub>k0</sub> = " +
    document.getElementById("resultat_omegak0_annexes").value + "<br/>" + "H<sub>0</sub> = " + document.getElementById("H0_annexes").value + " km.s<sup>-1</sup>.Mpc<sup>-1</sup>" +
    "<br/>w<sub>0</sub> = " + document.getElementById("omega0_annexes").value + " ; w<sub>1</sub> = " + document.getElementById("omega1_annexes").value +
    "<br/>T<sub>0</sub> = " + document.getElementById("T0_annexes").value + " K";
}

// affiche l'image en fonction du modèle monofluide selectionné
function afficheImage() {
  if (s_testLangue() == "fr") {
    document.getElementById("modele_monofl").src = imageBDD[0];
  } else {
    document.getElementById("modele_monofl").src = imageBDD[1];
  }
}
