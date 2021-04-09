/* Fichier pour rasemble les fonctions de bouttons des different fichiers trajectoires */

// Fonction bouton pause
// tirée du dossier calcul_trajectoire_inter_photon
/*
function pausee(compteur,mobile,mobilefactor) {

    if (mobile.pause == false) {
        mobile.pause = true;
        document.getElementById("pau").src = "Images/lecture.png";
        document.getElementById("pau").title = texte.pages_trajectoire.bouton_lecture;
        document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_enpause;
        clearInterval(mobile.myInterval);
    } 
    else {
      if(mobile.peuxonrelancer == true) {
      mobile.pause = false;
      document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_encours;
      document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
      document.getElementById("pau").src = "Images/pause.png";
      mobile.myInterval = setInterval(animate.bind(null,compteur,mobile,mobilefactor), 10/6);
      }
    }
  }


//Fonction bouton zoom
//tirée du dossier calcul_trajectoire_inter_photon

//Pour rendre visible le paneau de zoom.
document.getElementById("panneau_mobile2").style.visibility='visible';

// Gestion des bouttons Zoom moins
/
document.getElementById('moinszoom').addEventListener('click', function() {
	mobilefactor[compteur] /= 1.2;
	mobile.positionspatio.posX1 = mobilefactor[compteur] * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2);
	mobile.positionspatio.posY1 = mobilefactor[compteur] * mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2);
	mobile.position.posX2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2);
	mobile.position.posY2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2);  
	majFondFixe44(mobile);      
	rafraichir2(context,mobilefactor,rmaxjson,maximum,compteur);
}, false);


document.getElementById('pluszoom').addEventListener('click', function() {       
	mobilefactor[compteur] *= 1.2;
	mobile.positionspatio.posX1 = mobilefactor[compteur] * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2);
	mobile.positionspatio.posY1 = mobilefactor[compteur] * mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2);
	mobile.position.posX2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2);
	mobile.position.posY2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2);
	majFondFixe44(mobile); 
	rafraichir2(context,mobilefactor,rmaxjson,maximum,compteur);
}, false);



#Ouvre une nouvelle fenetre htlm
#js
#<a href="index2.html" onclick="window.open(this.href);return false">Index 2</a>
#html
#<a href="index2.html">Index 2</a>

#Ferme la fenetre htlm
#js
#<a href="index2.html" onclick="window.close(this.href);return false">Index 2</a>
*/

/// test  d'une nouvelle foncion Zoom






var bouttons = bouttons || (function(){
	return {
		zoom: function(text,zoomtype,mobile,canvas,mobilefactor) {
			if(zoomtype==true){mobilefactor *= 1.2;}
			else{mobilefactor/= 1.2;}
			mobile.positionspatio.posX1 = mobilefactor * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2);
			mobile.positionspatio.posY1 = mobilefactor * mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2);
			mobile.position.posX2 = mobilefactor * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2);
			mobile.position.posY2 = mobilefactor * mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2);
			//alert(mobile.positionspatio.posX1);
			return mobile ;
			
		}
	}

})();