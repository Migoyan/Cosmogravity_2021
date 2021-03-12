 // JavaScript Document
const AU = 149597870700; // unite astronomique
const ORDRE_ARRONDI=4;
const LUMIERE = 9460730472580800;
const LUMIERE_INV= 1/LUMIERE;

function ecritureScientifiqueOmega(omega) {
  if (omega != 1 && omega != 0) {
    omega.toExponential(ORDRE_ARRONDI);
  }
  return omega;
}

function arrondi(val){
  if(val!=0 && !isNaN(val)){
    return val.toExponential(ORDRE_ARRONDI);
  }
  else{
    return 0;
  }
}

function Compte_calc() {
  url = "savedata.php";
  m = $.post(url);
  m.fail(console.log("Fail"));
  m.done(console.log("Done"));
}

function lance_calc(path) {
  calculs = calculs + 1;
  Compte_calc();
  chargement();
  if (path==0) {
    setTimeout(calcu(path), 100);
  }else {
    setTimeout(calcu(path), 100);
  }
}

function avertissement() {
  var texte = o_recupereJson();
  // Messages d'avertissement
  if (z1 <= -1) {
    alert(texte.page_univers_calculs.message_z1_incorrect);
    z1 = NaN;
  }
  if (z2 <= -1) {
    alert(texte.page_univers_calculs.message_z2_incorrect);
    z2 = NaN;
  }
  // nécessaire car des bugs se créent au delà
  if (z1 > 1e77 || z2 > 1e77) {
    alert(texte.page_univers_calculs.message_valeur_critique_1e77);
    z1 = NaN;
    z2 = NaN;
  }
}

