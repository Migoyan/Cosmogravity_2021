const PATH_JSON_FR = "./js/Langues/fr.json";
const PATH_JSON_EN = "./js/Langues/en.json";

const PATH_UNIV_THEORIE_FR = "./theorie/20200822-CG-TH.pdf";
const PATH_UNIV_THEORIE_EN = "./theorie/20200822-CG-TH -EN.pdf";

const PATH_TRAJ_THEO_FR = "./theorie/theorie_trajectoires_FR.pdf";
const PATH_TRAJ_THEO_EN = "./theorie/theorie_trajectoires_EN.pdf ";

const PATH_UNIV_TUTO_FR = "./theorie/Tuto-Univ-FR.pdf";
const PATH_UNIV_TUTO_EN = "./theorie/Tuto-Univ-EN.pdf";

const PATH_TRAJ_TUTO_FR = "./theorie/Tuto-Traj-FR.pdf";
const PATH_TRAJ_TUTO_EN = "./theorie/Tuto-Traj-EN.pdf";


// nécessaire notamment pour actualiser le menu lorsque changement de langue
function rafraichirPage() {
	document.location.reload(true);
}

// on garde le choix de langue pendant toute la session
function choixLangueFr() {
	var langue = "fr";
	sessionStorage.setItem("LANGUE", langue);
}

function choixLangueEn() {
	var langue = "en";
	sessionStorage.setItem("LANGUE", langue);
}

// fonction vérifiant la langue utilisée et renvoi le path du fichier json
function s_testLangueJson() {
	if (sessionStorage.getItem("LANGUE")) {
		var langue = sessionStorage.getItem("LANGUE");
		if (langue == "fr") {
			return PATH_JSON_FR;
		} else {
			return PATH_JSON_EN;
		}
	} 
	else {
		// recupere la langue du navigateur par defaut
		var userLang = navigator.language || navigator.userLanguage;
		if (userLang == "fr" || userLang == "fr-FR" || userLang == "fr-fr") {
			userLang == "fr";
			return PATH_JSON_FR;
		} else {
			userLang == "en"
			return PATH_JSON_EN;
		}

		sessionStorage.setItem("LANGUE", userLang);
	}

}

// charge la page tutoriel en fonction du choix de langue
function langageTutorielUnivers() {
	if (s_testLangue() == "fr") {
		window.open(PATH_UNIV_TUTO_FR, "_blank");
	} 
	else if (s_testLangue() == "en") {

		window.open(PATH_UNIV_TUTO_EN, "_blank");
	}
}

function langageTutorielTrajectoires() {
	if (s_testLangue() == "fr") {
		window.open(PATH_TRAJ_TUTO_FR, "_blank");
	} 
	else if (s_testLangue() == "en") {
		window.open(PATH_TRAJ_TUTO_EN, "_blank");
	}
}

// charge la page théorie univers en fonction du choix de langue
function langageTheorieUnivers() {
	if (s_testLangue() == "fr") {
		window.open(PATH_UNIV_THEORIE_FR, "_blank");
	} 
	else if (s_testLangue() == "en") {
		window.open(PATH_UNIV_THEORIE_EN, "_blank");
	}
}

// charge la page théorie trajectoire en fonction du choix de langue
function langageTheorieTrajectoire() {
	if (s_testLangue() == "fr") {
		window.open(PATH_TRAJ_THEO_FR, "_blank");
	} else if (s_testLangue() == "en") {
		window.open(PATH_TRAJ_THEO_EN, "_blank");
	}
}


// similaire à s_testLangueJson() mais renvoi la valeur de la variable langue
function s_testLangue() {
	var langue;
	if (sessionStorage.getItem("LANGUE")) {
		langue = sessionStorage.getItem("LANGUE");
		return langue;
	} 
	else{
		langue = navigator.language || navigator.userLanguage;
		if (langue == "fr" || langue == "fr-FR" || langue == "fr-fr"){
			langue="fr";
		}
		else{
			langue="en";
		}
		sessionStorage.setItem("LANGUE", langue);
		return langue;
	}
}

// code récupérant le json, similaire au cas des monofluides
function o_recupereJson() {
	var req = new XMLHttpRequest();
	var texte;
	req.open("GET", s_testLangueJson(), false);
	req.onreadystatechange = function() {
		if (req.readyState === 4 && req.status === 200) {
			texte = JSON.parse(req.responseText);
		}
	};
	req.overrideMimeType('application/json');
	req.send();
	return texte;
}

