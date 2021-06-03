/// Document pour metre des fonctions de calcul



var calculs = calculs || (function() {
    let c=299792458;
    return {
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild
         /**
         * 
         * @param {*} E constant de la metrique 
         * @param {*} L constant de la metrique 
         * @param {*} r position de la particule en r
         * @param {*} rs rayon de schwarschild
         * @param {*} ra rayon de la masse central
         * @param {*} ref choix du réferentiel
         * @returns 
         */
        MSC_Ex_vitess : function (E,L,r,rs,photon) {
            var vtot=0;
            dt=E/(1-(rs/r)); //dt/dtau ou dt/dlambda pour photon
            dphi=c*L/(r**2);// dphi/dtau ou dphi/dlambda pour photon
            if(photon){ // calcule photon
                dr=(c/E)**2*(1-rs/r)**2*(E**2-(1-rs/r)*((L/r)**2));
            }
            else{ // calcule particule
                dr=(c/E)**2*(1-rs/r)**2*(E**2-(1-rs/r)*(1+(L/r)**2));
            }
            vtot=Math.abs((dr+(1-rs/r)*(r**2)*(dphi/dt)**2)/(1-rs/r)**2);
            return Math.sqrt(vtot);
        },
        /**
         * 
         * @param {*} E constant de la metrique 
         * @param {*} L constant de la metrique 
         * @param {*} r position de la particule en r
         * @param {*} rs rayon de schwarschild
         * @param {*} ra rayon de la masse central
         * @param {*} ref choix du réferentiel
         * @returns 
         */
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild pour une intéraction non barionique à l'intérieur de l'astre
        MSC_In_vitess : function(E,L,r,rs,ra,photon){
            ap=1-((r**2)*rs)/(ra**3);
            bt=(3/2)*Math.sqrt(1-rs/ra)-(1/2)*Math.sqrt(ap);
            dphie=c*L*(bt**2)/(E*(r**2));
            if(photon){
                dr=((c/E)**2)*ap*(bt**4)*((E/bt)**2-(L/r)**2);
            }
            else{
                dr=((c/E)**2)*ap*(bt**4)*((E/bt)**2-(L/r)**2-1);
            }
            vtot=(dr+ap*(r*dphi)**2)/(ap*(bt**2));
            return Math.sqrt(Math.abs(vtot));
        },
        
        /**
         * Calcule de la vitess dans la métrique de Kerr
         * @param {*} E constante
         * @param {*} l constante
         * @param {*} a constante 
         * @param {*} r position de la particule en r
         * @param {*} rs rayon de schwarschild
         * @param {*} ref choix référentiel 
         * @returns 
         */
        MK_vitess :function(E,l,a,r,rs,photon){
            deta=(r**2)-(rs*r)+(a**2); ///delta dans la metric de kerr
            dt=((r**2+a**2+a*rs/r)*E-rs*a*l/r)/deta; // dt/dtau
            dphi=(c/deta)*(rs*a*E/(r)+(1-rs/r)*l);
            //dphi=c*L/(r**2)/(E/(1-(rs/r)));
            if(photon){
                dr=(c**2)*(E**2+((a**2)*(E**2)-l**2)/(r**2)+rs*((l-a*E)**2)/(r**3));
                //dr=(c/E)**2*(1-rs/r)**2*(E**2-(1-rs/r)*((L/r)**2))/(E/(1-(rs/r)))**2;

            }
            else{
                dr=(c**2)*(E**2-1+rs/r+((a**2)*(E**2-1)-l**2)/(r**2)+rs*((l-a*E)**2)/(r**3));

            }
            vtot=(1-rs/r)*((dr/dt**2)/deta+(deta/(1-rs/r))*(dphi/dt)**2)/((1-rs/r+(rs*a/(c*r))*(dphi/dt)**2)**2);
            //vtot=Math.abs((dr+(1-rs/r)*(r**2)*(dphi)**2)/(1-rs/r)**2);
            vtot=Math.sqrt(Math.abs(vtot));
            //alert(vtot);
            return vtot;
        }
    }

    
})();