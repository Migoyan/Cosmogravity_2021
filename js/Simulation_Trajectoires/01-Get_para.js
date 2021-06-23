/*
		Fonctions gerant l'ouverture et l'envoi de données entre les pages calculs annexes/simulation et paramètre/simulation
*/

function save_schwarshild_massif() {
	// recuperation des variables de la page simulation
	r0 = document.getElementById("r0").value;
	r_phy = document.getElementById("r_phy").value;
	vphi = document.getElementById("vphi").value;
	M = document.getElementById("M").value;
	vr = document.getElementById("vr").value;
	boutton_ammorti=document.getElementById("boutton_ammorti").value;
	reb=document.getElementById("reb").value;

	traject_type=document.getElementById("traject_type").value;

	// Stockage des valeurs
	sessionStorage.setItem("r0", r0);
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("vphi", vphi);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("vr", vr);
	sessionStorage.setItem("boutton_ammorti", boutton_ammorti);
	sessionStorage.setItem("reb", reb);
	sessionStorage.setItem("traject_type", traject_type);
}

function load_schwarshild_massif() {
	if (sessionStorage.getItem("r0")) {
	document.getElementById("r0").value = sessionStorage.getItem("r0");
	document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
	document.getElementById("vphi").value = sessionStorage.getItem("vphi");
	document.getElementById("M").value = sessionStorage.getItem("M");
	document.getElementById("vr").value = sessionStorage.getItem("vr");

	document.getElementById("boutton_ammorti").value = sessionStorage.getItem("boutton_ammorti");
	document.getElementById("reb").value = sessionStorage.getItem("reb");
	document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");

	if(document.getElementById("traject_type").value=="simple"){
		pressionBouttonTrajectoireSimple();
	}
	else if(document.getElementById("traject_type").value=="complete"){
		pressionBouttonTrajectoireComplete();
	}
	if(document.getElementById("boutton_ammorti").value=="1"){
		document.getElementById("rebondd").className = "myButton";
		document.getElementById("barre_reb").style.display = "block";
		document.getElementById('ammorti').innerHTML=document.getElementById("reb").value/100;
	}
	else if(document.getElementById("boutton_ammorti").value=="0"){
		document.getElementById("rebondd").className = "myButton2";
		document.getElementById("barre_reb").style.display = "none";
		document.getElementById('ammorti').innerHTML=document.getElementById("reb").value/100;
	}
	}
}

function save_schwarshild_photon() {
	// recuperation des variables de la page simulation
	r0 = document.getElementById("r0").value;
	r_phy = document.getElementById("r_phy").value;
	vphi = Number(document.getElementById("vphi").value);
	M = document.getElementById("M").value;
	boutton_ammorti=document.getElementById("boutton_ammorti").value;
	traject_type=document.getElementById("traject_type").value;
	vr = Number(document.getElementById("vr").value);

	// Stockage des valeurs
	sessionStorage.setItem("r0", r0);
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("vr", vr);
	sessionStorage.setItem("vphi", vphi);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("boutton_ammorti", boutton_ammorti);
	sessionStorage.setItem("traject_type", traject_type);

}

function load_schwarshild_photon() {
	if (sessionStorage.getItem("r0")) {
		document.getElementById("r0").value = sessionStorage.getItem("r0");
		document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
		document.getElementById("vr").value = sessionStorage.getItem("vr");
		document.getElementById("vphi").value = sessionStorage.getItem("vphi");
		document.getElementById("M").value = sessionStorage.getItem("M");
		document.getElementById("boutton_ammorti").value = sessionStorage.getItem("boutton_ammorti");
		document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");

		if(document.getElementById("traject_type").value=="simple"){
			pressionBouttonTrajectoireSimple();
		}
		else if(document.getElementById("traject_type").value=="complete"){
			pressionBouttonTrajectoireComplete();
		}
		if(document.getElementById("boutton_ammorti").value=="1"){
			document.getElementById("rebondd").className = "myButton";
		}
		else if(document.getElementById("boutton_ammorti").value=="0"){
			document.getElementById("rebondd").className = "myButton2";
		}
	}
}

function save_kerr_massif() {
	// recuperation des variables de la page simulation
	r0 = document.getElementById("r0").value;
	J = document.getElementById("J").value;
	M = document.getElementById("M").value;
	vphi = document.getElementById("vphi").value;
	vr = document.getElementById("vr").value;
	traject_type=document.getElementById("traject_type").value;

	// Stockage des valeurs
	sessionStorage.setItem("r0", r0);
	sessionStorage.setItem("J", J);
	sessionStorage.setItem("vphi", vphi);
	sessionStorage.setItem("vr", vr);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
}

function load_kerr_massif() {
	if (sessionStorage.getItem("r0")) {
		document.getElementById("r0").value = sessionStorage.getItem("r0");
		document.getElementById("J").value = sessionStorage.getItem("J");
		document.getElementById("M").value = sessionStorage.getItem("M");
		document.getElementById("vphi").value = sessionStorage.getItem("vphi");
		document.getElementById("vr").value = sessionStorage.getItem("vr");

		if(document.getElementById("traject_type").value=="simple"){
			pressionBouttonTrajectoireSimple();
		}
		else if(document.getElementById("traject_type").value=="complete"){
			pressionBouttonTrajectoireComplete();
		}
	}
}

function save_kerr_photon() {
  // recuperation des variables de la page simulation
	r0 = document.getElementById("r0").value;
	J = document.getElementById("J").value;
	M = document.getElementById("M").value;

	theta =  document.getElementById("theta").value;
	traject_type=document.getElementById("traject_type").value;

	// Stockage des valeurs
	sessionStorage.setItem("r0", r0);
	sessionStorage.setItem("J", J);
	sessionStorage.setItem("vr", vr);
	sessionStorage.setItem("theta", theta);
	sessionStorage.setItem("vphi", vphi);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
}

function load_kerr_photon() {
	if (sessionStorage.getItem("r0")) {
		document.getElementById("r0").value = sessionStorage.getItem("r0");
		document.getElementById("J").value = sessionStorage.getItem("J");
		document.getElementById("M").value = sessionStorage.getItem("M");
		document.getElementById("theta").value = sessionStorage.getItem("theta");

		if(document.getElementById("traject_type").value=="simple"){
			pressionBouttonTrajectoireSimple();
		}
		else if(document.getElementById("traject_type").value=="complete"){
			pressionBouttonTrajectoireComplete();
		}
	}
}
