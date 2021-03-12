

function update_h0(){
	 context.clearRect(0, 0, largeur, hauteur);
    context.putImageData(image_fond, 0, 0);
    context.save();
    var a = 0 <= $("#H0").val() ? "Big Bang" : "Big Crunch";
    context.font = "8pt Verdana";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "blue";
    context.rotate(-.8);
    context.translate(-100, 80);
    context.fillText(a, 115, 80);
    context.restore();
    a = 0 <= $("#H0").val() ? "Pas de BC" : "Big Crunch";
    context.fillStyle = "green";
    context.fillText(a, 140, 220);
    a = 0 <= $("#H0").val() ? "Big Crunch" : "Pas de BC";
    context.fillStyle = "green";
    context.fillText(a, 170, 260);
    0 > $("#H0").val() && (context.fillStyle = "red", context.fillText("H0 < 0", 15, 15));
    image_fond_temp = context.getImageData(0, 0, largeur, hauteur);
    update_point();
}
