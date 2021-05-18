/*
		Fonctions gerant la sauvegarde de l'experience passee
*/

function save_nbfusees() {
	savenbfusees = document.getElementById("nombredefusees").value;
    sessionStorage.setItem("nombredefusees", savenbfusees);
    //console.log(sessionStorage.getItem("nombredefusees"),"log");
}


function save_nbfusees_recupvaleurs() {
	savenbfuseesrecupvaleurs = document.getElementById("nombredefusees").value;
    sessionStorage.setItem("nombredefuseesrecupvaleurs", savenbfuseesrecupvaleurs);
    //console.log(sessionStorage.getItem("nombredefuseesrecupvaleurs"),"second log");
}

function save_schwarshild_massif(nbrderockets) {
	// recuperation des variables de la page simulation
	r_phy = document.getElementById("r_phy").value;
	M = document.getElementById("M").value;
	boutton_ammorti = document.getElementById("boutton_ammorti").value;
	reb = document.getElementById("reb").value;
	traject_type = document.getElementById("traject_type").value;
	traject_type2 = document.getElementById("traject_type2").value;
	var graph_check = true;
	if (document.getElementById("toggle").checked == false) {
		graph_check = false;
	}

	for (count = 1; count <= nbrderockets; count += 1) {
		r0 = document.getElementById("r0"+count.toString()+"").value;
		v0 = document.getElementById("v0"+count.toString()+"").value;
		phi0 = document.getElementById("phi0"+count.toString()+"").value;
		teta = document.getElementById("teta"+count.toString()+"").value;
		sessionStorage.setItem("r0"+count.toString()+"", r0);
		sessionStorage.setItem("v0"+count.toString()+"", vr);
		sessionStorage.setItem("phi0"+count.toString()+"", vphi);
		sessionStorage.setItem("teta"+count.toString()+"", vphi);
		
	}

	// Stockage des valeurs
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("boutton_ammorti", boutton_ammorti);
	sessionStorage.setItem("reb", reb);
	sessionStorage.setItem("traject_type", traject_type);
	sessionStorage.setItem("traject_type2", traject_type2);
	sessionStorage.setItem("graph_check", graph_check);

}

function load_schwarshild_massif() {

	if (sessionStorage.getItem("nombredefuseesrecupvaleurs")){
		var nbfuseesrecupvaldesession = sessionStorage.getItem("nombredefuseesrecupvaleurs");
		nbrderockets= nbfuseesrecupvaldesession;
		//console.log(nbfuseesrecupvaldesession,"nombre de fusees recuperees valeur session");
		document.getElementById("nombredefusees").value = sessionStorage.getItem("nombredefuseesrecupvaleurs");
	}
	supprHtml();
	genereHtml();
	save_nbfusees();
	updatenbredefusees();

	if (sessionStorage.getItem("r01")) {
		for (count = 1; count <= nbrderockets; count += 1) {
			document.getElementById("r0"+count.toString()+"").value=sessionStorage.getItem("r0"+count.toString()+"");
			document.getElementById("phi0"+count.toString()+"").value=sessionStorage.getItem("phi0"+count.toString()+"");
			document.getElementById("v0"+count.toString()+"").value=sessionStorage.getItem("v0"+count.toString()+"");
			document.getElementById("teta"+count.toString()+"").value=sessionStorage.getItem("teta"+count.toString()+"");
		}

		document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
		document.getElementById("M").value = sessionStorage.getItem("M");
		document.getElementById("boutton_ammorti").value = sessionStorage.getItem("boutton_ammorti");
		document.getElementById("reb").value = sessionStorage.getItem("reb");
		document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
		document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
		var graph_check = sessionStorage.getItem("graph_check");
		if (graph_check == "false") {
			document.getElementById("toggle").checked = false;
		}

		if (document.getElementById("traject_type").value == "simple") {
			pressionBouttonTrajectoireSimple();
		} else if (document.getElementById("traject_type").value == "complete") {
			pressionBouttonTrajectoireComplete();
		}
		if (document.getElementById("boutton_ammorti").value == "1") {
			document.getElementById("rebondd").className = "myButton";
			document.getElementById("barre_reb").style.display = "block";
			document.getElementById('ammorti').innerHTML = document.getElementById("reb").value / 100;
		} 
		else if (document.getElementById("boutton_ammorti").value == "0") {
			document.getElementById("rebondd").className = "myButton2";
			document.getElementById("barre_reb").style.display = "none";
			document.getElementById('ammorti').innerHTML = document.getElementById("reb").value / 100;
		}

		if (document.getElementById("traject_type2").value == "observateur") {
			pressionBouttonObservateur();
		} 
		else if (document.getElementById("traject_type2").value == "mobile") {
			pressionBouttonMobile();

		}
  	}
}





