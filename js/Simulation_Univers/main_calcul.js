const AU = 149597870700; // unite astronomique

function lance_calc() {
  document.getElementById("ret").click();
  chargement();
  setTimeout(calcul, 100);
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

//calcule de H0 en secondes-1 
function calcul_H0parsec(H0) {
  return H0 * 1000 / ((AU * (180 * 3600)) / Math.PI * Math.pow(10, 6));
}
//calcule de H0 en années-1
function calcul_H0enannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours);
}
//calcule de H0 en gigaannées-1
function calcul_H0engannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours) * Math.pow(10, 9);
}

//on calcule omegar si besoin, test si Matiere, Lambda, RFC,...
function calcul_Omegar(h, c, k, t0, H0parsec) {
	
  // Matière et Lambda
  var Or = 0;
  sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));  //OK

  // Matière Lambda, RFC et neutrinos
   if (document.getElementById("liste").options[0].selected) {
    rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
    Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
    Or = 1.68 * Or;  // neutrinos
    Or = Or.toExponential(4);
	
    // Matière Lambda & RFC
  } else if (document.getElementById("liste").options[1].selected) {
    rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
    Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
    Or = Or.toExponential(4);
  }
  return Or;
}

function ajustePrecision(valeur) {
  if (valeur != 0) {
    valeur = parseFloat(valeur).toExponential(4);
  } else {
    valeur = 0;
  }
  return valeur;
}


