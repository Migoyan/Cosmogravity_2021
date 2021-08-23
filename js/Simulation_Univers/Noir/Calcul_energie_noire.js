function Lancer_calc() {
	// ramène la page en haut (pour que les annotations du graphique se placent bien).
	document.getElementById("ret").click();
	chargement();
	setTimeout(Calc, 100);
}

function ajustePrecision(valeur) {
	if (valeur != 0) {
		valeur = parseFloat(valeur).toExponential(3);
	} else {
		valeur = 0;
	}
	return valeur;
}

function Calc() {

	var modele=0;
	update_omegar0_simu_noir();
	//on recupere les valeurs des variables
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;

	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = Number(document.getElementById("omegam0").value);
	omegaDE0 = Number(document.getElementById("omegaDE0").value);
	texte = o_recupereJson();

	//on recupere le bon nombre de jour par an.
	if (typeannee == "Sidérale") {
		nbrjours = 365.256363051;
	} else if (typeannee == "Julienne") {
		nbrjours = 365.25;
	} else if (typeannee == "Tropique (2000)") {
		nbrjours = 365.242190517;
	} else {
		nbrjours = 365.2425;
	}

	//calcule des h0 par seconde par anneee et par gigaannee
	au = 149597870700;
	H0parsec = h0 * 1000 / ((au * (180 * 3600)) / Math.PI * Math.pow(10, 6));
	H0enannee = H0parsec * (3600 * 24 * nbrjours);
	H0engannee = H0parsec * (3600 * 24 * nbrjours) * Math.pow(10, 9);

	//on calcule omegar
	Or = 0;
	if (document.getElementById("liste").options[0].selected) {
		sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
		rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
		Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
		Or = 1.68 * Or;
		Or = Or.toExponential(3);
	} else if (document.getElementById("liste").options[1].selected) {
		sigma = (2 * Math.pow(Math.PI, 5) * Math.pow(k, 4)) / (15 * Math.pow(h, 3) * Math.pow(c, 2));
		rho_r = (4 * sigma * Math.pow(t0, 4)) / (Math.pow(c, 3));
		Or = (8 * Math.PI * G * rho_r) / (3 * Math.pow(H0parsec, 2));
		Or = Or.toExponential(3);
	} else {
		Or = 0;
	}

	//on s'occupe de changer la position du point sur le modèle
	PosX = 53 + omegam0 * 230 / 3;
	PosY = 246;
	if (omegaDE0 >= 0) {
		PosY += -omegaDE0 * 325 / 4.5;
	} else {
		PosY -= omegaDE0 * 325 / 4.5
	}

	PosX -= 1.5;
	PosY -= 1.5;


	//on calcule omegak
	omegak0 = 1 - Or - omegam0 - omegaDE0;
	if (document.getElementById("univ_plat").checked) {
		omegak0 = 0;
	}

	Or = parseFloat(Or).toFixed(10);
	omegak0 = omegak0.toFixed(10);
	console.log(omegak0);


	$('#graphique_svg').empty();

	//donne les variables sous forme d'exposant si differente de 0
	omegaDE0 = ajustePrecision(omegaDE0);
	omegak0 = ajustePrecision(omegak0);
	Or = ajustePrecision(Or);

	omegak0_afficher = Number(omegak0).toFixed(6);

	//calcul de l'age de l'univers

	eps = 0.001;
	if (omegaDE0 > 1e6 || omegam0 > 1e6) {
		eps = 0.1;
	}
	initial_a = 0;
	age_sec = simpson(0, 0.999999, cv_Enoire_temps_substitution, omegam0, Number(omegaDE0), Number(Or), eps);
	if(isNaN(age_sec)) { modele=1; age_afficher="NaN";  
	} else {
		age_sec = age_sec * (1. / H0parsec) * H0enannee;
		//on le passe en gigaannees
		age = age_sec / ((3600 * 24 * nbrjours) * Math.pow(10, 9));
		//on creer une variable limite en nombre de decimal pour l'affichage
		age_afficher = Number(age).toExponential(4);
		age_sec_afficher = Number(age_sec).toExponential(4);
	}


	//on réinitialise les 3 champs pour eviter les erreurs d'affichage
	document.getElementById("resultat_ageunivers_ga").innerHTML = texte.calculs_univers.pasBB;
	document.getElementById("resultat_ageunivers_s").innerHTML = texte.calculs_univers.pasBB;
	document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.pasBC;
	document.getElementById("resultat_dureeuniv").innerHTML = "&#8734;";

	if (age >= 0) {
		document.getElementById("resultat_ageunivers_ga").innerHTML = age_afficher;
		document.getElementById("resultat_ageunivers_s").innerHTML = age_sec_afficher;
	} else {
		document.getElementById("resultat_ageunivers").innerHTML = texte.calculs_univers.pasBB;
		age = 0;
	}



	//on fait appel a la methode de rungekutta pour calculer les points de la courbe
	ymoinsrunge = [1, 1];
	ymoinsrungederiv = [1, 1];
	k = [0, 0, 0, 0];
	j = [0, 0, 0, 0];
	pas = age*5e-6;
	m = 0;
	yrunge = 1;
	yrunge2 = 1;
	data_x = [];
	data_y = [];
	while (yrunge2 > 0.01 && yrunge2 < 5.) {
		yrunge2 = rungekutta_neg(m);
		ymoinsrunge[0] = ymoinsrunge[1];
		res = age + m / H0engannee;
		ymoinsrungederiv[0] = ymoinsrungederiv[1];
		if (yrunge2 > 0) {
			data_x.push(age + m / H0engannee);
			data_y.push(yrunge2);
	 	}
		m = m - pas;
	}

	data_x.reverse();
	data_y.reverse();

	//on refait appel à rungekutta pour la deuxieme partie
	i = 0;
	pas = age*5e-6;
	yrunge = 1;
	ymoinsrunge = [1, 1];
	ymoinsrungederiv = [1, 1];
	k = [0, 0, 0, 0];
	j = [0, 0, 0, 0];
	while (yrunge > 0 && yrunge < 5.) { // permet de boucler sur une valeur de reference
		yrunge = rungekutta(i); //position f(x) Runge-Kutta
		if (yrunge > 0) {
			data_x.push(age + i / H0engannee);
			data_y.push(yrunge);
		}
		i = i + pas;
	}
	console.log("yrunge ", yrunge);		

	//liste les differents cas pour afficher a l'utilisateur les informations
	if (age < 0) {
		document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.tempsdepuisBC + Math.abs(age_afficher) + " Ga = " + Math.abs(age_sec_afficher) + " s";
	} else if (yrunge <= 0 || isNaN(yrunge)) {
		tBC = i / H0engannee;
		tBC_sec = Number(i / H0parsec).toExponential(4);
		tBC_afficher = Number(tBC).toExponential(4);
		total = (Number(age) + Number(tBC_afficher)).toExponential(4);
		total_sec = (Number(age_sec_afficher) + Number(tBC_sec)).toExponential(4);
		document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.tempsavtBC + tBC_afficher + " Ga = " + tBC_sec + " s";
		document.getElementById("resultat_dureeuniv").innerHTML = (total) + " Ga = " + total_sec + " s";
	} else if (h0 < 0 && (yrunge2 <= 0 || isNaN(yrunge2))) {
		document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.calculBC;
	} else if (big_rip_detection(yrunge)) {
		let temps_restant = (1 / H0parsec) * simpson(-.99999, 0, cv_Enoire_temps, omegam0, Number(omegaDE0), Number(Or), eps);
		let temps_restant_Ga = temps_restant / ((3600 * 24 * nbrjours) * Math.pow(10, 9));
		let age_univ_sec = Number(age_sec) + temps_restant;
		let age_univ_Ga = age_univ_sec / ((3600 * 24 * nbrjours) * Math.pow(10, 9));
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant Big rip : " + (temps_restant_Ga).toExponential(3) + " Ga = " + (temps_restant).toExponential(3) + " s";
		if (!isNaN(age_univ_sec)) {
			document.getElementById("resultat_dureeuniv").innerHTML = (age_univ_Ga).toExponential(3) + " Ga = " + (age_univ_sec).toExponential(3) + " s";
		}
	} else {
		document.getElementById("resultat_bigcrunch").innerHTML = texte.calculs_univers.pasBC;
	}

	//on cree le graphique
	graphique_creation_noir();
	setTimeout(stop_spin, 300);
	if(modele==1 ) {
		if (sessionStorage.getItem("LANGUE") == "fr") {
			document.getElementById("resultat_ageunivers_ga").innerHTML = "Pas de Big Bang";
			document.getElementById("resultat_ageunivers_s").innerHTML = "Pas de Big Bang"; 
		} else {
			document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
			document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
		} 
	}
}



