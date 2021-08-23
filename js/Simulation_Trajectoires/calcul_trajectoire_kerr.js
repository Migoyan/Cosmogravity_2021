// variables globales
var r_part = 0;
var A_part = 0;
var J=0;
var A_init=0;
var A_part_obs = 0;
var A_init_obs=0;				   
var Dtau1=0;
var Dtau2=0;
var i = 1;
var j = 1;
var title = "V(r)/c²";
var mini_obs=0;
var mini_mob=0;
var clicks = 0;
const DIAMETRE_PART = 1;
var scale_factor=280;
var z=0;
var z_obs=0;

//puisqu'il faux initaliser data1 et data2 avant l'appel dans graphique_creation_pot
var data1 = [];
var data2 = [];

var onestarrete=0;
var peuxonrelancer = true;
var obs=0;
// liste de couleurs en hexa
const COULEUR_NOIR = '#2F2D2B';

const COULEUR_BLEU = '#4080A4';
const COULEUR_TURQUOISE='#AEEEEE';
const COULEUR_CYAN = '#7F008B8B';
const COULEUR_BLANC = '#ffffff';
const COULEUR_ROUGE = '#ff0000';
const COULEUR_ROUGE_COSMO= '#b54b3a';
const COULEUR_GRIS = '#C0C0C0';
const COULEUR_GRIS_FONCE = '#A9A9A9';
const COULEUR_JAUNE='#F0E36B';

// couleurs rayons et particule
const COULEUR_PART = COULEUR_ROUGE_COSMO;
const COULEUR_RS = COULEUR_BLEU;
const COULEUR_RH = COULEUR_GRIS_FONCE;
const COULEUR_ERGOS = COULEUR_JAUNE;

function testnum(a){
	for (var i = -30; i < 30; i++) {
		resu=a/(10**i);
		if (resu >=1 && resu <=10){
			z=i; return z;
		}
	}
}

function initialisation(){
	c = 299792458;
	G = 6.6742 * Math.pow(10, -11);
	r0 = Number(document.getElementById("r0").value);
	M = Number(document.getElementById("M").value);
	J = Number(document.getElementById("J").value);
	v0 = Number(document.getElementById("v0").value);
	teta = Number(document.getElementById("teta").value);
	phi0=Number(document.getElementById("phi0").value);
	phi0=phi0*Math.PI/180;
	
	if(v0>c){
		alert("V0 supérieur à c");
		return;
	}

	m = G * M / Math.pow(c, 2); //moitié du rayon de Schwarzchild
	rs = 2 * m;
	a = J / (c * M);
	E=c*Math.sqrt((r0-rs)/(r0*(c**2-v0**2)));
	L=(-1)*(a*c*rs/Math.sqrt(r0)-v0*Math.sin(teta*Math.PI/180)*Math.sqrt(r0*delta(r0)))/Math.sqrt((c**2-v0**2)*(r0-rs));
	if(a==0 && teta==180){L=0};
	
	vr=v0*Math.cos(teta*Math.PI/180)*c*Math.sqrt(delta(r0))/(r0*Math.sqrt(c**2-v0**2)); 
	vphi=v0*Math.sin(teta*Math.PI/180)*c*Math.sqrt(Math.abs(r0*(r0-rs))/Math.sqrt(delta(r0)*(c**2-v0**2))); 
	if(teta==180){vphi=0;}
	if(teta==90){vr=0;}
	rh = G * M / Math.pow(c, 2) * (1 + Math.sqrt(1 - Math.pow(J * c / (G * M * M), 2))); //rayon de Kerr
	rhp = 0.5 * ( (2 * G * M / Math.pow(c, 2)) + Math.sqrt(Math.pow( (2 * G * M / Math.pow(c, 2)), 2) - 4 * Math.pow( (J / (c * M)) , 2)));     //RH+
    rhm = 0.5 * ( (2 * G * M / Math.pow(c, 2)) - Math.sqrt(Math.pow( (2 * G * M / Math.pow(c, 2)), 2) - 4 * Math.pow( (J / (c * M)) , 2)));     //RH-

	textegravetetc_Kerr();						   
	document.getElementById("a").innerHTML = a.toExponential(3);
	document.getElementById("m").innerHTML = rs.toExponential(3);
	document.getElementById("L").innerHTML = L.toExponential(3);
	document.getElementById("E").innerHTML = E.toExponential(3);
	
	if (isNaN(rhp)){document.getElementById("rhp").innerHTML = 0;}
	else {  document.getElementById("rhp").innerHTML = rhp.toExponential(3);}

	if (isNaN(rhm)){document.getElementById("rhm").innerHTML = 0;}
	else { document.getElementById("rhm").innerHTML = rhm.toExponential(3);;}


    /* Calcul de rmax */
 	if( (E>0.99999 && E<1.00001) && (Math.pow(L,4)- Math.pow(2*rs*(L-a),2)) > 0 ){ 
		rmax=1.1*r0;	
   	} 
	else if (E==1 && L==0) {rmax=2*r0;} 
	else { 
		calcul_rmax(); 
		if(rmax<r0) {rmax=r0 ;}
	} 
	if (r0 <= rs){
		alert("r0 inférieur à rs");
		return;
	} 

}  // fin fonction initialisation

