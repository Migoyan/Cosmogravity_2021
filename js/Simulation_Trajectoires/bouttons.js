/* Fichier pour rasemble les fonctions de bouttons des different fichiers trajectoires 


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


/*Pour que les foncions puisse étre appeller dans les fichier js il faut créer une variable avec le nom du dossier
les  fonction sont ensuite coder dans des return
*/




var bouttons = bouttons || (function(){
	return {

		/// Cette fonction gére les zoom sur les diffentes simulution trajectoirs
		zoom: function(zoomtype,mobile,canvas,mobilefactor,compteur) {
				factor=mobilefactor[compteur];
				if(zoomtype==true){factor*= 1.2;} // true pour zoom +
				else{factor/= 1.2;} // fasle pour Zoom moin -
				mobile.positionspatio.posX1 = factor* mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2);
				mobile.positionspatio.posY1 = factor* mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2);
				mobile.position.posX2 = factor* mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2);
				mobile.position.posY2 = factor* mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2);
				mobilefactor[compteur]=factor;
				///alert(mobile.positionspatio.posX1);
				return [mobile,mobilefactor];
			
		}, // ne pas oublier de metre une "," entre deux fonctions

		/// fonction boutton accellerer
		vitesse : function (mobile,check) {
			//accelere la simulation
			if(check){
				if (mobile.dtau >= mobile.Dtau1) {
					mobile.dtau = mobile.Dtau1;
				} 
				else {
					mobile.dtau += mobile.dtau;
				
				}
			}	
			// decelere la simulation
			else{
				if (mobile.dtau <= mobile.Dtau2) {
					mobile.dtau = mobile.Dtau2;
				} 
				else {
					mobile.dtau /= 2;
					clicks-=1; }
			}
			return mobile;
		},
	// reinitialise le zoom
	initialiser : function (nbrfusse,mobilefactor,mobile,compteur,canvas){
		for (key = 1; key <= nbrfusse; key += 1) {
            mobilefactor[key] = Number(document.getElementById("scalefactor").value);  		
		}
		for (key = 1; key <= nbrfusse; key += 1) {
			if(key!=cle){
                mobilefactor[key] = Number(document.getElementById("scalefactor").value)/(r0o2[cle]/r0o2[key]);
			}
		}
        mobile.positionspatio.posX1 = mobilefactor[compteur] * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2);
        mobile.positionspatio.posY1 = mobilefactor[compteur] * mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2);
        mobile.position.posX2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2);
        mobile.position.posY2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2);
		return [mobile,mobilefactor];
	}

	}

})();