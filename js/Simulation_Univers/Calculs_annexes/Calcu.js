// JavaScript Document

const ORDRE_ARRONDI=4;
const LUMIERE = 9460730472580800;  // une année lumière en mètres
const LUMIERE_INV= 1/LUMIERE;
const AU = 149597870700; // unite astronomique en mètres

function arrondi(val){
  	if(val!=0){
    	return val.toExponential(ORDRE_ARRONDI);
  	}
  	else{
    	return 0;
  	}
}

function Compte_calc() {
  	url = "savedata.php";
  	m = $.post(url);
}

function lance_calc(path) {
  	calculs = calculs + 1;
	chargement();
	if (path==0) {
		setTimeout(calcu(path), 100);
	}else {
		setTimeout(calcu(path), 100);
	}
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

function calcu(path) {
	time_affiche = document.getElementById("resul_tps");
	time_affiche.style.display = "none";
	deb = new Date().getTime();
	fin = 0;

	document.getElementById("tempsEmission_alert").innerHTML = "";
	document.getElementById("tempsReception_alert").innerHTML = "";

	//création d'une liste qui va prendre les résultats des calculs avant qu'ils soient arrondis
	arr = [];
	//recuperation des valeurs
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value);  //  em km par seconde et par mégaparsec
	cosmo_const = Number(document.getElementById("lambda_cosmo_const").value);
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	omegalambda0 = Number(document.getElementById("omegalambda0_annexes").value);
	omegalambda0 = omegalambda0.toExponential();
	omegak0 = Number(document.getElementById("resultat_omegak0_annexes").innerHTML);
	Ie = Number(document.getElementById("i_e").value);
	zmin = Number(document.getElementById("zmin").value);
	zmax = Number(document.getElementById("zmax").value);

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

	Eps = Number(0.001);

	//calcul de h0 par secondes et par gigaAnnees
	H0parsec = h0 * 1000 / ((AU * (180 * 3600)) / Math.PI * Math.pow(10, 6));  //H0 en seconde moins 1

	H0enannee = H0parsec * (3600 * 24 * nbrjours);
	H0engannee = H0enannee * Math.pow(10, 9);
	Or = 0;
	if (document.getElementById("resultat_omegar0_annexes").options[0].selected) {
		sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
		rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
		Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
		Or = 1.68 * Or;
		Or = Or.toExponential();
	} else if (document.getElementById("resultat_omegar0_annexes").options[1].selected) {
		sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
		rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
		Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
		Or = Or.toExponential();
	} else {
		Or = 0;
	}

	//on recupere les valeurs de z1 et z2
	z1 = Number(document.getElementById("z1").value);
	z2 = Number(document.getElementById("z2").value);

	avertissement();

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

  	//détermine quelles formules sont utiles pour la distance metrique, omegak positif 0 ou negatif
  	// les fonctions "simpson" présentaient ici sous les méthodes de Simpson adaptives

	// DM
  	var integ_1,integ_2,integ_between;

	if (omegak0>0){
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(zz1), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_1);

		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(zz2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_2);

		integ_between=Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_between);
		}
	else if (omegak0==0){
		dm1=(c/(H0parsec) * simpson(0, Number(zz1), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps));
		dm2=(c/(H0parsec) * simpson(0, Number(zz2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps));
		dm=(c/(H0parsec) * simpson(Number(z1), Number(z2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps));
	}
	else{
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(zz1), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_1);

		integ_2 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(zz2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm2=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_2);

		integ_between = Math.sqrt( Math.abs(omegak0)) * simpson(Number(z1), Number(z2), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_between);
	}

	//calcul de la distance du diametre apparent et distance lumiere
	dda = dm1 / (1 + Number(z1));
	dl = dm1 * (1 + (z1));

	dda_2 = dm2 / (1+ Number(z2));
	dl_2 = dm2 * (1+ Number(z2));

	Le = 4 * pi() * Ie;
	Ee = Le / (4 * pi() * Math.pow(dl,2));

	Ee_2 = Le / (4* pi() * Math.pow(dl_2,2));

	Eps = Number(0.001);


	// TEMPS
	//
	// Calcul du temps de réception
	if (Number(z2) <= 1e12) {
		tempsReception = simpson_simple_degre2(fonction_integrale, Number(z2), omegam0, Number(omegalambda0), Number(Or));
	}

	else{
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
		tempsEmission = simpson_simple_degre2(fonction_integrale, Number(z1), omegam0, Number(omegalambda0), Number(Or));
		
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
		agebetween=2/(3*Math.pow(omegam0,1/2)*H0enannee)*( Math.pow(Number(z2)+1,-3/2)-Math.pow(Number(z1)+1,-3/2) );
	}
	// formule analytique pour les cas hors Lambda et Matiere pour les z>1e12
	else if(Or!=0 && (z1>=1e12 && z2>=1e12) ){
		agebetween=(1/(2*Math.pow(Or,0.5)*H0enannee))*(Math.pow(1+Number(z2),-2)-Math.pow(1+Number(z1),-2));
	}
	// autres cas
	else{
		agebetween=tempsReception-tempsEmission;
	}

	agebetween_sec=agebetween*H0enannee/H0parsec;


	//----------------------------JP
	Tz1 = t0 * (1 + Number(z1));
	Tz1 = arrondi(Tz1);

	Omz1 = omegam0 * Math.pow(1 + Number(z1), 3) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
	Omz1 = arrondi(Omz1);

	Olz1 = Number(omegalambda0) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
	Olz1 = arrondi(Olz1);

	Orz1 = Or * Math.pow(1 + Number(z1), 4) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
	Orz1 = arrondi(Orz1);

	Okz1 = omegak0 * Math.pow(1 + Number(z1), 2) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
	Okz1 = arrondi(Okz1);

	Hz1 = h0 * Math.pow(fonction_E(Number(z1), omegam0, Number(omegalambda0), Or), 0.5);
	Hz1 = arrondi(Hz1);

	Tz2 = t0 * (1 + Number(z2));
	Tz2 = arrondi(Tz2);

	Omz2 = omegam0 * Math.pow(1 + Number(z2), 3) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
	Omz2 = arrondi(Omz2);

	Olz2 = Number(omegalambda0) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
	Olz2 = arrondi(Olz2);

	Orz2 = Or * Math.pow(1 + Number(z2), 4) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
	Orz2 = arrondi(Orz2);

	Okz2 = omegak0 * Math.pow(1 + Number(z2), 2) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
	Okz2 = arrondi(Okz2);

	Hz2 = h0 * Math.pow(fonction_E(Number(z2), omegam0, Number(omegalambda0), Or), 0.5);
	Hz2 = arrondi(Hz2);

	//les distances sont positives
	dm = Math.abs(dm);
	dm1 = Math.abs(dm1);
	dm2 = Math.abs(dm2);
	dda = Math.abs(dda);
	dl = Math.abs(dl);
	dda_2 = Math.abs(dda_2);
	dl_2 = Math.abs(dl_2);


	//parsec?

	dm_pc = dm * 3.2407557442396 * Math.pow(10, -17);
	dm1_pc = dm1 * 3.2407557442396 * Math.pow(10, -17);
	dm2_pc = dm2 * 3.2407557442396 * Math.pow(10, -17);
	da_pc = dda * 3.2407557442396 * Math.pow(10, -17);
	dl_pc = dl * 3.2407557442396 * Math.pow(10, -17);
	da2_pc = dda_2 * 3.2407557442396 * Math.pow(10, -17);
	dl2_pc = dl_2 * 3.2407557442396 * Math.pow(10, -17);

	//années lumière

	dm1_lum = (dm1 *LUMIERE_INV);
	dm2_lum = (dm2 * LUMIERE_INV);
	dif_lum = (dm * LUMIERE_INV);
	da_lum = (dda * LUMIERE_INV);
	dl_lum = (dl * LUMIERE_INV);
	da2_lum = (dda_2 * LUMIERE_INV);
	dl2_lum = (dl_2 * LUMIERE_INV);

	arr.push(dm1, dm2, dm, dda, dl, dm1_pc, dm2_pc, dm_pc, da_pc, dl_pc, dm1_lum, dm2_lum, dif_lum, da_lum, dl_lum, tempsEmission, tempsReception, agebetween, tempsEmission_sec, tempsReception_sec, agebetween_sec);

	//on ajuste le nombre de decimale apres la virgule
	dm=arrondi(dm);
	dm1=arrondi(dm1);
	dm2=arrondi(dm2);
	dda=arrondi(dda);
	dl=arrondi(dl);
	dda_2=arrondi(dda_2);
	dl_2=arrondi(dl_2);
	dm_pc=arrondi(dm_pc);
	dm1_pc=arrondi(dm1_pc);
	dm2_pc=arrondi(dm2_pc);
	da_pc=arrondi(da_pc);
	dl_pc=arrondi(dl_pc);
	da2_pc=arrondi(da2_pc);
	dl2_pc=arrondi(dl2_pc);
	dm1_lum=arrondi(dm1_lum);
	dm2_lum=arrondi(dm2_lum);
	dif_lum=arrondi(dif_lum);
	da_lum=arrondi(da_lum);
	dl_lum=arrondi(dl_lum);
	da2_lum=arrondi(da2_lum);
	dl2_lum=arrondi(dl2_lum);
	agebetween=arrondi(agebetween);
	tempsReception=arrondi(tempsReception);
	tempsEmission=arrondi(tempsEmission);
	agebetween_sec=arrondi(agebetween_sec);
	tempsReception_sec=arrondi(tempsReception_sec);
	tempsEmission_sec=arrondi(tempsEmission_sec);
	Le=arrondi(Le);

	if (Ee != 0 && !isNaN(Ee)) {
		Ee = arrondi(Ee);
		document.getElementById("show_E_e").style.display = "contents";
	}else {
		Ee = "";
	}
	if (Ee_2 != 0 && !isNaN(Ee_2)) {
		Ee_2 = arrondi(Ee_2);
		document.getElementById("show_E_e_2").style.display = "contents";
	}else {
		Ee_2 = "";
	}

	//Display Results
	// modele sans big bang et sans big crunch
	modele=0;
	age_ans= simpson_simple_degre2(fonction_integrale, Number(0), Number(omegam0), Number(omegalambda0), Number(Or));  // age en annees ou bien NaN
	if(isNaN(age_ans)) {modele=1;}

	if (path == 0) {
		document.getElementById("show_plot").style.display = "contents";
		document.getElementById("Hz1_unit").style.display = "contents";
		document.getElementById("Tz1_unit").style.display = "contents";
		document.getElementById("Hz2_unit").style.display = "contents";
		document.getElementById("Tz2_unit").style.display = "contents";
		document.getElementById("show_dm1").style.display = "contents";
		document.getElementById("show_dm2").style.display = "contents";
		document.getElementById("show_dl").style.display = "contents";
		document.getElementById("show_da").style.display = "contents";
		document.getElementById("show_dl_2").style.display = "contents";
		document.getElementById("show_da_2").style.display = "contents";
		document.getElementById("show_dm").style.display = "contents";
		document.getElementById("show_temi").style.display = "contents";
		document.getElementById("show_trecep").style.display = "contents";
		document.getElementById("show_dt").style.display = "contents";
		document.getElementById("show_L_e").style.display = "contents";

		//on change les champs pour informer l'utilisateur des resultats trouvés
		document.getElementById("dm").innerHTML = dm;
		document.getElementById("dm1").innerHTML = dm1;
		document.getElementById("dm2").innerHTML = dm2;
		document.getElementById("dl").innerHTML = dl;
		document.getElementById("dda").innerHTML = dda;
		document.getElementById("dl_2").innerHTML = dl_2;
		document.getElementById("dda_2").innerHTML = dda_2;

		document.getElementById("dm_pc").innerHTML = dm_pc;
		document.getElementById("dm1_pc").innerHTML = dm1_pc;
		document.getElementById("dm2_pc").innerHTML = dm2_pc;
		document.getElementById("dda_pc").innerHTML = da_pc;
		document.getElementById("dl_pc").innerHTML = dl_pc;
		document.getElementById("dda_pc").innerHTML = da_pc;
		document.getElementById("dl_pc").innerHTML = dl_pc;
		document.getElementById("dda2_pc").innerHTML = da2_pc;
		document.getElementById("dl2_pc").innerHTML = dl2_pc;

		document.getElementById("dm1_lum").innerHTML = dm1_lum;
		document.getElementById("dm2_lum").innerHTML = dm2_lum;
		document.getElementById("dm_diff_lum").innerHTML = dif_lum;
		document.getElementById("dda2_lum").innerHTML = da2_lum;
		document.getElementById("dl_lum").innerHTML = dl_lum;
		document.getElementById("dda_lum").innerHTML = da_lum;
		document.getElementById("dl2_lum").innerHTML = dl2_lum;
		document.getElementById("L_e").innerHTML = Le;
		document.getElementById("E_e").innerHTML = Ee;
		document.getElementById("E_e_2").innerHTML = Ee_2;


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
		document.getElementById("Tz1").innerHTML = Tz1;

		document.getElementById("Omz2").innerHTML = Omz2;
		document.getElementById("Olz2").innerHTML = Olz2;
		document.getElementById("Orz2").innerHTML = Orz2;
		document.getElementById("Okz2").innerHTML = Okz2;
		document.getElementById("Hz2").innerHTML = Hz2;
		document.getElementById("Tz2").innerHTML = Tz2;

	} else if (path == 1 && modele==0) {
		// Distances' charts in function of z
		document.getElementById("graph_container_d").style.display = "contents"; //display graph
		let annots = [];
		let val_graph = calculDeDs(zmin, zmax, 100);
		let data = [
			{
				x: val_graph[3],
				y: val_graph[1],
				type: 'scatter',
				name: '<b>d<sub>a</sub><b>'
			},
			{
				x: val_graph[3],
				y: val_graph[2],
				type: 'scatter',
				name: '<b>d<sub>m</sub><b>'
			},
			{
				x: val_graph[3],
				y: val_graph[0],
				type: 'scatter',
				name: '<b>d<sub>L</sub><b>'
			},
			{
				x: val_graph[3],
				y: val_graph[4],
				type: 'scatter',
				name: '<b>d<sub>LT</sub><b>'
			}
		];
		let layout = {
			title: "d<sub>m</sub>  d<sub>L</sub>  d<sub>a</sub>  d<sub>LT</sub>",
			titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
			
			xaxis: {
				autorange: true,
				title: 'z',
				titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
				showline: true
			},
	
			yaxis: {
				rangemode: 'tozero',
				autorange: true,
				title: 'al',
				titlefont:{family:"Arial black, monospace",size:25,color:"#7f7f7f"},
				showline: true
			},
			annotations: annots,
		};
		graphique_creation("graphique", ['graphique', data, layout, {displaylogo: false}]);
	} else if (path == 2 && modele==0) {
		// Omegas' charts in function of z
		document.getElementById("graph_container_omega").style.display = "contents"; //display graph
		let annots = [];
		let val_graph = calcul_omegas(zmin,zmax,1000);
		let data = [
			{
				x: val_graph[4],
				y: val_graph[0],
				type: 'scatter',
				name: '<b>Ω<sub>m</sub></b>'
			},
			{
				x: val_graph[4],
				y: val_graph[1],
				type: 'scatter',
				name: '<b>Ω<sub>Λ</sub></b>'
			},
			{
				x: val_graph[4],
				y: val_graph[2],
				type: 'scatter',
				name: '<b>Ω<sub>r</sub></b>'
			},
			{
				x: val_graph[4],
				y: val_graph[3],
				type: 'scatter',
				name: '<b>Ω<sub>k</sub></b>'
			}
		];
		let layout = {
			title: "<b>\Ω<sub>m</sub>  Ω<sub>Λ</sub>  Ω<sub>r</sub>  Ω<sub>k</sub></b>",
			titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
	
			xaxis: {
				autorange: true,
				title: 'z',
				titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
				showline: true
			},
	
			yaxis: {
				rangemode: 'tozero',
				autorange: true,
				title: '',
				showline: true
			},
			annotations: annots,
		};
		graphique_creation("graphique_omega", ['graphique_omega', data, layout, {displaylogo: false}]);
	} else if(path == 3 && modele==0){
		// Chart t(z)
		document.getElementById("graph_container_t").style.display = "contents"; //display graph
		let annots = [];
		let val_graph = calcul_temps(zmin,zmax,100);
		let data = [
			{
				x: val_graph[0],
				y: val_graph[1],
				type: 'scatter',
				line: {
					simplify: false
				},
				name: '<b>t(z)</b>'
			}
		];
		let layout = {
			title: "<b>t(z)</b>",
			titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},

			xaxis: {
				autorange: true,
				title: 'z',
				titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
				showline: true
			},

			yaxis: {
				autorange: true,
				title: 'temps (Ga)',titlefont:{family:"Arial black, monospace",size:25,color:"#7f7f7f"},
				showline: true
			},

			newshape: {
			line: {
					width: 6
				},
			},

			annotations: annots,
		};
		graphique_creation("graphique_t", ['graphique_t', data, layout, {displaylogo: false}]);
	} else if(path == 4 && modele==0) {
		// Distances' charts in function of t
		document.getElementById("graph_container_d_t").style.display = "contents"; //display graph
		var val_abscissa = calcul_temps(zmin, zmax, 100);
		let val_graph = calculDeDs(zmin, zmax, 100);
		let annots = [];
		let data = [
			{
				x: val_abscissa[1],
				y: val_graph[1],
				type: 'scatter',
				name: '<b>d<sub>a</sub><b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[2],
				type: 'scatter',
				name: '<b>d<sub>m</sub><b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[0],
				type: 'scatter',
				name: '<b>d<sub>L</sub><b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[4],
				type: 'scatter',
				name: '<b>d<sub>LT</sub><b>'
			}
		];
		let layout = {
			title: "d<sub>m</sub>  d<sub>L</sub>  d<sub>a</sub>  d<sub>LT</sub>",
			titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
			
			xaxis: {
				autorange: true,
				title: 't',
				titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
				showline: true
			},
	
			yaxis: {
				rangemode: 'tozero',
				autorange: true,
				title: 'al',
				titlefont:{family:"Arial black, monospace",size:25,color:"#7f7f7f"},
				showline: true
			},
			annotations: annots,
		};
		graphique_creation("graphique_dt", ['graphique_dt', data, layout, {displaylogo: false}]);
	} else if(path == 5 && modele==0) {
		// Omegas' charts in function of t
		document.getElementById("graph_container_omega_t").style.display = "contents"; //display graph
		var val_abscissa = calcul_temps(zmin, zmax, 500);
		let val_graph = calcul_omegas(zmin, zmax, 500);
		let annots = [];
		let data = [
			{
				x: val_abscissa[1],
				y: val_graph[0],
				type: 'scatter',
				name: '<b>Ω<sub>m</sub></b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[1],
				type: 'scatter',
				name: '<b>Ω<sub>Λ</sub></b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[2],
				type: 'scatter',
				name: '<b>Ω<sub>r</sub></b>'
			},
			{
				x: val_abscissa[1],
				y: val_graph[3],
				type: 'scatter',
				name: '<b>Ω<sub>k</sub></b>'
			}
		];
		let layout = {
			title: "<b>\Ω<sub>m</sub>  Ω<sub>Λ</sub>  Ω<sub>r</sub>  Ω<sub>k</sub></b>",
			titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
	
			xaxis: {
				autorange: true,
				title: 't',
				titlefont:{family:"Arial black, monospace",size:30,color:"#7f7f7f"},
				showline: true
			},
	
			yaxis: {
				rangemode: 'tozero',
				autorange: true,
				title: '',
				showline: true
			},
			annotations: annots,
		};
		graphique_creation("graphique_omegat", ['graphique_omegat', data, layout, {displaylogo: false}]);
	}

	stop_spin();

	// Temps calcul
	fin = new Date().getTime() - deb;
	Chaine = "Le calcul a duré : " + fin + " millisecondes !";
	time_affiche.innerHTML = Chaine;
	//time_affiche.style.display ="inline-block";

}

