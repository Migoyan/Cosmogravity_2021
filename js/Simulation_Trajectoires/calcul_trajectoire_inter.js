// variables globales
var title = "V(r)/c²";
var clicks = 0;
var z=0;
var z_obs=0;
const DIAMETRE_PART = 1;

// liste de couleurs en hexa
const COULEUR_NOIR = '#2F2D2B';
const COULEUR_BLEU = '#4080A4';
const COULEUR_CYAN = '#008B8B';
const COULEUR_BLANC = '#ffffff';
const COULEUR_ROUGE = '#ff0000';
const COULEUR_ROUGE_COSMO= '#b54b3a';
const COULEUR_GRIS = '#CCCCCC';
const COULEUR_MARRON = '#673B15';

// couleurs rayons et particule
const COULEUR_PART = COULEUR_ROUGE_COSMO;
const COULEUR_RS = COULEUR_BLEU;
const COULEUR_RPHY = COULEUR_GRIS;

ifUneFois=true // booleen qui permet plus bas d'utiliser la condition if une seule fois durant la simulation
ifUneFois2=true

//variable globale, key value
var rmaxjson = {};
var mobilefactor = {};
var r0o2 ={};

var maximum;
var cle;
var fuseecompteur;
var listejsonfusees={};



//Fonction pour arrondir l'échelle:
function testnum(a){
	for (var i = -30; i < 30; i++) {
		resu=a/(10**i);
		if (resu >1 && resu <10){
			z=i; 
			return z;
		}
	}
}

  // Fonction pour garder les dernieres valeurs de vr et vphi au moment du pause.
function testvaleur(x) {
        if (isNaN(x)) {
          	return 'Not a Number!';
        }
        return x ;
      	}


//genere couleur aleatoirement
function generateurCouleur(){
	redd=Math.floor(Math.random() * 255); 
	greenn=Math.floor(Math.random() * 255); 
	bluee=Math.floor(Math.random() * 255); 
	return [redd,greenn,bluee];
}

function initialisationGenerale(fuseecompteur){
    c = 299792458;
    G = 6.6742 * Math.pow(10, -11);
    M = Number(document.getElementById("M").value);
    r_phy = Number(document.getElementById("r_phy").value);
    m = G * M / Math.pow(c, 2); 
    rs=2*m;

	for (compteur = 1; compteur <= fuseecompteur; compteur += 1) {
	    listejsonfusees[compteur]=initialisation(compteur);  
	}

}

function lancerDeFusees(fuseecompteur){
    c = 299792458;
    G = 6.6742 * Math.pow(10, -11);
    M = Number(document.getElementById("M").value);
    r_phy = Number(document.getElementById("r_phy").value);
    m = G * M / Math.pow(c, 2); 
    rs=2*m;

	for (compteur = 1; compteur <= fuseecompteur; compteur += 1) {
        trajectoire(compteur,listejsonfusees[compteur]);
	}

}



function supprHtml(){
	var nbrfuseesuppr = sessionStorage.getItem("nombredefusees");
		document.getElementById('tableauconstanteslers').innerHTML = ''; 
		document.getElementById('tableauresultatsimu').innerHTML = ''; 


	if (sessionStorage.getItem("nombredefusees")){
		var nbrfuseesuppr = sessionStorage.getItem("nombredefusees");
	}

	var elementcanvasasuppr = document.getElementById("myCanvas");
	elementcanvasasuppr.parentNode.removeChild(elementcanvasasuppr);
	var canvaswh = document.getElementById("canvaswidthheight").value;
	

	for (countt = 1; countt <= nbrfuseesuppr; countt += 1) {
		var elementrayonasuppr = document.getElementById("rayon"+countt.toString()+"");
		elementrayonasuppr.parentNode.removeChild(elementrayonasuppr);
		var elementvpasuppr = document.getElementById("vitesseur"+countt.toString()+"");
		elementvpasuppr.parentNode.removeChild(elementvpasuppr);
		var elementvrasuppr = document.getElementById("tetaid"+countt.toString()+"");
		elementvrasuppr.parentNode.removeChild(elementvrasuppr);
		var elementvrasuppr = document.getElementById("idphie"+countt.toString()+"");
		elementvrasuppr.parentNode.removeChild(elementvrasuppr);
		var elementcanvasbouleasuppr = document.getElementById("myCanvasBoule"+countt.toString()+"");
		elementcanvasbouleasuppr.parentNode.removeChild(elementcanvasbouleasuppr);

		if(canvaswh=="750"){
			var elementgrapheasuppr = document.getElementById("grsvg_"+countt.toString()+"");
			elementgrapheasuppr.parentNode.removeChild(elementgrapheasuppr);
		}

	}

	var elementcanvas3asuppr = document.getElementById("myCanvas3three");
	elementcanvas3asuppr.parentNode.removeChild(elementcanvas3asuppr);

}


//Fonction htmlDecode écrite par Comrade Programmer#7608, ce qui résout le problème d'affichage. 
function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

