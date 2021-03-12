/* Calcul de rmax */
// on cherche les valeurs de r qui annulent  dr/dtau
function eq3d(L, m, E) {
  var a, b, c, d, gDelta, x, y, z, u, v, p, q, m, n, theta, k;
  a = 1 - Math.pow(E, 2);
  b = -2 * m;
  c = Math.pow(L, 2);
  d = -2 * m * Math.pow(L, 2);
  p = (c / a) - (Math.pow(b, 2.0) / (3 * Math.pow(a, 2.0)));
  q = ((2 * Math.pow(b, 3.0)) / (27 * Math.pow(a, 3.0))) - ((b * c) / (3 * Math.pow(a, 2.0))) + (d / a);
  gDelta = 4 * Math.pow(p, 3.0) + 27 * Math.pow(q, 2.0);
  m = ((-q) / 2) + (0.5) * Math.sqrt(gDelta / 27);
  n = ((-q) / 2) - (0.5) * Math.sqrt(gDelta / 27);
  u = Math.pow(Math.abs(m), 1.0 / 3);
  v = Math.pow(Math.abs(n), 1.0 / 3);
  if (gDelta > 0) {
    if (m < 0) {
      u = -u;
    }
    if (n < 0) {
      v = -v;
    }
    x = u + v;
    x += (-b) / (3 * a);
    return x;
  } else if (gDelta == 0) {
    if (b == 0 && c == 0 && d == 0) {
      return 0;
    } else {
      x = (3 * q) / p;
      x += (-b) / (3 * a);
      y = (-3 * q) / (2 * p);
      y += (-b) / (3 * a);
      if (x >= y) {
        return x;
      } else {
        return y;
      }
    }
  } else {
    k = (3 * q) / ((2 * p) * Math.sqrt((-p) / 3));
    
    
    
    //k peux etre legerment superieur a 1 ou inferieur a -1 et donc sortir du domaine de definition de arccos, donc on fait attention a que cela ne se produise pas 
    //sinon on a des problemes de theta undefined (ce qui provoque des problemes d'affichage du graphe dans certains navigateurs (firefox) meme si dans d'autre non (chrome))
    //l'erreur doit surement etre rattrapé dans les navigateurs qui marchent
    
    if(k>1){
		k=1;
    }
    else if(k<-1){
		k=-1;
    }
    theta = Math.acos(k);

    x = 2 * Math.sqrt((-p) / 3) * Math.cos(theta / 3);
    y = 2 * Math.sqrt((-p) / 3) * Math.cos((theta + 2 * Math.PI) / 3);
    z = 2 * Math.sqrt((-p) / 3) * Math.cos((theta + 4 * Math.PI) / 3);
    if (x > -1E-6 && x < 1E-6) {
      x = 0.0;
    }
    if (y > -1E-6 && y < 1E-6) {
      y = 0.0;
    }
    if (z > -1E-6 && z < 1E-6) {
      z = 0.0;
    }
    x += (-b) / (3 * a);
    y += (-b) / (3 * a);
    z += (-b) / (3 * a);
    if (x >= y) {
      if (x >= z) {
        return x;
      } else {
        return z;
      }
    } else {
      if (y >= z) {
        return y;
      } else {
        return z;
      }
    }
  }
}