function calculD() {
	var z1 = document.getElementById("z1_checkbox").checked;
	var z2 = document.getElementById("z2_checkbox").checked;

	if (z1 && dda !=0){
		window.document.getElementById("diametre").value = (window.document.getElementById("theta").value /
			206265 * Number(dda)).toExponential(2);
	}
	else if(z2 && dda_2 !=0){
		window.document.getElementById("diametre").value = (window.document.getElementById("theta").value /
			206265 * Number(dda_2)).toExponential(2);
	}
}

function calcul1Dkpc(){
	var z1 = document.getElementById("z1_checkbox").checked;
	var z2 = document.getElementById("z2_checkbox").checked;

	if (z1 && dda !=0){
		window.document.getElementById("diametrekpc").value = ((window.document.getElementById("theta").value /
			206265 * Number(dda))* 3.24079* Math.pow(10, -20)).toExponential(2);
	}
	else if(z2 && dda_2 !=0){
		window.document.getElementById("diametrekpc").value = ((window.document.getElementById("theta").value /
			206265 * Number(dda_2))*3.24079* Math.pow(10, -20)).toExponential(2);
	}
}

function calculthetakpc() {
	var z1 = document.getElementById("z1_checkbox").checked;
	var z2 = document.getElementById("z2_checkbox").checked;

	if (z1 && dda !=0){
		window.document.getElementById("theta").value = (206265 * (window.document.getElementById("diametrekpc").value*3.0856*Math.pow(10,19)) /
			Number(dda)).toExponential(2);
	}
	else if(z2 && dda_2 !=0){
		window.document.getElementById("theta").value = (206265 * (window.document.getElementById("diametrekpc").value*3.0856*Math.pow(10,19)) /
			Number(dda_2)).toExponential(2);
	}
}