function verifnbr() {

	r0 = document.getElementById("r0").value;
	//vphi = document.getElementById("vphi").value;
	M = document.getElementById("M").value;
	//vr = document.getElementById("vr").value;
	J = document.getElementById("J").value;

	if (isNaN(r0)){
		alert ("Veuillez vérifier vos saisie en r0");}
	if (isNaN(vphi)){
		alert ("Veuillez vérifier vos saisie en Vphi");
	}
	if (isNaN(M)){
		alert ("Veuillez vérifier vos saisie en M");
	}
	if (isNaN(vr)){
		alert ("Veuillez vérifier vos saisie en Vr");
	}
	if (isNaN(J)){
		alert ("Veuillez vérifier vos saisie en J");
	}
}


function trajectoire() {
	texte = o_recupereJson();
	if (pause || debut) {
		document.getElementById("tg2").style.display = "table";
		$("#grsvg_2").empty();
		document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_encours;
		// pour rendre visible le panneau de contrôle pause et vitesse de la simu
		document.getElementById("panneau_mobile").style.visibility='visible';
		document.getElementById("bouton_info").style.visibility='visible';
		document.getElementById("panneau_mobile2").style.visibility='visible';
		estUnMobile();
		// permet de griser les cases de saisie pour éviter de changer les valeurs pendant la simulation
		// conseillé car toutes les exceptions ne sont pas gérées
		document.getElementById('M').disabled = true;
		document.getElementById('r0').disabled = true;
		document.getElementById('J').disabled = true;
		document.getElementById('teta').disabled = true;
		document.getElementById('phi0').disabled = true;

		//empecher de passer d'observateur a mobile ou inversement pendant la simulation
		document.getElementById('r3').disabled = true;
		document.getElementById('r4').disabled = true;

		// permet de controler si il y a un tracé ou non pour l'enregistrement
		document.getElementById('trace_present').value="1";
		pause = false;
		debut = false;
		scale_factor = 280;				   
		//-------- Nos variables Globales ( de c à L) --------//
		
		initialisation();

		//--------------------------------------------------------------------------------------//
		//Cette Partie traite le calcul de la trajectoire de la particule, dans son référentiel propre, et aussi dans celui de l'observateur//

		phi = phi0;
		phi_obs = phi0;
		temps_chute_libre = (Math.PI * r0 * Math.sqrt(r0 / (2 * G * M)) / 2);
		A_init = vr;
		r_init = r0;
		A_part = A_init;
		r_part = r_init;			 
		A_init_obs = vr*delta(r0)/( (Math.pow(r0,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r0)*E - rs*a*L/r0 );
		A_part_obs=A_init_obs;												
		vrobs=A_init_obs; 
		vphiobs=vphi*delta(r0)/( (Math.pow(r0,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r0)*E - rs*a*L/r0 );		   
		r_init_obs = r0; 
		r_part_obs=r_init_obs;												
		data1 = [];
		data2 = [];
		temps_particule = 0;
		temps_observateur = 0;
		bool = true;

	

		// permet de gérer les touches du clavier pour certaines actions
		clavierEvenement();

		scale_factor = 280;
		dtau=r0*500/(Math.sqrt(vrobs*vrobs+vphiobs*vphiobs)+1e-20);
		if(dtau>temps_chute_libre/500.){dtau= temps_chute_libre/500.;} 	   

		// Ici, les positions de départ de la particule, dans son référentiel et dans celui de l'observateur//
		x1part = scale_factor * r0 * Math.cos(phi) / rmax;
		y1part = scale_factor * r0 * Math.sin(phi) / rmax;
		x1obs = scale_factor * r0 * Math.cos(phi_obs) / rmax;
		y1obs = scale_factor * r0 * Math.sin(phi_obs) / rmax;

		canvas = document.getElementById("myCanvas");
		if (!canvas) {
			alert(texte.pages_trajectoire.impossible_canvas);
			return;
		}

		context = canvas.getContext("2d");
		if (!context) {
			alert(texte.pages_trajectoire.impossible_context);
			return;
		}

		canvas22 = document.getElementById("myCanvas22");
		if (!canvas22) {
			alert(texte.pages_trajectoire.impossible_canvas);
			return;
		}

		context22 = canvas22.getContext("2d");
		if (!context22) {
			alert(texte.pages_trajectoire.impossible_context);
			return;
		}

		majFondFixe();
		majFondFixe22();

		diametre_particule = DIAMETRE_PART;

		// La position de départ est le milieu de la fenêtre d'affichage auquel on ajoute la position initiale de la particule.

		posX1 = (canvas.width / 2.0) + x1part;
		posY1 = (canvas.height / 2.0) + y1part;

		posX2 = (canvas.width / 2.0) + x1obs;
		posY2 = (canvas.height / 2.0) + y1obs;

		posX3 = (canvas.width / 2.0);
		posY3 = (canvas.height / 2.0);

		// Ici on va créer l'animation avec setinerval, laquelle prend comme paramètres la fonction animate() définie ci-après et qui calcul les coordonnées de la particule à cahque instant.

		// les dtau1 et 2 permettent de contenir le dtau pour obtenir une simulation hors controle
		// à voir, l'utilisation du settimeout à la place de setinterval. Ca permettrait de remplacer le 10/6 par une variable dt_simu pouvant être modifiée à la place du pas dtau utilisé dans rungekutta
		// lorsqu'on est dans le setinterval, il est impossible ce modifier ce 10/6 par une variable qu'on pourrait incrémenter. Il utilise la valeur initiale avant l'entrée dans setinterval
		myInterval = setInterval(animate, 10 / 6);
		
		Dtau1 = 1e8*temps_chute_libre ;
		Dtau2 = temps_chute_libre / 1e8;

		document.getElementById('bouton_pause').addEventListener('click', function() {
			pausee();
		}, false);

	//Gestion des bouttons accélerer et decélerer																 
		document.getElementById('plusvite').addEventListener('click', function() {
			if (dtau >= Dtau1) {
				dtau = Dtau1;
			} 
			else {
				dtau += dtau;
				clicks += 1 ;
			}
		}, false);

		document.getElementById('moinsvite').addEventListener('click', function() {
			if (dtau <= Dtau2) {
				dtau = Dtau2;
			} else {
				dtau /= 2;
				clicks -= 1 ;
			}
		}, false);

	// Gestion des boutons Zoom 
		document.getElementById('moinszoom').addEventListener('click', function() {
			scale_factor /= 1.2;
			posX1 = scale_factor * r_part * (Math.cos(phi) / rmax) + (canvas.width / 2);
			posY1 = scale_factor * r_part * (Math.sin(phi) / rmax) + (canvas.height / 2);
			posX2 = scale_factor * r_part_obs * (Math.cos(phi_obs) / rmax) + (canvas.width / 2);
			posY2 = scale_factor * r_part_obs * (Math.sin(phi_obs) / rmax) + (canvas.height / 2);	
			majFondFixe22();																			   
			rafraichir2();

		}, false);
		document.getElementById('pluszoom').addEventListener('click', function() {
			scale_factor *= 1.2;
			posX1 = scale_factor * r_part * (Math.cos(phi) / rmax) + (canvas.width / 2);
			posY1 = scale_factor * r_part * (Math.sin(phi) / rmax) + (canvas.height / 2);
			posX2 = scale_factor * r_part_obs * (Math.cos(phi_obs) / rmax) + (canvas.width / 2);
			posY2 = scale_factor * r_part_obs * (Math.sin(phi_obs) / rmax) + (canvas.height / 2);
			majFondFixe22();																				  
			rafraichir2();
		}, false);

		document.getElementById('initialiser').addEventListener('click', function() {
			scale_factor =280 ;
			posX1 = scale_factor * r_part * (Math.cos(phi) / rmax) + (canvas.width / 2);
			posY1 = scale_factor * r_part * (Math.sin(phi) / rmax) + (canvas.height / 2);
			posX2 = scale_factor * r_part_obs * (Math.cos(phi_obs) / rmax) + (canvas.width / 2);
			posY2 = scale_factor * r_part_obs * (Math.sin(phi_obs) / rmax) + (canvas.height / 2);	
			majFondFixe22();																			   
			rafraichir2();
		}, false);

		function rafraichir2() {
			majFondFixe();
			creation_blocs(context);
		}							
		//Pour ouvrir le pop up qui nous si on veut afficher le graphe de potentiel ou pas
		function CentrerPopPotentiel() {
			document.getElementById("bloc_resultats").style.display= "block";
			var node = document.getElementById('grsvg_2');
			if (node.parentNode){
				node.parentNode.removeChild(node);
			}
		}

		if (document.getElementById("toggle").checked==false) {
			CentrerPopPotentiel();
		}

		//Ici le bout de code pour le bouton Reset, quand on clique dessus, la fonction appelé efface le canvas en entier.
		document.getElementById('clear').addEventListener('click', function() {
			rafraichir();
		}, false);

		// Tracé du Rayon de Schwarzchild.
		context.fill();
		creation_blocs(context);

		$(document.params.traj[0]).change(function() {
			// Tracé du Rayon de Schwarzchild si on change en cours de simulation
			creation_blocs(context);
		});

		dr = rmax / 1000;

		element2=document.getElementById('traject_type2');

		if (element2.value != "mobile"){							   
			for (r = rhp; r < rmax * 1.2; r += dr) {
				V = Vr_obs(r);
				data1.push({date: r, close: V });
				}
				V = Vr_obs(r0);
				data2.push({date: r0, close: V });
				graphique_creation_pot();
		
		}
		else{  
			for (r = rhp; r < rmax * 1.2; r += dr) {									   
				V = Vr_mob(r);
				data1.push({date: r, close: V });
			}
			V = Vr_mob(r0);
			data2.push({date: r0, close: V });
			graphique_creation_pot();
		}			
	} 
	else {
		myInterval = setInterval(animate, 10 / 6);											  
	}  // fin if(pause....

	document.getElementById('start').addEventListener('click', function() {
		rafraichir(); }, false);
	document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_stop;
}  // fin fonction trajectoire

// tracé du trajet de la particule

function animate() {
	onestarrete=0;
	estUnMobile();
	element = document.getElementById('traject_type');
	choixTrajectoire();

	element2=document.getElementById('traject_type2');

	if (r0 != 0.0) {
			
		if (element2.value != "mobile"){
			val_obs = rungekutta_obs(dtau, r_part_obs, A_part_obs);
			r_part_obs = val_obs[0];
			varphi_obs = c *dtau* ( rs*a*E/r_part_obs + (1-rs/r_part_obs)*L )/( (Math.pow(r_part_obs,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r_part_obs)*E - rs*a*L/r_part_obs ); 
			phi_obs=phi_obs+varphi_obs;
			if(r_part_obs<rhp*1.001) { r_part_obs=rhp;}
			A_part_obs = val_obs[1];
			
			if(r_part_obs<rhp*1.0001) { vr_3_obs=0;}
			if(r_part_obs<=rs){
				vtot=NaN;
				vr_3_obs=NaN;
				vp_3_obs=NaN;
			}
			else{
				resulta=calculs.MK_vitess(E,L,a,r_part_obs,rs,false); /// voir fichier fonctions.js
				vtot=resulta[0];
				vr_3_obs=resulta[1]*Math.sign(A_part_obs);
				vp_3_obs= resulta[2]; 
			}
			posX2 = scale_factor * r_part_obs * (Math.cos(phi_obs) / rmax) + (canvas.width / 2.);
			posY2 = scale_factor * r_part_obs * (Math.sin(phi_obs) / rmax) + (canvas.height / 2.);
			
		}	
		else{
			val = rungekutta(dtau, r_part, A_part);
			r_part = val[0];
			A_part = val[1];
			varphi = c *dtau* ( rs*a*E/r_part + (1-rs/r_part)*L )/delta(r_part);
			phi = phi + varphi;
			
			if(r_part<=rs){
				vtot=NaN;
				vr_3=NaN;
				vp_3=NaN;
			}
			else{
				resulta=calculs.MK_vitess(E,L,a,r_part,rs,false); /// voir fichier fonctions.js
				vtot=resulta[0];
				//console.log(vtot)
				vr_3=resulta[1]*Math.sign(A_part);
				vp_3=resulta[2];
			}
			posX1 = scale_factor * r_part * (Math.cos(phi) / rmax) + (canvas.width / 2.);
			posY1 = scale_factor * r_part * (Math.sin(phi) / rmax) + (canvas.height / 2.);
		}
	

	if (element2.value != "mobile"){	
		V = Vr_obs(r_part_obs);
		data2 = [];
		data2.push({date: r_part_obs, close: V });
		update_graphique_2();
	}
	else{
		V = Vr_mob(r_part);
		data2 = [];
		data2.push({date: r_part, close: V });
		update_graphique_2();		
	}									
	if(r_part<=0){ r_part=0;}				   
 					

//Tracé de la particule


    if (element2.value != "mobile"){
		if (r_part_obs >= rhp){
			context.beginPath();
			context.fillStyle = COULEUR_NOIR;
			context.rect(posX2, posY2, 1, 1);
			context.lineWidth = "1";
			context.fill();
			majFondFixe22();
			context22.beginPath();
			context22.fillStyle = COULEUR_BLEU;
			context22.arc(posX2, posY2 , 5, 0, Math.PI * 2);
			context22.lineWidth = "1";
			context22.fill();
		}
    }
	else{
		context.beginPath();
		context.fillStyle = COULEUR_ROUGE_COSMO;
		context.rect(posX1, posY1, 1, 1);
		context.lineWidth = "1";
		context.fill();
		majFondFixe22();
		context22.beginPath();
		context22.fillStyle = COULEUR_BLEU;
		context22.arc(posX1, posY1 , 5, 0, Math.PI * 2);
		context22.lineWidth = "1";
		context22.fill();
    }

	if(element2.value == "mobile"){
		if(r_part<=rhp){
			textesfinarret_kerr();
			onestarrete=1;
			alert(texte.page_trajectoire_massive.particule_atteint_rh); r_part=rhp ;
			arretkerr();
			peuxonrelancer=false;
	   }	
	}

	// Decalage spectral
	if (element2.value != "mobile"){
		//z_obs=Math.pow(1-((vr_3_obs*vr_3_obs+ vp_3_obs* vp_3_obs)/(c*c)),(-1/2))*Math.pow(1-rs*r_part_obs/(r_part_obs*r_part_obs + a*a),-(1/2))-1;
		z_obs=(1+vr_3_obs/c)/((1-(vtot/c)**2)**(1/2))*(1-rs/r_part_obs)**(-1/2)-1;
		document.getElementById("decal").innerHTML=z_obs.toExponential(3)
		if(isNaN(z_obs)){document.getElementById("decal").innerHTML="";}
	}
	else{
		document.getElementById("decal").innerHTML="";
	}

    // gradient d'accélération
		if (element2.value != "mobile"){
			gm = derivee_seconde_Kerr_massif_obs(r_part_obs);
			gmp = derivee_seconde_Kerr_massif_obs(r_part_obs + 1);
			fm = Math.abs(gm - gmp);
		}
		else{
			gm = derivee_seconde_Kerr_massif(r_part);
			gmp = derivee_seconde_Kerr_massif(r_part + 1);
			fm = Math.abs(gm - gmp);			
		}

	if (element2.value != "mobile"){
		if(r_part_obs >= rhp)   {
			temps_particule += dtau*delta(r_part_obs)/( (Math.pow(r_part_obs,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r_part_obs)*E - rs*a*L/r_part_obs );
			document.getElementById("tp").innerHTML = temps_particule.toExponential(3);					 
			document.getElementById("ga").innerHTML = fm.toExponential(3);
			document.getElementById("r_par").innerHTML = r_part_obs.toExponential(3);
			document.getElementById("vrk").innerHTML = vr_3_obs.toExponential(3);
		    document.getElementById("vpk").innerHTML = vp_3_obs.toExponential(3);
		    document.getElementById("v_tot").innerHTML = vtot.toExponential(3);
			if(isNaN(vtot)){
				document.getElementById("v_tot").innerHTML = "";
				document.getElementById("vrk").innerHTML = "";
		    	document.getElementById("vpk").innerHTML = "";
			}	

        }

	}	
	else{
		if (r_part>=0){
			temps_particule+=dtau;
			document.getElementById("tp").innerHTML = temps_particule.toExponential(3);
			document.getElementById("ga").innerHTML = fm.toExponential(3);
			document.getElementById("r_par").innerHTML = r_part.toExponential(3);
			document.getElementById("vrk").innerHTML = vr_3.toExponential(3);
			if(J==0) {vp_3= c*L/r_part;}
			if(r_part<=rhp && J!=0) {vp_3=1/0;}
		    document.getElementById("v_tot").innerHTML = vtot.toExponential(3);
			document.getElementById("vpk").innerHTML = vp_3.toExponential(3);
			if(isNaN(vtot)){
				document.getElementById("v_tot").innerHTML = "";
				document.getElementById("vrk").innerHTML = "";
		    	document.getElementById("vpk").innerHTML = "";
			}	
			
			//console.log("ligne 609 vp_3",vp_3);
		}
	}
    

	if (element2.value != "mobile"){
		temps_observateur += dtau;
		document.getElementById("to").innerHTML = temps_observateur.toExponential(3);
	}else{
		if(r_part > rhp) {
			temps_observateur+=dtau*( (Math.pow(r_part,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r_part)*E - rs*a*L/r_part )/delta(r_part);
			}else{
			temps_observateur=1/0;   //  infini
		}
		document.getElementById("to").innerHTML = temps_observateur.toExponential(3);
	}
	

	if (element2.value == "mobile"){
		if (Number(fm) <= 1) {
			document.getElementById('DivClignotante').innerHTML = " <img src='./Images/diodever.gif' height='14px' />";
			document.getElementById('DivClignotante').style.color = "green";
		} 
		else if (1 < Number(fm) && Number(fm) < 7) {
			document.getElementById('DivClignotante').innerHTML = " <img src='./Images/diodejaune.gif' height='14px' />";
			document.getElementById('DivClignotante').style.color = "yellow";
		} 
		else if (Number(fm) >= 7) {
			document.getElementById('DivClignotante').innerHTML = " <img src='./Images/dioderouge.gif' height='14px' />";
			document.getElementById('DivClignotante').style.color = "red";
		} 
		else {
			document.getElementById('DivClignotante').innerHTML = texte.pages_trajectoire.erreur;
			document.getElementById('DivClignotante').style.color = "blue";
		}
    } 
    
}     //  fin r0!=0

}    // fin fonction animate

 // Fonction pour garder les dernieres valeurs de vr et vphi au moment du pause.  
function testvaleur(x) {
	if (isNaN(x)) {
		return 'Not a Number!';
	}
	return x ;
}


// Expression du potentiel divisé par c^2
function Vr_mob(r) {
	return  potentiel_Kerr_massif(r);
}

function Vr_obs(r) {
	denom=(Math.pow(r,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r)*E-rs*a*L/r;
	dtausurdtaucarre = Math.pow(delta(r)/denom,2);
	return Math.pow(E,2)-( Math.pow(E,2)-potentiel_Kerr_massif(r) )*dtausurdtaucarre  ;
}


function potentiel_Kerr_massif(r) {
	return 1 - rs / r - (a * a * (E * E - 1) - L * L) / (r * r) - rs / Math.pow(r, 3) * Math.pow(L - a * E, 2);
}


function derivee_seconde_Kerr_massif(r) {
	return -c * c / (2 * Math.pow(r, 4)) * (rs * r * r + 2 * r * (a * a * (E * E - 1) - L * L) + 3 * rs * Math.pow(L - a * E, 2));
}

function rungekutta(h, r, A) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_Kerr_massif(r);
	k[1] = derivee_seconde_Kerr_massif(r + 0.5 * h * A);
	k[2] = derivee_seconde_Kerr_massif(r + 0.5 * h * A + 0.25 * h * h * k[0]);
	k[3] = derivee_seconde_Kerr_massif(r + h * A + 0.5 * h * h * k[1]);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}


function delta(r) {
	var d=r**2-rs*r+a**2;
	return d;
}

function derivee_seconde_Kerr_massif_obs(r) {
	EaL2_a2=Math.pow(E*a,2)-Math.pow(L,2)- Math.pow(a,2);  
	Ea_L2=Math.pow(L-a*E,2) ;  
	denom=(Math.pow(r,2)+Math.pow(a,2)+rs*Math.pow(a,2)/r)*E-rs*a*L/r ;
    return   0.5*Math.pow(c,2)*delta(r)/Math.pow(denom,2)*( 

             ( -rs/Math.pow(r,2)-2*(EaL2_a2)/Math.pow(r,3)-3*rs*Ea_L2/Math.pow(r,4) )*delta(r)

            +2*(Math.pow(E,2)-1+rs/r+(EaL2_a2)/Math.pow(r,2)+rs*Ea_L2/Math.pow(r,3))*(2*r-rs)  

            -2*(Math.pow(E,2)-1+rs/r+(EaL2_a2)/Math.pow(r,2)+rs*Ea_L2/Math.pow(r,3))*delta(r)*((2*r-rs*Math.pow(a,2)/Math.pow(r,2))*E+rs*a*L/Math.pow(r,2))/denom )   ;
}

function rungekutta_obs(h, r, A) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_Kerr_massif_obs(r);
	k[1] = derivee_seconde_Kerr_massif_obs(r + 0.5 * h * A);
	k[2] = derivee_seconde_Kerr_massif_obs(r + 0.5 * h * A + 0.25 * h * h * k[0]);
	k[3] = derivee_seconde_Kerr_massif_obs(r + h * A + 0.5 * h * h * k[1]);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}


function calcul_rmax(){
	r1 = (L * (L - Math.sqrt(Math.pow(L, 2) - 3 * Math.pow(rh, 2))) / (rh));
	r2 = (L * (L + Math.sqrt(Math.pow(L, 2) - 4 * Math.pow(rh, 2))) / (2 * rh));

	ra = rh * Math.pow(L, 2);
	rb = ((rh / r0) - 1) * Math.pow(L, 2);
	X0 = 1 / r0;
	rc = rh - Math.pow(L, 2) * X0 + rh * Math.pow(L * X0, 2);
	DELTA = Math.pow(rb, 2) - 4 * ra * rc;
	r3 = (-rb - Math.sqrt(DELTA)) / (2*ra);

	if (L < Math.sqrt(3) * rh) {
		rmax = r0;
	} 
	else if (L <= 2 * rh && L > Math.sqrt(3) * rh) {
		if (Vr_mob(r0) <= Vr_mob(r1) && r0 > r1) {
			if (r3 > r0) {
				rmax = r3;
			} 
			else if (r3 < r0) {
				rmax = r0;
			}
		} 
		else {
			rmax = r0;
		}
	} 
	else if (L > 2 * rh) {
		if (r0 > r2) {
			if (r3 > r0) {
				rmax = r3;
			} 
			else if (r3 < r0) {
				rmax = r0;
			}
		} 
		else{
			rmax = r0;
		}
	}
	else{rmax=r0;}
}


// Fonction bouton pause
function pausee() {
	if (pause == false) {
		//dtau = 0;
		pause = true;
		document.getElementById("pau").src = "Images/lecture.png";
		document.getElementById("pau").title = texte.pages_trajectoire.bouton_lecture;
		document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_enpause;
		clearInterval(myInterval);
	} 
	else {
		if(peuxonrelancer == true) {
			pause = false;
			document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_encours;
			document.getElementById("pau").title = texte.pages_trajectoire.bouton_pause;
			document.getElementById("pau").src = "Images/pause.png";
			myInterval = setInterval(animate, 10 / 6);
		}

	}
}

// permet de gérer les touches du clavier pour certaines actions
function clavierEvenement(){
	$(document).keyup(function(event) { // the event variable contains the key pressed
	if(event.which == 65) { // touche a
		$('#r1').click();
	}
	if(event.which == 90) { // touche z
		$('#r2').click();
	}
	if(event.which == 81) { // touche q
										
		$('#start').click();
	}
	if(event.which == 83) { // touche s
		$('#clear').click();
	}
	if(event.which == 68) { // touche d
		$('#boutton_enregis').click();
	}
	if(event.which == 70) { // touche f
		$('#boutton_recup').click();
	}
	if(event.which == 87) { // touche w
		$('#moinsvite').click();
	}
	if(event.which == 88) { // touche x
		$('#pau').click();
	}
	if(event.which == 67) { // touche c
		$('#plusvi').click();
	}
	if(event.which == 80) { // touche p
		arretkerr();
	}
	});
}

function rafraichir() {
	window.location.reload();
	element2.value="observateur";
}



function siTrajectoireSimple() {
	if (element.value == 'simple') {
		majFondFixe();
		// Tracé du Rayon de Schwarzchild.
		creation_blocs(context);
		diametre_particule = DIAMETRE_PART*2;
	}
}


function enregistrer(){
	// ces 2 fonctions sont issues des biblios saveSvgAsPng.js et canvas-to-image.js

	if(document.getElementById('trace_present').value=="1"){
		canvas3 = document.getElementById("myCanvas3");
		context3 = canvas3.getContext("2d");
		context3.drawImage(canvas, 0,0);
		if (element2.value != "mobile"){
		context3.beginPath();
		context3.fillStyle = COULEUR_BLEU;
		context3.arc(posX2, posY2 , 5, 0, Math.PI * 2);
		context3.lineWidth = "1";
		context3.fill();
		canvasToImage(canvas3, {
			name: 'Trajectoire_massive_Kerr',
			type: 'png'
		});
		majFondFixe3();
		}
		else{
			context3.beginPath();
			context3.fillStyle = COULEUR_BLEU;
			context3.arc(posX1, posY1 , 5, 0, Math.PI * 2);
			context3.lineWidth = "1";
			context3.fill();
			canvasToImage(canvas3, {
				name: 'Trajectoire_massive_Kerr',
				type: 'png'
			});
			majFondFixe3();
		}

		// permet si l'on veut d'enregistrer le graphe du potentiel
		// saveSvgAsPng(document.getElementById("grsvg_2"),"Potentiel_massive_Schwar.png",{backgroundColor:"white"});
		}
	else{
		var texte = o_recupereJson();
		alert(texte.pages_trajectoire.message_enregistrer);
	}
}

function traceEstAbsent(){
	document.getElementById('trace_present').value="0";
}

function siTrajectoireComplete() {
	if (element.value == 'complete') {
		diametre_particule = DIAMETRE_PART;
	}
}

function choixTrajectoire() {
	siTrajectoireSimple();
	siTrajectoireComplete();
}

function estUnMobile(){
	var x = window.matchMedia("(max-width: 960px)")
	if(x.matches){
		document.getElementById("bouton_info").style.visibility='hidden';
	}
	else{
		document.getElementById("bouton_info").style.visibility='visible';
	}
}

function commandes(){
	var texte = o_recupereJson();
	alert(texte.pages_trajectoire.commandes_horsSchwarMassif);
}

// utile pour l'exportation d'images
function majFondFixe(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	// Ajout d'un fond blanc pour l'exportation
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = "15pt bold";
	context.fillStyle = "black";
	context.fillText(texte.page_trajectoire_massive_kerr.titre,5,40);
	context.font = "13pt bold";
	context.fillText(texte.pages_trajectoire.entrees,5,70);
	context.font = "11pt normal";
	context.fillText("M = "+M.toExponential(3)+" kg",5,90);
	context.fillText("r\u2080 = "+r0.toExponential(3)+" m",5,110);
	context.fillText("a = "+a.toExponential(3)+" m",5,130);
	context.fillText("V\u2080 = "+v0.toExponential(3)+" m.s\u207B\u00B9",5,150);
	context.fillText("\u03C6 = "+phi0.toExponential(3)+"",5,170);
	if(document.getElementById('traject_type2').value=="observateur"){
		context.fillText(texte.pages_trajectoire.observateur,5,190);
	} 
	else {context.fillText(texte.pages_trajectoire.mobile,5,190); }

}

function majFondFixe22(){
	context22.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width, canvas.height);
}

function majFondFixe3(){
	context3.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width, canvas.height);
}

function test_Jmax() { //teste si la valeur de J est supérieure à sa valeur maximale
	var texte = o_recupereJson();
	initialisation();
	if (Math.abs(J) > G * Math.pow(M, 2) / c) {
		alert(texte.page_trajectoire_massive_kerr.moment_angulaire + "(" + G * Math.pow(M, 2) / c + ")");
		return false;
	}
	else{
		return true;
	}
}

function test_r0(){
	var texte = o_recupereJson();
	initialisation();
	if(r0<=rhp){
		alert(texte.pages_trajectoire.rayonHorzInfRayon);
		return false;
	}
	else if(isNaN(E) || isNaN(L)){
		alert(texte.pages_trajectoire.EouLisNaN);
		return false;
	}
	else{
		return true;
							
	}
}
// teste si r0 et J0 sont valides pour la simulation
function tests_lancement(){
	var val_test=test_Jmax()&&test_r0();
	if(val_test==true){
		save_kerr_massif();
		trajectoire();
	//  Le cas où les valeurs de E et L ne sont pas calculables(Test)
		if (isNaN(E) || isNaN(L)){
			document.getElementById("L").innerHTML = "Non calculable" ;
			document.getElementById("E").innerHTML = "Non calculable";
		}
	}
}

// crée les différentes couches visuelles
function creation_blocs(context){
	context.lineWidth = "1";
	if (((scale_factor * rs / rmax)) < 6) {
		context.beginPath();
		context.strokeStyle = COULEUR_RS;
		context.moveTo(posX3 - 10, posY3);
		context.lineTo(posX3 - 3, posY3);
		context.stroke();
		context.beginPath();
		context.moveTo(posX3 + 3, posY3);
		context.lineTo(posX3 + 10, posY3);
		context.stroke();
		context.beginPath();
		context.moveTo(posX3, posY3 - 10);
		context.lineTo(posX3, posY3 - 3);
		context.stroke();
		context.beginPath();
		context.moveTo(posX3, posY3 + 3);
		context.lineTo(posX3, posY3 + 10);
		context.stroke();
	} 
	else {
		context.beginPath();
		context.setLineDash([]);
		context.fillStyle = COULEUR_ERGOS;
		context.arc((canvas.width / 2.0), (canvas.height / 2.0), ((scale_factor * rs / rmax)), 0, Math.PI * 2);
		context.fill();
		context.beginPath();
		context.setLineDash([5, 5]);
		context.arc((canvas.width / 2.0), (canvas.height / 2.0), ((scale_factor * rhp / rmax)), 0, Math.PI * 2);
		context.fillStyle = 'white';
		context.fill();
		context.beginPath();
		context.setLineDash([5, 5]);
		context.arc((canvas.width / 2.0), (canvas.height / 2.0), ((scale_factor * rhp / rmax)), 0, Math.PI * 2);
		context.strokeStyle = COULEUR_RS;
		context.stroke();
		// tracé de RH- en bleue
		context.strokeStyle = 'blue';
		context.beginPath()
		var posX3 = (canvas.width / 2.0);
		var posY3 = (canvas.height / 2.0);
		context.setLineDash([5, 5]);

		context.arc(posX3, posY3, (rhm * scale_factor)/rmax, 0, 2 * Math.PI);
		context.stroke();
		// tracé de RH+ en rouge
		context.strokeStyle = 'red';
		context.beginPath();
		context.setLineDash([5, 5]);
		context.arc(posX3, posY3, (rhp * scale_factor)/rmax, 0, 2 * Math.PI);
		context.stroke();
		context.closePath();
		context.closePath();
		context.strokeStyle = COULEUR_RS;
		context.beginPath();
		context.setLineDash([5, 5]);
		context.arc(posX3, posY3, (rs * scale_factor)/rmax, 0, 2 * Math.PI);
		context.stroke();
		context.closePath();
		context.closePath();

  	}
	context.fillStyle = 'white';
	
	r2bis=(80*r0)/(scale_factor);
	r1bis=Math.round((80*r0)/(scale_factor*10**testnum(r2bis)));
	ech=r1bis*10**testnum(r2bis);
	xe=((r1bis*10**testnum(r2bis))*scale_factor)/r0;

	context.fillStyle = COULEUR_RS;
	context.fillText(ech.toExponential()+" m",605,90);
	context.stroke();
	context.beginPath();      // Début du chemin
	context.strokeStyle = COULEUR_RS;

	//context.moveTo(canvas.width / 2.0,canvas.height / 2.0);    // Tracé test1
	//context.lineTo((canvas.width / 2.0)+280,canvas.height / 2.0);  // Tracé test2
	context.moveTo(600,110);
	context.lineTo(600+((r1bis*10**testnum(r2bis))*scale_factor)/r0,110);
	context.moveTo(600,105);
	context.lineTo(600,115);
	context.moveTo(600+((r1bis*10**testnum(r2bis))*scale_factor)/r0,105);
	context.lineTo(600+((r1bis*10**testnum(r2bis))*scale_factor)/r0,115);
	// Fermeture du chemin (facultative)
	context.stroke();

}