function genereHtml(){
	var nbredefuseesgenere = Number(document.getElementById("nombredefusees").value);

	lenbdefusees = nbredefuseesgenere;

	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var span = document.createElement("span");
		span.setAttribute("id","rayon"+countt.toString()+"");
		var divchampsr = document.getElementById('champs_a_remplir');
		divchampsr.appendChild(span);

		if(countt==1){
			var newlabel = document.createElement("Label");
			newlabel.setAttribute("title","Distance initiale du projectile au centre de l'astre");
			newlabel.setAttribute("id","ctreastre");
			newlabel.setAttribute("title","");											  
			newlabel.setAttribute("for","r01");
			newlabel.innerHTML = "r<sub>0</sub> (m) =";
			span.appendChild(newlabel);
		}


		var newinput = document.createElement("Input");
		newinput.setAttribute("id","r0"+countt.toString()+"");
		newinput.setAttribute("value","1e15");
		newinput.setAttribute("align","left");

		newinput.setAttribute("maxlength","10");

		newinput.setAttribute("type","text");

		newinput.setAttribute("size","10");

		newinput.setAttribute("onChange","verifnbr();initialisationGenerale("+nbredefuseesgenere.toString()+")");

		span.appendChild(newinput);
	}


	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var span = document.createElement("span");
		span.setAttribute("id","vitessep"+countt.toString()+"");
		var divchampsr = document.getElementById('champs_a_remplir');


		divchampsr.appendChild(span);
		if(countt==1){
		var newlabel = document.createElement("Label");
		newlabel.setAttribute("id","vitesseurlabel");
		newlabel.setAttribute("title","");
		newlabel.setAttribute("for","v01");
		newlabel.innerHTML = "v<sub>0"+"</sub>(m.s<sup>-1</sup>) =";
		span.appendChild(newlabel);}

		var newinput = document.createElement("Input");
		newinput.setAttribute("id","v0"+countt.toString()+"");
		newinput.setAttribute("value","1e7");

		newinput.setAttribute("maxlength","10");

		newinput.setAttribute("type","text");

		newinput.setAttribute("size","10");

		newinput.setAttribute("onChange","verifnbr();initialisationGenerale("+nbredefuseesgenere.toString()+")");

		span.appendChild(newinput);
	}

	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var span = document.createElement("span");
		span.setAttribute("id","idphie"+countt.toString()+"");
		var divchampsr = document.getElementById('champs_a_remplir');
		divchampsr.appendChild(span);
		if(countt==1){
			var newlabel = document.createElement("Label");
			newlabel.setAttribute("id","philabel");
			newlabel.setAttribute("title","");
			newlabel.setAttribute("for","phi01");
			newlabel.innerHTML = htmlDecode("&phi; ")+" =";
			span.appendChild(newlabel);
		}
		var newinput = document.createElement("Input");
		newinput.setAttribute("id","phi0"+countt.toString()+"");
		newinput.setAttribute("value","0");
		newinput.setAttribute("maxlength","10");
		newinput.setAttribute("type","text");
		newinput.setAttribute("size","10");
		newinput.setAttribute("onChange","verifnbr();initialisationGenerale("+nbredefuseesgenere.toString()+")");
		span.appendChild(newinput);
	}
	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var span = document.createElement("span");
		span.setAttribute("id","tetaid"+countt.toString()+"");
		var divchampsr = document.getElementById('champs_a_remplir');
		divchampsr.appendChild(span);
		if(countt==1){
			var newlabel = document.createElement("Label");
			newlabel.setAttribute("id","tetalabel");
			newlabel.setAttribute("title","");
			newlabel.setAttribute("for","teta1");
			newlabel.innerHTML = htmlDecode("&alpha;")+" =";
			span.appendChild(newlabel);
		}
		var newinput = document.createElement("Input");
		newinput.setAttribute("id","teta"+countt.toString()+"");
		newinput.setAttribute("value","110");
		newinput.setAttribute("maxlength","10");
		newinput.setAttribute("type","text");
		newinput.setAttribute("size","10");
		newinput.setAttribute("onChange","verifnbr();initialisationGenerale("+nbredefuseesgenere.toString()+")");
		span.appendChild(newinput);
	}

		var newRow=document.getElementById('tableauconstanteslers').insertRow();

        var jstring = '<tr id="tgggg1" >'
		for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
			jstring += '<th class="tg-aicv">$L'+countt.toString()+'(m)$</th>';
		}

		for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
			jstring += '<th class="tg-aicv">$E'+countt.toString()+'$</th>';
		}

 
             //pour katex il faux mettre un antislash devant le antislash
		jstring +='<th class="tg-6l4m" id="rayonschwars" title="" >$rs=\\frac{2GM}{c^{2}}(m)$</th>';
		jstring +='<th class="tg-6l4m" id="gravtxt" title="">$grav=\\frac{GM}{R^{2}}\\frac{1}{9.81}(g)$</th>';						
 
        jstring +='</tr>'; 
        newRow.innerHTML = jstring;

		var newRow2=document.getElementById('tableauconstanteslers').insertRow();

        var jstring = '<tr id="tgggg2" >'
		for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
			jstring += '<td class="tg-3ozo" id="L'+countt.toString()+'">0</td>';
		}
		for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
			jstring += '<td class="tg-3ozo" id="E'+countt.toString()+'">0</td>';
		}
		jstring +='<td class="tg-3ozo" id="m">0</td>';
		jstring +='<td class="tg-3ozo" id="g">0</td>';																	
		jstring +='</tr>';

        newRow2.innerHTML = jstring;

	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var newRow=document.getElementById('tableauresultatsimu').insertRow();
		// il faudrait songer a la sécurité ici, 'never trust user input', serait il possible pour un utilisateur de prendre le controle avec ses user input?
		newRow.innerHTML = `<tr id="tg2gga`+countt.toString()+`">
					<th class="tg-aicv">r(m)</th>
					<th id="temps_ecoule`+countt.toString()+`" class="tg-aicv"></th>
					<th id="acceleration`+countt.toString()+`" title="Différence des dérivées seconde de r" class="tg-6l4m"></th>
					<th id="vitesseur`+countt.toString()+`" title="" class="tg-aicv"  >U<SUB>r</SUB>(m.s<sup>-1</sup>) </th>
					<th id="vitesseuphi`+countt.toString()+`" title="" class="tg-aicv"  >U<SUB>&phi;</SUB>(m.s<sup>-1</sup>)</th>
					<th id="temps_obs`+countt.toString()+`" class="tg-aicv"></th>
					<th id="decal_spect`+countt.toString()+`" title="" class="tg-aicv"></th>
					<th id="v_total`+countt.toString()+`" title="" class="tg-aicv"></th>`

		var newRow2=document.getElementById('tableauresultatsimu').insertRow();

		newRow2.innerHTML =       `<tr id="tg2ggb`+countt.toString()+`">
				<td class="tg-3ozo" id="r_par`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="tp`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="ga`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="vr_sc_mas`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="vp_sc_mas`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="to`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="decal`+countt.toString()+`">res</td>
				<td class="tg-3ozo" id="v_tot`+countt.toString()+`">res</td>`
					

	}

	var canvaswidthheight = document.getElementById("canvaswidthheight").value;

	var canvasgenere = document.createElement("canvas");
	canvasgenere.setAttribute("id","myCanvas");
	canvasgenere.setAttribute("width",canvaswidthheight);
	canvasgenere.setAttribute("height",canvaswidthheight);
	canvasgenere.setAttribute("class","canvaslaclasse");
	if(canvaswidthheight=="750"){var wrappergenere = document.getElementById('wrapper');}
	else{var wrappergenere = document.getElementById('wrapperengrand');}
	wrappergenere.appendChild(canvasgenere);

	for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
		var canvasboulegenere = document.createElement("canvas");
		canvasboulegenere.setAttribute("id","myCanvasBoule"+countt.toString()+"");
		canvasboulegenere.setAttribute("width",canvaswidthheight);
		canvasboulegenere.setAttribute("height",canvaswidthheight);		
		canvasboulegenere.setAttribute("class","canvaslaclasse");
		if(canvaswidthheight=="750"){var wrappergenere = document.getElementById('wrapper');}
		else{var wrappergenere = document.getElementById('wrapperengrand');}
		wrappergenere.appendChild(canvasboulegenere);

	}



	var canvas3genere = document.createElement("canvas");
    canvas3genere.setAttribute("id","myCanvas3three");
    canvas3genere.setAttribute("width",canvaswidthheight);
    canvas3genere.setAttribute("height",canvaswidthheight);
    canvas3genere.setAttribute("class","canvaslaclasse");

    if(canvaswidthheight=="750"){var wrappergenere = document.getElementById('wrapper');}
    else{var wrappergenere = document.getElementById('wrapperengrand');}
    wrappergenere.appendChild(canvas3genere);

	if(canvaswidthheight=="750"){
		for (countt = 1; countt <= nbredefuseesgenere; countt += 1) {
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("id", "grsvg_"+countt.toString()+""); 
			document.getElementById("wrapper2").appendChild(svg);
		}
	}

	texteTrajectoireMassiveNonBar(nbredefuseesgenere);
	notationvitesseree2();
	infobulleobservateurdistant();
	textegravetetc();			   
	//pour le bon affichage du katex
	renderMathInElement(document.body, {
		// ...options...
		delimiters:[
			{left:"$",right:'$',display: false},
		]
	});
	 
}