function calcultheta() {
	var z1 = document.getElementById("z1_checkbox").checked;
	var z2 = document.getElementById("z2_checkbox").checked;
	if (z1 && dda !=0){
		window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value /
			Number(dda)).toExponential(2);
	}
	else if(z2 && dda_2 !=0){
		window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value /
			Number(dda_2)).toExponential(2);
	}
}

function calculDeDs(zmin,zmax,dt){
	Eps = Number(0.001);  //0.00001
	var pas = (zmax - zmin)/dt;
	var zArr = [];
	var i = zmin;
	var daArr = [];
	var da;
	var dlArr = [];
	var dl;
	var dm1;
	var dmArr = [];
	var dlt;
	var dltArr = [];
	var max_graph;
	var min_graph;
	var integ_1;

	// temps_0= simpson_simple_degre2(fonction_integrale, 0, omegam0, Number(omegalambda0), Number(Or));  // temps en années
	// temps_0 = temps_0 * H0enannee / H0parsec; 

	while (i<=zmax) {
		
		// calcul de la distance mètrique 

		if (omegak0>0){
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);  // sans unité
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_1);  // distance mètrique en mètres
		}
		else if (omegak0==0){
		dm1=(c/(H0parsec) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps));
		}
		else{
		integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
		dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_1) ;
		}


		//  temps en secondes
		temps = simpson_simple_degre2(fonction_integrale, Number(i), omegam0, Number(omegalambda0), Number(Or));
		temps = temps * H0enannee / H0parsec;

		dlt = temps * c;
		dlt = dlt * LUMIERE_INV;

		dm1 = Math.abs(dm1); // distances positives

		dm1 = dm1 * LUMIERE_INV;  //  distance mètrique en années lumière

		dm1 = Number(dm1.toExponential(3));
		da = dm1 / (1 + i);
		dl = dm1 * (1 + i);

		da = Number(da.toExponential(3));
		dl = Number(dl.toExponential(3));

		dmArr.push(dm1);
		daArr.push(da);
		dlArr.push(dl);
		dltArr.push(dlt);

		zArr.push(i);

		i = i + pas;
	}

	return [dlArr,daArr,dmArr,zArr,dltArr];
}

