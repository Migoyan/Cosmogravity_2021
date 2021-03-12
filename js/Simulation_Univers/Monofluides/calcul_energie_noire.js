const AU = 149597870700; // unite astronomique

function lance_calc() {
  document.getElementById("ret").click();
  chargement();
  // setTimeout(calcul, 100);
  calcul();
}

function parametres() {
  //on recupere les valeurs des variables
  c = Number(document.getElementById("c_p").value);
  G = Number(document.getElementById("G_p").value);
  h = Number(document.getElementById("h_p").value);
  k = Number(document.getElementById("k_p").value);
  t0 = Number(document.getElementById("T0calc").value);
  h0 = Number(document.getElementById("H0").value);
  omegam0 = Number(document.getElementById("Omcalc").value);
  omegaDE0 = Number(document.getElementById("Olcalc").value);
  omegak0 = Number(document.getElementById("Okcalc").value);
  Or = Number(document.getElementById("Orcalc").value);

  nbrjours = nbJoursParAn();
  //calcule des h0 par seconde par anneee et par gigaannee
  H0parsec = calcul_H0parsec(h0);
  H0enannee = calcul_H0enannee(H0parsec, nbrjours);
  H0engannee = calcul_H0engannee(H0parsec, nbrjours);

  //donne les variables sous forme d'exposant si differente de 0

  omegaDE0 = ajustePrecision_Scientifique(omegaDE0);
  omegak0 = ajustePrecision_Scientifique(omegak0);
  Or = ajustePrecision_Scientifique(Or);

  // Calcul l'âge et affiche le résultat si big bang, big crunch sur la page html des monofluides (fr et ang)

  if (omegam0 == 1) {
    age_sec = 2 / (3 * H0parsec);
    age = 2 / (3 * H0engannee);
    age_afficher = ajustePrecision_Scientifique(age);
    age_sec_afficher = ajustePrecision_Scientifique(age_sec);
    document.getElementById("resultat_ageunivers_ga").innerHTML = "" + age_afficher + " Ga = ";
    document.getElementById("resultat_ageunivers_s").innerHTML = "" + age_sec_afficher + " s";
    if (sessionStorage.getItem("LANGUE") == "fr") {
      document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    } else {
      document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    }
    document.getElementById("resultat_dureeuniv").innerHTML = "&infin;";
  } else if (Or == 1) {
    age_sec = 1 / (2 * H0parsec);
    age = 1 / (2 * H0engannee);
    age_afficher = ajustePrecision_Scientifique(age);
    age_sec_afficher = ajustePrecision_Scientifique(age_sec);
    document.getElementById("resultat_ageunivers_ga").innerHTML = "" + age_afficher + " Ga = ";
    document.getElementById("resultat_ageunivers_s").innerHTML = "" + age_sec_afficher + " s";
    if (sessionStorage.getItem("LANGUE") == "fr") {
      document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    } else {
      document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    }
    document.getElementById("resultat_dureeuniv").innerHTML = "&infin;";
  } else if (omegaDE0 == 1) {
    age_afficher = "∅";
    document.getElementById("resultat_ageunivers_s").innerHTML = "";
    if (sessionStorage.getItem("LANGUE") == "fr") {
      document.getElementById("resultat_ageunivers_ga").innerHTML = "Pas de Big Bang";
      document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    } else {
      document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
      document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    }
    document.getElementById("resultat_dureeuniv").innerHTML = "&infin;";
  } else if (omegak0 == 1) {
    age_sec = 1 / (H0parsec);
    age = 1 / (H0engannee);
    age_afficher = ajustePrecision_Scientifique(age);
    age_sec_afficher = ajustePrecision_Scientifique(age_sec);
    document.getElementById("resultat_ageunivers_ga").innerHTML = "" + age_afficher + " Ga = ";
    document.getElementById("resultat_ageunivers_s").innerHTML = "" + age_sec_afficher + " s";
    if (sessionStorage.getItem("LANGUE") == "fr") {
      document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
    } else {
      document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
    }
    document.getElementById("resultat_dureeuniv").innerHTML = "&infin;";
  }
}