function calcu(path) {
  time_affiche = document.getElementById("resul_tps");
  time_affiche.style.display = "none";
  deb = new Date().getTime();
  fin = 0;

  document.getElementById("tempsEmission_alert").innerHTML = "";
  document.getElementById("tempsReception_alert").innerHTML = "";

  //recuperation des valeurs
  c = Number(document.getElementById("c_p").value);
  G = Number(document.getElementById("G_p").value);
  h = Number(document.getElementById("h_p").value);
  k = Number(document.getElementById("k_p").value);
  typeannee = document.getElementById("typeannee").value;
  t0 = Number(document.getElementById("T0_annexes").value);
  h0 = Number(document.getElementById("H0_annexes").value);
  omegam0 = Number(document.getElementById("omegam0_annexes").value);
  omegalambda0 = Number(document.getElementById("omegalambda0_annexes").value);
  omegak0 = Number(document.getElementById("resultat_omegak0_annexes").value);
  Or = Number(document.getElementById("resultat_omegar0_annexes").value);
  Ie = Number(document.getElementById("i_e").value);
  nbrjours = nbJoursParAn();
  //calcule des h0 par seconde par anneee et par gigaannee
  H0parsec = calcul_H0parsec(h0);
  H0enannee = calcul_H0enannee(H0parsec, nbrjours);
  H0engannee = calcul_H0engannee(H0parsec, nbrjours);
  Eps = Number(0.0001);

  //on recupere les valeurs de z1 et z2
  z1 = Number(document.getElementById("z1").value);
  z2 = Number(document.getElementById("z2").value);

  // Messages d'avertissement
  avertissement();

  // calcul des dm
  dm1 = calcul_dm(Number(z1), H0parsec);
  dm2 = calcul_dm(Number(z2), H0parsec);
  dm = dm2 - dm1;

  //calcul de la distance du diametre apparent et distance lumiere
  dda = dm1 / (1 + Number(z1));
  dl = dm * (1 + (z2 - z1));
  dda_2 = dm2 / (1+ Number(z2));
  dl_2 = dm2 * (1+ Number(z2));

  Le = 4 * pi() * Ie;
  Ee = Le / (4 * pi() * Math.pow(dl,2));

  Ee_2 = Le / (4* pi() * Math.pow(dl_2,2));


  // calcul du temps d'emission / reception
  tempsReception = calcul_t(z2, H0enannee);
  tempsEmission = calcul_t(z1, H0enannee);

  // conversion en secondes
  tempsReception_sec = (1. / H0parsec) * tempsReception / (1. / H0enannee); //<--------------------------
  tempsEmission_sec = (1. / H0parsec) * tempsEmission / (1. / H0enannee); //<--

  // comme il n'y a pas de t1 et de t2, on fait juste le calcul t2-t1 pour De Sitter avec ceci :
  if (omegalambda0 != 1) {
    agebetween = tempsReception - tempsEmission;
    agebetween_sec = tempsReception_sec - tempsEmission_sec;
  } else if (omegalambda0 == 1) {
    agebetween = (1 / H0enannee) * Math.log((1 + z1) / (1 + z2));
    agebetween_sec = (1. / H0parsec) * agebetween / (1. / H0enannee);
  }

  //----------------------------JP
  Tz1 = t0 * (1 + Number(z1));
  Tz1 = arrondi(Tz1);

  Omz1 = omegam0 * Math.pow(1 + Number(z1), 3) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
  Omz1 = arrondi(Omz1);

  Olz1 = Number(omegalambda0) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
  Olz1 = arrondi(Olz1);

  Orz1 = Or * Math.pow(1 + Number(z1), 4) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
  Orz1 = arrondi(Orz1);

  Okz1 = omegak0 * Math.pow(1 + Number(z1), 2) / fonction_E(Number(z1), omegam0, Number(omegalambda0), Or);
  Okz1 = arrondi(Okz1);

  Hz1 = h0 * Math.pow(fonction_E(Number(z1), omegam0, Number(omegalambda0), Or), 0.5);
  Hz1 = arrondi(Hz1);

  Tz2 = t0 * (1 + Number(z2));
  Tz2 = arrondi(Tz2);

  Omz2 = omegam0 * Math.pow(1 + Number(z2), 3) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
  Omz2 = arrondi(Omz2);

  Olz2 = Number(omegalambda0) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
  Olz2 = arrondi(Olz2);

  Orz2 = Or * Math.pow(1 + Number(z2), 4) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
  Orz2 = arrondi(Orz2);

  Okz2 = omegak0 * Math.pow(1 + Number(z2), 2) / fonction_E(Number(z2), omegam0, Number(omegalambda0), Or);
  Okz2 = arrondi(Okz2);

  Hz2 = h0 * Math.pow(fonction_E(Number(z2), omegam0, Number(omegalambda0), Or), 0.5);
  Hz2 = arrondi(Hz2);

  //les distances sont positives
  dm = Math.abs(dm);
  dm1 = Math.abs(dm1);
  dm2 = Math.abs(dm2);
  dda = Math.abs(dda);
  dl = Math.abs(dl);
  dda_2 = Math.abs(dda_2);
  dl_2 = Math.abs(dl_2);


  //parsec?

  dm_pc = dm * 3.2407557442396 * Math.pow(10, -17);
  dm1_pc = dm1 * 3.2407557442396 * Math.pow(10, -17);
  dm2_pc = dm2 * 3.2407557442396 * Math.pow(10, -17);
  da_pc = dda * 3.2407557442396 * Math.pow(10, -17);
  dl_pc = dl * 3.2407557442396 * Math.pow(10, -17);
  da2_pc = dda_2 * 3.2407557442396 * Math.pow(10, -17);
  dl2_pc = dl_2 * 3.2407557442396 * Math.pow(10, -17);

  //années lumière

  dm1_lum = (dm1 *LUMIERE_INV);
  dm2_lum = (dm2 * LUMIERE_INV);
  dif_lum = (dm * LUMIERE_INV);
  da_lum = (dda * LUMIERE_INV);
  dl_lum = (dl * LUMIERE_INV);
  da2_lum = (dda_2 * LUMIERE_INV);
  dl2_lum = (dl_2 * LUMIERE_INV);

  //on ajuste le nombre de decimale apres la virgule
  dm=arrondi(dm);
  dm1=arrondi(dm1);
  dm2=arrondi(dm2);
  dda=arrondi(dda);
  dl=arrondi(dl);
  dda_2=arrondi(dda_2);
  dl_2=arrondi(dl_2);
  dm_pc=arrondi(dm_pc);
  dm1_pc=arrondi(dm1_pc);
  dm2_pc=arrondi(dm2_pc);
  da_pc=arrondi(da_pc);
  dl_pc=arrondi(dl_pc);
  da2_pc=arrondi(da2_pc);
  dl2_pc=arrondi(dl2_pc);
  dm1_lum=arrondi(dm1_lum);
  dm2_lum=arrondi(dm2_lum);
  dif_lum=arrondi(dif_lum);
  da_lum=arrondi(da_lum);
  dl_lum=arrondi(dl_lum);
  da2_lum=arrondi(da2_lum);
  dl2_lum=arrondi(dl2_lum);
  agebetween=arrondi(agebetween);
  tempsReception=arrondi(tempsReception);
  tempsEmission=arrondi(tempsEmission);
  agebetween_sec=arrondi(agebetween_sec);
  tempsReception_sec=arrondi(tempsReception_sec);
  tempsEmission_sec=arrondi(tempsEmission_sec);
  Le=arrondi(Le);

  // temps infini dans Sitter
  if (omegalambda0 == 1) {
    tempsEmission = "∞";
    tempsEmission_sec = "∞";
    tempsReception = "∞";
    tempsReception_sec = "∞";
  }

  // écriture scientifique si différent de 0 et 1
  Olz1 = ecritureScientifiqueOmega(Olz1);
  Orz1 = ecritureScientifiqueOmega(Orz1);
  Omz1 = ecritureScientifiqueOmega(Omz1);
  Okz1 = ecritureScientifiqueOmega(Okz1);

  // correction suppplémentaire nécessaire sinon affiche des valeurs <> de NaN
  if (z1 > 1e77 || z2 > 1e77) {
    Hz1 = NaN;
    Olz1 = NaN;
  }

  //Display Results

  if (Ee != 0 && !isNaN(Ee)) {
    Ee = arrondi(Ee);
    document.getElementById("show_E_e").style.display = "contents";
  }else {
    Ee = "";
  }
  if (Ee_2 != 0 && !isNaN(Ee_2)) {
    Ee_2 = arrondi(Ee_2);
    document.getElementById("show_E_e_2").style.display = "contents";
  }else {
    Ee_2 = "";
  }

  if (path == 0) {
    document.getElementById("show_plot").style.display = "contents";
    document.getElementById("Hz1_unit").style.display = "contents";
    document.getElementById("Tz1_unit").style.display = "contents";
    document.getElementById("Hz2_unit").style.display = "contents";
    document.getElementById("Tz2_unit").style.display = "contents";
    document.getElementById("show_dm1").style.display = "contents";
    document.getElementById("show_dm2").style.display = "contents";
    document.getElementById("show_dl").style.display = "contents";
    document.getElementById("show_da").style.display = "contents";
    document.getElementById("show_dl_2").style.display = "contents";
    document.getElementById("show_da_2").style.display = "contents";
    document.getElementById("show_dm").style.display = "contents";
    document.getElementById("show_temi").style.display = "contents";
    document.getElementById("show_trecep").style.display = "contents";
    document.getElementById("show_dt").style.display = "contents";
    document.getElementById("show_L_e").style.display = "contents";

    //on change les champs pour informer l'utilisateur des resultats trouvés
    document.getElementById("dm").innerHTML = dm;
    document.getElementById("dm1").innerHTML = dm1;
    document.getElementById("dm2").innerHTML = dm2;
    document.getElementById("dl").innerHTML = dl;
    document.getElementById("dda").innerHTML = dda;
    document.getElementById("dl_2").innerHTML = dl_2;
    document.getElementById("dda_2").innerHTML = dda_2;

    document.getElementById("dm_pc").innerHTML = dm_pc;
    document.getElementById("dm1_pc").innerHTML = dm1_pc;
    document.getElementById("dm2_pc").innerHTML = dm2_pc;
    document.getElementById("dda_pc").innerHTML = da_pc;
    document.getElementById("dl_pc").innerHTML = dl_pc;
    document.getElementById("dda_pc").innerHTML = da_pc;
    document.getElementById("dl_pc").innerHTML = dl_pc;
    document.getElementById("dda2_pc").innerHTML = da2_pc;
    document.getElementById("dl2_pc").innerHTML = dl2_pc;

    document.getElementById("dm1_lum").innerHTML = dm1_lum;
    document.getElementById("dm2_lum").innerHTML = dm2_lum;
    document.getElementById("dm_diff_lum").innerHTML = dif_lum;
    document.getElementById("dda2_lum").innerHTML = da2_lum;
    document.getElementById("dl_lum").innerHTML = dl_lum;
    document.getElementById("dda_lum").innerHTML = da_lum;
    document.getElementById("dl2_lum").innerHTML = dl2_lum;
    document.getElementById("L_e").innerHTML = Le;
    document.getElementById("E_e").innerHTML = Ee;
    document.getElementById("E_e_2").innerHTML = Ee_2;


    // ajouter en années lumières
    document.getElementById("agebetween").innerHTML = agebetween;
    document.getElementById("tempsReception").innerHTML = tempsReception;
    document.getElementById("tempsEmission").innerHTML = tempsEmission;
    document.getElementById("agebetween_sec").innerHTML = agebetween_sec;
    document.getElementById("tempsReception_sec").innerHTML = tempsReception_sec;
    document.getElementById("tempsEmission_sec").innerHTML = tempsEmission_sec;
    document.getElementById("Tz1").innerHTML = Tz1;
    document.getElementById("Omz1").innerHTML = Omz1;
    document.getElementById("Olz1").innerHTML = Olz1;
    document.getElementById("Orz1").innerHTML = Orz1;
    document.getElementById("Okz1").innerHTML = Okz1;
    document.getElementById("Hz1").innerHTML = Hz1;
    document.getElementById("Tz1").innerHTML = Tz1;

    document.getElementById("Omz2").innerHTML = Omz2;
    document.getElementById("Olz2").innerHTML = Olz2;
    document.getElementById("Orz2").innerHTML = Orz2;
    document.getElementById("Okz2").innerHTML = Okz2;
    document.getElementById("Hz2").innerHTML = Hz2;
    document.getElementById("Tz2").innerHTML = Tz2;

  }else if (path == 1) {
    document.getElementById("graph_container_d").style.display = "contents"; //display graph
    graphique_creation_d();
  }else if (path == 2) {
    document.getElementById("graph_container_omega").style.display = "contents"; //display graph
    graphique_creation_omega();
  }

  stop_spin();

  // Temps calcul

  fin = new Date().getTime() - deb;
  Chaine = "Le calcul a durer : " + fin + " millisecondes !";
  time_affiche.innerHTML = Chaine;
  //time_affiche.style.display ="inline-block";
}