function calcul() { // fonction principale de cosmogravity

  //on recupere les valeurs des variables
  c = Number(document.getElementById("c_p").value);
  G = Number(document.getElementById("G_p").value);
  h = Number(document.getElementById("h_p").value);
  k = Number(document.getElementById("k_p").value);
  t0 = document.getElementById("T0").value;
  H0 = document.getElementById("H0").value;
  omegam0 = Number(document.getElementById("omegam0").value);
  omegalambda0 = Number(document.getElementById("omegalambda0").value);
  texte = o_recupereJson();
  nbrjours = nbJoursParAn();
  //calcule des H0 par seconde par anneee et par gigaannee
  H0parsec = calcul_H0parsec(H0);
  adetau1bis=1;
  ibis=0;
  agefinal=0;
  agedebut=0;
  //tdepuisbigbang=0;
  tdepuisbigbang1=0;
  tdepuisbigbang2=0;
  zmax=0;
  total=0;
  age=0;
  age_ans=0;
  age_sec=0;
  tBB=0;
  tBC=0;
  tBC_sec=0;
  age_afficher=0;
  age_sec_afficher=0;
  amax=5;
  H0enannee = calcul_H0enannee(H0parsec, nbrjours);
  H0engannee = calcul_H0engannee(H0parsec, nbrjours);
  Or = calcul_Omegar(h, c, k, t0, H0parsec);
  
  //zoom();
  
  //on s'occupe de changer la position du point sur le mod�le
  PosX = 53 + omegam0 * 230 / 3;
  PosY = 246;
  if (omegalambda0 >= 0) {
    PosY += -omegalambda0 * 325 / 4.5;
  } else {
    PosY -= omegalambda0 * 325 / 4.5
  }

  PosX -= 1.5;
  PosY -= 1.5;

  // L'update ne se faire que si on est sur tablette (landscape)/Desktop
  if (window.innerWidth > 960) {
    update_point();
  }

  //on calcule omegak
  omegak0 = Number(document.getElementById("resultat_omegak0").innerHTML);
  
  
  //donne les variables sous forme d'exposant si differente de 0

  omegalambda0 = ajustePrecision(omegalambda0);
  omegak0 = ajustePrecision(omegak0);
  Or = ajustePrecision(Or);

  omegak0_afficher = Number(omegak0);
  //affiche les imformations sur les param�tres cosmologiques de la simulation


	modelebis=0; modeleter=0;
	modele=3;
//	modele 0 exponentiel	
//	modele 1  H0>0 sans big bang et sans big crunch
//	modele 2  H0>0 avec big bang et avec big crunch
//	modele 3  H0>0 avec big bang et sans big crunch
//	modele 4  H0<0 avec big bang et avec big crunch
//	modele 5  H0<0 sans big bang et avec big crunch

	  
  
 
    //calcul de l'age de l'univers   age en annees ou bien NaN
 /*   if (Or != 0 && t0 >= 2) {
      initial_a = 0;
      age_ans = simpson(0, 0.9999999999, cv_fonction_integrale, omegam0,
        Number(omegalambda0), Number(Or) +
        (1 / (h0 * Math.pow(Or, 1 / 2))) * (1 / (2 * Math.pow(5e6, 2))), eps);
		
		console.log("ligne 159",age_ans);
      
    } else {  */
	eps=1;
	
		
	age_ans= (1. / H0enannee) *simpson(0, 1e12, temps, Number(omegam0), Number(omegalambda0), Number(Or), eps);
	
	console.log("ligne 166",age_ans); 

 /*     initial_a = 0;
      age_ans = simpson(0, 0.9999999, cv_fonction_integrale,
        Number(omegam0), Number(omegalambda0), Number(Or), eps);
		console.log("ligne 174",age_ans);
*/		
	
	
   		if(H0<0){age_ans=-age_ans;}
 

	if(isNaN(age_ans)) {modele=1; age_afficher="NaN";  
	} else {
		age_sec = age_ans * (1. / H0parsec) / (1. / H0enannee); // age en secondes
		age = age_sec / (calcul_H0engannee(1, nbrjours)); //age en giga annees             
    //on cree une variable limite en nombre de decimal pour l'affichage
		age_afficher = Number(age).toExponential(4);
		age_sec_afficher = Number(age_sec).toExponential(4);
    }
  
  //on regarde si on proche d'une separatrice
  w = 0;
  v = 0;
  if (omegam0 <= 0.5) {
    w = (1. / 3.) * Math.log(((1. / omegam0) - 1.) + Math.sqrt(((1. / omegam0) - 1.) * ((1. / omegam0) - 1.) - 1.0));
    OlER = 4. * omegam0 * cosh(w) * cosh(w) * cosh(w);
  } else {
    v = (1. / 3.) * Math.acos((1. / omegam0) - 1.);
    OlER = 4. * omegam0 * Math.cos(v) * Math.cos(v) * Math.cos(v);
  }
  proche_bleu = Math.abs(omegalambda0 - OlER) < 0.01;

  //permet de recuperer la valeur de la separatrice verte
  if (omegam0 >= 1) {
    u_max = 1. / 3. * (Math.acos((1. / omegam0) - 1));
    OlER_max = 4. * omegam0 * Math.cos((u_max + (4. / 3.) * Math.PI)) * Math.cos((u_max + (4. / 3.) * Math.PI)) * Math.cos((u_max + (4. / 3.) * Math.PI));
  } else {
    OlER_max = 0;
  }
  proche_vert = Math.abs(omegalambda0 - OlER_max) < 0.01;

  if (proche_bleu) {
    alert(texte.calculs_univers.separatrice);
    //document.getElementById("grille").checked = false;
  } else if (proche_vert) {
    alert(texte.calculs_univers.separatrice);
  }
  

  data = [];
  data_x = [];
  data_y = [];
  
	grandamax=1000;
	amin=0;
	
	amin = Number(document.getElementById("ami").value);
    amax = Number(document.getElementById("ama").value);
	amax3=amax; amin3=amin;
	amax2=amax; amin2=amin;
	amax1=amax; amin1=amin;
		
	if(amin >= 1 || amax >= 1){amin=0;amax=grandamax;}
	if( amax==0) { amax=grandamax;}
	
		
 //  Modele exponentiel modele=0
 if (omegalambda0 == 1 && omegam0==0 && Or==0 && omegak0==0) {
	 modele=0;
	 pas=1e-2; 
	 temps = -30;
	 while (temps < 30) {
      fy = monoSitter(H0engannee, temps);
	  data_x.push(temps);
      data_y.push(fy);
	  temps = temps + pas;
	 }
 }
// Fin modele exponentiel  modele=0
 
 //  Modele sans big bang et sans big crunch
 
	if(modele==1) {
	
	pas = 5e-4 ;  

		if(amax1<=1) {amax1=5;}
		//  on part de a=1 et on va vers les temps négatifs
	m=0; 
	adetau1 = 1;
    dasurdtau = 1;
    while (adetau1 > 0 && adetau1 < amax1) {
    val = rungekutta_univers(-pas, adetau1, dasurdtau);
    adetau1 = val[0];
	dasurdtau = val[1];
	 data_x.push( m/ H0engannee); 
     data_y.push(adetau1);
    m=m-pas;
	} 
	//ages croissants
	fin = data_y.length;
	data_x.reverse();
	data_y.reverse();
	
  	//  on part de a=1 et on va vers les temps positifs
	
	adetau1 = 1;
    dasurdtau = 1;
	i=0; 
    while (adetau1 > 0 && adetau1 < amax1) {
    val = rungekutta_univers(pas, adetau1, dasurdtau);
    adetau1 = val[0];
	dasurdtau = val[1];
	data_x.push(i/ H0engannee); 
    data_y.push(adetau1);
    i = i + pas;
	} 
}
 
 // Fin du modele 1 sans big bang et sans big crunch
 

 
 
  if(modele!=0 && modele!=1) {
  // on cherche si on a un big crunch c'est à dire quand adetau s'annulle, i final est le temps avant le big crunch
    tBC=0;
	if(age != 0) {
			if (Math.abs(H0)>=100) {
				exposant=Math.round(Math.log10(H0));
			pas =  5e-6*age*Math.pow(10,exposant);
			} else  {
			pas = age*5e-4 ;  }
				if(proche_vert) {pas=age*1e-2;}
				if(proche_bleu) {pas=age*1e-2;}

	adetau1 = 1;
    dasurdtau = 1;
   
   //dasurdtau = derivee_premiere(adetau1,omegam0, omegalambda0, Or);
   
	i=0; 
    while (adetau1 > 0 && adetau1 < grandamax) {
    val = rungekutta_univers(pas, adetau1, dasurdtau);
    adetau1 = val[0];
	dasurdtau = val[1];
	i = i + pas;
	//console.log("ligne 281 adetau1 i ",adetau1,i); 
	} 
  adetau1bis=adetau1;
  //  modele big crunch 
  if(adetau1bis<=0) { modelebis=20;  tBC = i / H0engannee; tBC_sec= tBC*nbJoursParAn()*86400*1e9;}
	
	
// recherche big bang
		if (Math.abs(H0)>=100) {
			exposant=Math.round(Math.log10(Math.abs(H0)));
			pas =  5e-6*age*Math.pow(10,exposant);				   
			} else  {
			pas = age*5e-4 ;  
			} 
	adetau1 = 1;
    dasurdtau = 1; 
	i=0; 
    while (adetau1 > 0 && adetau1 <=1) {
    val = rungekutta_univers(-pas, adetau1, dasurdtau);
    adetau1 = val[0];
	dasurdtau = val[1];
	i = i - pas;
	} 
  adetau1ter=adetau1;
  //  modele big bang ou non 
  if(adetau1ter<=0) { modeleter=25;  tBB = i/ H0engannee; tBB_sec= tBB*nbJoursParAn()*86400*1e9;}
	}

	 }

	if(modelebis==20 && modeleter==25) {modele=2;}  
	
  //  Fin de la recherche d'un big crunch	

 
  
 // Si big crunch on trace le graphe zoomé coté big bang en partant de amax  vers amin
 // à la condition que amax soit inférieur à 1 si non on trace de a=0 à a=0
	//if(H0<0){amax=grandamax;}
    if(modele==2 ) {
		// calcul indispensable meme pour amax<1 du temps depuis le big bang
		if(amin2>=1) {amin2=0;}
		if (Math.abs(H0)>=100) {
			exposant=Math.round(Math.log10(Math.abs(H0)));
			pas =  1e-6*age*Math.pow(10,exposant);						   
			} else  {
			pas=Math.abs(age)*1e-4;  
			}
										
			 
			
			if(proche_vert) {pas=age*1e-4;}
				if(proche_bleu) {pas=age*1e-4}
				
			console.log("ligne 368 pas",pas);
			
		if(H0<0) {modele=4;}
		//  de a=1 à a=0 temps décroissants
				
		if(H0 < 0) {agegraphe=0; epsilon=-1;
		} else {
		agegraphe=age; epsilon=1;
		}
		
		console.log("ligne 378",age,tBC,agegraphe);
		
		adetau2 = 1;
		dasurdtau = epsilon; // a voir........................
		m=0; 
		
		while (adetau2 > amin2 && adetau2 <= amax2) {
		val = rungekutta_univers(-pas, adetau2, dasurdtau);
		adetau2 = val[0];
		dasurdtau = val[1];
		data_x.push(agegraphe + epsilon*m/ H0engannee); 
        data_y.push(adetau2);
		m = m - pas;
		}
		
		if(H0<0 && adetau2<=0) {
		 tdepuisbigbang1=Math.abs(m/ H0engannee);}
	
				
		console.log("ligne 397 adetau2 modele tdepuisbigbang1", adetau2, modele, tdepuisbigbang1);
		//temps  croissants
		fin = data_y.length;
		data_x.reverse();
		data_y.reverse();
				
		adetau2 = 1;
		dasurdtau = epsilon;
		m=0;
		
		while (adetau2 > amin2 && adetau2 <= amax2) {
		val = rungekutta_univers(pas, adetau2, dasurdtau);
		adetau2 = val[0];
		dasurdtau = val[1];
		data_x.push(agegraphe + epsilon*m/ H0engannee); 
        data_y.push(adetau2);
		m = m + pas;
		}
		
		if(H0<0  && adetau2 <=0) {tdepuisbigbang2=Math.abs(m/ H0engannee);}
		
	console.log("ligne 372 adetau2 modele tdepuisbigbang2", adetau2, modele, tdepuisbigbang2);	
		
		if(amax2 <= 1) {  
			
		data = [];
		data_x = [];
		data_y = [];
		
		adetau2 = amax2;
		zmax= (1-amax2)/amax2;
		dasurdtau = derivee_premiere(amax2,omegam0, omegalambda0, Or);
		agefinal= simpson_simple_degre2(fonction_integrale, Number(zmax), Number(omegam0), Number(omegalambda0), Number(Or))*1e-9;
		if(amin2==0) {
			agedebut=0;
		} else {
		zmin= (1-amin2)/amin2;	
		agedebut= simpson_simple_degre2(fonction_integrale, Number(zmin), Number(omegam0), Number(omegalambda0), Number(Or))*1e-9;
		}
		if (Math.abs(H0)>=100) {
			exposant=Math.round(Math.log10(Math.abs(H0)));
			pas =  1e-7*age*Math.pow(10,exposant);						   
			} else  {
		pas=Math.abs(agefinal-agedebut)*1e-5;
			}
			
		
		if(H0 < 0) {agegraphe=agefinal+tBC; 
		} else {
		agegraphe=agefinal;
		}
		m=0;
		while (adetau2 > amin2 && adetau2 <= amax2) {
		val = rungekutta_univers(-pas, adetau2, dasurdtau);
		adetau2 = val[0];
		dasurdtau = val[1];
		data_x.push(agefinal*epsilon + m/ H0engannee); 
		data_y.push(adetau2);
		m=m-pas;
		} 
		
		//ages croissants si H0 > 0
		if(H0 > 0) {
		fin = data_y.length;
		data_x.reverse();
		data_y.reverse(); }
		}
	}
// Fin du modele 2	

	 
  
 // Si big bang sans big crunch  on trace le graphe zoomé (amax<1)  en partant de amax  vers amin
 //  ou non zoomé (amax=5) en partant de   vers amin
 
//console.log("ligne 397 amax amin  agedebut agefinal pas",amax,amin,agedebut,agefinal,pas);

 // if(modele!=0 && modele!=1) {
    if(modele == 3 ) {
		
		if(H0<0) {modele=5;}
		adetau3 = amax3; 
		zmax= (1-amax3)/amax3;
		dasurdtau = derivee_premiere(amax3,omegam0, omegalambda0, Or);
		agefinal= simpson_simple_degre2(fonction_integrale, Number(zmax), Number(omegam0), Number(omegalambda0), Number(Or))*1e-9;
		if(amin3==0) {
			agedebut=0;
		} else {
		zmin= (1-amin3)/amin3;
		agedebut= simpson_simple_degre2(fonction_integrale, Number(zmin), Number(omegam0), Number(omegalambda0), Number(Or))*1e-9;
		}
		
		if (Math.abs(H0)>=100) {
			exposant=Math.round(Math.log10(Math.abs(H0)));
			pas =  Math.abs(agefinal-agedebut)*1e-7*Math.pow(10,exposant);						   
			} else  {
		pas=Math.abs(agefinal-agedebut)*1e-5;
			}
		
		if(H0<0) {agegraphe=agefinal+tBB;}else{agegraphe=agefinal;}
		
		console.log("ligne 483 tBC  tBB agefinal",tBC,tBB,agefinal);
		m=0;
		while (adetau3 >= amin3 && adetau3 <= amax3) {
		val = rungekutta_univers(-pas, adetau3, dasurdtau);
		adetau3 = val[0];
		dasurdtau = val[1];
		data_x.push(agegraphe + m/ H0engannee); 
		data_y.push(adetau3);
		m=m-pas;
		} 
		//ages croissants
		fin = data_y.length;
		if(H0>0) {
		data_x.reverse();
		data_y.reverse();
		}
	}

 // Fin du modele 3 

 console.log("ligne 503  amax zmax agefinal age_afficher modele ",amax3,zmax,agefinal,age_afficher,modele);  
  
  
    //if(H0<0 && tdepuisbigbang2==0 && modele!=1) {modele=5;}
//	if(H0<0 && tdepuisbigbang2!=0)	{modele=4;}	
	if (omegalambda0 == 1 && omegam0==0 && Or==0 && omegak0==0) { modele=0;	}
	

  //liste les differents cas pour afficher a l'utilisateur les informations
  var dure_annee = 0;

   console.log("ligne 514  modele ",modele);  
 
 if(modele==0 || modele==1 ) {
	  if (sessionStorage.getItem("LANGUE") == "fr") {
    document.getElementById("resultat_ageunivers_ga").innerHTML = "Pas de Big Bang";
    document.getElementById("resultat_ageunivers_s").innerHTML = "Pas de Big Bang";
    document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
  } else {
    document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
    document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
    document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
  } 
  }
  
   if(modele==2) {
	   //if(H0<0) {age_afficher=-tBC;}
    document.getElementById("resultat_ageunivers_ga").innerHTML = "" + age_afficher;
	document.getElementById("resultat_ageunivers_s").innerHTML = "" + age_sec_afficher;
	tBC_sec = tBC* nbJoursParAn()*86400*1e9;
	total = Number(age) + Number(tBC);
	console.log("ligne534 age total tBC",age,total,tBC);
	dure_annee = total;
	total_sec = (total*nbJoursParAn()*86400*1e9).toExponential(4);
	tBC=Number(tBC).toExponential(4);
	tBC_sec = Number(tBC_sec).toExponential(4);
	total=Number(total).toExponential(4);
    document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.tempsavtBC + tBC + " Ga = " + tBC_sec + " s";
    document.getElementById("resultat_dureeuniv").innerHTML = total + " Ga = " + total_sec + " s";
	
   }
   
 if(modele==3 ) {
	  if (sessionStorage.getItem("LANGUE") == "fr") {
    document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
  } else {
    document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
  } 
     document.getElementById("resultat_ageunivers_ga").innerHTML = "" + age.toExponential(4);
	 document.getElementById("resultat_ageunivers_s").innerHTML = "" + age_sec.toExponential(4);
  }
  
  
 if(modele==4) {
	 tBB_sec=Math.abs(age_ans)*86400*nbJoursParAn();
	 tBC_sec=tBC*nbJoursParAn()*86400*1e9;
     document.getElementById("resultat_ageunivers_ga").innerHTML = "" + Math.abs(tBC).toExponential(4);
	 document.getElementById("resultat_ageunivers_s").innerHTML = "" + Math.abs(tBC_sec).toExponential(4);
	 total = (Math.abs(age_ans) + Math.abs(tBC*1e9)).toExponential(4);
    dure_annee = total;
	total_sec = (total*nbJoursParAn()*86400).toExponential(4);
	document.getElementById("resultat_dureeuniv").innerHTML = (total*1e-9).toExponential(4) + " Ga = " + total_sec + " s";
	
	document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.tempsavtBC + Math.abs(age_ans*1e-9).toExponential(4) + " Ga = " + Math.abs(tBB_sec).toExponential(4) + " s";
 }
 
 if(modele==5) {
	if (sessionStorage.getItem("LANGUE") == "fr") {
    document.getElementById("resultat_ageunivers_ga").innerHTML = "Pas de Big Bang";
    document.getElementById("resultat_ageunivers_s").innerHTML = "Pas de Big Bang";
	document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
    } else {
    document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
    document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
	document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";
    } 
	
	tBB_sec=age_ans*86400*nbJoursParAn();
	document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.tempsavtBC + (age_ans*1e-9).toExponential(4) + " Ga = " + tBB_sec.toExponential(4) + " s";
	console.log("ligne 589  tBB", tBB);
 }
 
 
  //on cree le graphique
  
  if( modele==0 || modele==1  ) {
	  graphique_creation();
  } else {
	  graphique_creation2(); 
  }
  
  
  setTimeout(stop_spin, 300);
}

