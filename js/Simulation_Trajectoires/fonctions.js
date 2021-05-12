/// Document pour metre des fonctions de calcul



var calculs = calculs || (function() {
    const c=299792458;
    return {
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild
        vitessSc : function (E,L,r,rs,vr,ref) {
            var vtot=0;
            grr=1/(1-(rs/r)); // élement de métrique liée a dr
            gtt=(c**2)*(1-(rs/r)); //élement de métrique liée a dt
            dt=E/(1-(rs/r)); //dt/dtau ou dt/dlambda pour photon
            gamma=gtt*(dt)**2/(c**2);
            dphi=c*L/(r**2);// dphi/dtau ou dphi/dlambda pour photon
            if(ref){ // calcule dans le référentiel du spationnaute 
                v_r=grr*(vr**2)/gamma;
                v_p=(r**2)*(dphi**2)/gamma;
                vtot=v_r+v_p;
            }
            else{ // calcule dans le référentiel distant 
               
                v_r=grr*((vr*dt)**2)/gamma;
                v_p=(r**2)*((dphi)**2)/gamma;
                vtot=v_r+v_p; 
            }
            return Math.sqrt(vtot);
        },

        vitessKer :function(E,r,rs,vr,vphi){

        }
    }

    
})();