// calcul en temps réel des E, L,...
function initialisation(compteur){
	c = 299792458;
	G = 6.6742 * Math.pow(10, -11);
	M = Number(document.getElementById("M").value);
	r_phy = Number(document.getElementById("r_phy").value);
	m = G * M / Math.pow(c, 2); 
	rs=2*m;

	r0 = Number(document.getElementById("r0"+compteur.toString()).value);
	v0= Number(document.getElementById("v0"+compteur.toString()).value);
	phi0 = Number(document.getElementById("phi0"+compteur.toString()).value); //angle de départ
	teta = Number(document.getElementById("teta"+compteur.toString()).value); // angle de la vitesse
	phi0=(phi0*Math.PI)/180;
	teta=(teta*Math.PI)/180;

	if(r0 > r_phy) { 
		E = Math.sqrt(1 - rs /r0)/Math.sqrt(1-v0**2/c**2);
		vphi=Math.sin(teta)*v0*E/Math.sqrt(1-rs/r0);
		vr=Math.cos(teta)*v0*E;

	} 
	else{ 
		//E = Math.sqrt(Math.pow(beta(r0)/c,2)*(Math.pow(vr,2)/alpha(r0)+Math.pow(vphi,2)+Math.pow(c,2)));
		E=Math.sqrt(beta(r0))/Math.sqrt(1-V*2/(c**2));
		vphi=Math.sin(teta)*v0*E/beta(r0);
		vr=Math.cos(teta)*Math.sqrt(alpha(r0))*v0*E/beta(r0);
		
	}

	

	L = vphi * r0 / c;
	//pour la legende du graph
	if(compteur==1){
		vphiblab =vphi;
		vrblab = vr;
	}
	if (compteur==2){
		vphi2i = vphi;
		vr2i =vr2;
	}

	



	document.getElementById("L"+compteur.toString()).innerHTML = L.toExponential(3);
	document.getElementById("E"+compteur.toString()).innerHTML = E.toExponential(3);
	
	document.getElementById("m").innerHTML = rs.toExponential(3);

	scale_factor = Number(document.getElementById("scalefactor").value);
	mobile = { r0:r0, vphi:vphi, vr:vr, L:L, E:E,phi0:phi0 }; 
	
	mobile["pointsvg"]="pointg"+compteur.toString();
	mobile["graphesvg"]="#grsvg_"+compteur.toString();

	mobile["onestarrete"]=0;
	mobile["peuxonrelancer"]=true;

 /* Calcul de rmax */
	if( (E>0.99999 & E<1.00001) && (L >= 2*rs || L <=-2*rs ) ){ 
		rmax=1.1*r0;  //rmax= 1/(2*rs)*(Math.pow(L,2)+ L*Math.sqrt(Math.pow(L,2)-4*Math.pow(rs,2)));
		//if(rmax<r0) {rmax=2*r0;} 
	} 
	else if (E==1 && L==0) {rmax=2*r0;} 
	else {
		calcul_rmax(L,E,vr,r0,1);  
		if(rmax<r0) {rmax=r0 ;}
	}   

	if(r0 < r_phy) {rmax=1.5*r_phy;}

	mobile["rmax"]=rmax; //mobile.rmax

	mobile["blups"]=0;

	rmaxjson[compteur]=rmax;

	mobilefactor[compteur]=scale_factor;
	r0o2[compteur] = r0;

	mobile["pause"]=true; //mobile.pause
	mobile["debut"]=true; //mobile.debut
  
	couleurs = generateurCouleur();
	mobile["couleur"]="rgb("+couleurs[0]+", "+couleurs[1]+", "+couleurs[2]+")";//mobile.couleur
	mobile["red"]=couleurs[0];
	mobile["green"]=couleurs[1];
	mobile["blue"]=couleurs[2];

  //calcul de grav
  	g=(G*M)/(Math.pow(r_phy,2)*9.81);

	if(r_phy==0){
		document.getElementById("g").innerHTML=" ";
	}
	else{
		document.getElementById("g").innerHTML=g.toExponential(2);
	}

  	return mobile;
}  // fin fonction initialisation




function verifnbr() {//fonction qui affiche un message d'erreur si des valeurs ne sont pas donnée dans l'une des cases
  
	r_phy = document.getElementById("r_phy").value;
	M = document.getElementById("M").value;

	var onebolean=false;
	var twobolean=false;
	var threebolean=false;

	var sddsdsddss = Number(document.getElementById("nombredefusees").value);
	for (countetttt = 1; countetttt <= sddsdsddss; countetttt += 1) {
		var r0verifnbr = Number(document.getElementById("r0"+countetttt.toString()+"").value); 
		var vphiverifnbr = Number(document.getElementById("phi0"+countetttt.toString()+"").value);
		var vrverifnbr = Number(document.getElementById("teta"+countetttt.toString()+"").value);
		if(isNaN(r0verifnbr)){
			onebolean=true;
		}
		if(isNaN(vphiverifnbr)){
			twobolean=true;
		}
		if(isNaN(vrverifnbr)){
			threebolean=true;
		}
	}


	if (onebolean){
		alert ("Veuillez vérifier vos saisie en r0");}

	if (twobolean){
		alert ("Veuillez vérifier vos saisie en phi0");
	}
	if (threebolean){
		alert ("Veuillez vérifier vos saisie en alpha");
	}
	if (isNaN(r_phy)){
		alert ("Veuillez vérifier vos saisie en r physique");
	}
	if (isNaN(M)){
		alert ("Veuillez vérifier vos saisie en M");
																	
	}
  
}
	  