// Fonctions chargeant le texte pour chaque page

function texteIndex() {
	var texte = o_recupereJson();
	document.getElementById("txt_version").innerHTML = texte.page_index.version;
	document.getElementById("txt_composition").innerHTML = texte.page_index.composition;
	document.getElementById("txt_univers").innerHTML = texte.page_index.univers;
	document.getElementById("txt_trajectoire").innerHTML = texte.page_index.trajectoire;
	document.getElementById("image0").src =texte.page_index.path_image0;
	document.getElementById("image1").src =texte.page_index.path_image1;
	document.getElementById("image2").src =texte.page_index.path_image2;
	document.getElementById("image3").src =texte.page_index.path_image3;
	document.getElementById("image4").src =texte.page_index.path_image4;
}

function textesimutraj(){
	var texte = o_recupereJson();
	//document.getElementById("txt_trajectoire").innerHTML = "Avertissement"; 
	document.getElementById("txt_trajectoire").innerHTML = texte.pages_trajectoire.simuavertissement;
}

function textesimuuniv(){
	var texte = o_recupereJson();
	document.getElementById("txt_avertissementuniv").innerHTML = texte.page_univers_general.simuavertissement;
}

function textesfinarret(){
	var texte = o_recupereJson();
	document.getElementById("vr_sc_mas").innerHTML = texte.pages_trajectoire.vrarret;
	document.getElementById("vp_sc_mas").innerHTML = texte.pages_trajectoire.vphiarret;
}

function textesfinarret_kerr(){
	var texte = o_recupereJson();
	//document.getElementById("vrk").innerHTML = texte.pages_trajectoire.vrarret;
	document.getElementById("vpk").innerHTML = texte.pages_trajectoire.vphikerrarret;
}

function textesfinarret_kerrphoton(){
	var texte = o_recupereJson();
	//document.getElementById("vrk").innerHTML = texte.pages_trajectoire.vrarret;
	document.getElementById("vpkp").innerHTML = texte.pages_trajectoire.vphikerrarret;
}

//Fonction htmlDecode écrite par Comrade Programmer#7608, ce qui résout le problème d'affichage. 
function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

function notationvitesseree2(){
	var texte = o_recupereJson();
	numberoftherockets = document.getElementById("nombredefusees").value;
	if(document.getElementById('traject_type2').value=="observateur"){
		document.getElementById("vitesseurlabel").title = htmlDecode(texte.pages_trajectoire.vitesseurlabeld);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		for (count = 1; count <= numberoftherockets; count += 1) {
			document.getElementById("vitesseur"+count.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
			document.getElementById("vitesseuphi"+count.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);

		}
	}
	else{
		document.getElementById("vitesseurlabel").title = htmlDecode(texte.pages_trajectoire.vitesseurlabeld);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label	);
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabelt);
		for (count = 1; count <= numberoftherockets; count += 1) {
			document.getElementById("vitesseur"+count.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
			document.getElementById("vitesseuphi"+count.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);
		}
	}

}


function zoom() {
	var texte = o_recupereJson();
	document.getElementById("zoomtxt").title = texte.page_univers_general.zoomtxt;
}


function textegravetetc_Kerr(){
	var texte = o_recupereJson();
	document.getElementById("acceleration").title = texte.pages_trajectoire.diffderive;
	document.getElementById("ctreastre").title = texte.pages_trajectoire.ctreastre;
	document.getElementById("massetxt").title = texte.pages_trajectoire.massetxt;
	document.getElementById("moment").title = texte.pages_trajectoire.moment;
	document.getElementById("spin").title = texte.pages_trajectoire.spin;
	document.getElementById("rayonschwars").title = texte.pages_trajectoire.rayonschwars;
	document.getElementById("horizon1").title = texte.pages_trajectoire.horizon1;
	document.getElementById("horizon2").title = texte.pages_trajectoire.horizon2;
 	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		document.getElementById("labelgp").innerHTML = texte.pages_trajectoire.labelgp;
	}
}


