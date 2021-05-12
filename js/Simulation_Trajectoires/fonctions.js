/// Document pour metre des fonctions de calcul



var calculs = calculs || (function() {
    const c=299792458;
    return {
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild
        vitessSc : function (E,r,rs,vr,vphi,ref) {
            var vtot=0;
            if(ref){ // calcule dans le référentiel du spationnaute 
                grr=1/(1-(rs/r)); // élement de métrique liée a dr
                gtt=(c**2)*(1-(rs/r)); //élement de métrique liée a dt
                dt=E/(1-(rs/r)); //dt/dtau ou dt/dlambda pour photon
                gamma=gtt*(dt)**2/(c**2); 
                v_r=grr*(vr**2)/gamma;
                v_p=(r**2)*(vphi**2)/gamma;
                vtot=v_r+v_p;
            }
            else{ // calcule dans le référentiel distant 
                grr=1/(1-(rs/r));
                gtt=(c**2)*(1-(rs/r));
                dt=E/(1-(rs/r));
                gamma=gtt*(dt)**2/(c**2);
                v_r=grr*((vr*dt)**2)/gamma;
                v_p=(r**2)*((vphi*dt)**2)/gamma;
                vtot=v_r+v_p; 
            }
            return Math.sqrt(vtot);
        }
    }

    
})();