// première étape qui lance la partie calculatoire
function trajectoire(compteur,mobile) {
 	 
	texte = o_recupereJson();
  	if (mobile.pause || mobile.debut){
		r0setcouleur = document.getElementById("r0"+compteur.toString());
		Ycouleur = 0.2126*mobile.red + 0.7152*mobile.green + 0.0722*mobile.blue
		if(Ycouleur<128){r0setcouleur.setAttribute("style","background-color:"+mobile.couleur+";color:white");}
		else{r0setcouleur.setAttribute("style","background-color:"+mobile.couleur+";color:black");}

		document.getElementById("tg2").style.display = "table";
		document.getElementById("indic_calculs").innerHTML = texte.pages_trajectoire.calcul_encours;
		// pour rendre visible le panneau de contrôle pause et vitesse de la simu
		document.getElementById("panneau_mobile").style.visibility='visible';

		//Pour rendre visible le paneau de zoom.
		document.getElementById("panneau_mobile2").style.visibility='visible';
		// pour savoir si on affiche l'information pour les touches claviers ou non
		estUnMobile();

		// permet de griser les cases de saisie pour éviter de changer les valeurs pendant la simulation
		// conseillé car toutes les exceptions ne sont pas gérées
		document.getElementById('M').disabled = true;
		document.getElementById('r_phy').disabled = true;
		document.getElementById('nombredefusees').disabled = true;

		var blyo = Number(document.getElementById("nombredefusees").value);

		for (countt = 1; countt <= blyo; countt += 1) {
			document.getElementById('r0'+countt.toString()+'').disabled = true;
			document.getElementById('phi0'+countt.toString()+'').disabled = true;
			document.getElementById('v0'+countt.toString()+'').disabled = true;
			document.getElementById('teta'+countt.toString()+'').disabled = true;
		}


		//empecher de passer d'observateur a mobile ou inversement pendant la simulation
		document.getElementById('r3').disabled = true;
		document.getElementById('r4').disabled = true;

		// permet de controler si il y a un tracé ou non pour l'enregistrement
		document.getElementById('trace_present').value="1";

		mobile.pause = false;
		mobile.debut = false;
	
		//--------------------------------------------------------------------------------------//
		//Cette Partie traite le calcul de la trajectoire de la particule, dans son référentiel propre//
	
		mobile["phi"]=mobile.phi0;//mobile.phi
		mobile["phi_obs"]=mobile.phi0;//mobile.phi_obs

		temps_chute_libre = Math.PI * mobile.r0 * Math.sqrt(mobile.r0 / (2 * G * M)) / 2;
		mobile["temps_chute_libre"]=temps_chute_libre;//mobile.temps_chute_libre

		A_init = mobile.vr;
		r_init = mobile.r0;
		
		var nbredefusees = Number(document.getElementById("nombredefusees").value);
		if (nbredefusees==1) {
			if(ifUneFois2){
				maximum=r0o2[1];
				cle = 1;
				ifUneFois2=false;
			}
		}
	
	
	if (nbredefusees>=2) {
			if(ifUneFois){			
				maximum=0;
				cle=0;
				for (key = 1; key <= nbredefusees; key += 1) {
					if(r0o2[key]>=maximum){
						maximum=r0o2[key];
						cle=key;
					}
				}
				//console.log("compteur",compteur);
				for (key = 1; key <= nbredefusees; key += 1) {
					if(key!=cle){
						mobilefactor[key]=mobilefactor[cle]*(r0o2[key]/r0o2[cle]);
					}
				}
				ifUneFois=false;
			}
		}

		A_part = A_init;
		mobile["A_part"]=A_part; //mobile.A_part
		r_part = r_init;
		mobile["r_part"]=r_part; //mobile.r_part



		if(mobile.r0 > r_phy){	
			r_init_obs = mobile.r0; 
			r_part_obs=r_init_obs;
			mobile["r_part_obs"]=r_part_obs; //mobile.r_part_obs
			A_init_obs = mobile.vr*(1-rs/mobile.r0)/mobile.E; 
			A_part_obs=A_init_obs; 
			mobile["A_part_obs"]=A_part_obs; //mobile.A_part_obs
			vrobs=A_init_obs; 
			vphiobs=mobile.vphi*(1-rs/mobile.r0)/mobile.E;
		}
		else{	
			A_init_obs = mobile.vr*Math.pow(beta(mobile.r0),2)/mobile.E; 
			A_part_obs=A_init_obs; 
			mobile["A_part_obs"]=A_part_obs; //mobile.A_part_obs
			vrobs=A_init_obs; 
			vphiobs= mobile.vphi*Math.pow(beta(mobile.r0),2)/mobile.E;						
			r_init_obs = mobile.r0; 
			r_part_obs=r_init_obs;
			mobile["r_part_obs"]=r_part_obs; //mobile.r_part_obs	
		}
		data1 = [];
		data2 = [];

		temps_particule = 0;
		mobile["temps_particule"]=temps_particule;
		temps_observateur = 0;
		mobile["temps_observateur"]=temps_observateur;//mobile.temps_observateur


		// permet de gérer les touches du clavier pour certaines actions
		clavierEvenement();
		
		
		dtau=mobile.r0/(Math.sqrt(vrobs*vrobs+vphiobs*vphiobs)+1e-20)/1000;
		
		mobile["dtau"]=dtau;//mobile.dtau
		//ceci devrait etre la meme chose que si l'on est clique 3 x sur moinsvitesse mais il semblerait que ca ne le soit pas
		//peut etre vaudrait il mieux document.click 3x sur moinsvitesse    
		mobile.dtau /= 8;     

		if(mobile.dtau>mobile.temps_chute_libre/500.){mobile.dtau= mobile.temps_chute_libre/500.;} 
	

		// Ici, les positions de départ de la particule, dans son référentiel et dans celui de l'observateur//
		x1part = mobilefactor[compteur] * mobile.r0 * Math.cos(mobile.phi) / mobile.rmax;
		y1part = mobilefactor[compteur] * mobile.r0 * Math.sin(mobile.phi) / mobile.rmax;
		x1obs = mobilefactor[compteur] * mobile.r0 * Math.cos(mobile.phi_obs) / mobile.rmax;
		y1obs = mobilefactor[compteur] * mobile.r0 * Math.sin(mobile.phi_obs) / mobile.rmax;

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

		mobile["canvas22"]= document.getElementById("myCanvasBoule"+compteur.toString());


		mobile["context22"]=mobile["canvas22"].getContext("2d");

		majFondFixe();
		majFondFixe44(mobile);
		diametre_particule = DIAMETRE_PART;
		
		// La position de départ est le milieu de la fenêtre d'affichage auquel on ajoute la position initiale de la particule.
		posX1 = (canvas.width / 2.0) + x1part;
		posY1 = (canvas.height / 2.0) + y1part;
		mobile["positionspatio"]={posX1:posX1, posY1:posY1}//mobile.positionspatio.posX1

		posX2 = (canvas.width / 2.0) + x1obs;
		posY2 = (canvas.height / 2.0) + y1obs;
		mobile["position"]={posX2:posX2, posY2:posY2} //mobile.position.posX2

		posX3 = (canvas.width / 2.0);
		posY3 = (canvas.height / 2.0);

		// Ici on va créer l'animation avec setinerval, laquelle prend comme paramètres la fonction animate() définie ci-après et qui calcule les coordonnées de la particule à chaque instant.

		// les dtau1 et 2 permettent de contenir le dtau pour obtenir une simulation hors controle
		// à voir, l'utilisation du settimeout à la place de setinterval. Ca permettrait de remplacer le 10/6 par une variable dt_simu pouvant être modifiée à la place du pas dtau utilisé dans rungekutta
		// lorsqu'on est dans le setinterval, il est impossible ce modifier ce 10/6 par une variable qu'on pourrait incrémenter. Il utilise la valeur initiale avant l'entrée dans setinterval
	
		mobile.myInterval = setInterval(animate.bind(null,compteur,mobile,mobilefactor), 10 / 6);

		Dtau1 = 1e8 * mobile.dtau ;
		mobile["Dtau1"]=Dtau1;//mobile.Dtau1
		Dtau2 = mobile.dtau / 1e8;
		mobile["Dtau2"]=Dtau2;//mobile.Dtau2
		document.getElementById('bouton_pause').addEventListener('click', function() {
			pausee(compteur,mobile,mobilefactor);
		}, false);


	//Gestion des bouttons accélerer et decélerer
		document.getElementById('plusvite').addEventListener('click', function() {
		if (mobile.dtau >= mobile.Dtau1) {
			mobile.dtau = mobile.Dtau1;
		} else {
			mobile.dtau += mobile.dtau;
			clicks += 1;
		}
		}, false);

		document.getElementById('moinsvite').addEventListener('click', function() {
		if (mobile.dtau <= mobile.Dtau2) {
			mobile.dtau = mobile.Dtau2;
		} else {
			mobile.dtau /= 2;
			clicks-=1; }
		}, false);

		document.getElementById('enregistrer2').addEventListener('click', function() {
			element2z=document.getElementById('traject_type2');
			if (element2z.value != "mobile"){
				context3.beginPath();
				context3.fillStyle = COULEUR_BLEU;
				context3.arc(mobile.position.posX2, mobile.position.posY2 , 5, 0, Math.PI * 2);
				context3.lineWidth = "1";
				context3.fill();
			}
			else{
				context3.beginPath();
				context3.fillStyle = COULEUR_BLEU;
				context3.arc(mobile.positionspatio.posX1, mobile.positionspatio.posY1 , 5, 0, Math.PI * 2);
				context3.lineWidth = "1";
				context3.fill();
			}
		}, false);

		
		// Gestion des bouttons Zoom voir boutton.js
		document.getElementById('moinszoom').addEventListener('click', function() {
			var retour=bouttons.zoom(false,mobile,canvas,mobilefactor,compteur); 
			mobile=retour[0];
			mobilefactor=retour[1]; 
			majFondFixe44(mobile);      
			rafraichir2(context,mobilefactor,rmaxjson,maximum,compteur);
			
		

		}, false);

		document.getElementById('pluszoom').addEventListener('click', function() {       
			var retour=bouttons.zoom(true,mobile,canvas,mobilefactor,compteur); 
			mobile=retour[0];
			mobilefactor=retour[1];
			majFondFixe44(mobile); 
			rafraichir2(context,mobilefactor,rmaxjson,maximum,compteur);
		}, false);

		document.getElementById('initialiser').addEventListener('click', function() {
			var retour=bouttons.initialiser(nbredefusees,mobilefactor,mobile,compteur,canvas); 
			mobile=retour[0];
			mobilefactor=retour[1];
			majFondFixe44(mobile); 
			rafraichir2(context,mobilefactor,rmaxjson,maximum,compteur);
		}, false);

		///Fin bouttons lier au zoom
		
		document.getElementById("bloc_resultats").style.display= "block";

		//Pour ouvrir le pop up qui nous si on veut afficher le graphe de potentiel ou pas
		function CentrerPopPotentiel() {
		document.getElementById("bloc_resultats").style.display= "block";
			for (countt = 1; countt <= nbredefusees; countt += 1) {
				var node = document.getElementById("grsvg_"+countt.toString()+"");
				console.log("Le film Hackers de 1995 est vraiment bien",countt.toString());
				if(node){
					if (node.parentNode){
						node.parentNode.removeChild(node);
					}
				}
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
		creation_blocs(context,mobilefactor,rmaxjson,maximum,compteur);
		dr = mobile.rmax / 1000;
		mobile["dr"]=dr;//mobile.dr;

		element2=document.getElementById('traject_type2');	

		data1=[];
		data2=[];


		if(mobile.rmax < r_phy) {borne=r_phy;}else{borne=mobile.rmax;}
		mobile["borne"]=borne;
		
		
		if (element2.value != "mobile"){	 
			for (r = rs/2; r < mobile.borne; r += mobile.dr) {
				V = Vr_obs(r,mobile.E,mobile.L);
				data1.push({date: r,close: V});
			}
			V = Vr_obs(mobile.r0,mobile.E,mobile.L);
			data2.push({date: mobile.r0,close: V});
			mobile.point = graphique_creation_pot(0,data1,data2,compteur,mobile);
		}
		else{
			for (r =rs/2 ; r < mobile.borne; r += mobile.dr) {
				V = Vr_mob(r,mobile.E,mobile.L);
				data1.push({date: r,close: V});
			}
			V = Vr_mob(mobile.r0,mobile.E,mobile.L);
			data2.push({date: mobile.r0,close: V}); 
			mobile.point = graphique_creation_pot(0,data1,data2,compteur,mobile);
		}


		window.addEventListener('resize', function() {
			//console.log(compteur,"on a resize hay");
			$('#grsvg_'+compteur.toString()).empty();
			data1=[];
			data2=[];

			if (element2.value != "mobile"){	 
				for (r = rs/2; r < mobile.borne; r += mobile.dr) {
					V = Vr_obs(r,mobile.E,mobile.L);
					data1.push({date: r,close: V});
				}	
				V = Vr_obs(mobile.r0,mobile.E,mobile.L);
				data2.push({date: mobile.r0,close: V});
				mobile.point = graphique_creation_pot(0,data1,data2,compteur,mobile);
			
			}
			else{	
				for (r =rs/2 ; r < mobile.borne; r += mobile.dr) {
					V = Vr_mob(r,mobile.E,mobile.L);
					data1.push({date: r,close: V});
				}
				V = Vr_mob(mobile.r0,mobile.E,mobile.L);
				data2.push({date: mobile.r0,close: V}); 
				mobile.point = graphique_creation_pot(0,data1,data2,compteur,mobile);
			}

		}, false);
		} 
		else {
			mobile.myInterval = setInterval(animate.bind(null,compteur,mobile,mobilefactor), 10 / 6);
		
  	}  // fin du if(pause....
	document.getElementById('start').addEventListener('click', function() {
		rafraichir();
  
  	}, false);
 	 document.getElementById("start").innerHTML = texte.pages_trajectoire.bouton_stop;
}  // fin fonction trajectoire


// tracé de la particule
function animate(compteur,mobile,mobilefactor) {
  // on vérifie le type de trajectoire sélectionné
  estUnMobile();
  element = document.getElementById('traject_type');
  choixTrajectoire(compteur,context,mobile,mobilefactor,rmaxjson,maximum);
   
   element2=document.getElementById('traject_type2');
   
  if (mobile.r0 != 0.0) {
 



 
if(element2.value == "mobile"){   
	
	if(mobile.r_part > r_phy) {
		val = rungekutta_externe_massif(mobile.dtau, mobile.r_part, mobile.A_part,mobile.L);
		mobile.r_part = val[0];
		mobile.A_part = val[1];
		varphi = c * mobile.L * mobile.dtau / Math.pow(mobile.r_part, 2);
		mobile.phi = mobile.phi + varphi;
		vr_1=mobile.A_part;
		vp_1=c*mobile.L/mobile.r_part; 
	
    } 
	else {		
		val = rungekutta_interne_massif(mobile.dtau, mobile.r_part, mobile.A_part,mobile.E,mobile.L);
		mobile.r_part = val[0];
		mobile.A_part = val[1];
		varphi = c * mobile.L * mobile.dtau / Math.pow(mobile.r_part, 2);
		if(mobile.r_part <= r_phy*5e-3 && varphi <= 1e-3) { 
			if(mobile.posinterm > 0) {mobile.phi=Math.PI;mobile.A_part=-mobile.A_part;}
			else{mobile.phi=0; mobile.A_part=-mobile.A_part; }
		} 
		else { mobile.phi = mobile.phi + varphi;}
		vr_1=mobile.A_part;
		vp_1=c*mobile.L /mobile.r_part;  
	}
}
else{      // observateur

	if(mobile.r_part_obs > r_phy) {
		
		val = rungekutta_externe_massif_obs(mobile.dtau, mobile.r_part_obs, mobile.A_part_obs,mobile.E,mobile.L);
		mobile.r_part_obs = val[0];
		mobile.A_part_obs = val[1];

		varphi_obs = c * mobile.L * mobile.dtau*(1-rs/mobile.r_part_obs) / Math.pow(mobile.r_part_obs, 2)/mobile.E; 
		mobile.phi_obs=mobile.phi_obs+varphi_obs;

		vr_1_obs=mobile.A_part_obs;
		vp_1_obs= c*mobile.L*(1-rs/mobile.r_part_obs)/mobile.r_part_obs/mobile.E; 
	
    } 
	else {
			
		val = rungekutta_interne_massif_obs(mobile.dtau, mobile.r_part_obs, mobile.A_part_obs,mobile.E,mobile.L);
		mobile.r_part_obs = val[0];
		mobile.A_part_obs = val[1];
		
		varphi_obs = c * mobile.L * mobile.dtau*Math.pow(beta(mobile.r_part_obs),2) / Math.pow(mobile.r_part_obs, 2)/mobile.E; 
	
		if(mobile.r_part_obs <= r_phy*5e-3 && varphi_obs <= 1e-3) { 
			if(mobile.posintero > 0) { 
				mobile.phi_obs=Math.PI;mobile.A_part_obs=-mobile.A_part_obs;
			}
			else{mobile.phi_obs=0; mobile.A_part_obs=-mobile.A_part_obs;}
		}
		else{mobile.phi_obs= mobile.phi_obs+varphi_obs;} 
		vr_1_obs=mobile.A_part_obs;
		vp_1_obs=c*mobile.L*(1-rs/mobile.r_part_obs)/mobile.r_part_obs/mobile.E;  
	}
}	
	
	
	mobile.posinterm= mobilefactor[compteur] * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax);
	mobile.posintero= mobilefactor[compteur] * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax);
		
	mobile.positionspatio.posX1 = mobilefactor[compteur] * mobile.r_part * (Math.cos(mobile.phi) / mobile.rmax) + (canvas.width / 2.);
    mobile.positionspatio.posY1 = mobilefactor[compteur] * mobile.r_part * (Math.sin(mobile.phi) / mobile.rmax) + (canvas.height / 2.);
	mobile.position.posX2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.cos(mobile.phi_obs) / mobile.rmax) + (canvas.width / 2.);
    mobile.position.posY2 = mobilefactor[compteur] * mobile.r_part_obs * (Math.sin(mobile.phi_obs) / mobile.rmax) + (canvas.height / 2.);	
							 
    if (element2.value != "mobile"){
      	if (mobile.r_part >= 0){
			context.beginPath();
			context.fillStyle = mobile.couleur;
			context.rect(mobile.position.posX2, mobile.position.posY2, 1, 1);
			context.lineWidth = "1";
			context.fill();

			majFondFixe44(mobile);
			mobile["context22"].beginPath();
			mobile["context22"].fillStyle = COULEUR_BLEU;
			mobile["context22"].arc(mobile.position.posX2, mobile.position.posY2 , 5, 0, Math.PI * 2);
			mobile["context22"].lineWidth = "1";
			mobile["context22"].fill();

   		}
    }
	else{
		context.beginPath();
		context.fillStyle = mobile.couleur;
		context.rect(mobile.positionspatio.posX1, mobile.positionspatio.posY1, 1, 1);
		context.lineWidth = "1";
		context.fill();
		majFondFixe44(mobile);
		mobile["context22"].beginPath();
		mobile["context22"].fillStyle = COULEUR_BLEU;
		mobile["context22"].arc(mobile.positionspatio.posX1, mobile.positionspatio.posY1 , 5, 0, Math.PI * 2);
		mobile["context22"].lineWidth = "1";
		mobile["context22"].fill();
    }


	if (element2.value != "mobile"){	
		V = Vr_obs(mobile.r_part_obs,mobile.E,mobile.L);
		data2 = [];
		data2.push({date: mobile.r_part_obs, close: V });
		if(mobile.point !== undefined){
			update_graphique_2(mobile.point,data2,mobile);
		}
	}
	else{
		V = Vr_mob(mobile.r_part,mobile.E,mobile.L);
		data2 = [];
		data2.push({date: mobile.r_part, close: V });
		if(mobile.point !== undefined){update_graphique_2(mobile.point,data2,mobile);}			
	}									
    if(mobile.r_part<0){ mobile.r_part=0; }
     
    // gradient d'accélération
		if (element2.value == "mobile"){
		    if(mobile.r_part > r_phy) {
				gm = derivee_seconde_externe_massif(mobile.r_part,mobile.L);
				gmp = derivee_seconde_externe_massif(mobile.r_part+1,mobile.L);
			}
			else{ 
				gm = derivee_seconde_interne_massif(mobile.r_part,mobile.E,mobile.L); 
				gmp = derivee_seconde_interne_massif(mobile.r_part+1,mobile.E,mobile.L);
			}
			fm = Math.abs(gm - gmp); 
		}
		else{
			if(mobile.r_part_obs > r_phy) {
				gm = derivee_seconde_externe_massif_obs(mobile.r_part_obs,mobile.E,mobile.L);
				gmp = derivee_seconde_externe_massif_obs(mobile.r_part_obs+1,mobile.E,mobile.L);
			}
			else{ gm = derivee_seconde_interne_massif_obs(mobile.r_part_obs,mobile.E,mobile.L); 
				gmp = derivee_seconde_interne_massif_obs(mobile.r_part_obs+1,mobile.E,mobile.L); 
			}
			fm = Math.abs(gm - gmp); 		
		}



    //decalage spectrale

	if (element2.value != "mobile"){
		if(mobile.r_part_obs >= r_phy) {
			z_obs=Math.pow(1-((vr_1_obs*vr_1_obs + vp_1_obs*vp_1_obs)/(c*c)),(-1/2))*Math.pow(1-rs/mobile.r_part_obs,-(1/2)) -1;
			document.getElementById("decal"+compteur.toString()).innerHTML=z_obs.toExponential(3);
		} 
		else {
			z_obs=Math.pow(1-((vr_1_obs*vr_1_obs + vp_1_obs*vp_1_obs)/(c*c)),(-1/2))/beta(mobile.r_part_obs) -1;
			document.getElementById("decal"+compteur.toString()).innerHTML=z_obs.toExponential(3);
		}
	}
	else{document.getElementById("decal"+compteur.toString()).innerHTML="";}


//  Les différents "temps" et autres valeurs à afficher

	if (element2.value != "mobile"){
		if(mobile.r_part_obs >= r_phy){
			mobile.temps_observateur+=mobile.dtau;
			mobile.temps_particule += mobile.dtau*(1-rs/mobile.r_part_obs)/mobile.E;
			document.getElementById("tp"+compteur.toString()).innerHTML = mobile.temps_particule.toExponential(3);
			document.getElementById("ga"+compteur.toString()).innerHTML = fm.toExponential(3);
			document.getElementById("r_par"+compteur.toString()).innerHTML = mobile.r_part_obs.toExponential(3); 
			document.getElementById("vr_sc_mas"+compteur.toString()).innerHTML = vr_1_obs.toExponential(3);
    		document.getElementById("vp_sc_mas"+compteur.toString()).innerHTML = vp_1_obs.toExponential(3); 
			document.getElementById("to"+compteur.toString()).innerHTML = mobile.temps_observateur.toExponential(3);
			vtotal=calculs.MSC_Ex_vitess(mobile.E,mobile.L,mobile.r_part_obs,rs,false); //voir fonctions.js
		    document.getElementById("v_tot"+compteur.toString()).innerHTML = vtotal.toExponential(3); 
		}
		else{
			mobile.temps_observateur+=mobile.dtau;
			mobile.temps_particule += mobile.dtau*Math.pow(beta(mobile.r_part_obs),2)/mobile.E;
			document.getElementById("tp"+compteur.toString()).innerHTML = mobile.temps_particule.toExponential(3);
			document.getElementById("ga"+compteur.toString()).innerHTML = fm.toExponential(3);
			document.getElementById("r_par"+compteur.toString()).innerHTML = mobile.r_part_obs.toExponential(3);
			document.getElementById("vr_sc_mas"+compteur.toString()).innerHTML = vr_1_obs.toExponential(3);
    		document.getElementById("vp_sc_mas"+compteur.toString()).innerHTML = vp_1_obs.toExponential(3); 
			document.getElementById("to"+compteur.toString()).innerHTML = mobile.temps_observateur.toExponential(3);
			vtotal=calculs.MSC_In_vitess(mobile.E,mobile.L,mobile.r_part_obs,rs,r_phy,false); //voir fonctions.js
		    document.getElementById("v_tot"+compteur.toString()).innerHTML = vtotal.toExponential(3);
		}	
	}
	else{
		if (mobile.r_part>= r_phy){
			mobile.temps_particule+=mobile.dtau;
			mobile.temps_observateur+=mobile.dtau*mobile.E/(1-rs/mobile.r_part);
			document.getElementById("tp"+compteur.toString()).innerHTML = mobile.temps_particule.toExponential(3); 
			document.getElementById("ga"+compteur.toString()).innerHTML = fm.toExponential(3);
			document.getElementById("r_par"+compteur.toString()).innerHTML = mobile.r_part.toExponential(3);
			document.getElementById("vr_sc_mas"+compteur.toString()).innerHTML = vr_1.toExponential(3);
			document.getElementById("vp_sc_mas"+compteur.toString()).innerHTML = vp_1.toExponential(3);
			document.getElementById("to"+compteur.toString()).innerHTML = mobile.temps_observateur.toExponential(3);
			vtotal=calculs.MSC_Ex_vitess(mobile.E,mobile.L,mobile.r_part,rs,vr_1,true); //voir fonctions.js
		    document.getElementById("v_tot"+compteur.toString()).innerHTML = vtotal.toExponential(3); 				
		}
		else{
			mobile.temps_particule+=mobile.dtau;
			mobile.temps_observateur+=mobile.dtau*mobile.E/Math.pow(beta(mobile.r_part),2);
			document.getElementById("tp"+compteur.toString()).innerHTML = mobile.temps_particule.toExponential(3); 
			document.getElementById("ga"+compteur.toString()).innerHTML = fm.toExponential(3);
			document.getElementById("r_par"+compteur.toString()).innerHTML = mobile.r_part.toExponential(3);
			document.getElementById("vr_sc_mas"+compteur.toString()).innerHTML = vr_1.toExponential(3);
			document.getElementById("vp_sc_mas"+compteur.toString()).innerHTML = vp_1.toExponential(3);
			document.getElementById("to"+compteur.toString()).innerHTML = mobile.temps_observateur.toExponential(3);
			vtotal=calculs.MSC_In_vitess(mobile.E,mobile.L,mobile.r_part,rs,r_phy,vr_1,false); //voir fonctions.js
		    document.getElementById("v_tot"+compteur.toString()).innerHTML = vtotal.toExponential(3);			
		}
	}



 
//  Gestion de la diode gradient accélération


	if (element2.value == "mobile"){							 
		if (Number(fm) <= 1) {
			document.getElementById('DivClignotante'+compteur.toString()).innerHTML = " <img src='./Images/diodever.gif' height='14px' />";
			document.getElementById('DivClignotante'+compteur.toString()).style.color = "green";
		} 
		else if (1 < Number(fm) && Number(fm) < 7) {
			document.getElementById('DivClignotante'+compteur.toString()).innerHTML = " <img src='./Images/diodejaune.gif' height='14px' />";
			document.getElementById('DivClignotante'+compteur.toString()).style.color = "yellow";
		} 
		else if (Number(fm) >= 7) {
			document.getElementById('DivClignotante'+compteur.toString()).innerHTML = " <img src='./Images/dioderouge.gif' height='14px' />";
			document.getElementById('DivClignotante'+compteur.toString()).style.color = "red";
		} 
		else {
			document.getElementById('DivClignotante'+compteur.toString()).innerHTML = texte.pages_trajectoire.erreur;
    }  
	}

  }   // fin r0 #0

}  //fin fonction animate