function verifnbr() {
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = document.getElementById("omegam0").value;
	omegaDE0 = document.getElementById("omegaDE0").value;
	
	if (isNaN(t0)){
		alert ("Veuillez vérifier vos saisie en t0");}
	if (isNaN(h0)){
		alert ("Veuillez vérifier vos saisie en h0");
	}
	if (isNaN(omegam0)){
		alert ("Veuillez vérifier vos saisie en omegam0");
	}
	if (isNaN(omegaDE0)){
		alert ("Veuillez vérifier vos saisie en omegaDE0");
	}
 
	
}	
	
// ENERGIE NOIRE

function F(x, omegam0, omegaDE0, Or) {
	omegak0 = 1 - Or - omegam0 - omegaDE0;
	return omegaDE0 * Y(1/(1 + x)) + omegak0 * (Math.pow((1 + x), 2)) + omegam0 * (Math.pow((1 + x), 3)) + Or * (Math.pow((1 + x), 4));
}

/**
 * Function under the integral used to compute duration with substutution x = y / (1 - y)
 * @param {number} y variable
 * @param {number} omegam0 matter parameter
 * @param {number} omegaDE0 dark energy parameter
 * @param {number} Or radiation parameter
 * @returns value
 */
function cv_Enoire_temps_substitution(y, omegam0, omegaDE0, Or) {
	return (1 / H0enannee) / Math.sqrt(F(y / (1 - y), omegam0, omegaDE0, Or)) / (1 - y);
}