function graphique_creation2(){
  Or = document.getElementById("resultat_omegar0").innerHTML;
  omegak0 = document.getElementById("resultat_omegak0").innerHTML;
  graph = $("#graphique");
  Plotly.purge(graph);
  graph.empty();
  wid = graph.width();
  if (window.innerWidth > 1700) {
    hei = wid * 0.5;
  } else {
    hei = wid * 2 / 3;
  }
  document.getElementById("graphique").style.height = hei + "px";

  frame = [{
    name: 'Graphe',
    data: [{
      x: [],
      y: []
    }]
  }];
  frame[0].data[0].x = data_x;
  frame[0].data[0].y = data_y;

 
  tracer1 = [{
    x: frame[0].data[0].x,
    y: frame[0].data[0].y,
    line: {
      simplify: false
    },
  }];

  omegalambda0 = ajustePrecision(omegalambda0);
  omegak0 = ajustePrecision(omegak0);
  Or = ajustePrecision(Or);
  t0 = ajustePrecision(t0);
  omegam0 = ajustePrecision(omegam0);
  h0 = ajustePrecision(h0);

  if (document.getElementById("resultat_dureeuniv").innerHTML == "∞") {
    dure_annee = "∞";
  }

  if (window.innerWidth > 960) { 
    annots = [{
        x: 0.005,
        xref: 'paper',
        xanchor: 'center',
        y: 1.025,
        yref: 'paper',
        yanchor: 'bottom',
        text: '<b>' + texte.calculs_univers.entrees + '</b><br>' + 'T<sub>0</sub>= '+
         t0 + ' K<br>' + '                  H<sub>0</sub>= ' + h0 +
         ' km.s<sup>-1</sup>.Mpc<sup>-1</sup><br>' + 'Ω<sub>m0</sub>= ' + omegam0 +
         '<br>Ω<sub>Λ0</sub>= ' + omegalambda0,
        showarrow: false,
      },
      {
        "xref": "paper",
        "yref": "paper",
        "text": "<b>" + texte.calculs_univers.sorties + "<\/b><br>Ω<sub>r0<\/sub>= " +
          Or + "<br>Ω<sub>k0</sub>= " + omegak0 + "<br>t<sub>BB</sub>= " +
          age_afficher + " Ga",
        "y": 1.,
        "x": 1,
        xanchor: 'center',
        yanchor: 'bottom',
        "showarrow": false
      }
    ];
  } else {
    annots = [];
  }
  // tracer
  var img_png = d3.select('#png');
  var img_jpg = d3.select('#jpg');
  var img_svg = d3.select('#svg-1');
 
   Amin = Number(document.getElementById("ami").value);
  Amax = Number(document.getElementById("ama").value);
 console.log("ligne 683 Amin Amax", Amin,Amax); 
  
   

  Plotly.newPlot('graphique', tracer1, {  
  
    title: {
      text: texte.calculs_univers.titre,
      font: {
        family: 'Time New Roman, sans-serif',
        size: 25,
        color: '#111111'
      }
	 },
    

    xaxis: {
	    automargin: true,
      fixedrange: true,
      autorange: false, range:[data_x[1],data_x[data_x.length-1]],
      title: 't (Ga)',
      showline: true
    },

    yaxis: {
      fixedrange: true,
      rangemode: 'tozero',
      autorange: false,range:[Amin,Amax],
      title: 'a(t)',
      showline: true
    },
    annotations: annots,
  },

  {
    displayModeBar: false
  }); 


  Plotly.newPlot('graphique_enr', tracer1, {
	  
    title: {
      text: texte.calculs_univers.titre,
      font: {
          family: 'Arial black, sans-serif',
          size: 16,
          color: '#111111'
        },
      xref: 'paper',
        x: 0.55, 
      
    },
    

    xaxis: {
	    autorange: false, range:[data_x[1],data_x[data_x.length-1]],
      title: 't (Ga)',
      showline: true
    },

    yaxis: {
      rangemode: 'tozero',
      autorange: false,range:[Amin,Amax],
      title: 'a(t)',
      showline: true
    },
    annotations: annots,
  }, {
    displayModeBar: false
  }).then(function(gd) {
    Plotly.toImage(gd)
      .then(function(url) {
        img_png.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'png'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'svg'
        })
      })
      .then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'svg'
        })
      })
  });
}