// CAS NON BARYONIQUE
function save_schwarshild_massif_nonBar(nbrderockets) {
	// recuperation des variables de la page simulation
	r_phy = document.getElementById("r_phy").value;
	M = document.getElementById("M").value;
	traject_type = document.getElementById("traject_type").value;
	traject_type2 = document.getElementById("traject_type2").value;
	var graph_check = true;
	if (document.getElementById("toggle").checked == false) {
		graph_check = false;
	}

	for (count = 1; count <= nbrderockets; count += 1) {
		r0 = document.getElementById("r0"+count.toString()+"").value;
		vphi = document.getElementById("vphi"+count.toString()+"").value;
		vr = document.getElementById("vr"+count.toString()+"").value;
		sessionStorage.setItem("r0"+count.toString()+"", r0);
		sessionStorage.setItem("vphi"+count.toString()+"", vphi);
		sessionStorage.setItem("vr"+count.toString()+"", vr);
	}

	// Stockage des valeurs
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
	sessionStorage.setItem("traject_type2", traject_type2);
	sessionStorage.setItem("graph_check", graph_check);


}

function save_schwarshild_photon_nonBar(nbrderockets) {
	// recuperation des variables de la page simulation
	r_phy = document.getElementById("r_phy").value;
	M = document.getElementById("M").value;
	traject_type = document.getElementById("traject_type").value;
	traject_type2 = document.getElementById("traject_type2").value;
	var graph_check = true;
	if (document.getElementById("toggle").checked == false) {
		graph_check = false;
	}
	for (count = 1; count <= nbrderockets; count += 1) {
		r0 = document.getElementById("r0"+count.toString()+"").value;
		vphi = document.getElementById("vphi"+count.toString()+"").value;
		vr = document.getElementById("vr"+count.toString()+"").value;
		sessionStorage.setItem("r0"+count.toString()+"", r0);
		sessionStorage.setItem("vphi"+count.toString()+"", vphi);
		sessionStorage.setItem("vr"+count.toString()+"", vr);
	}
	// Stockage des valeurs
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
	sessionStorage.setItem("traject_type2", traject_type2)
	sessionStorage.setItem("graph_check", graph_check);
}


function save_schwarshild_photon(nbrderockets) {
	// recuperation des variables de la page simulation
	boutton_ammorti = document.getElementById("boutton_ammorti").value;
	r_phy = document.getElementById("r_phy").value;
	M = document.getElementById("M").value;
	traject_type = document.getElementById("traject_type").value;
	traject_type2 = document.getElementById("traject_type2").value;
	var graph_check = true;
	if (document.getElementById("toggle").checked == false) {
		graph_check = false;
	}
	for (count = 1; count <= nbrderockets; count += 1) {
		r0 = document.getElementById("r0"+count.toString()+"").value;
		vphi = document.getElementById("phi0"+count.toString()+"").value;
		vr = document.getElementById("teta"+count.toString()+"").value;
		sessionStorage.setItem("r0"+count.toString()+"", r0);
		sessionStorage.setItem("phi0"+count.toString()+"", phi0);
		sessionStorage.setItem("teta"+count.toString()+"", teta);
	}
	// Stockage des valeurs
	sessionStorage.setItem("r_phy", r_phy);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
	sessionStorage.setItem("traject_type2", traject_type2)
	sessionStorage.setItem("graph_check", graph_check);
	sessionStorage.setItem("boutton_ammorti", boutton_ammorti);

}