/**
 * Function under the integral used to compute duration
 * @param {number} x 
 * @param {number} omegam0 
 * @param {number} omegaDE0 
 * @param {number} Or 
 * @returns value
 */
function cv_Enoire_temps(x, omegam0, omegaDE0, Or) {
	return 1 / Math.sqrt(F(x, omegam0, omegaDE0, Or)) / (1 + x);
}

// Ya(x)

function Y(x) {
	w0 = Number(document.getElementById("omega0").value);
	w1 = Number(document.getElementById("omega1").value);


	return Math.exp(-3 * (1 + w0 + w1) * Math.log(x) - 3 * w1 * (1 - x));
}

// Tracer graphique
function graphique_creation_noir() {
	Or = document.getElementById("resultat_omegar0").innerHTML;
	omegak0 = document.getElementById("resultat_omegak0").innerHTML;
	graph = $("#graphique_sombre");
	Plotly.purge(graph);
	graph.empty();
	wid = graph.width();
	if (window.innerWidth > 1700) {
		hei = wid * 0.5;
	} else {
		hei = wid * 2 / 3;
	}
	document.getElementById("graphique_sombre").style.height = hei + "px";

	frame = [{
		name: 'Graphe',
		data: [{
			x: [],
			y: []
		}]
	}];
	frame[0].data[0].x = data_x;
	frame[0].data[0].y = data_y;

	maxx = getMaxTableau(data_x);
	maxy = getMaxTableau(data_y);
	minx = getMinTableau(data_x);
	miny = getMinTableau(data_y);

	console.log(miny + " " + maxy);
	tracer1 = [{
		x: frame[0].data[0].x,
		y: frame[0].data[0].y,
		line: {
			simplify: false
		},
	}];

	omegaDE0 = ajustePrecision(omegaDE0);
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
				x: 0,
				xref: 'paper',
				xanchor: 'center',
				y: 0.98,
				yref: 'paper',
				yanchor: 'bottom',
				text: '<b>' + texte.calculs_univers.entrees + '</b><br>' + 'T<sub>0</sub>= ' + t0 + ' K<br>' + '                  H<sub>0</sub>= ' + h0 + ' km.s<sup>-1</sup>.Mpc<sup>-1</sup><br>' + 'Ω<sub>m0</sub>= ' + omegam0 + '<br>Ω<sub>DE0</sub>= ' + omegaDE0 + '<br>w<sub>0</sub>= ' + w0 + ' ; w<sub>1</sub>= ' + w1,

				showarrow: false,
			},
			{
				"xref": "paper",
				"yref": "paper",
				"text": "<b>" + texte.calculs_univers.sorties + "<\/b><br>Ω<sub>r0<\/sub>= " + Or + "<br>Ω<sub>k0</sub>= " + omegak0 + "<br>t<sub>BB</sub>= " + age_afficher + " Ga",
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

	Plotly.newPlot('graphique_sombre', tracer1, {
		title: {
			text: texte.calculs_univers.titre,
			font: {
				family: 'time New Roman, sans-serif',
				size: 25,
				color: '#111111'
			},
			
	 },

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
	}, {
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
			title: 't (Ga)'
		},


		yaxis: {
			rangemode: 'tozero',
			autorange: true,
			title: 'a(t)'
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


// Recherche max et min dans un tableau
function getMaxTableau(tableauNumerique) {
	return Math.max.apply(null, tableauNumerique);
}

function getMinTableau(tableauNumerique) {
	return Math.min.apply(null, tableauNumerique);
}

/**
 * function that detect presence of a big rip
 * @param yrunge last value of a(t), (Detecting big crunch)
 * @returns true if big rip detected, false otherwise
 */
function big_rip_detection(yrunge) {
	let w_0 = Number(document.getElementById("omega0").value);
	let w_1 = Number(document.getElementById("omega1").value);
	let has_big_rip = false;
	if (!(yrunge <= 0 || isNaN(yrunge)) && (w_1 > 0 || (w_1 === 0 && w_0 < -1))) {
		has_big_rip = true;
	}
	return has_big_rip;
}