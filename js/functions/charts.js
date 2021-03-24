/*
Library used :
    - plotly for javascript, https://plotly.com/javascript/

Functions in this file :
    - new_graph

*/

function new_graph(reference_graph){
    /*
    this function create a new graph using plotly.
    */
   Plotly.purge(reference_graph);
   Plotly.newplot();
}