// Expression du potentiel divisée par c^2

function Vr_mob(r,E,L) {
	if(r > r_phy) { return potentiel_externe_massif(r,L);}
	else{ return potentiel_interne_massif(r,E,L);}
}

function Vr_obs(r,E,L) {
	if(r > r_phy) { return Math.pow(E,2)-( 1-potentiel_externe_massif(r,L)/Math.pow(E,2) )*Math.pow(1-rs/r,2);}
	else{ return Math.pow(E,2)- Math.pow(beta(r),4)*( 1-potentiel_interne_massif(r,E,L)/Math.pow(E,2) );} 
}										   

function potentiel_interne_massif(r,E,L) {
	return Math.pow(E,2) - alpha(r)* (Math.pow(E/beta(r),2)- Math.pow(L / r, 2)-1);
}

function potentiel_externe_massif(r,L) {
	return (1 - rs / r) * (1 + Math.pow(L / r, 2));
}

function rungekutta_externe_massif(h, r, A, L) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_externe_massif(r,L);
	k[1] = derivee_seconde_externe_massif(r + 0.5 * h * A,L);
	k[2] = derivee_seconde_externe_massif(r + 0.5 * h * A + 0.25 * h * h * k[0],L);
	k[3] = derivee_seconde_externe_massif(r + h * A + 0.5 * h * h * k[1],L);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}


