 // JavaScript Document
const AU = 149597870700; // unite astronomique

function Compte_calc() {
  url = "savedata.php";
  m = $.post(url);
  m.fail(console.log("Fail"));
  m.done(console.log("Done"));
}

function lance_calc() {
  calculs = calculs + 1;
  Compte_calc();
  chargement();
  setTimeout(calcu, 100);
}

function avertissement() {
  var texte = o_recupereJson();
  // Messages d'avertissement
  if (z1 <= -1) {
    alert(texte.page_univers_calculs.message_z1_incorrect);
    z1 = NaN;
  }
  if (z2 <= -1) {
    alert(texte.page_univers_calculs.message_z2_incorrect);
    z2 = NaN;
  }
  // nécessaire car des bugs se créent au delà
  if (z1 > 1e77 || z2 > 1e77) {
    alert(texte.page_univers_calculs.message_valeur_critique_1e77);
    z1 = NaN;
    z2 = NaN;
  }
}

function calcu() {
  time_affiche = document.getElementById("resul_tps");
  time_affiche.style.display = "none";
  deb = new Date().getTime();
  fin = 0;

  document.getElementById("tempsEmission_alert").innerHTML = "";
  document.getElementById("tempsReception_alert").innerHTML = "";

  //recuperation des valeurs
  c = Number(document.getElementById("c_p").value);
  G = Number(document.getElementById("G_p").value);
  h = Number(document.getElementById("h_p").value);
  k = Number(document.getElementById("k_p").value);
  typeannee = document.getElementById("typeannee").value;
  t0 = Number(document.getElementById("T0_annexes").value);
  h0 = Number(document.getElementById("H0_annexes").value);
  omegam0 = Number(document.getElementById("omegam0_annexes").value);
  omegaDE0 = Number(document.getElementById("omegaDE0_annexes").value);
  omegak0 = Number(document.getElementById("resultat_omegak0_annexes").value);
  Or = Number(document.getElementById("resultat_omegar0_annexes").value);
  nbrjours = nbJoursParAn();
  //calcule des h0 par seconde par anneee et par gigaannee
  H0parsec = calcul_H0parsec(h0);
  H0enannee = calcul_H0enannee(H0parsec, nbrjours);
  H0engannee = calcul_H0engannee(H0parsec, nbrjours);
  Eps = Number(0.0001);

  //on recupere les valeurs de z1 et z2
  z1 = Number(document.getElementById("z1").value);
  z2 = Number(document.getElementById("z2").value);

  avertissement();

  // calcul des dm
  dm1 = calcul_dm(Number(z1), H0parsec);
  dm2 = calcul_dm(Number(z2), H0parsec);
  dm = dm2 - dm1;

  //calcul de la distance du diametre apparent et distance lumiere
  dda = dm1 / (1 + Number(z1));
  dl = dm * (1 + (z2 - z1));

  // calcul du temps d'emission / reception
  tempsReception = calcul_t(z2, H0enannee);
  tempsEmission = calcul_t(z1, H0enannee);

  // conversion en secondes
  tempsReception_sec = (1. / H0parsec) * tempsReception / (1. / H0enannee); //<--------------------------
  tempsEmission_sec = (1. / H0parsec) * tempsEmission / (1. / H0enannee); //<--

  if (omegaDE0 != 1) {
    agebetween = tempsReception - tempsEmission;
    agebetween_sec = tempsReception_sec - tempsEmission_sec;
  } else if (omegaDE0 == 1) {
    agebetween = (1 / H0enannee) * Math.log((1 + z1) / (1 + z2));
    agebetween_sec = (1. / H0parsec) * agebetween / (1. / H0enannee);
  }

  //----------------------------JP
  Tz1 = t0 * (1 + Number(z1));
  if (Tz1 != 0) {
    Tz1 = Tz1.toExponential(4);
  }

  Omz1 = omegam0 * Math.pow(1 + Number(z1), 3) / calcul_E(Number(z1));
  Olz1 = Number(omegaDE0) / calcul_E(Number(z1));
  Orz1 = Or * Math.pow(1 + Number(z1), 4) / calcul_E(Number(z1));
  Okz1 = omegak0 * Math.pow(1 + Number(z1), 2) / calcul_E(Number(z1));
  Hz1 = h0 * Math.pow(calcul_E(Number(z1)), 1 / 2);
  Hz1 = Hz1.toExponential(4);

  //les distances sont positives
  dm = Math.abs(dm);
  dm1 = Math.abs(dm1);
  dm2 = Math.abs(dm2);

  // conversion mètre en parsec
  dm_pc = dm * 3.2407557442396 * Math.pow(10, -17);
  dm1_pc = dm1 * 3.2407557442396 * Math.pow(10, -17);
  dm2_pc = dm2 * 3.2407557442396 * Math.pow(10, -17);

  // conversion parsec en années lumière
  lumie = 9460730472580800;
  dm1_lum = (dm1 / lumie);
  dm2_lum = (dm2 / lumie);
  dif_lum = (dm / lumie);

  //on ajuste le nombre de decimale apres la virgule
  if (dm != 0) {
    dm = dm.toExponential(4);
  }
  if (dm1 != 0) {
    dm1 = dm1.toExponential(4);
  }
  if (dm2 != 0) {
    dm2 = dm2.toExponential(4);
  }
  if (dm_pc != 0) {
    dm_pc = dm_pc.toExponential(4);
  }
  if (dm1_pc != 0) {
    dm1_pc = dm1_pc.toExponential(4);
  }
  if (dm2_pc != 0) {
    dm2_pc = dm2_pc.toExponential(4);
  }
  if (dm1_lum != 0) {
    dm1_lum = dm1_lum.toExponential(4);
  }
  if (dm2_lum != 0) {
    dm2_lum = dm2_lum.toExponential(4);
  }
  if (dif_lum != 0) {
    dif_lum = dif_lum.toExponential(4);
  }


  if (agebetween != 0) {
    agebetween = agebetween.toExponential(4);
  }
  if (tempsReception != 0) {
    tempsReception = tempsReception.toExponential(4);
  }
  if (tempsEmission != 0) {
    tempsEmission = tempsEmission.toExponential(4);
  }
  if (agebetween_sec != 0) {
    agebetween_sec = agebetween_sec.toExponential(4);
  }
  if (tempsReception_sec != 0) {
    tempsReception_sec = tempsReception_sec.toExponential(4);
  }
  if (tempsEmission_sec != 0) {
    tempsEmission_sec = tempsEmission_sec.toExponential(4);
  }

  // temps infini dans Sitter
  if (omegaDE0 == 1) {
    tempsEmission = "∞";
    tempsEmission_sec = "∞";
    tempsReception = "∞";
    tempsReception_sec = "∞";
  }

  // écriture scientifique si différent de 0 et 1
  Olz1 = ecritureScientifiqueOmega(Olz1);
  Orz1 = ecritureScientifiqueOmega(Orz1);
  Omz1 = ecritureScientifiqueOmega(Omz1);
  Okz1 = ecritureScientifiqueOmega(Okz1);

  // correction suppplémentaire nécessaire sinon affiche des valeurs <> de NaN
  if (z1 > 1e77 || z2 > 1e77) {
    Hz1 = NaN;
    Olz1 = NaN;
  }

  //on change les champs pour informer l'utilisateur des resultats trouvés
  document.getElementById("dm").innerHTML = dm;
  document.getElementById("dm1").innerHTML = dm1;
  document.getElementById("dm2").innerHTML = dm2;
  document.getElementById("dm_pc").innerHTML = dm_pc;
  document.getElementById("dm1_pc").innerHTML = dm1_pc;
  document.getElementById("dm2_pc").innerHTML = dm2_pc;
  document.getElementById("dm1_lum").innerHTML = dm1_lum;
  document.getElementById("dm2_lum").innerHTML = dm2_lum;
  document.getElementById("dm_diff_lum").innerHTML = dif_lum;

  // ajouter en années lumières
  document.getElementById("agebetween").innerHTML = agebetween;
  document.getElementById("tempsReception").innerHTML = tempsReception;
  document.getElementById("tempsEmission").innerHTML = tempsEmission;
  document.getElementById("agebetween_sec").innerHTML = agebetween_sec;
  document.getElementById("tempsReception_sec").innerHTML = tempsReception_sec;
  document.getElementById("tempsEmission_sec").innerHTML = tempsEmission_sec;
  document.getElementById("Tz1").innerHTML = Tz1;
  document.getElementById("Omz1").innerHTML = Omz1;
  document.getElementById("Olz1").innerHTML = Olz1;
  document.getElementById("Orz1").innerHTML = Orz1;
  document.getElementById("Okz1").innerHTML = Okz1;
  document.getElementById("Hz1").innerHTML = Hz1;

  stop_spin();

  // Temps calcul

  fin = new Date().getTime() - deb;
  Chaine = "Le calcul a durer : " + fin + " millisecondes !";
  time_affiche.innerHTML = Chaine;
  //time_affiche.style.display ="inline-block";
}

