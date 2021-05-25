/// Document pour metre des fonctions de calcul



var calculs = calculs || (function() {
    let c=299792458;
    return {
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild
        MSC_Ex_vitess : function (E,L,r,rs,vr,ref) {
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
        /**
         * 
         * @param {*} E 
         * @param {*} L 
         * @param {*} r position de la particule en r
         * @param {*} rs rayon de schwarschild
         * @param {*} ra rayon de la masse central
         * @param {*} vr dr/dt
         * @param {*} ref choix du réferentiel
         * @returns 
         */
        ///Calcule la vitess réel en m/s pour la métrique de Schwarzchild pour une intéraction non barionique à l'intérieur de l'astre
        MSC_In_vitess : function(E,L,r,rs,ra,vr,ref){
            ap=1-((r**2)*rs)/(ra**3);
            bt=(3/2)*Math.sqrt(1-rs/ra)-(1/2)*Math.sqrt(ap);
            gtt=(c**2)*bt**2;
            dt=(E/bt**2);
            gamma=gtt*(dt)**2/(c**2);
            dphie=c*L/(r**2)
            if(ref){
                v_r=ap*(vr)**2/gamma;
            }
            else{
                v_r=ap*((vr*dt)**2)/gamma;
            }
            v_p=(r**2)*(dphi**2)/gamma;
            vtot=v_r+v_p;
            return Math.sqrt(vtot);
        },
        
        /**
         * Calcule de la vitess dans la métrique de Kerr
         * @param {*} E constante
         * @param {*} l constante
         * @param {*} a constante 
         * @param {*} r position de la particule en r
         * @param {*} rs rayon de schwarschild
         * @param {*} vr dr/dt ou dr/dtau selon le réferentiel
         * @param {*} ref choix référentiel 
         * @returns 
         */
        MK_vitess :function(E,l,a,r,rs,vr,ref){
            vr=vr;
            deta=(r**2)-(rs*r)+(a**2); ///delta dans la metric de kerr
            dt=((r**2+a**2+a*rs/r)*E-rs*a*l/r)/deta; // dt/dtau
            gtt=(-1)*(c**2)*(1-(rs/r)); 
            gtp=(-1)*(c*rs*a/r);
            dphi=(c/deta)*(rs*a*E/(r)+(1-rs/r)*l);
            gamma=(Math.sqrt(Math.abs(gtt))*dt+gtp*dphi/(Math.sqrt(Math.abs(gtt))))/c;
            gpp=r**2+(a**2)+rs*(a**2)/r;
            grr=(r**2)/deta;
            dr=(c**2)*(E**2+(rs/r)+((a**2)*(E**2-1)-l)/(r**2)+rs*((l-a*E)**2)/(r**3));
            if(ref){
                v_r=grr*(vr**2)/(gamma**2);
                 
            }
            else{
                v_r=grr*((vr*dt)**2)/(gamma**2);    
            }
            v_p=(gpp*gtt-(gtp**2))*(dphi**2)/(gtt*(gamma**2));
            //alert("gamma:"+gamma.toExponential(3).toString()+" dt :"+dt.toExponential(3).toString()+" gtt :"+gtt.toExponential(3).toString());
            vtot=math.abs(v_r+v_p);
            vtot=Math.sqrt(vtot);
            //alert(vtot);
            return vtot;
        }
    }

    
})();