function load_schwarshild_massif_nonBar() {

   if (sessionStorage.getItem("nombredefuseesrecupvaleurs")){
     var nbfuseesrecupvaldesession = sessionStorage.getItem("nombredefuseesrecupvaleurs");
     nbrderockets= nbfuseesrecupvaldesession;
     //console.log(nbfuseesrecupvaldesession,"nombre de fusees recuperees valeur session");
    document.getElementById("nombredefusees").value = sessionStorage.getItem("nombredefuseesrecupvaleurs");
   }

	supprHtml();
	genereHtml();
	save_nbfusees();
	updatenbredefusees();


  if (sessionStorage.getItem("r01")) {
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("r0"+count.toString()+"").value=sessionStorage.getItem("r0"+count.toString()+"");
		document.getElementById("vphi"+count.toString()+"").value=sessionStorage.getItem("vphi"+count.toString()+"");
		document.getElementById("vr"+count.toString()+"").value=sessionStorage.getItem("vr"+count.toString()+"");
	}

    document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
    document.getElementById("M").value = sessionStorage.getItem("M");
    document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
    document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
    var graph_check = sessionStorage.getItem("graph_check");
    if (graph_check == "false") {
      document.getElementById("toggle").checked = false;
    }

    if (document.getElementById("traject_type").value == "simple") {
      pressionBouttonTrajectoireSimple();
    } else if (document.getElementById("traject_type").value == "complete") {
      pressionBouttonTrajectoireComplete();
    }

    if (document.getElementById("traject_type2").value == "observateur") {
      pressionBouttonObservateur();
    } else if (document.getElementById("traject_type2").value == "mobile") {
      pressionBouttonMobile();

    }
  }
}



function load_schwarshild_photon() {
 
   if (sessionStorage.getItem("nombredefuseesrecupvaleurs")){
     var nbfuseesrecupvaldesession = sessionStorage.getItem("nombredefuseesrecupvaleurs");
     nbrderockets= nbfuseesrecupvaldesession;
     //console.log(nbfuseesrecupvaldesession,"nombre de fusees recuperees valeur session");
    document.getElementById("nombredefusees").value = sessionStorage.getItem("nombredefuseesrecupvaleurs");
   }

	 supprHtml();
	 genereHtml();
	 save_nbfusees();
	 updatenbredefusees();

  if (sessionStorage.getItem("r01")) {
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("r0"+count.toString()+"").value=sessionStorage.getItem("r0"+count.toString()+"");
		document.getElementById("vphi"+count.toString()+"").value=sessionStorage.getItem("vphi"+count.toString()+"");
		document.getElementById("vr"+count.toString()+"").value=sessionStorage.getItem("vr"+count.toString()+"");
	}
    document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
    document.getElementById("M").value = sessionStorage.getItem("M");
    document.getElementById("boutton_ammorti").value = sessionStorage.getItem("boutton_ammorti");
    document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
    document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
    var graph_check = sessionStorage.getItem("graph_check");
    if (graph_check == "false") {
      	document.getElementById("toggle").checked = false;
    }

    if (document.getElementById("traject_type").value == "simple") {
      	pressionBouttonTrajectoireSimple();
    } else if (document.getElementById("traject_type").value == "complete") {
      	pressionBouttonTrajectoireComplete();
    }

    if (document.getElementById("traject_type2").value == "observateur") {
      	pressionBouttonObservateur();
    } else if (document.getElementById("traject_type2").value == "mobile") {
      	pressionBouttonMobile();

    }

    if (document.getElementById("boutton_ammorti").value == "1") {
      	document.getElementById("rebondd").className = "myButton";
    } 
	else if (document.getElementById("boutton_ammorti").value == "0") {
      	document.getElementById("rebondd").className = "myButton2";
    }

  }


}



function load_schwarshild_photon_nonBar() {
   if (sessionStorage.getItem("nombredefuseesrecupvaleurs")){
     var nbfuseesrecupvaldesession = sessionStorage.getItem("nombredefuseesrecupvaleurs");
     nbrderockets= nbfuseesrecupvaldesession;
     //console.log(nbfuseesrecupvaldesession,"nombre de fusees recuperees valeur session");
    document.getElementById("nombredefusees").value = sessionStorage.getItem("nombredefuseesrecupvaleurs");
   }

	 supprHtml();
	 genereHtml();
	 save_nbfusees();
	 updatenbredefusees();


  if (sessionStorage.getItem("r01")) {
	for (count = 1; count <= nbrderockets; count += 1) {
		document.getElementById("r0"+count.toString()+"").value=sessionStorage.getItem("r0"+count.toString()+"");
		document.getElementById("vphi"+count.toString()+"").value=sessionStorage.getItem("vphi"+count.toString()+"");
		document.getElementById("vr"+count.toString()+"").value=sessionStorage.getItem("vr"+count.toString()+"");
	}

    document.getElementById("r_phy").value = sessionStorage.getItem("r_phy");
    document.getElementById("M").value = sessionStorage.getItem("M");
    document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
    document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
    var graph_check = sessionStorage.getItem("graph_check");
    if (graph_check == "false") {
      	document.getElementById("toggle").checked = false;
    }

    if (document.getElementById("traject_type").value == "simple") {
      	pressionBouttonTrajectoireSimple();
    } 
	else if (document.getElementById("traject_type").value == "complete") {
      	pressionBouttonTrajectoireComplete();
    }

    if (document.getElementById("traject_type2").value == "observateur") {
      	pressionBouttonObservateur();
    } else if (document.getElementById("traject_type2").value == "mobile") {
      	pressionBouttonMobile();

    }
  }
}