function textegravetetc(){
	var texte = o_recupereJson();
	
	//document.getElementById("txt_explosion").title = texte.pages_trajectoire.txt_explosion;
	
	document.getElementById("gravtxt").title = texte.pages_trajectoire.gravtitle;
	document.getElementById("ctreastre").title = texte.pages_trajectoire.ctreastre;
	document.getElementById("rayonschwars").title = texte.pages_trajectoire.rayonschwars;
	document.getElementById("massetxt").title = texte.pages_trajectoire.massetxt;
	document.getElementById("txt_rphysique").title = texte.pages_trajectoire.txt_rphysique;
	document.getElementById("labelnumberfusees").innerHTML = texte.pages_trajectoire.labelnumberfusees;
	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		document.getElementById("labelgp").innerHTML = texte.pages_trajectoire.labelgp;
	}

	var nbrfusetexte = Number(document.getElementById("nombredefusees").value);
	for (countt = 1; countt <= nbrfusetexte; countt += 1) {
		document.getElementById("acceleration"+countt.toString()).title = texte.pages_trajectoire.diffderive;
	}
}

function notationvitesseree2kerr(){
	var texte = o_recupereJson();
	if(document.getElementById('traject_type2').value=="observateur") {
		document.getElementById("vitesselabel").title = htmlDecode(texte.pages_trajectoire.vitesseurlabeld);
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		document.getElementById("vitesseur").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
		document.getElementById("vitesseuphi").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);

	}
	else{
		document.getElementById("vitesseurlabel").title = htmlDecode(texte.pages_trajectoire.vitesseurlabeld);
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.hilabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		document.getElementById("vitesseur").title = htmlDecode(texte.pages_trajectoire.vitesseurtau);
		document.getElementById("vitesseuphi").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);
	}
}

function notationvitesseree1kerr(){
	var texte = o_recupereJson();
	if(document.getElementById('traject_type2').value=="observateur") {
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		document.getElementById("vitesseur").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
		document.getElementById("vitesseuphi").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);
	}
	else{
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		document.getElementById("vitesseur").title = htmlDecode(texte.pages_trajectoire.vitesseurlambda);
		document.getElementById("vitesseuphi").title = htmlDecode(texte.pages_trajectoire.vitesseuphilambda);
	}
}


