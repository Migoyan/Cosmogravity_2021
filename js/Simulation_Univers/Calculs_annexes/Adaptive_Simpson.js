//formule utilisee pour le calcul de l'age de l'univers
function fonction_integrale(x, omegam0, omegalambda0, Or) {
  return (1 / H0enannee) * (1.0 / (1.0 + x)) * Math.pow(Or * Math.pow(1.0 + x, 4)
  + omegam0 * Math.pow(1.0 + x, 3) - (omegalambda0 + Or + omegam0 - 1.0)
  * Math.pow(1.0 + x, 2) + omegalambda0, (-1.0 / 2));
}


function cv_fonction_integrale(l, omegam0, omegalambda0, Or) {
  //initial_a etait undefined parce que c'etait un parametre dans la fonction mais qu'on appelait la fonction sans le passer
  x = initial_a + l / (1 - l);
  return fonction_integrale(x, omegam0, omegalambda0, Or) * 1 / Math.pow(1 - l, 2);
}


//formule utilisee pour le calcul de distance metrique
function fonction_dm(x, omegam0, omegalambda0, Or) {
  return Math.pow((Or * Math.pow((1.0 + x), 4)
    + omegam0 * Math.pow((1 + x), 3) + (1 - Or - omegam0 - omegalambda0) * Math.pow((1 + x), 2)
    + omegalambda0), (-1/2));
}

// pour calculer les bornes de la région sur laquelle l'intégrale des fonctions ci-dessus est définie.
function fonction_E(x, omegam0, omegalambda0, Or) {
  return (Number(Or) * Math.pow((1 + x), 4) + Number(omegam0) * Math.pow((1 + x), 3)
    + (1 - Number(omegam0) - Number(Or) - Number(omegalambda0)) * Math.pow((1 + x), 2)
    + Number(omegalambda0));
}

function derive_fonction_E(x, omegam0, omegalambda0, Or) {
  return (Or * (Math.pow(1.0 + x, 2) + 8 * x + 2) + 3 * omegam0 * x + omegam0 - 2 * omegalambda0 + 2);
}


//fonction de l'equation de simpson
function simpson(bornInf, bornSup, fonction, omegam0, omegalambda0, Or, eps) {
  var whole = inetgrate_area_simpson(bornInf, bornSup, fonction, omegam0, omegalambda0, Or);
  return recursive_asr(bornInf, bornSup, fonction, omegam0, omegalambda0, Or, eps, whole);
}

function inetgrate_area_simpson(bornInf, bornSup, fonction, omegam0, omegalambda0, Or) {

  var centre = (bornInf + bornSup) / 2.0;
  var h3 = Math.abs(bornSup - bornInf) / 6.0;
  return h3 * (fonction(bornInf, omegam0, omegalambda0, Or) + 4.0 * fonction(centre, omegam0, omegalambda0, Or) + fonction(bornSup, omegam0, omegalambda0, Or));

}

function recursive_asr(bornInf, bornSup, fonction, omegam0, omegalambda0, Or, eps, whole) {
  var centre = (bornInf + bornSup) / 2.0;
  var gauche = inetgrate_area_simpson(bornInf, centre, fonction, omegam0, omegalambda0, Or);
  var droite = inetgrate_area_simpson(centre, bornSup, fonction, omegam0, omegalambda0, Or);
  if (Math.abs(gauche + droite - whole) <= 15 * eps) {
    return gauche + droite + (gauche + droite - whole) / 15.0;
  }
  else {
    if (!isNaN(gauche + droite)) {
      return recursive_asr(bornInf, centre, fonction, omegam0, omegalambda0, Or, eps / 2.0, gauche) + recursive_asr(centre, bornSup, fonction, omegam0, omegalambda0, Or, eps / 2.0, droite);
    }
  }
}