function rungekutta_interne_massif(h, r, A ,E,L) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_interne_massif(r,E,L);
	k[1] = derivee_seconde_interne_massif(r + 0.5 * h * A,E,L);
	k[2] = derivee_seconde_interne_massif(r + 0.5 * h * A + 0.25 * h * h * k[0],E,L);
	k[3] = derivee_seconde_interne_massif(r + h * A + 0.5 * h * h * k[1],E,L);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}

function rungekutta_externe_massif_obs(h, r, A ,E,L) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_externe_massif_obs(r,E,L);
	k[1] = derivee_seconde_externe_massif_obs(r + 0.5 * h * A,E,L);
	k[2] = derivee_seconde_externe_massif_obs(r + 0.5 * h * A + 0.25 * h * h * k[0],E,L);
	k[3] = derivee_seconde_externe_massif_obs(r + h * A + 0.5 * h * h * k[1],E,L);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}

function rungekutta_interne_massif_obs(h, r, A,E,L) {
	k = [0, 0, 0, 0];
	k[0] = derivee_seconde_interne_massif_obs(r,E,L);
	k[1] = derivee_seconde_interne_massif_obs(r + 0.5 * h * A,E,L);
	k[2] = derivee_seconde_interne_massif_obs(r + 0.5 * h * A + 0.25 * h * h * k[0],E,L);
	k[3] = derivee_seconde_interne_massif_obs(r + h * A + 0.5 * h * h * k[1],E,L);
	r = r + h * A + (1 / 6) * h * h * (k[0] + k[1] + k[2]);
	A = A + (h / 6) * (k[0] + 2 * (k[1] + k[2]) + k[3]);
	return [r, A];
}

