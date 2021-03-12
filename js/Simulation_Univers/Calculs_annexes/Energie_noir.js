function lance_calc() {
  chargement();
  setTimeout(calc_energie_noire, 100);
}

// fonction utilisee pour le message d'avertissement
function recuperePuissance10(chiffre){
  var tampon=chiffre;
  tampon=Math.trunc(tampon);
  var puissance=0;
  if(tampon>=1){
    while(Number.isInteger(tampon)){
      tampon=tampon*Math.pow(10,-1);
      puissance++;
    }
    puissance--;
  }
  else if(tampon<1){
    while(!Number.isInteger(tampon)){
      tampon=tampon*Math.pow(10,1);
      puissance++;
    }
  }
  return puissance;
}

function avertissement() {
  var texte = o_recupereJson();
  var difference;
  // Messages d'avertissement
  if (z1 <= -1) {
    alert(texte.page_univers_calculs.message_z1_incorrect);
    z1 = NaN;
  }
  if (z2 <= -1) {
    alert(texte.page_univers_calculs.message_z2_incorrect);
    z2 = NaN;
  }

  // permet de faire une différence sur les puissances de 10 pour limiter la casse au niveau du temps de calcul
  difference=Math.abs(recuperePuissance10(z2)-recuperePuissance10(z1));
  // j'ai mis 13 car au delà, j'ai du temps de chargement
  if (difference>13){
    alert(texte.page_univers_calculs.message_valeur_critique);
    z1 = NaN;
    z2 = NaN;
  }
}

