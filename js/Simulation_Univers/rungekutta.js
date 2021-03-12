//formule appliquer aux calculs de rungekutta
//derivée seconde de a
function fonction(x) {
  return (-Or / (Math.pow(x, 3)) - (0.5) * omegam0 / (Math.pow(x, 2)) + x * omegalambda0);
}

function fonction_age(x) {
  omegam0 = Number(document.getElementById("omegam0").value);
  omegalambda0 = Number(document.getElementById("omegalambda0").value);
  Or = Number(document.getElementById("resultat_omegar0").innerHTML);
  return (1. / (1. + x)) * Math.pow(Or * Math.pow(1. + x, 4) + omegam0 * Math.pow(1. + x, 3) - (omegalambda0 + Or + omegam0 - 1.) * Math.pow(1. + x, 2) + omegalambda0, -1. / 2);
}

function valeurtest4(n, n2) { // 4 valeur test pour Runge-Kutta
  j1[0] = n2 * pas;
  j1[1] = (n2 + k1[0] / 2) * pas;
  j1[2] = (n2 + k1[1] / 2) * pas;
  j1[3] = (n2 + k1[2]) * pas;

  k1[0] = fonction(n) * pas;
  k1[1] = fonction(n + j1[0] / 2) * pas;
  k1[2] = fonction(n + j1[1] / 2) * pas;
  k1[3] = fonction(n + j1[2]) * pas;
}

function rungekutta(n) { // Fonction Runge-Kutta
  kteste[0]=fonction(ymoinsrunge[1]);//les 4 pente utiliser dans runge-kutta
  kteste[1]=fonction(ymoinsrunge[1]+0.5*pas*ymoinsrungederiv[0]);
  kteste[2]=fonction(ymoinsrunge[1]+0.5*pas*ymoinsrungederiv[0]+0.25*pas*pas*kteste[0]);
  kteste[3]=fonction(ymoinsrunge[1]+ymoinsrungederiv[0]*pas+0.5*pas*pas*kteste[1]);
  ymoinsrunge[1] = ymoinsrunge[0] + pas*ymoinsrungederiv[0]+(1/6)*pas*pas*(kteste[0]+kteste[1]+kteste[2])//calcul de y(n+1)
  ymoinsrunge[0] = ymoinsrunge[1];
  ymoinsrungederiv[1] = ymoinsrungederiv[1] + (1. / 6.) * pas*(kteste[0] + 2. * (kteste[1] + kteste[2]) + kteste[3]);//calcul de la dérivé y(n+1)
  ymoinsrungederiv[0] = ymoinsrungederiv[1];

  //valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);

  return ymoinsrunge[1];
}

function rungekutta_neg(n) {

  kteste[0]=fonction(ymoinsrunge[1]);
  kteste[1]=fonction(ymoinsrunge[1]+0.5*pas*ymoinsrungederiv[0]);
  kteste[2]=fonction(ymoinsrunge[1]+0.5*pas*ymoinsrungederiv[0]+0.25*pas*pas*kteste[0]);
  kteste[3]=fonction(ymoinsrunge[1]+ymoinsrungederiv[0]*pas+0.5*pas*pas*kteste[1]);//les 4 pente utiliser dans runge-kutta
  // Fonction Runge-Kutta
  ymoinsrunge[1] = ymoinsrunge[0] - pas*ymoinsrungederiv[0]+(1/6)*pas*pas*(kteste[0]+kteste[1]+kteste[2]);//calcul de y(n+1)
  ymoinsrunge[0] = ymoinsrunge[1];
  //ymoinsrunge[0] = ymoinsrunge[1];
  ymoinsrungederiv[1] = ymoinsrungederiv[0] - (1. / 6.) * pas*(kteste[0] + 2. * (kteste[1] + kteste[2]) + kteste[3]);//calcul de la dérivé y(n+1)
  ymoinsrungederiv[0] = ymoinsrungederiv[1];    
  //ymoinsrungederiv[0] = ymoinsrungederiv[1];
  return ymoinsrunge[1];
}

function runge_adaptatif_neg(n) {
  var delta_x = 1;
  var precision = 0.0001;
  while (delta_x > precision) {
    //alert(delta_x+"	"+pas);
    run_0 = rungekutta_neg(n);
    pas = n / 2;
    run_1 = rungekutta_neg(pas);
    run_1 = rungekutta_neg(run_1);
    delta_x = Math.abs(run_0 - run_1);
    console.log(delta_x);
  }
  run_final = rungekutta_neg(pas);
  //alert(pas);
  return run_final;
}

function runge_adaptatif(n) {
  var delta_x = 1;
  var precision = 0.0001;
  while (delta_x > precision) {
    //alert(delta_x+"	"+pas);
    var pas_temp = pas;
    run_0 = rungekutta(n);
    pas = pas / 2;
    run_1 = rungekutta(n);
    run_1 = rungekutta(run_1);
    delta_x = Math.abs(run_0 - run_1);
  }
  pas *= 2;
  return run_0;
}

function simpson_simple_degre2(fonction,bornInf, omegam0, omegalambda0, Or){
  var Sum=0.0;
  var n=Math.pow(10,5);
  for(var i=1;i<=7;i+=1){
    if(bornInf<100 && i==1){

      var bornI=bornInf;
      var bornS=bornInf+1000;
    }
    else if(bornInf<100 && i!=1){

        var bornI=bornS;
        var bornS=bornS*10;
    }
    else if(i==1){
      var bornI=bornInf;
      var bornS=(Math.pow(10,i+1)*bornInf);
    }
    else {
      var bornI=bornS;
      var bornS=(Math.pow(10,i+1)*bornInf);
    }
    var S=0.0;
    var S_0=fonction(bornI,omegam0,omegalambda0,Or)+fonction(bornS,omegam0,omegalambda0,Or);
    var S_1=0.0;
    var S_2=0.0;
    var h=(bornS-bornI)/n;
    for(var o=1;o<n-1;o+=1){
      var x1=bornI+o*h;
      if ((o%2) == 0){
        S_2+=fonction(x1,omegam0,omegalambda0,Or);
        }
      else{
        S_1+=fonction(x1,omegam0,omegalambda0,Or);
      }
    }
    S=(h/3.0)*( S_0 + 4.0*S_1 + 2.0*S_2);
    Sum+=S;
  }
  return Sum;
}