function alpha(r){
	return 1-(Math.pow(r, 2)*rs) / Math.pow(r_phy, 3);
}

function beta(r){
	return 1.5 * Math.sqrt(1-(rs/r_phy)) - 0.5 *Math.sqrt(1-(Math.pow(r, 2)*rs)/Math.pow(r_phy, 3));
}

// fonctions utilisées pour Runge Kutta

function derivee_seconde_interne_massif(r,E,L) {  AA=Math.pow(c, 2)*r*rs/Math.pow(r_phy, 3);
	return    AA - AA*Math.pow(E,2) * 1.5 *Math.sqrt(1-rs/r_phy)/Math.pow(beta(r), 3) + Math.pow(c*L, 2)/Math.pow(r, 3) ;	
}

function derivee_seconde_externe_massif(r,L) {
	return Math.pow(c, 2)/(2*Math.pow(r, 4)) *  (-rs*Math.pow(r,2)+Math.pow(L, 2)*(2*r-3*rs));
}

function derivee_seconde_interne_massif_obs(r,E,L) {
	return -Math.pow(c, 2)*r*rs/Math.pow(E,2)/ Math.pow(r_phy, 3) * (Math.pow(E*beta(r),2)- Math.pow(L/r, 2)*Math.pow(beta(r),4) - Math.pow(beta(r),4))
   +  0.5*Math.pow(c, 2)* alpha(r)/Math.pow(E,2) * ( 2* Math.pow(L, 2)*Math.pow(beta(r),4)/Math.pow(r, 3)- Math.pow(E,2)*r*rs*beta(r)/(Math.sqrt(alpha(r))*Math.pow(r_phy, 3)))
	+Math.pow(c, 2)*Math.sqrt(alpha(r))/Math.pow(E,2)/ Math.pow(r_phy, 3)*(Math.pow(E,2)*beta(r)- Math.pow(L/r, 2)*Math.pow(beta(r),3) - Math.pow(beta(r),3))*r*rs;
}
 
function derivee_seconde_externe_massif_obs(r,E,L) {
	return   c*c*(r-rs)*(2*E*E*r*r*r*rs + 2*L*L*r*r - 7*L*L*r*rs 
   + 5*L*L*rs*rs - 3*r*r*r*rs + 3*r*r*rs*rs)/(2*Math.pow(r,6)*E*E);
}