function calc_energie_noire() {

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
  omegak0 = Number(document.getElementById("resultat_omegak0_annexes").innerHTML);
  document.getElementById("tempsEmission_alert").innerHTML = "";
  document.getElementById("tempsReception_alert").innerHTML = "";

  //création d'une liste qui va prendre les résultats des calculs avant qu'elles soient arrondis
  arr = [];
  arr_bool = true;

  Or = 0;
  //definition du type d'annee
  if (typeannee == "Sidérale") {
    nbrjours = 365.256363051;
  } else if (typeannee == "Julienne") {
    nbrjours = 365.25;
  } else if (typeannee == "Tropique (2000)") {
    nbrjours = 365.242190517;
  } else {
    nbrjours = 365.2425;
  }
  au = 149597870700;
  H0parsec = h0 * 1000 / ((au * (180 * 3600)) / Math.PI * Math.pow(10, 6));
  H0enannee = H0parsec * (3600 * 24 * nbrjours);
  H0engannee = H0enannee * Math.pow(10, 9);
  a = document.getElementById("Orr");
  if (document.getElementById("resultat_omegar0_annexes").options[0].selected) {
    sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
    rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
    Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
    Or = 1.68 * Or;
    Or = Or.toExponential(3);
  } else if (document.getElementById("resultat_omegar0_annexes").options[1].selected) {
    sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
    rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
    Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
    Or = Or.toExponential(3);
  } else {
    Or = 0;
  }
  a.value = Or;
  a.innerHTML = Or;

  //Energie Noire
  w0 = Number(document.getElementById("omega0_annexes").value);
  w1 = Number(document.getElementById("omega1_annexes").value);


  z1 = Number(document.getElementById("z1").value);
  z2 = Number(document.getElementById("z2").value);


  avertissement();

  // dm ........................................................................

  // permet de contourner le problème du dm (tend vers la même valeur sur l'infini)
  if(z1>1e13){
    zz1=1e13;
  }
  else{
    zz1 = z1;
  }
  if(z2>1e13){
    zz2=1e13;
  }
  else{
    zz2 = z2;
  }

  Eps = Number(0.0001);
  //calcul de h0 par secondes et par gigaannees

  if (omegak0 > 0) {
    integ_1 = Math.sqrt(Math.abs(omegak0)) * simpson(0, Number(zz1), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm1 = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sin(integ_1);

    integ_2 = Math.sqrt(Math.abs(omegak0)) * simpson(0, Number(zz2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm2 = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sin(integ_2);

    integ_between = Math.sqrt(Math.abs(omegak0)) * simpson(Number(z1), Number(z2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sin(integ_between);

  } else if (omegak0 == 0) {

    dm1 = (c / (H0parsec) * simpson(0, Number(zz1), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps));
    dm2 = (c / (H0parsec) * simpson(0, Number(zz2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps));
    dm = (c / (H0parsec) * simpson(Number(z1), Number(z2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps));

  } else {
    integ_1 = Math.sqrt(Math.abs(omegak0)) * simpson(0, Number(zz1), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm1 = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sinh(integ_1);

    integ_2 = Math.sqrt(Math.abs(omegak0)) * simpson(0, Number(zz2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm2 = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sinh(integ_2);

    integ_between = Math.sqrt(Math.abs(omegak0)) * simpson(Number(z1), Number(z2), Enoire, omegam0, Number(omegaDE0), Number(Or), Eps);
    dm = (c / (H0parsec * Math.sqrt(Math.abs(omegak0)))) * Math.sinh(integ_between);
  }

  dda = dm1 / (1 + Number(z1));
  dl = dm * (1 + (z2 - z1));


  // TEMPS ................................................
  Eps = Number(0.001);

  // Calcul du temps de réception
  if (Number(z2) <= 1e12) {
    tempsReception = simpson_simple_degre2(Enoire_temps, Number(z2), omegam0, Number(omegaDE0), Number(Or));
  }

  else {
    // nécessaire car l'ordre 4 de E(x) est lié à Or, on prend donc l'ordre 3
    if (Or==0){
      tempsReception=2/(3*Math.pow(omegam0,1/2)*H0enannee*Math.pow(Number(z2)+1,3/2));
    }
    else{
      tempsReception = 1 / (Math.pow(1 + Number(z2), 2) * 2 * Math.pow(Or, 0.5) * H0enannee);
    }
  }
  if (isNaN(tempsReception)) {
    tempsReception = NaN;
  }

  // Calcul du temps d'émission
  if (Number(z1) <= 1e12) {
    tempsEmission = simpson_simple_degre2(Enoire_temps, Number(z1), omegam0, Number(omegaDE0), Number(Or));
  }

  else {
    // nécessaire car l'ordre 4 de E(x) est lié à Or, on prend donc l'ordre 3
    if (Or==0){
      tempsEmission=2/(3*Math.pow(omegam0,1/2)*H0enannee*Math.pow(Number(z1)+1,3/2));
    }
    else{
      tempsEmission = 1 / (Math.pow(1 + Number(z1), 2) * 2 * Math.pow(Or, 0.5) * H0enannee);
    }
  }

  if (isNaN(tempsEmission)) {
    tempsEmission = NaN;
  }

  tempsReception_sec = tempsReception *H0enannee / H0parsec; //<--------------------------
  tempsEmission_sec = tempsEmission *H0enannee / H0parsec; //<-----------------------

  // t2-t1

  // cas Lambda et Matiere avec des z>1e12
    if(Or==0 && (z1>=1e12 && z2>=1e12) ){
      agebetween=2/(3*Math.pow(omegam0,1/2)*H0enannee)*( Math.pow(Number(z2)+1,-3/2)
        -Math.pow(Number(z1)+1,-3/2) );
    }
  // formule analytique pour les cas hors Lambda et Matiere pour les z>1e12
    else if(Or!=0 && (z1>=1e12 && z2>=1e12) ){
      agebetween=(1/(2*Math.pow(Or,0.5)*H0enannee))*(Math.pow(1+Number(z2),-2)
        -Math.pow(1+Number(z1),-2));
    }
  // autres cas
    else{
      agebetween=tempsReception-tempsEmission;
    }

    agebetween_sec=agebetween*H0enannee/H0parsec;


  Tz1 = t0 * (1 + Number(z1));
  Tz1 = Tz1.toExponential(4);
  Omz1 = omegam0 * Math.pow(1 + Number(z1), 3) / Enoire_norm(Number(z1), omegam0, Number(omegaDE0), Or);
  Omz1 = Omz1.toExponential(4);
  Olz1 = Number(omegaDE0) / Enoire_norm(Number(z1), omegam0, Number(omegaDE0), Or);
  Olz1 = Olz1.toExponential(4);
  Orz1 = Or * Math.pow(1 + Number(z1), 4) / Enoire_norm(Number(z1), omegam0, Number(omegaDE0), Or);
  Orz1 = Orz1.toExponential(4);
  Okz1 = omegak0 * Math.pow(1 + Number(z1), 2) / Enoire_norm(Number(z1), omegam0, Number(omegaDE0), Or);
  Okz1 = Okz1.toExponential(4);
  Hz1 = h0 * Math.pow(Enoire_norm(Number(z1), omegam0, Number(omegaDE0), Or), 0.5);
  Hz1 = Hz1.toExponential(4);






  //les distances sont positives
  dm = Math.abs(dm);
  dm1 = Math.abs(dm1);
  dm2 = Math.abs(dm2);

  dm_pc = dm * 3.2407557442396 * Math.pow(10, -17);
  dm1_pc = dm1 * 3.2407557442396 * Math.pow(10, -17);
  dm2_pc = dm2 * 3.2407557442396 * Math.pow(10, -17);

  //annÃ©es lumiÃ¨re
  lumie = 9460730472580800;
  dm1_lum = (dm1 / lumie);
  dm2_lum = (dm2 / lumie);
  dif_lum = (dm / lumie);

  arr.push(dm1, dm2, dm, dm1_pc, dm2_pc, dm_pc, dm1_lum, dm2_lum, dif_lum, tempsEmission, tempsReception, agebetween, tempsEmission_sec, tempsReception_sec, agebetween_sec);

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


  //on change les champs pour informer l'utilisateur des resultats trouvÃ©s


  document.getElementById("dm").innerHTML = dm;
  document.getElementById("dm1").innerHTML = dm1;
  document.getElementById("dm2").innerHTML = dm2;
  document.getElementById("dm_pc").innerHTML = dm_pc;
  document.getElementById("dm1_pc").innerHTML = dm1_pc;
  document.getElementById("dm2_pc").innerHTML = dm2_pc;
  document.getElementById("dm1_lum").innerHTML = dm1_lum;
  document.getElementById("dm2_lum").innerHTML = dm2_lum;
  document.getElementById("dm_diff_lum").innerHTML = dif_lum;
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
}

// ENERGIE Noire


function Enoire_norm(x, omegam0, omegaDE0, Or) {
  omegak0 = 1 - Or - omegam0 - omegaDE0;
  return (omegaDE0 * Ya(x) + omegak0 * (Math.pow((1. + x), 2)) + omegam0 * (Math.pow((1. + x), 3)) + Or * (Math.pow((1. + x), 4)));
}

function Enoire(x, omegam0, omegaDE0, Or) {
  omegak0 = 1 - Or - omegam0 - omegaDE0;
  return 1 / Math.pow((omegaDE0 * Ya(x) + omegak0 * (Math.pow((1. + x), 2)) + omegam0 * (Math.pow((1. + x), 3)) + Or * (Math.pow((1. + x), 4))), 1 / 2);

}

function Enoire_temps(x, omegam0, omegaDE0, Or) {
  return (1. / H0enannee) * Enoire(x, omegam0, omegaDE0, Or) / (1 + x);
}

function cv_Enoire_temps(l, omegam0, omegaDE0, Or, initial_a) {
  x = initial_a + l / (1 - l);
  return Enoire_temps(x, omegam0, omegaDE0, Or) * 1 / Math.pow(1 - l, 2);

}


// Ya(x)

function Ya_a(x) {
  w0 = Number(document.getElementById("omega0_annexes").value);
  w1 = Number(document.getElementById("omega1_annexes").value);


  return Math.exp(-3 * (w1 + w0 + 1) * Math.log(x) - (3 * w1 * (1 - x)));
}

function Ya(x) {
  w0 = Number(document.getElementById("omega0_annexes").value);
  w1 = Number(document.getElementById("omega1_annexes").value);


  return Math.exp(-3 * (w1 + w0 + 1) * Math.log(1 / (1 + x)) - (3 * w1 * (1 - (1 / (1 + x)))));
}

function arrondir() {
  if (arr.length == 0) {
    return 0;
  } else if (arr_bool == true) {
    if (document.documentElement.lang.localeCompare("en") == 0) {
      document.getElementById("arr").innerHTML = "Round up";
    } else {
      document.getElementById("arr").innerHTML = "Arrondir";
    }
    arr_bool = false;

    document.getElementById("dm1").innerHTML = arr[0];
    document.getElementById("dm2").innerHTML = arr[1];
    document.getElementById("dm").innerHTML = arr[2];
    document.getElementById("dm1_pc").innerHTML = arr[3];
    document.getElementById("dm2_pc").innerHTML = arr[4];
    document.getElementById("dm_pc").innerHTML = arr[5];
    document.getElementById("dm1_lum").innerHTML = arr[6];
    document.getElementById("dm2_lum").innerHTML = arr[7];
    document.getElementById("dm_diff_lum").innerHTML = arr[8];

    document.getElementById("tempsEmission").innerHTML = arr[9];
    document.getElementById("tempsReception").innerHTML = arr[10];
    document.getElementById("agebetween").innerHTML = arr[11];

    document.getElementById("tempsEmission_sec").innerHTML = arr[12];
    document.getElementById("tempsReception_sec").innerHTML = arr[13];
    document.getElementById("agebetween_sec").innerHTML = arr[14];
  } else {
    if (document.documentElement.lang.localeCompare("en") == 0) {
      document.getElementById("arr").innerHTML = "Undo Round up";
    } else {
      document.getElementById("arr").innerHTML = "Ne pas Arrondir";
    }
    arr_bool = true;

    document.getElementById("dm1").innerHTML = arr[0].toExponential(4);
    document.getElementById("dm2").innerHTML = arr[1].toExponential(4);
    document.getElementById("dm").innerHTML = arr[2].toExponential(4);
    document.getElementById("dm1_pc").innerHTML = arr[3].toExponential(4);
    document.getElementById("dm2_pc").innerHTML = arr[4].toExponential(4);
    document.getElementById("dm_pc").innerHTML = arr[5].toExponential(4);
    document.getElementById("dm1_lum").innerHTML = arr[6].toExponential(4);
    document.getElementById("dm2_lum").innerHTML = arr[7].toExponential(4);
    document.getElementById("dm_diff_lum").innerHTML = arr[8].toExponential(4);

    document.getElementById("tempsEmission").innerHTML = arr[9].toExponential(4);
    document.getElementById("tempsReception").innerHTML = arr[10].toExponential(4);
    document.getElementById("agebetween").innerHTML = arr[11].toExponential(4);

    document.getElementById("tempsEmission_sec").innerHTML = arr[12].toExponential(4);
    document.getElementById("tempsReception_sec").innerHTML = arr[13].toExponential(4);
    document.getElementById("agebetween_sec").innerHTML = arr[14].toExponential(4);
  }
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
//
