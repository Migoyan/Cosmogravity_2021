function lance_telechargementpdf() {
  chargement();
  setTimeout(pdfiserr(), 20);
}

function pdfiserr(){
	//construit a partir de réponses trouvés sur stackoverflow et de plusieurs essais, a tester sur différents écrans pour voir si ca marche bien dans tous les cas.
	//$(document).ready(function(){
		//$("#html2pdf").click(function(){	
			html2canvas(document.getElementById("aPdfer"), {
				onrendered: function(canvas) {
					//pt dans jsPDF signifie point. On utilise jpeg sinon le pdf devient beaucoup trop lourd.
					var image = canvas.toDataURL("image/jpeg");
					var img_w = canvas.width;
					var img_h = canvas.height;                  
					var doc = new jsPDF('p','pt',[img_w, img_h]); 
					doc.addImage(image, 'JPG', 0, 0, img_w, img_h);
					doc.save('tutoriel.pdf');

					stop_spin();
					//ici on utilise pixels(px) dans jsPDF, il faux calculer les ratios. Dans doc.addImage canvas.width * widthRatio et canvas.height * heightRatio marcherait aussi il semble. 
					//La il prend le ratio le plus petit.
					//var imgData = canvas.toDataURL("image/jpg"); 
					//var doc = new jsPDF('p', 'px', [canvas.width, canvas.height]);
					//let width = doc.internal.pageSize.getWidth();
					//let height = doc.internal.pageSize.getHeight();
					//let widthRatio = width / canvas.width
					//let heightRatio = height / canvas.height
					//let ratio = widthRatio > heightRatio ? heightRatio : widthRatio
					//console.log(canvas.width,canvas.height,width,height,widthRatio,heightRatio,ratio,canvas.width * ratio,canvas.height * ratio);
					//doc.addImage(
					//  canvas.toDataURL('image/jpeg', 1.0),
					//  'JPEG',
					//  0,
					//  0,
					//  canvas.width * ratio,
					//  canvas.height * ratio,
					//)
					//doc.save('tutoriel.pdf');

				}
			});
            //stop_spin();

		//});
		
		
	//});		
}