function graphique_creation(){
  Or = document.getElementById("resultat_omegar0").innerHTML;
  omegak0 = document.getElementById("resultat_omegak0").innerHTML;
  graph = $("#graphique");
  Plotly.purge(graph);
  graph.empty();
  wid = graph.width();
  if (window.innerWidth > 1700) {
    hei = wid * 0.5;
  } else {
    hei = wid * 2 / 3;
  }
  document.getElementById("graphique").style.height = hei + "px";

  frame = [{
    name: 'Graphe',
    data: [{
      x: [],
      y: []
    }]
  }];
  frame[0].data[0].x = data_x;
  frame[0].data[0].y = data_y;

    tracer1 = [{
    x: frame[0].data[0].x,
    y: frame[0].data[0].y,
	line: {
      simplify: false
    },
  }];

  omegalambda0 = ajustePrecision(omegalambda0);
  omegak0 = ajustePrecision(omegak0);
  Or = ajustePrecision(Or); 
  t0 = ajustePrecision(t0);
  omegam0 = ajustePrecision(omegam0);
  H0 = ajustePrecision(H0);

  if (document.getElementById("resultat_dureeuniv").innerHTML == "∞") {
    dure_annee = "∞";
  }

  if (window.innerWidth > 960) {
    annots = [{
        x: 0,
        xref: 'paper',
        xanchor: 'center',
        y: 1,
        yref: 'paper',
        yanchor: 'bottom',
        text: '<b>' + texte.calculs_univers.entrees + '</b><br>' + 'T<sub>0</sub>= '+
         t0 + ' K<br>' + '                  H<sub>0</sub>= ' + H0 +
         ' km.s<sup>-1</sup>.Mpc<sup>-1</sup><br>' + 'Ω<sub>m0</sub>= ' + omegam0 +
         '<br>Ω<sub>Λ0</sub>= ' + omegalambda0,
        showarrow: false,
      },
      {  
        "xref": "paper",
        "yref": "paper",
        "text": "<b>" + texte.calculs_univers.sorties + "<\/b><br>Ω<sub>r0<\/sub>= " +
          Or + "<br>Ω<sub>k0</sub>= " + omegak0 + "<br>t<sub>BB</sub>= " +
          age_afficher + " Ga",
        "y": 1,
        "x": 1,
        xanchor: 'center',
        yanchor: 'bottom',
        "showarrow": false
      }
    ];
  } else {
    annots = [];
  }
  // tracer
  var img_png = d3.select('#png');
  var img_jpg = d3.select('#jpg');
  var img_svg = d3.select('#svg-1');

  Plotly.newPlot('graphique', tracer1, {
	  
	   
	  title:texte.calculs_univers.titre  ,
    
    xaxis: {
      autorange: true,
      title: 't (Ga)',
      showline: true
    },

    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: 'a(t)',
      showline: true
    },
    annotations: annots,
  },

  {
    displayModeBar: false
  });

  Plotly.newPlot('graphique_enr', tracer1, {
	   
	 title: {
      text: texte.calculs_univers.titre,
      font: {
        family: 'Arial black, sans-serif',
        size: 16,
        color: '#111111'
      },
	  xref: 'paper',
      x: 0.55, 
	  
	 },
    
	
    xaxis: {
      autorange: true,
      autorange: true,
      title: 't (Ga)',
      showline: true
    },


    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: 'a(t)',
      showline: true
    },
    annotations: annots,
  }, {
    displayModeBar: false
  }).then(function(gd) {
    Plotly.toImage(gd)
      .then(function(url) {
        img_png.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'png'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'svg'
        })
      })
      .then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(gd, {
          format: 'svg'
        })
      })
  });
}