function calcul() { // fonction principale de cosmogravity

  parametres();
  var pas;
  var temps = 0;
  var fy = 0;
  var data = [];
  var data_x = [];
  var data_y = [];
  if (omegaDE0 == 1) {
    temps = -30;
  }

  // ajuste le pas en fonction du lambda, l'exponentielle grimpe très vite
  if (omegaDE0 == 1) {
    pas = 1e-4;
  } else if (omegak0 == 1) {
    pas = 1e-3;
  } else {
    pas = 1e-4;
  }

  // appelle des fonctions présentes dans calcul_analytique.js

  while (temps < (300000 * pas)) {
    if (omegam0 == 1) {
      fy = monoEinsteinSitter(H0engannee, temps);
    } else if (Or == 1) {
      fy = monoWeinberg(H0engannee, temps);
    } else if (omegaDE0 == 1) {
      fy = monoSitter(H0engannee, temps);
    } else if (omegak0 == 1) {
      fy = monoCourbure(H0engannee, temps);
    }
    data_x.push(temps);
    data_y.push(fy);
    temps = temps + pas;
  }

  // arrête le cercle de chargement
  stop_spin();

  //on cree le graphique (librairie Plotly)
  graph = $("#graphique");
  Plotly.purge(graph);
  graph.empty();
  wid = graph.width();
  if (window.innerWidth > 1700) {
    hei = wid * 0.5;
  } else {
    hei = wid * 2 / 3;
  }
  document.getElementById("graphique").style.height = hei + "px";

  frame = [{
    name: 'Graphe',
    data: [{
      x: [],
      y: []
    }]
  }];
  frame[0].data[0].x = data_x;
  frame[0].data[0].y = data_y;

  // pour l'affichage
  t0 = ajustePrecision_Scientifique(t0);
  Or = ajusteEnEntier(Or);
  omegaDE0 = ajusteEnEntier(omegaDE0);
  omegam0 = ajusteEnEntier(omegam0);
  omegak0 = ajusteEnEntier(omegak0);
  h0 = ajustePrecisionCentieme(h0);

  // affichage des paramètres au dessus du graphe
  if (sessionStorage.getItem("LANGUE") == "fr") {
    title = "<b>Evolution du facteur d'\u00e9chelle r\u00e9duit</b>";
    leg_gauche = "<b>Entrées</b><br>Ω<sub>m0</sub>= " + omegam0 + " ; Ω<sub>Λ0</sub>= " + omegaDE0 + "<br>Ω<sub>r0</sub>= " + Or + " ; Ω<sub>k0</sub>= " + omegak0 + "<br>" + " H<sub>0</sub>= " + h0 + " km.s<sup>-1</sup>.Mpc<sup>-1</sup><br>";
    leg_droite = "<b>Sorties</b><br>T<sub>0</sub>= " + t0 + " K<br>" + "t<sub>BB</sub>= " + age_afficher + " Ga<br>Duree= ∞ Ga";
  } else {
    title = "<b>Reduced scale factor evolution</b>";
    leg_gauche = "<b>Inputs</b><br>Ω<sub>m0</sub>= " + omegam0 + " ; Ω<sub>Λ0</sub>= " + omegaDE0 + "<br>Ω<sub>r0</sub>= " + Or + " ; Ω<sub>k0</sub>= " + omegak0 + "<br>" + " H<sub>0</sub>= " + h0 + " km.s<sup>-1</sup>.Mpc<sup>-1</sup><br>";
    leg_droite = "<b>Outputs</b><br>T<sub>0</sub>= " + t0 + " K<br>" + "t<sub>BB</sub>= " + age_afficher + " Ga<br>Duration= ∞ Ga";
  }


  tracer1 = [{
    x: frame[0].data[0].x,
    y: frame[0].data[0].y,
    line: {
      simplify: false
    },
  }];

  if (window.innerWidth > 960) {
    annots = [{
        x: 0,
        xref: 'paper',
        xanchor: 'center',
        y: 1,
        yref: 'paper',
        yanchor: 'bottom',
        text: leg_gauche,

        showarrow: false,
      },
      {
        "xref": "paper",
        "yref": "paper",
        "text": leg_droite,
        "y": 1,
        "x": 1,
        xanchor: 'center',
        yanchor: 'bottom',
        "showarrow": false
      }
    ];
  } else {
    annots = [];
  }
  // tracer et ajout dans 3 liens du data pour telecharger aux 3 formats propos�s


  var img_png = d3.select('#png');
  var img_jpg = d3.select('#jpg');
  var img_svg = d3.select('#svg-1');
  var nom_abscisse = 't (Ga)';
  var nom_ordonnee = 'a(t)';
  if (omegaDE0 == 1) {
    nom_abscisse = 't-t0 (Ga)';
    nom_ordonnee = 'a(t-t0)';
  }

  Plotly.newPlot('graphique', tracer1, {
    title: title,

    xaxis: {
      autorange: true,
      title: nom_abscisse
    },


    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: nom_ordonnee
    },
    annotations: annots,
  }, {
    displayModeBar: false
  });

  Plotly.newPlot('graphique_enr', tracer1, {
    title: title,

    xaxis: {
      autorange: true,
      title: nom_abscisse
    },


    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: nom_ordonnee
    },
    annotations: annots,
  }, {
    displayModeBar: false
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

function ajustePrecision_Scientifique(valeur) {
  if (valeur != 0) {
    valeur = parseFloat(valeur).toExponential(3);
  } else {
    valeur = 0;
  }
  return valeur;
}

function ajusteEnEntier(valeur) {
  return parseInt(valeur);
}

function ajustePrecisionCentieme(valeur) {
  return parseFloat(valeur).toFixed(2);
}

// Recherche max et min dans un tableau
function getMaxTableau(tableauNumerique) {
  return Math.max.apply(null, tableauNumerique);
}

function getMinTableau(tableauNumerique) {
  return Math.min.apply(null, tableauNumerique);
}