function correctionOmegaz1NaN(omegaz1, omega) {
  if (omegaz1 == NaN) {
    omegaz1 = omega;
  }
}

function calcul_dm(z, h0) {
  if (omegam0 == 1) {
    return (2 * c / h0) * (1 - (Math.pow(1 + z, -1 / 2)));
  } else if (Or == 1) {
    return (c / h0) * (1 - Math.pow(1 + z, -1));
  } else if (omegaDE0 == 1) {
    return c * z / h0;
  } else if (omegak0 == 1) {
    return c * Math.sinh(Math.log(1 + z)) / h0;
  }
}

function calcul_t(z, h0) {
  if (omegam0 == 1) {
    return (2 / 3) * (1 / h0) * Math.pow(1 + z, -3 / 2);
  } else if (Or == 1) {
    return (1 / 2) * (1 / h0) * Math.pow(1 + z, -2);
  } else if (omegaDE0 == 1) {
    return NaN;
  } else if (omegak0 == 1) {
    return (1 / h0) * Math.pow(1 + z, -1);
  }
}

function calcul_E(x) {
  if (omegam0 == 1) {
    return Math.pow(1 + x, 3);
  } else if (Or == 1) {
    return Math.pow(1 + x, 4);
  } else if (omegaDE0 == 1) {
    return 1;
  } else if (omegak0 == 1) {
    return Math.pow(1 + x, 2);
  }
}