function enre() {
  format = document.getElementById("format_enr");
  png = document.getElementById("png");
  jpg = document.getElementById("jpg");
  svg = document.getElementById("svg-1");
  if (format.options[0].selected) {
    png.click();
  } else if (format.options[1].selected) {
    jpg.click();
  } else {
    svg.click();
  }
}

function derivee_premiere(a,omegam0, omegalambda0, Or){
return Math.pow(Or/Math.pow(a,2) + omegam0/a + omegalambda0*Math.pow(a,2) +1-omegalambda0-Or-omegam0 ,0.5); }


function derivee_seconde_univers(adetau) {
return     -Or / (Math.pow(adetau, 3)) - (0.5) * omegam0 / (Math.pow(adetau, 2)) + adetau * omegalambda0;
}

function rungekutta_univers(pas, adetau, dasurdtau) {
      k = [0, 0, 0, 0];
      k[0] = derivee_seconde_univers(adetau);
      k[1] = derivee_seconde_univers(adetau + 0.5 * pas * dasurdtau);
      k[2] = derivee_seconde_univers(adetau + 0.5 * pas * dasurdtau + 0.25 * pas * pas * k[0]);
      k[3] = derivee_seconde_univers(adetau + pas * dasurdtau + 0.5 * pas * pas * k[1]);
      adetau = adetau + pas * dasurdtau + (1 / 6) * pas * pas * (k[0] + k[1] + k[2]);
      dasurdtau = dasurdtau + (pas / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
      return [adetau, dasurdtau];
    }
	
	
	//Simpson utilisé pour le calcul du temps
//fonction de l'equation de simpson_deg2
function simpson_simple_degre2(fonction,bornInf, omegam0, omegalambda0, Or){
  var Sum=0.0;
  var n=Math.pow(10,8);
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


function monoSitter(h0, temps) {
  return Math.exp(h0 * temps);
}



