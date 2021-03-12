function graphique_creation_pot(Onresize=0,data1,data2,compteur,mobile) {
  if(data2 !== undefined && data1 !== undefined && data2[0]!==undefined){
  var texte = o_recupereJson();
  // Set the dimensions of the canvas / graph
  var margin = {
    top: 30,
    right: 10,
    bottom: 50,
    left: 80
  };

  taille_carac = 12;
  wid_fen = window.innerWidth;
  hei_fen = window.innerHeight;

  // Valeurs de largeur et hauteur adaptées pour la version mobile / desktop

  if (wid_fen > 960 && wid_fen < 1200) {
    width = wid_fen * 0.5;
    height = width * 2 / 3;
  }
  else if (wid_fen >= 1200 && wid_fen <= 1920) {
    width = wid_fen * 0.2;
    height = width * 2 / 3;
  }
  else if (wid_fen > 1920) {
    width = wid_fen * 0.15;
    height = width * 2 / 3;
  }
  else {
    margin = {
      top: 50,
      right: 0,
      bottom: 50,
      left: 70
    };
    width = wid_fen * 0.65;
    height = width * 2 / 3;
    taille_carac = 9;
  }

  form = d3.format(".1e");
  data1.forEach(function(d) {
    d.date = d.date;
    //le plus ici est pour convertir de string a int 
    d.close = +d.close;
  });

  data2.forEach(function(d) {
    d.date = d.date;
    d.close = +d.close;
  });


  // Set the ranges
  x = d3.scale.linear().domain(d3.extent(data1, function(d) {return d.date;})).range([0, width]);

  var val;
  if(d3.max(data1, function(d) {return d.close;})>=0){
      val=1.01;
  }
  else{
      val=0.99;
  }
  y = d3.scale.linear().domain([d3.min(data1, function(d) {return d.close;}), val*d3.max(data1, function(d) {return d.close;})]).range([height,0]); 
  // Define the line
  var valueline = d3.svg.line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.close);
    });

  // Adds the svg canvas

  var svg = d3.select(mobile.graphesvg)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top * 2)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5).tickFormat(d3.format(".1e"));

  var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5).tickFormat(d3.format(".2e"));


  // Scale the range of the data

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .style("font-size", "" + taille_carac + "px")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


  svg.selectAll("line.x")
    .data(x.ticks(6))
    .enter().append("line")
    .attr("class", "x")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", height)
    .style("stroke", "#ccc");

  svg.selectAll("line.y")
    .data(y.ticks(6))
    .enter().append("line")
    .attr("class", "y")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", y)
    .attr("y2", y)
    .style("stroke", "#ccc");


  // Add the Y Axis
  svg.append("g")
    .style("font-size", "" + taille_carac + "px")
    .attr("class", "y axis")
    .call(yAxis);
  titre = texte.pages_trajectoire.titre_graphe +" "+ compteur.toString() ;
  //titre = "Potentiel Effectif "+compteur.toString() ;

  svg.append("text")
    .attr("class", "legend_titre")
    .attr("x", width / 2 - 75)
    .attr("y", -margin.top / 2-5)
    .attr("dy", ".3em")
    .attr("transform", "rotate(0)")
    .style("font-size", "" + taille_carac * 1.5 + "px")
    .text(titre);

  svg.append("text")
    .attr("class", "legend_axe")
    .attr("x", width / 2)
    .attr("y", height + margin.top / 0.75)
    .attr("dy", ".3em")
    .attr("transform", "rotate(0)")
    .style("font-size", "" + taille_carac + "px")
    .text("r (m)");

  svg.append("text")
    .attr("class", "legend_axe")
    .attr("x", -height / 2)
    .attr("y", -margin.left*0.85 )
    .attr("dy", ".3em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "" + taille_carac + "px")
    .text(title);

  // Add the valueline path.
  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data1))
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  point = svg.append("g")
    .attr("class", mobile.pointsvg);

    
  point.selectAll('circle')
    .data(data2)
    .enter().append('circle')
    .attr("cx", x(data2[0].date))
    .attr("cy", y(data2[0].close))
    .attr("r", 4)
    .style("fill", "red")
    .attr('stroke', 'red');

  }

  mobile.point = [point,x,y];
  mobile.blups=1;
  return [point,x,y];
}


function update_graphique_2(pointxy,data2,mobile) {
  if(pointxy[1](data2[0].date)>=0 && !isNaN(pointxy[1](data2[0].date)) && !isNaN(pointxy[2](data2[0].close))){
   
  $('.'+mobile.pointsvg).empty();
  pointxy[0].selectAll('circle')
    .data(data2)
    .enter().append('circle')
    .attr("cx", pointxy[1](data2[0].date))
    .attr("cy", pointxy[2](data2[0].close))
    .attr("r", 4)
    .style("fill", "red")
    .attr('stroke', 'red');
  }
}