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
			
		}
	}

})();