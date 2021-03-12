
// Fonctions nécéssaires à 'linteractivité et au tracer du Canvas contant les separatrices


function FindPosition(a) {
    if ("undefined" != typeof a.offsetParent) {
        for (var b = 0, c = 0; a; a = a.offsetParent) b += a.offsetLeft, c += a.offsetTop;
        return [b, c];
    }
    return [a.x, a.y];
}

function cosh(a){
  return 0.5*(Math.exp(a)+Math.exp(-a));
}

// Recupère les coordonnées de la souris par rapport à la page, calcul les omega correspondant et trace le graphique + update le modele
function GetCoordinates(a) {
    1 == document.getElementById("univ_plat").checked && (document.getElementById("univ_plat").checked = !1);
    PosY = PosX = 0;
    var b;

    b = FindPosition(myImg);

    a || (a = window.event);
    if (a.pageX || a.pageY) PosX = a.pageX, PosY = a.pageY;
    else if (a.clientX || a.clientY) PosX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, PosY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    PosX -= b[0];
    PosY -= b[1];
    54.5 > PosX ? PosX = 54.5 : 284.5 < PosX && (PosX = 284.5);
    355.5 < PosY ? PosY = 355.5 : 30.5 >
        PosY && (PosY = 30.5);
    PosX -= 53;
    PosY -= 29;
    PosX -= 1.5;
    PosY -= 1.5;
    PosX = 3 * PosX / 230;
    217 <= PosY ? (PosY -= 217, PosY = 4.5 * -PosY / 325) : (PosY = 217 - PosY, PosY = 4.5 * PosY / 325);
    PosX = PosX.toFixed(3);
    PosY = PosY.toFixed(3);
    document.getElementById("omegam0").value = PosX;
    document.getElementById("omegalambda0").value = PosY;
    lance_calc();
	update_modele();
	update_omegak0_simu();

}

function update_point() {
    context.clearRect(0, 0, largeur, hauteur);
    context.putImageData(image_fond_temp, 0, 0);
    context.beginPath();
    context.fillStyle = "#F00000";
    context.arc(PosX + 1.5, PosY + 1.5, 3, 0, 2 * Math.PI);
    context.fill();
}

