//Simpson utilisé pour le calcul du temps
//fonction de l'equation de simpson_deg2
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



// ---------------- En cours de réflexion

// simpson de degré 2 à 6 intervalles dynamiques
function simpson_simple_degre2_moy(fonction,bornInf,bornSup,omegam0, omegalambda0, Or){
  var t=new Array();
  t=determineIntervalles(bornInf,bornSup);
  var Sum=0.0;
  var n=Math.pow(10,5);
  for (var i=0;i<6;i++){
    var S=0.0;
    var S_0=fonction(t[i],omegam0,omegalambda0,Or)+fonction(t[i+1],omegam0,omegalambda0,Or);
    var S_1=0.0;
    var S_2=0.0;
    var h=(t[i+1]-t[i])/n;
    for(var o=1;o<n-1;o+=1){
      var x1=t[i]+o*h;
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
  // petite manip pour éviter les problèmes de signes
  if((bornSup>bornInf && Sum>0) || (bornSup<bornInf && Sum<0)){
    Sum=-Sum;
  }
  return Sum;
}


// fonction qui envoie les intervalles à simpson_simple_degre2_moy()
function determineIntervalles(bornInf,bornSup){
  var tab_inf=new Array();
  var tab_sup=new Array();
  var tab=new Array();
  var moyenne_init=(bornSup+bornInf)/2;
  var infTemp=moyenne_init;
  var supTemp=moyenne_init;

// boucle permettant de créer les 7 points des 6 intervalles
// on part du milieu de l'intervalle bornInf/bornSup et on sépare pour faire 2 suites de moyennes jusqu'aux 2 extrémités (vers z1 et z2)
  for(var i=0;i<2;i++){
    tab_inf[i]=(infTemp+bornInf)/2;
    infTemp=tab_inf[i];
    tab_sup[i]=(supTemp+bornSup)/2;
    supTemp=tab_sup[i];
  }

// on inverse les tableaux, on concatène et on renvoie le tableau des 7 points
  tab_inf.reverse();
  tab_inf.unshift(bornInf);
  tab_inf.push(moyenne_init);
  tab_sup.push(bornSup);
  tab=tab_inf.concat(tab_sup);

  return tab;
}


//Simpson utilisé pour le calcul des distances
function simpson_simple_degre2_distance(fonction,bornSup, omegam0, omegalambda0, Or){
  var Sum=0.0;
  var n=Math.pow(10,5);
  for(var i=7;i>0;i-=1){
    if(i==7){
      var bornI=0;
      var bornS=bornSup/(Math.pow(10,i));
    }
    if(i==0){
      var bornI=bornS;
      var bornS=bornSup;
    }
    else{
      var bornI=bornS;
      var bornS=bornSup/(Math.pow(10,i-1));
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
      else
        S_1+=fonction(x1,omegam0,omegalambda0,Or);
      }
      S=(h/3.0)*( S_0 + 4.0*S_1 + 2.0*S_2);
      Sum+=S;
    }
    return Sum;
  }