function notationvitesseree1(){
	var texte = o_recupereJson();
	numberoftherockets = document.getElementById("nombredefusees").value;
	if(document.getElementById('traject_type2').value=="observateur"){
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		for (countet = 1; countet <= numberoftherockets; countet += 1) {
			document.getElementById("vitesseur"+countet.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
			document.getElementById("vitesseuphi"+countet.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);
		}
	}
	else{
		document.getElementById("philabel").title = htmlDecode(texte.pages_trajectoire.philabel);
		document.getElementById("thetalabel").title = htmlDecode(texte.pages_trajectoire.theta_label);
		for (countet = 1; countet <= numberoftherockets; countet += 1) {
			document.getElementById("vitesseur"+countet.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseurt);
			document.getElementById("vitesseuphi"+countet.toString()+"").title = htmlDecode(texte.pages_trajectoire.vitesseuphi);
		}
	}
}

function infobulleobservateurdistant(){
	var texte = o_recupereJson();
	document.getElementById("r3").title =texte.pages_trajectoire.r3;
}



function texteApropos() {
	var texte = o_recupereJson();
	document.getElementById("txt_directeurs").innerHTML = texte.page_apropos.directeurs;																					  
	document.getElementById("txt_encadrants").innerHTML = texte.page_apropos.encadrants;
	document.getElementById("txt_participants").innerHTML = texte.page_apropos.participants;																						  
	document.getElementById("txt_remerciements").innerHTML = texte.page_apropos.remerciements;
	document.getElementById("txt_version").innerHTML = texte.page_apropos.version;
	document.getElementById("txt_descriptif").innerHTML = texte.page_apropos.descriptif;
	document.getElementById("txt_contact").innerHTML = texte.page_apropos.contact;
	document.getElementById("bouton_envoyer").innerHTML = texte.page_apropos.envoyer;
	document.getElementById("txt_version_2019").innerHTML = texte.page_apropos.version_2019;	
	document.getElementById("txt_version_2020").innerHTML = texte.page_apropos.version_2020;
	document.getElementById("txt_version_2021").innerHTML = texte.page_apropos.version_2021; 
}

function texteMenu(){
	var texte = o_recupereJson();
	document.getElementById("Univers_Tuto").innerHTML = texte.page_menu.Ututo;
	document.getElementById("Trajectoires_Tuto").innerHTML = texte.page_menu.Ttuto;
	document.getElementById("Tuto").innerHTML = texte.page_menu.tuto;
	document.getElementById("Accueil").innerHTML = texte.page_menu.accueil;
	document.getElementById("Univers").innerHTML = texte.page_menu.univers;
	document.getElementById("Univers_theorie").innerHTML = texte.page_menu.theorie;
	document.getElementById("Simulation_univers").innerHTML = texte.page_menu.simulation;
	document.getElementById("Standard").innerHTML = texte.page_menu.standard;
	document.getElementById("Energie_Sombre").innerHTML = texte.page_menu.energiesombre;
	document.getElementById("Trajectoire").innerHTML = texte.page_menu.trajectoire;
	document.getElementById("Trajectoire_theorie").innerHTML = texte.page_menu.theorie;
	document.getElementById("Schwarzschild").innerHTML = texte.page_menu.schwarzschild;
	document.getElementById("Metmbaryonique").innerHTML = texte.page_menu.metmbaryonique;
	document.getElementById("Metpbaryonique").innerHTML = texte.page_menu.metpbaryonique;
	document.getElementById("Metmnonbaryonique").innerHTML = texte.page_menu.metmnonbaryonique;
	document.getElementById("Metpnonbaryonique").innerHTML = texte.page_menu.metpnonbaryonique;
	document.getElementById("Kerr").innerHTML = texte.page_menu.kerr;
	document.getElementById("Particule_massive_kerr").innerHTML = texte.page_menu.part_massive;
	document.getElementById("Photon_kerr").innerHTML = texte.page_menu.part_photon;
	document.getElementById("Apropos").innerHTML = texte.page_menu.apropos;
	document.getElementById("langue").innerHTML = texte.page_menu.langue;
	document.getElementById("langue_fr").innerHTML = texte.page_menu.langue_fr;
	document.getElementById("langue_en").innerHTML = texte.page_menu.langue_en;
}

function texteConstantes() {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_constantes.titre;
	document.getElementById("txt_Grego").innerHTML = texte.page_constantes.gregorien;
	document.getElementById("txt_Sider").innerHTML = texte.page_constantes.sideral;
	document.getElementById("txt_Julien").innerHTML = texte.page_constantes.julienne;
	document.getElementById("txt_Trop").innerHTML = texte.page_constantes.tropique;
	document.getElementById("annee").innerHTML = texte.page_constantes.annee;
	document.getElementById("bout_enregistrer").value = texte.page_constantes.enregistrer;
	document.getElementById("bout_retour").value = texte.page_constantes.retour;
}

function texteUnivers() {
	var texte = o_recupereJson();
	document.getElementById("monofluide").value = texte.page_univers.bouton_monofluides;
	document.getElementById("trace").value = texte.page_univers_general.bouton_tracer;
	document.getElementById("button_enregistrer").value = texte.page_univers_general.bouton_enregistrer;
	document.getElementById("para").value = texte.page_univers_general.bouton_constantes;
	document.getElementById("calc").value = texte.page_univers_general.bouton_calculsAnnexes;
	document.getElementById("txt_titre").innerHTML = texte.page_univers.titre;
	document.getElementById("txt_enregistrerEn").innerHTML = texte.page_univers_general.enregistrerEn;
	document.getElementById("txt_entrees").innerHTML = texte.page_univers_general.entrees;
	document.getElementById("txt_sorties").innerHTML = texte.page_univers_general.sorties;
	document.getElementById("txt_tempsBB").innerHTML = texte.page_univers_general.tempsBigBang;
	document.getElementById("txt_dureeeUniv").innerHTML = texte.page_univers_general.dureeUnivers;
	document.getElementById("txt_univplat").innerHTML = texte.page_univers.univers_plat;
	document.getElementById("txt_MLRFCN").innerHTML = texte.page_univers.matierelambdaRFCNeu;
	document.getElementById("txt_MLRFC").innerHTML = texte.page_univers.matierelambdaRFC;
	document.getElementById("txt_ML").innerHTML = texte.page_univers.matierelambda;
}

function texteUniversCalculs() {
	var texte = o_recupereJson();
	document.getElementById("bouton_retour").value = texte.page_univers_calculs.bouton_retour;
	document.getElementById("txt_titre").innerHTML = texte.page_univers_calculs.titre;
	document.getElementById("txt_valeursZ").innerHTML = texte.page_univers_calculs.valeursZ;
	document.getElementById("txt_valeursZ1").innerHTML = texte.page_univers_calculs.valeursZ1;

	document.getElementById("txt_parametres").innerHTML = texte.page_univers_calculs.parametres;
	document.getElementById("bcalc_ord").value = texte.page_univers_calculs.bouton_calcul;
	document.getElementById("txt_resultats").innerHTML = texte.page_univers_calculs.resultats;

	// cas non monofluides
	if (document.getElementById("txt_univplat")) {
		document.getElementById("txt_univplat").innerHTML = texte.page_univers_calculs.univers_plat;
		if (document.getElementById("EnergieSombre")) {
			document.getElementById("txt_MLRFCN").innerHTML = texte.page_univers_calculs.matiereEsombreRFCNeu;
			document.getElementById("txt_MLRFC").innerHTML = texte.page_univers_calculs.matiereEsombreRFC;
			document.getElementById("txt_ML").innerHTML = texte.page_univers_calculs.matiereEsombre;
		} 
		else {
			document.getElementById("txt_MLRFCN").innerHTML = texte.page_univers_calculs.matierelambdaRFCNeu;
			document.getElementById("txt_MLRFC").innerHTML = texte.page_univers_calculs.matierelambdaRFC;
			document.getElementById("txt_ML").innerHTML = texte.page_univers_calculs.matierelambda;
			document.getElementById("txt_graphe_d").innerHTML = texte.page_univers_calculs.tracer_d;
			document.getElementById("txt_graphe_omega").innerHTML = texte.page_univers_calculs.tracer_omega;
		 	document.getElementById("txt_graphe_t").innerHTML = texte.page_univers_calculs.tracer_t;
			document.getElementById("txt_graphe_d_t").innerHTML = texte.page_univers_calculs.tracer_d_t;
			document.getElementById("txt_graphe_omega_t").innerHTML = texte.page_univers_calculs.tracer_omega_t;
			document.getElementById("txt_generateur_graphiques").innerHTML = texte.page_univers_calculs.GenerateurG;
			document.getElementById("txt_echelle_log_d").innerHTML = texte.page_univers_calculs.echelle_log_d;
			document.getElementById("txt_echelle_log_omega").innerHTML = texte.page_univers_calculs.echelle_log_omega;
			document.getElementById("txt_echelle_log_t").innerHTML = texte.page_univers_calculs.echelle_log_t;
			document.getElementById("txt_enregistrerEn").innerHTML = texte.page_univers_general.enregistrerEn;
			document.getElementById("button_enregistrer").value = texte.page_univers_general.bouton_enregistrer;
			document.getElementById("txt_zmin").innerHTML = texte.page_univers_calculs.zmin;
			document.getElementById("txt_zmax").innerHTML = texte.page_univers_calculs.zmax;
			document.getElementById("boutonGraphe_distances").value = texte.page_univers_calculs.bouton_tracer;
			document.getElementById("boutonGraphe_omega").value = texte.page_univers_calculs.bouton_tracer;
			document.getElementById("boutonGraphe_t").value = texte.page_univers_calculs.bouton_tracer;
			document.getElementById("boutonGraphe_distances_t").value = texte.page_univers_calculs.bouton_tracer;
			document.getElementById("boutonGraphe_omega_t").value = texte.page_univers_calculs.bouton_tracer;
			document.getElementById("txt_geometrie").innerHTML = texte.page_univers_calculs.Geometrie;
			document.getElementById("txt_photometrie").innerHTML = texte.page_univers_calculs.Photometrie;
			document.getElementById("txt_valeurs_Intensite").innerHTML = texte.page_univers_calculs.Intensite;  // Ajout de text page annexe Intensite
			document.getElementById("ts-1").value = texte.page_univers_general.bouton_tracer;
			document.getElementById("ts-2").value = texte.page_univers_general.bouton_tracer;
			document.getElementById("txt_infoCalculs").innerHTML = texte.page_univers_calculs.infoCalculs;
			document.getElementById("secondeArc").innerHTML = texte.page_univers_calculs.secondeArc;
			document.getElementById("calculInverse").innerHTML = texte.page_univers_calculs.calculInverse;
			document.getElementById("boutonCalculInverse").value = texte.page_univers_calculs.bouton_calcul;
			document.getElementById("annee1").innerHTML = texte.page_univers_calculs.annee;
			document.getElementById("annee2").innerHTML = texte.page_univers_calculs.annee;
			document.getElementById("temission").innerHTML = texte.page_univers_calculs.temission;
			document.getElementById("treception").innerHTML = texte.page_univers_calculs.treception;
			document.getElementById("refresh_button").innerHTML = texte.page_univers_calculs.bouton_rafraichir;
		}
	}
	// cas sans energie noire
	if (document.getElementById("calculInverse")) {
		document.getElementById("txt_geometrie").innerHTML = texte.page_univers_calculs.Geometrie;
		document.getElementById("txt_photometrie").innerHTML = texte.page_univers_calculs.Photometrie;
		document.getElementById("txt_valeurs_Intensite").innerHTML = texte.page_univers_calculs.Intensite;  // Ajout de text page annexe Intensite																							   
		document.getElementById("ts-1").value = texte.page_univers_general.bouton_tracer;
		document.getElementById("ts-2").value = texte.page_univers_general.bouton_tracer;
		document.getElementById("txt_infoCalculs").innerHTML = texte.page_univers_calculs.infoCalculs;
		document.getElementById("secondeArc").innerHTML = texte.page_univers_calculs.secondeArc;
		document.getElementById("calculInverse").innerHTML = texte.page_univers_calculs.calculInverse;
		document.getElementById("boutonCalculInverse").value = texte.page_univers_calculs.bouton_calcul;
		document.getElementById("annee1").innerHTML = texte.page_univers_calculs.annee;
		document.getElementById("annee2").innerHTML = texte.page_univers_calculs.annee;
		document.getElementById("temission").innerHTML = texte.page_univers_calculs.temission;
		document.getElementById("treception").innerHTML = texte.page_univers_calculs.treception;
	}
}

function texteUniversNoire() {
	var texte = o_recupereJson();
	document.getElementById("monofluide").value = texte.page_univers_noire.bouton_monofluides;
	document.getElementById("trace").value = texte.page_univers_general.bouton_tracer;
	document.getElementById("button_enregistrer").value = texte.page_univers_general.bouton_enregistrer;
	document.getElementById("para").value = texte.page_univers_general.bouton_constantes;
	document.getElementById("calc").value = texte.page_univers_general.bouton_calculsAnnexes;
	document.getElementById("txt_titre").innerHTML = texte.page_univers_noire.titre;
	document.getElementById("txt_enregistrerEn").innerHTML = texte.page_univers_general.enregistrerEn;
	document.getElementById("txt_entrees").innerHTML = texte.page_univers_general.entrees;
	document.getElementById("txt_sorties").innerHTML = texte.page_univers_general.sorties;
	document.getElementById("txt_tempsBB").innerHTML = texte.page_univers_general.tempsBigBang;
	document.getElementById("txt_dureeeUniv").innerHTML = texte.page_univers_general.dureeUnivers;
	document.getElementById("txt_univplat").innerHTML = texte.page_univers_noire.univers_plat;
	document.getElementById("txt_MLRFCN").innerHTML = texte.page_univers_noire.matiereEsombreRFCNeu;
	document.getElementById("txt_MLRFC").innerHTML = texte.page_univers_noire.matiereEsombreRFC;
	document.getElementById("txt_ML").innerHTML = texte.page_univers_noire.matiereEsombre;
}

function texteUniversMonofluides() {
	var texte = o_recupereJson();
	document.getElementById("trace").value = texte.page_univers_general.bouton_tracer;
	document.getElementById("button_enregistrer").value = texte.page_univers_general.bouton_enregistrer;
	document.getElementById("para").value = texte.page_univers_general.bouton_constantes;
	document.getElementById("calc").value = texte.page_univers_general.bouton_calculsAnnexes;
	document.getElementById("txt_titre").innerHTML = texte.page_univers_monofluides.titre;
	document.getElementById("txt_enregistrerEn").innerHTML = texte.page_univers_general.enregistrerEn;
	document.getElementById("txt_entrees").innerHTML = texte.page_univers_general.entrees;
	document.getElementById("txt_sorties").innerHTML = texte.page_univers_general.sorties;
	document.getElementById("txt_tempsBB").innerHTML = texte.page_univers_general.tempsBigBang;
	document.getElementById("txt_dureeeUniv").innerHTML = texte.page_univers_general.dureeUnivers;
	document.getElementById("txt_choix").innerHTML = texte.page_univers_monofluides.mod_choix;
	document.getElementById("txt_einstein").innerHTML = texte.page_univers_monofluides.mod_einstein;
	document.getElementById("txt_weinberg").innerHTML = texte.page_univers_monofluides.mod_weinberg;
	document.getElementById("txt_sitter").innerHTML = texte.page_univers_monofluides.mod_sitter;
	document.getElementById("txt_courbure").innerHTML = texte.page_univers_monofluides.mod_courbure;
	document.getElementById("retour").value = texte.page_univers_monofluides.bouton_retour;
}

function texteUniversMonofluidesNoire() {
	var texte = o_recupereJson();
	document.getElementById("trace").value = texte.page_univers_general.bouton_tracer;
	document.getElementById("button_enregistrer").value = texte.page_univers_general.bouton_enregistrer;
	document.getElementById("para").value = texte.page_univers_general.bouton_constantes;
	document.getElementById("calc").value = texte.page_univers_general.bouton_calculsAnnexes;
	document.getElementById("txt_titre").innerHTML = texte.page_univers_monofluides_noire.titre;
	document.getElementById("txt_enregistrerEn").innerHTML = texte.page_univers_general.enregistrerEn;
	document.getElementById("txt_entrees").innerHTML = texte.page_univers_general.entrees;
	document.getElementById("txt_sorties").innerHTML = texte.page_univers_general.sorties;
	document.getElementById("txt_tempsBB").innerHTML = texte.page_univers_general.tempsBigBang;
	document.getElementById("txt_dureeeUniv").innerHTML = texte.page_univers_general.dureeUnivers;
	document.getElementById("txt_choix").innerHTML = texte.page_univers_monofluides_noire.mod_choix;
	document.getElementById("txt_einstein").innerHTML = texte.page_univers_monofluides_noire.mod_einstein;
	document.getElementById("txt_weinberg").innerHTML = texte.page_univers_monofluides_noire.mod_weinberg;
	document.getElementById("txt_sitter").innerHTML = texte.page_univers_monofluides_noire.mod_sitter;
	document.getElementById("txt_courbure").innerHTML = texte.page_univers_monofluides_noire.mod_courbure;
	document.getElementById("retour").value = texte.page_univers_monofluides_noire.bouton_retour;

}

function texteTrajectoireMassive(nbrderockets) {
	var texte = o_recupereJson();
	
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_massive.titre;
	document.getElementById("txt_rphysique").innerHTML = texte.page_trajectoire_massive.rayon_physique;																				   
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("rebondd").innerHTML = texte.page_trajectoire_massive.rebond;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.mobile; 
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	document.getElementById("amortissement").innerHTML = texte.page_trajectoire_massive.amortissement;
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("temps_ecoule"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_ecoule;
		document.getElementById("acceleration"+count.toString()+"").innerHTML = "Gradient &nbsp;<span id='DivClignotante"+count.toString()+"'></span>";
		document.getElementById("temps_obs"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_obs;
		document.getElementById("decal_spect"+count.toString()+"").innerHTML = texte.pages_trajectoire.decal_spect;
		document.getElementById("v_total"+count.toString()+"").innerHTML = texte.pages_trajectoire.v_total;

	}
	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
	}
}

function texteTrajectoireMassiveEnGrand() {  // ne sert pas!!!!!!!!!!!!!
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_massive.titre;
	document.getElementById("txt_rphysique").innerHTML = texte.page_trajectoire_massive.rayon_physique;																			   
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("rebondd").innerHTML = texte.page_trajectoire_massive.rebond;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.mobile;
	document.getElementById("temps_ecoule").innerHTML = texte.pages_trajectoire.temps_ecoule;
	document.getElementById("acceleration").innerHTML = texte.pages_trajectoire.acceleration;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	document.getElementById("temps_obs").innerHTML = texte.pages_trajectoire.temps_obs;
	document.getElementById("decal_spect").innerHTML = texte.pages_trajectoire.decal_spect;
}


function texteTrajectoirePhoton(nbrderockets) {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_photon.titre;
	document.getElementById("txt_rphysique").innerHTML = texte.page_trajectoire_photon.rayon_physique;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.photon; 
	document.getElementById("rebondd").innerHTML = texte.page_trajectoire_massive.rebond;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;

	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("temps_ecoule"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_ecoule;
		document.getElementById("acceleration"+count.toString()+"").innerHTML ="Gradient &nbsp;<span id='DivClignotante"+count.toString()+"'></span>";
		document.getElementById("temps_obs"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_obs;
		document.getElementById("v_total"+count.toString()+"").innerHTML = texte.pages_trajectoire.v_total;

	}
	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
	}
}

function texteTrajectoireMassiveNonBar(nbrderockets) {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_massive_nonBar.titre;
	document.getElementById("txt_rphysique").innerHTML = texte.page_trajectoire_massive.rayon_physique;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.mobile; 
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;

 
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("temps_ecoule"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_ecoule;
		document.getElementById("acceleration"+count.toString()+"").innerHTML ="Gradient &nbsp;<span id='DivClignotante"+count.toString()+"'></span>";
		document.getElementById("temps_obs"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_obs;
		document.getElementById("decal_spect"+count.toString()+"").innerHTML = texte.pages_trajectoire.decal_spect;
		document.getElementById("v_total"+count.toString()+"").innerHTML = texte.pages_trajectoire.v_total;
	}
	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
	}

}

function texteTrajectoirePhotonNonBar(nbrderockets) {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_photon_nonBar.titre;
	document.getElementById("txt_rphysique").innerHTML = texte.page_trajectoire_photon.rayon_physique;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.photon; 
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("temps_ecoule"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_ecoule;
		document.getElementById("acceleration"+count.toString()+"").innerHTML ="Gradient &nbsp;<span id='DivClignotante"+count.toString()+"'></span>";
		document.getElementById("temps_obs"+count.toString()+"").innerHTML = texte.pages_trajectoire.temps_obs;
		document.getElementById("v_total"+count.toString()+"").innerHTML = texte.pages_trajectoire.v_total;

	}
	var canvaswidthheightt = document.getElementById("canvaswidthheight").value;
	if(canvaswidthheightt=="750"){
		//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
	}

}


function texteTrajectoireMassiveKerr() {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_massive_kerr.titre;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.mobile; 
	document.getElementById("temps_ecoule").innerHTML = texte.pages_trajectoire.temps_ecoule;
	document.getElementById("acceleration").innerHTML = texte.pages_trajectoire.acceleration;
	document.getElementById("temps_obs").innerHTML = texte.pages_trajectoire.temps_obs;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	document.getElementById("decal_spect").innerHTML = texte.pages_trajectoire.decal_spect;
	document.getElementById("v_total").innerHTML = texte.pages_trajectoire.v_total;
	//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
}



function texteTrajectoireMassiveKerrGrand() {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_massive_kerr.titre;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.mobile; 
	document.getElementById("temps_ecoule").innerHTML = texte.pages_trajectoire.temps_ecoule;
	document.getElementById("acceleration").innerHTML = texte.pages_trajectoire.acceleration;
	document.getElementById("temps_obs").innerHTML = texte.pages_trajectoire.temps_obs;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	document.getElementById("decal_spect").innerHTML = texte.pages_trajectoire.decal_spect;
}

function texteTrajectoirePhotonKerr() {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_photon_kerr.titre;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.photon;
	document.getElementById("acceleration").innerHTML = texte.pages_trajectoire.acceleration;
	document.getElementById("temps_ecoule").innerHTML = texte.pages_trajectoire.temps_ecoule;
	document.getElementById("temps_obs").innerHTML = texte.pages_trajectoire.temps_obs;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
	//document.getElementById("ouvreengrand").innerHTML = texte.pages_trajectoire.ouvreengrand;
	document.getElementById("v_total").innerHTML = texte.pages_trajectoire.v_total;
}

function texteTrajectoirePhotonKerrGrand() {
	var texte = o_recupereJson();
	document.getElementById("txt_titre").innerHTML = texte.page_trajectoire_photon_kerr.titre;
	document.getElementById("moinsvi").title = texte.pages_trajectoire.bouton_moins;
	document.getElementById("plusvi").title = texte.pages_trajectoire.bouton_plus;
	document.getElementById("clear").innerHTML = texte.pages_trajectoire.bouton_reset;
	document.getElementById("boutton_enregis").innerHTML = texte.pages_trajectoire.bouton_enregistrer;
	document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_start;
	document.getElementById("r1").innerHTML = texte.pages_trajectoire.trajectoire_complete;
	document.getElementById("r2").innerHTML = texte.pages_trajectoire.trajectoire_simple;
	document.getElementById("r3").innerHTML = texte.pages_trajectoire.observateur;
	document.getElementById("r4").innerHTML = texte.pages_trajectoire.photon;
	document.getElementById("acceleration").innerHTML = texte.pages_trajectoire.acceleration;
	document.getElementById("temps_ecoule").innerHTML = texte.pages_trajectoire.temps_ecoule;
	document.getElementById("temps_obs").innerHTML = texte.pages_trajectoire.temps_obs;
	document.getElementById("boutton_recup").innerHTML = texte.pages_trajectoire.boutton_recup;
}