function correctionOmegaz1NaN(omegaz1, omega) {
  if (omegaz1 == NaN) {
    omegaz1 = omega;
  }
}

function calcul_dm(z, h0) {
  if (omegam0 == 1) {
    return (2 * c / h0) * (1 - (Math.pow(1 + z, -1 / 2)));
  } else if (Or == 1) {
    return (c / h0) * (1 - Math.pow(1 + z, -1));
  } else if (omegalambda0 == 1) {
    return c * z / h0;
  } else if (omegak0 == 1) {
    return c * Math.sinh(Math.log(1 + z)) / h0;
  }
}

function calcul_t(z, h0) {
  if (omegam0 == 1) {
    return (2 / 3) * (1 / h0) * Math.pow(1 + z, -3 / 2);
  } else if (Or == 1) {
    return (1 / 2) * (1 / h0) * Math.pow(1 + z, -2);
  } else if (omegalambda0 == 1) {
    return NaN;
  } else if (omegak0 == 1) {
    return (1 / h0) * Math.pow(1 + z, -1);
  }
}

function calcul_E(x) {
  if (omegam0 == 1) {
    return Math.pow(1 + x, 3);
  } else if (Or == 1) {
    return Math.pow(1 + x, 4);
  } else if (omegalambda0 == 1) {
    return 1;
  } else if (omegak0 == 1) {
    return Math.pow(1 + x, 2);
  }
}