function calcul_omegas(zmin,zmax,dt){
	zz=0. ;
	zArr = [];
	omArr = [];
	olArr = [];
	orArr = [];
	okArr = [];
	pas = (zmax - zmin)/dt;
	i=zmin;
	// lz = Math.log10(1+i);

	while (i<zmax) {
		Omz = omegam0 * Math.pow(1 + Number(i), 3) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
		Omz = Omz.toExponential(4);
		omArr.push(Omz);

		Olz = Number(omegalambda0) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
		Olz = Olz.toExponential(4);
		olArr.push(Olz);

		Orz = Or * Math.pow(1 + Number(i), 4) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
		Orz = Orz.toExponential(4);
		orArr.push(Orz);

		Okz = omegak0 * Math.pow(1 + Number(i), 2) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
		Okz = Okz.toExponential(4);
		okArr.push(Okz);
		
		zArr.push(i);
		i = i + pas;
		//lz=Math.log10(1+i);

	}

	return [omArr,olArr,orArr,okArr,zArr];
}



function calcul_temps(zmin,zmax,dt){
	zArr = [];
	tempsArr=[];
	pas = (zmax - zmin)/dt;
	temps_0=0;
	h0 = Number(document.getElementById("H0_annexes").value); 
	if(h0<0) {temps_0=simpson_simple_degre2(fonction_integrale, 0, omegam0, Number(omegalambda0), Number(Or)); temps_0=-temps_0;}
	
	i = Number(zmin);
	
	while(i<zmax){	
		if (Number(i) <= 1e12) {
			temps = simpson_simple_degre2(fonction_integrale, Number(i), omegam0, Number(omegalambda0), Number(Or));
			tempsArr.push(temps+temps_0);
		} else {
			// nécessaire car l'ordre 4 de E(x) est lié à Or, on prend donc l'ordre 3
			if (Or==0){
				temps=2/(3*Math.pow(omegam0,1/2)*H0enannee*Math.pow(Number(i)+1,3/2));
				temps=temps.toExponential(3)
				tempsArr.push(temps)
			}
			else{
				temps = 1 / (Math.pow(1 + Number(i), 2) * 2 * Math.pow(Or, 0.5) * H0enannee);
				temps=temps.toExponential(3)
				tempsArr.push(temps)
			}
		}
		zArr.push(i);
		i+=pas 
	}
	return [zArr,tempsArr];
}