// CAS METRIQUE DE KERR
function save_kerr_massif() {
	// recuperation des variables de la page simulation
	r0 = document.getElementById("r0").value;
	J = document.getElementById("J").value;
	M = document.getElementById("M").value;
	vphi = document.getElementById("vphi").value;
	vr = document.getElementById("vr").value;
	traject_type = document.getElementById("traject_type").value;
	traject_type2 = document.getElementById("traject_type2").value;
	var graph_check = true;
	if (document.getElementById("toggle").checked == false) {
		graph_check = false;
	}

	// Stockage des valeurs
	sessionStorage.setItem("r0", r0);
	sessionStorage.setItem("J", J);
	sessionStorage.setItem("vphi", vphi);
	sessionStorage.setItem("vr", vr);
	sessionStorage.setItem("M", M);
	sessionStorage.setItem("traject_type", traject_type);
	sessionStorage.setItem("traject_type2", traject_type2)
	sessionStorage.setItem("graph_check", graph_check);

}

function load_kerr_massif() {
	if (sessionStorage.getItem("r0")) {
		document.getElementById("r0").value = sessionStorage.getItem("r0");
		document.getElementById("J").value = sessionStorage.getItem("J");
		document.getElementById("M").value = sessionStorage.getItem("M");
		document.getElementById("vphi").value = sessionStorage.getItem("vphi");
		document.getElementById("vr").value = sessionStorage.getItem("vr");
		document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
		document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
		var graph_check = sessionStorage.getItem("graph_check");
		if (graph_check == "false") {
			document.getElementById("toggle").checked = false;
		}

		if (document.getElementById("traject_type").value == "simple") {
			pressionBouttonTrajectoireSimple();
		} else if (document.getElementById("traject_type").value == "complete") {
			pressionBouttonTrajectoireComplete();
		}

		if (document.getElementById("traject_type2").value == "observateur") {
			pressionBouttonObservateur();
		} else if (document.getElementById("traject_type2").value == "mobile") {
			pressionBouttonMobile();

		}
	}
}

function save_kerr_photon() {
    // recuperation des variables de la page simulation
    r0 = document.getElementById("r0").value;
    J = document.getElementById("J").value;
    M = document.getElementById("M").value;
    vphi = document.getElementById("vphi").value;
    vr = document.getElementById("vr").value;
    traject_type = document.getElementById("traject_type").value;
    traject_type2 = document.getElementById("traject_type2").value;
    var graph_check = true;
    if (document.getElementById("toggle").checked == false) {
      graph_check = false;
    }

    // Stockage des valeurs
    sessionStorage.setItem("r0", r0);
    sessionStorage.setItem("J", J);
    sessionStorage.setItem("vr", vr);
    sessionStorage.setItem("vphi", vphi);
    sessionStorage.setItem("M", M);
    sessionStorage.setItem("traject_type", traject_type);
    sessionStorage.setItem("traject_type2", traject_type2)
    sessionStorage.setItem("graph_check", graph_check);
}

function load_kerr_photon() {
  if (sessionStorage.getItem("r0")) {
    document.getElementById("r0").value = sessionStorage.getItem("r0");
    document.getElementById("J").value = sessionStorage.getItem("J");
    document.getElementById("M").value = sessionStorage.getItem("M");
    document.getElementById("vr").value = sessionStorage.getItem("vr");
    document.getElementById("vphi").value = sessionStorage.getItem("vphi");
    document.getElementById("traject_type").value = sessionStorage.getItem("traject_type");
    document.getElementById("traject_type2").value = sessionStorage.getItem("traject_type2");
    var graph_check = sessionStorage.getItem("graph_check");
    if (graph_check == "false") {
      document.getElementById("toggle").checked = false;
    }
    if (document.getElementById("traject_type").value == "simple") {
      pressionBouttonTrajectoireSimple();
    } else if (document.getElementById("traject_type").value == "complete") {
      pressionBouttonTrajectoireComplete();
    }

    if (document.getElementById("traject_type2").value == "observateur") {
      pressionBouttonObservateur();
    } else if (document.getElementById("traject_type2").value == "mobile") {
      pressionBouttonMobile();

    }
  }
}