//on recupere le bon nombre de jour par an.
function nbJoursParAn() {
  var typeannee = document.getElementById("typeannee").value;
  switch (typeannee) {
    case 'Sidérale':
      return 365.256363051;
    case 'Julienne':
      return 365.25;
    case 'Tropique (2000)':
      return 365.242190517;
    default:
      return 365.2425;
  }
}

//calcule des h0 par seconde par anneee et par gigaannee
function calcul_H0parsec(h0) {
  return h0 * 1000 / ((AU * (180 * 3600)) / Math.PI * Math.pow(10, 6));
}

function calcul_H0enannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours);
}

function calcul_H0engannee(H0parsec, nbrjours) {
  return H0parsec * (3600 * 24 * nbrjours) * Math.pow(10, 9);
}

function calculD() {
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;

  if (z1 && dda !=0){
    window.document.getElementById("diametre").value = (window.document.getElementById("theta").value / 206265 * Number(dda)).toExponential(2);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("diametre").value = (window.document.getElementById("theta").value / 206265 * Number(dda_2)).toExponential(2);
  }
}

function calcul1Dkpc(){
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;

  if (z1 && dda !=0){
    window.document.getElementById("diametrekpc").value = (window.document.getElementById("theta").value / 206265 * Number(dda)).toExponential(2)* 3.24079* Math.pow(10, -20);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("diametrekpc").value = (window.document.getElementById("theta").value / 206265 * Number(dda_2)).toExponential(2)*3.24079* Math.pow(10, -20);
  }
}