function graphique_creation(id_document, params_to_plotly){
	/*
		This function create the graphics for calcul annexe using plotly lib
		id_document : id of the object on html page
		params_to_plotly : parameters that are passed to plotly

		return : nothing
	*/

	var graph = $("#"+id_document);
	Plotly.purge(graph);
	graph.empty();

	var wid = graph.width();
	if (window.innerWidth > 1000) {
		var hei = wid * 0.5;
	} else {
		var hei = wid * 2 / 3;
	}

	window.document.getElementById(id_document).style.height = hei + "px";
	
	var img_png = d3.select('#png');
	var img_jpg = d3.select('#jpg');
	var img_svg = d3.select('#svg-1');
	
	Plotly.newPlot(params_to_plotly[0], params_to_plotly[1], params_to_plotly[2], params_to_plotly[3]);
	


	Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3])
      .then(function(url) {
        img_png.attr("href", url);
        return Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3], {
          format: 'png'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3], {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_jpg.attr("href", url);
        return Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3], {
          format: 'jpeg'
        })
      }).then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3], {
          format: 'svg'
        })
      })
      .then(function(url) {
        img_svg.attr("href", url);
        return Plotly.toImage(params_to_plotly[0],params_to_plotly[1], params_to_plotly[2], params_to_plotly[3], {
          format: 'svg'
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

function onlyOne(checkbox) {
	var checkboxes = document.getElementsByName('z');
	checkboxes.forEach((item) => {
		if (item !== checkbox) item.checked = false;
		window.document.getElementById("diametre").value = "";
		window.document.getElementById("theta").value = "";
		window.document.getElementById("diametrekpc").value = "";
	})
}
