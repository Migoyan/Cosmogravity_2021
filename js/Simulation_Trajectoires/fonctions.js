/// Document pour metre des fonctions de calcul



var calculs = calculs || (function() {
    const g= 6.6742*10**(-11);
    const c=299792458;
    return {
        vitess : function (mobile,rs,photon,vr,vp) {
            var vtot=0;
            vtot=(1-(rs/mobile.r_part))**2;
            vtot=1/vtot;
            vtot*=(vr**2+(1-(rs/mobile.r_part))*Math.pow(mobile.r_part*vp,2));
            if(photon != true){
            }
            return Math.sqrt(vtot);
        }
    }

    
})();