function update_modele() {  //image Einstein en bas a gauche 
    var texte=o_recupereJson();
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(298, 0);
    context.lineTo(298, 400);
    context.lineTo(0, 400);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
    context.beginPath();
    context.moveTo(53, 29);
    context.lineTo(283, 29);
    context.lineTo(283, 354);
    context.lineTo(53, 354);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(131, 354);
    context.lineTo(131, 344);
    context.closePath();
    context.stroke();

    var a;
    context.font = "12pt Verdana";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "black";
    context.fillText("1", 125, 362);
    context.beginPath();
    context.moveTo(207, 354);
    context.lineTo(207, 344);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("2", 204, 362);
    context.font = "12pt Verdana";
    context.fillText("0", 47, 362);
    context.beginPath();
    context.moveTo(53, 247);
    context.lineTo(63, 247);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("0", 40, 240);
    context.beginPath();
    context.moveTo(53, 318);
    context.lineTo(63, 318);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("-1", 35, 312);
    context.beginPath();
    context.moveTo(53, 174);
    context.lineTo(63, 174);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("1", 40, 168);
    context.beginPath();
    context.moveTo(53, 101);
    context.lineTo(63, 101);
    context.closePath();
    context.stroke();
    context.font = "12pt Verdana";
    context.fillText("2",
        40, 95);
    context.font = "23pt Verdana";
    context.fillText("\u03a9", 140, 362);
    context.font = "16pt Verdana";
    context.fillText("m", 164, 375);
	context.font = "14pt Verdana";
    context.fillText("0", 185, 378);	
    context.font = "23pt Verdana";
    context.fillText("\u03a9", 0, 172);
    context.font = "16pt Verdana";
    context.fillText("\u039b", 24, 185);
	context.font = "16pt Verdana";
    context.fillText("0", 38, 185);
    context.save();
    a = texte.canvas_univers.niBB;
    context.font = "8pt Verdana";
    context.fillStyle = "blue";
    context.rotate(-.8);
    context.translate(-80, 60);
    context.fillText(a, 55, 45);
    context.fillText(texte.canvas_univers.niBC, 65, 60);
    context.restore();
    context.save();
    a = texte.canvas_univers.ferme;
    context.font =
        "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(a, 210, 270);
    context.restore();
    context.save();
    a = texte.canvas_univers.ouvert;
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(a, 110, 300);
    context.restore();
    context.save();
    a = texte.canvas_univers.plat;
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(.7);
    context.translate(160, -180);
    context.fillText(a, 170, 290);
    context.restore();
    Omo = 53;
    dtx = 78;
    dty = 72;
    Olo = 247;
    context.save();
    context.beginPath();
    context.moveTo(53, 177);
    context.strokeStyle = "red";
    for (Om = 0; 3 > Om; Om += .5) OlCO = -Om + 1, x = Omo + Om * dtx, y = Olo - OlCO * dty, context.lineTo(x, y);
    context.stroke();
    context.restore();
    context.save();
    context.beginPath();
    context.moveTo(53, 245);

    context.strokeStyle = "green";
    OlER = Om = 0;
    y = Olo;
    x = Omo;
    context.lineTo(x, y);
    Om = 1;
    u = 0;
    for (liste_valeur = []; 2.95 >= Om;) u = 1 / 3 * Math.acos(1 / Om - 1), OlER = 4 * Om * Math.cos(u + 4 / 3 * Math.PI) * Math.cos(u + 4 / 3 * Math.PI) * Math.cos(u + 4 / 3 * Math.PI), x = Omo + Om * dtx, y = Olo - OlER * dty, context.lineTo(x,
        y), Om += .01;
    context.stroke();
    context.restore();
    context.save();
    context.beginPath();
    context.moveTo(53, 177);
    context.strokeStyle = "blue";
    x = Omo;
    y = Olo - dty;
    context.lineTo(x, y);
    Om = .01;
    for (w = 0; .5 >= Om;) w = 1 / 3 * Math.log(1 / Om - 1 + Math.sqrt((1 / Om - 1) * (1 / Om - 1) - 1)), OlER = 4 * Om * cosh(w) * cosh(w) * cosh(w), x = Omo + Om * dtx, y = Olo - OlER * dty, context.lineTo(x, y), Om += .01;
    Om = .5;

    for (v = 0; 1.4 >= Om;) v = 1 / 3 * Math.acos(1 / Om - 1), OlER = 4 * Om * Math.cos(v) * Math.cos(v) * Math.cos(v), x = Omo + Om * dtx, y = Olo - OlER * dty, context.lineTo(x, y), Om += .01;

    context.stroke();
    context.restore();
    largeur = canvas.width;
    hauteur = canvas.height;
    image_fond = context.getImageData(0, 0, largeur, hauteur);
    if(document.getElementById("omegam0")){
      omegam0 = Number(document.getElementById("omegam0").value);
    }
    else{
      omegam0 = Number(document.getElementById("Omcalc").value);
    }
    if(document.getElementById("omegalambda0")){
      omegalambda0 = Number(document.getElementById("omegalambda0").value);
    }
    else{
      omegalambda0 = Number(document.getElementById("Olcalc").value);
    }
    PosX = 53 + 230 * omegam0 / 3;
    PosY = 246;
    PosY = 0 <= omegalambda0 ? PosY + 325 * -omegalambda0 / 4.5 : PosY - 325 * omegalambda0 / 4.5;
    context.save();
    a = texte.canvas_univers.BB;
    context.font = "8pt Verdana";
    context.fillStyle = "red";
    context.rotate(-.8);
    context.translate(-100, 80);
    context.fillText(a, 115, 80);
    context.restore();
    context.font = "8pt Verdana";
    context.fillStyle = "green";
    context.fillText(texte.canvas_univers.noBC, 140, 220);
    context.font = "8pt Verdana";
    context.fillStyle = "green";
    context.fillText(texte.canvas_univers.BC, 170, 260);
    image_fond_temp = context.getImageData(0, 0, largeur, hauteur);
    update_point();
}
