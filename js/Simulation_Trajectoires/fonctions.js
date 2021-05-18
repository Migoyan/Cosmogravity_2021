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
        vitessInterSc : function(E,L,r,rs,ra,vr,ref){
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

        vitessKer :function(E,l,a,r,rs,vr,ref){
            deta=(r**2)-rs*r+a**2;
            dt=((r**2+a**2+a*rs/r)*E-rs*a*l/r)/deta;
            gtt=math.abs((c**2)*(1-(rs/r)));
            gtp=(-1)*(c*rs*a/r)
            dphi=(c/deta)*(rs*a*E/r+(1-rs/r)*l);
            gamma=(Math.sqrt(gtt)*dt+gtp*dphi/Math.sqrt(gtt))/c;
            gpp=r**2+(a**2)+rs*(a**2)/r;
            grr=(r**2)/deta;
            if(ref){
                v_r=grr*(vr**2)/(gamma**2);
                
            }
            else{
                v_r=grr*(vr*dt)**2/(gamma**2);    
            }
            v_p=(gpp*gtt-(gtp**2))*(dphi**2)/(gtt*(gamma**2));
            vtot=math.abs(v_r+v_p);
            vtot=Math.sqrt(vtot);
            //alert(vtot);
            return vtot;
        }
    }

    
})();