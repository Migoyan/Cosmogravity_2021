function arret(mobile) {
	mobile.pause = true;
	//dtau = 0;

clearInterval(mobile.myInterval);
	document.getElementById("indic_calculs").innerHTML=texte.pages_trajectoire.calcul_termine;
}


function arretkerr() {
	pause = true;
    clearInterval(myInterval);
	document.getElementById("indic_calculs").innerHTML=texte.pages_trajectoire.calcul_termine;
}