function calculthetakpc() {
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;

   if (z1 && dda !=0){
    window.document.getElementById("theta").value = (206265 * (window.document.getElementById("diametrekpc").value*3.0856*Math.pow(10,19)) / Number(dda)).toExponential(2);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("theta").value = (206265 * (window.document.getElementById("diametre").value*3.0856*Math.pow(10,19)) / Number(dda_2)).toExponential(2);
  }
}

function calcultheta() {
  var z1 = document.getElementById("z1_checkbox").checked;
  var z2 = document.getElementById("z2_checkbox").checked;
  if (z1 && dda !=0){
    window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value / Number(dda)).toExponential(2);
  }
  else if(z2 && dda_2 !=0){
    window.document.getElementById("theta").value = (206265 * window.document.getElementById("diametre").value / Number(dda_2)).toExponential(2);
  }
}

function graphique_creation_d(){

  var val_graph = calculDeDs(zmin,zmax,1000);

  graph = $("#graphique");
  Plotly.purge(graph);
  graph.empty();

  wid = graph.width();
  if (window.innerWidth > 1000) {
    hei = wid * 0.5;
  } else {
    hei = wid * 2 / 3;
  }

  window.document.getElementById("graphique").style.height = hei + "px";

  frame = [{
    name: 'Graphe',
    data: [{
      x: [],
      y:
      {
        ydm: [],
        ydl: [],
        yda: [],
        ydlt: []
      },
    }]
  }];

  frame[0].data[0].x = val_graph[3];
  frame[0].data[0].y.ydm = val_graph[2];
  frame[0].data[0].y.ydl = val_graph[0];
  frame[0].data[0].y.yda = val_graph[1];
  frame[0].data[0].y.ydlt = val_graph[4];

  var trace1 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.yda,
  type: 'scatter',
  name: '<b>d<sub>a</sub><b>'
  };

  var trace2 = {
    x: frame[0].data[0].x,
    y: frame[0].data[0].y.ydm,
    type: 'scatter',
    name: '<b>d<sub>m</sub><b>'
  };

  var trace3 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.ydl,
  type: 'scatter',
  name: '<b>d<sub>L</sub><b>'
  };

  var trace4 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.ydlt,
  type: 'scatter',
  name: '<b>d<sub>LT</sub><b>'
  };

  var data = [trace1, trace2, trace3, trace4];

  var data_ex = [trace1, trace2];


  annots = [];

  // tracer
  var img_png = d3.select('#png');
  var img_jpg = d3.select('#jpg');
  var img_svg = d3.select('#svg-1');

  Plotly.newPlot('graphique', data, {
    title: "<b>d<sub>m</sub>, d<sub>l</sub>, d<sub>a</sub>,  d<sub>LT</sub>",

    xaxis: {
      autorange: true,
      title: 'z'
    },

    yaxis: {
      rangemode: 'tozero',
      range: [5e10],
      // autorange: true,
      title: 'al'
    },
    annotations: annots,
    },
  {
    displaylogo: false
  }
);

  Plotly.newPlot('graphique_enr', data, {
    title: "<b>D<sub>m</sub>, D<sub>l</sub>, D<sub>a</sub>,  D<sub>LT</sub>",

    xaxis: {
      autorange: true,
      autorange: true,
      title: 'z'
    },


    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: 'al'
    },
    annotations: annots,
  }, {
    displaylogo: false
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

function graphique_creation_omega(){

  var val_graph = calcul_omegas(zmin,zmax,1000);

  graph = $("#graphique_omega");
  Plotly.purge(graph);
  graph.empty();

  wid = graph.width();
  if (window.innerWidth > 1000) {
    hei = wid * 0.5;
  } else {
    hei = wid * 2 / 3;
  }

  window.document.getElementById("graphique_omega").style.height = hei + "px";

  frame = [{
    name: 'Graphe',
    data: [{
      x: [],
      y:
      {
        yom: [],
        yol: [],
        yor: [],
        yok: []
      },
    }]
  }];

  frame[0].data[0].x = val_graph[4];
  frame[0].data[0].y.yom = val_graph[0];
  frame[0].data[0].y.yol = val_graph[1];
  frame[0].data[0].y.yor = val_graph[2];
  frame[0].data[0].y.yok = val_graph[3];

  var trace1 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.yom,
  type: 'scatter',
  name: '<b>Ω<sub>m</sub></b>'
  };

  var trace2 = {
    x: frame[0].data[0].x,
    y: frame[0].data[0].y.yol,
    type: 'scatter',
    name: '<b>Ω<sub>Λ</sub></b>'
  };

  var trace3 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.yor,
  type: 'scatter',
  name: '<b>Ω<sub>r</sub></b>'
  };

  var trace4 = {
  x: frame[0].data[0].x,
  y: frame[0].data[0].y.yok,
  type: 'scatter',
  name: '<b>Ω<sub>k</sub></b>'
  };

  var data = [trace1, trace2, trace3, trace4];

  var data_ex = [trace1, trace2];


  annots = [];

  // tracer
  var img_png = d3.select('#png');
  var img_jpg = d3.select('#jpg');
  var img_svg = d3.select('#svg-1');

  Plotly.newPlot('graphique_omega', data, {
    title: "<b>\Ω<sub>m</sub>, Ω<sub>Λ</sub>, Ω<sub>r</sub>, Ω<sub>k</sub></b>",

    xaxis: {
      autorange: true,
      title: 'z'
    },

    yaxis: {
      rangemode: 'tozero',
      // range: [0,1000],
      autorange: true,
      title: ''
    },
    annotations: annots,
    },
  {
    displaylogo: false
  }
);

  Plotly.newPlot('graphique_omega_enr', data, {
    title: "<b>D<sub>m</sub>, D<sub>l</sub>, D<sub>a</sub>,  D<sub>LT</sub>",

    xaxis: {
      autorange: true,
      autorange: true,
      title: 'z'
    },


    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: 'al'
    },
    annotations: annots,
  }, {
    displaylogo: false
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


// ATTENTION ON UTILISE DU SIMPSON ICI, A MODIFIER A L'AVENIR

function calculDeDs(zmin,zmax,dt){

  var pas = (zmax - zmin)/dt;
  var zArr = [];
  var i = zmin;
  var daArr = [];
  var da;
  var dlArr = [];
  var dl;
  var dm1;
  var dmArr = [];
  var dlt;
  var dltArr = [];
  var max_graph;
  var min_graph;
  var integ_1;

  while (i<=zmax) {

    if (omegak0>0){
      integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
      dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ_1);
    }
    else if (omegak0==0){
      dm1=(c/(H0parsec) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps));
    }
    else{
      integ_1 = Math.sqrt( Math.abs(omegak0)) * simpson(0, Number(i), fonction_dm, omegam0, Number(omegalambda0), Number(Or),Eps);
      dm1=(c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ_1);
    }


    temps_i= simpson_simple_degre2(fonction_integrale, Number(zmin), omegam0, Number(omegalambda0), Number(Or));
    temps_i = temps_i * H0enannee / H0parsec;
    temps = simpson_simple_degre2(fonction_integrale, Number(i), omegam0, Number(omegalambda0), Number(Or));
    temps = temps * H0enannee / H0parsec;

    dlt = (temps_i - temps) * c;
    dlt = dlt * LUMIERE_INV;

    dm1 = Math.abs(dm1); // distances positives

    dm1 = dm1 * LUMIERE_INV;

    dm1 = Number(dm1).toExponential(3);

    da = dm1 / (1 + i);
    dl = dm1 * (1 + i);

    da = Number(da).toExponential(3);
    dl = Number(dl).toExponential(3);

    dmArr.push(dm1);
    daArr.push(da);
    dlArr.push(dl);
    dltArr.push(dlt);

    zArr.push(i);

    i = i + pas;
  }

  return [dlArr,daArr,dmArr,zArr,dltArr];

}

function calcul_omegas(zmin,zmax,dt){

  zArr = [];
  omArr = [];
  olArr = [];
  orArr = [];
  okArr = [];
  pas = (zmax - zmin)/dt;

  i = zmin;

  while (i<zmax) {
    Omz = omegam0 * Math.pow(1 + Number(i), 3) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
    Omz = Omz.toExponential(4);
    omArr.push(Omz);

    Olz = Number(omegalambda0) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
    Olz = Olz.toExponential(4);
    olArr.push(Olz);

    Orz = Or * Math.pow(1 + Number(i), 4) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
    Orz = Orz.toExponential(4);
    orArr.push(Orz);

    Okz = omegak0 * Math.pow(1 + Number(i), 2) / fonction_E(Number(i), omegam0, Number(omegalambda0), Or);
    Okz = Okz.toExponential(4);
    okArr.push(Okz);

    zArr.push(i);

    i = i + pas;

  }

  return [omArr,olArr,orArr,okArr,zArr];

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

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('z');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
        window.document.getElementById("diametre").value = "";
        window.document.getElementById("theta").value = "";
        window.document.getElementById("diametrekpc").value = "";
    })
}