//on recupere le bon nombre de jour par an.
function nbJoursParAn() {
  var typeannee = document.getElementById("typeannee").value;
  switch (typeannee) {
    case 'Sidérale':
      return 365.256363051;
    case 'Julienne':
      return 365.25;
    case 'Tropique (2000)':
      return 365.242190517;
    default:
      return 365.2425;
  }
}

//calcule des h0 par seconde par anneee et par gigaannee
function calcul_H0parsec(h0) {
  return h0 * 1000 / ((AU * (180 * 3600)) / Math.PI * Math.pow(10, 6));
}

function calcul_H0enannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours);
}

function calcul_H0engannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours) * Math.pow(10, 9);
}

function ecritureScientifiqueOmega(omega) {
  if (omega != 1 && omega != 0) {
    omega.toExponential(4);
  }
  return omega;
}


function calculD() {
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;

  if (z1 && dda !=0){
    window.document.getElementById("diametre").value = (window.document.getElementById("theta").value / 206265 * Number(dda)).toExponential(2);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("diametre").value = (window.document.getElementById("theta").value / 206265 * Number(dda_2)).toExponential(2);
  }
}

function calcultheta() {
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;
  if (z1 && dda !=0){
    window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value / Number(dda)).toExponential(2);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value / Number(dda_2)).toExponential(2);
  }
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('z');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
        window.document.getElementById("diametre").value = "";
        window.document.getElementById("theta").value = "";
    })
}