function calcul_rmax(L,E,vr,r0,rmax1ou2){
  // Vr different de 0
  //JPC 24 juin 2020 a commenter cette ligne et les autres avec JPC marque rmax = eq3d(L, m, E);
	r1 = (L * (L - Math.sqrt(Math.pow(L, 2) - 12 * Math.pow(m, 2))) / (2 * m));
	r2 = (L * (L + Math.sqrt(Math.pow(L, 2) - 16 * Math.pow(m, 2))) / (4 * m));
	ra = 2 * m * Math.pow(L, 2);
	rb = ((2 * m / r0) - 1) * Math.pow(L, 2);
	X0 = 1 / r0;
	rc = 2 * m - Math.pow(L, 2) * X0 + 2 * m * Math.pow(L * X0, 2);
	DELTA = Math.pow(rb, 2) - 4 * ra * rc;
	r3 = (-rb - Math.sqrt(DELTA)) / (2*ra);
	// la particule tombe au centre
	if (L < 2 * Math.sqrt(3) * m) {
		rmax = r0;
	}
	else if ( (L <= 4*m) && (L > 2*Math.sqrt(3)*m) ) {
      // dans ce cas, r varie entre 2 valeurs r0 et r3 
      //qu'est ce que Vr fonction n'est meme pas defini
		if ( (Vr(r0) <= Vr(r1)) && (r0 > r1) ) {
			if (r3 > r0) {
				rmax = r3;
			}
			else if (r3 < r0) {
				rmax = r0;
			}
		}
      // comprend les cas r0<=r1 et V(r0)>V(r1) où la particule tombe au centre
		else {
			rmax = r0;
		}
    }
    // dans ce cas r varie entre les 2 valeurs r0 et r3
    else if (L > 4 * m) {
		if (r0 > r2) {
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
  //JPC}
}

// Fonction bouton pause
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

// permet de gérer les touches du clavier pour certaines actions
function clavierEvenement() {
	$(document).keyup(function(event) { // the event variable contains the key pressed
    if (event.which == 65) { // touche a
		$('#r1').click();
    }
    if (event.which == 90) { // touche z
		$('#r2').click();
    }
    if (event.which == 69) { // touche e
		$('#rebondd').click();
    }
    if (event.which == 81) { // touche q
    	$('#start').click();
    }
    if (event.which == 83) { // touche s
    	$('#clear').click();
    }
    if (event.which == 68) { // touche d
    	$('#boutton_enregis').click();
    }
    if (event.which == 70) { // touche f
    	$('#boutton_recup').click();
    }
    if (event.which == 87) { // touche w
    	$('#moinsvite').click();
    }
    if (event.which == 88) { // touche x
    	$('#pau').click();
    }
    if (event.which == 67) { // touche c
    	$('#plusvi').click();
    }
  });
}

function rafraichir2(context,mobilefactor,rmaxjson,r0ou2,compteur) {
	majFondFixe();
	creation_blocs(context,mobilefactor,rmaxjson,r0ou2,compteur);
}

function rafraichir() {
	window.location.reload();
	element2.value="observateur";
}

function siTrajectoireSimple() {
	if (element.value == 'simple') {
		majFondFixe();
		// Tracé du Rayon de Schwarzchild,...
		creation_blocs(context);
		diametre_particule = DIAMETRE_PART*2;
	}
}

function enregistrer(){
  // ces 2 fonctions sont issues des biblios saveSvgAsPng.js et canvas-to-image.js
  
		if(document.getElementById('trace_present').value=="1"){
		canvas3 = document.getElementById("myCanvas3three");
		context3 = canvas3.getContext("2d");
		context3.drawImage(canvas, 0,0);
		document.getElementById("enregistrer2").click();
		canvasToImage(canvas3, {
			name: 'Trajectoire_massive_Schwar',
			type: 'png'
		});
	majFondFixe3();

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

function choixTrajectoire(compteur,context,mobile,mobilefactor,rmaxjson,r0ou2) {
	if (element.value == 'simple') {
		majFondFixe();
		// Tracé du Rayon de Schwarzchild,...
		creation_blocs(context,mobilefactor,rmaxjson,r0ou2,compteur);
		diametre_particule = DIAMETRE_PART*2;
	}
	else if (element.value == 'complete') {
		diametre_particule = DIAMETRE_PART;
	}

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
	alert(texte.page_trajectoire_massive.commandes);
}

function majFondFixe(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	// Ajout d'un fond blanc pour l'exportation
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = "15pt bold";
	context.fillStyle = "black";
	context.fillText(texte.page_trajectoire_massive.non_baryonique,5,40);
	context.font = "13pt bold";
	context.fillText(texte.pages_trajectoire.entrees,5,70);
	context.font = "11pt normal";
	context.fillText("M = "+M.toExponential(3)+" kg",5,90);
	context.fillText("r\u209A\u2095\u1D67 = "+r_phy.toExponential(3)+" m",5,110);

	if(document.getElementById('traject_type2').value=="observateur"){
		context.fillText(texte.pages_trajectoire.observateur,5,130);
	}
	else { context.fillText(texte.pages_trajectoire.mobile,5,130); }

	context.fillText("mobile1:",5,150);
	context.fillText("r\u2080 = "+(r0o2[1]).toExponential(3)+" m",5,170);
	context.fillText("U\u1D69(r\u2080) = "+vphiblab.toExponential(3)+" m.s\u207B\u00B9",5,190);
	context.fillText("U\u1D63(r\u2080) = "+vrblab.toExponential(3)+" m.s\u207B\u00B9",5,210);
	nombeuhreudefusees = Number(document.getElementById("nombredefusees").value);

	if (nombeuhreudefusees>=2) {
		context.fillText("mobile2:",5,230);
		context.fillText("r\u2080 = "+r0o2[2].toExponential(3)+" m",5,250);
		context.fillText("U\u1D69(r\u2080) = "+vphi2i.toExponential(3)+" m.s\u207B\u00B9",5,270);
		context.fillText("U\u1D63(r\u2080) = "+vr2i.toExponential(3)+" m.s\u207B\u00B9",5,290);
	}
 

}

function majFondFixe44(mobile){
	mobile["context22"].clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width, canvas.height);
}

function majFondFixe22(){
	context22.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width, canvas.height);
}

function majFondFixe3(){
	context3.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(canvas.width, canvas.height);
}

// Empeche le lancer si on part de l'interieur de l'horizon
function test_inte() {
	c = 299792458;
	G = 6.6742 * Math.pow(10, -11);
	M = Number(document.getElementById("M").value);
	r_phy = Number(document.getElementById("r_phy").value);
	m = G * M / Math.pow(c, 2); 
	rs=2*m;

	var onebol=false;
	var twobol=false;
	var nbrdefuseestestinte = Number(document.getElementById("nombredefusees").value);

	for (countetttt = 1; countetttt <= nbrdefuseestestinte; countetttt += 1) {
		var r0testinte = Number(document.getElementById("r0"+countetttt.toString()+"").value); 
		if(r0testinte==0){
			onebol=true;
		}
		if(r0testinte<0){
			twobol=true;
		}
	}

  	var texte = o_recupereJson();
	if(onebol) {
		alert(texte.pages_trajectoire.r0egale0);
		arret();
	}
	if (r_phy < 0 || twobol) {
		alert(texte.pages_trajectoire.rayon_neg);
		arret();
	} 
	else if (r_phy <= rs ) {
		alert(texte.pages_trajectoire.rayonPhyInfHorz);
		arret();
	} 
	else if(r_phy < 1.15*rs ){
		alert(texte.pages_trajectoire.rphysetrs);
		arret();
	}
}

// crée les différentes couches visuelles
function creation_blocs(context,mobilefactor,rmaxjson,r0ou2,compteur){
	r2bis=(80*r0ou2)/(mobilefactor[cle]);
	r1bis=Math.round((80*r0ou2)/(mobilefactor[cle]*10**testnum(r2bis)));
	ech=r1bis*10**testnum(r2bis);
	context.lineWidth = "1";
	context.fillStyle = COULEUR_NOIR;

	if ((mobilefactor[cle] * m / rmaxjson[cle]) < 3) {
		context.beginPath();
		context.strokeStyle = COULEUR_GRIS;
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
		context.strokeStyle = COULEUR_GRIS;
		context.setLineDash([5, 5]);
		context.arc(posX3, posY3, ((mobilefactor[cle] * 2 * m / rmaxjson[cle])), 0, Math.PI * 2);
		context.stroke();
	}
	if (rs < r_phy) {
		context.beginPath();
		context.fillStyle = COULEUR_RPHY;
		context.setLineDash([]);
		context.arc(posX3, posY3, (mobilefactor[cle] * r_phy / rmaxjson[cle]), 0, Math.PI * 2);
		context.fill();
		context.beginPath();
		context.strokeStyle = COULEUR_GRIS;
		context.setLineDash([5, 5]);
		context.arc(posX3, posY3, ((mobilefactor[cle] * 2 * m / rmaxjson[cle])), 0, Math.PI * 2); 
		context.stroke();
	}
	context.fillStyle = 'white';

	// Ajout d'un fond blanc pour l'exportation
	context.font = "15pt bold";
	context.fillStyle = "black"; 
	context.fillText(texte.page_trajectoire_massive.non_baryonique,5,40);
	context.font = "13pt bold";
	context.fillText(texte.pages_trajectoire.entrees,5,70);
	context.font = "11pt normal";
	context.fillStyle = COULEUR_RS;
	context.fillText(ech.toExponential()+" m",605,90);
	context.stroke();
	context.beginPath();      // Début du chemin
	context.strokeStyle = COULEUR_RS;

	//context.moveTo(canvas.width / 2.0,canvas.height / 2.0);    // Tracé test1
	//context.lineTo((canvas.width / 2.0)+280,canvas.height / 2.0);  // Tracé test2
	context.moveTo(600,110);
	context.lineTo(600+((r1bis*10**testnum(r2bis))*mobilefactor[cle])/r0ou2,110);
	context.moveTo(600,105);
	context.lineTo(600,115);
	context.moveTo(600+((r1bis*10**testnum(r2bis))*mobilefactor[cle])/r0ou2,105);
	context.lineTo(600+((r1bis*10**testnum(r2bis))*mobilefactor[cle])/r0ou2,115);
	// Fermeture du chemin (facultative)
	context.stroke();

}