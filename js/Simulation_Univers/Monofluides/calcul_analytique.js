function monoEinsteinSitter(h0, temps) {
  return Math.pow(3 * h0 * 0.5, 2 / 3) * Math.pow(temps, 2 / 3);
}

function monoWeinberg(h0, temps) {
  return Math.pow(2 * h0, 1 / 2) * Math.pow(temps, 1 / 2);
}

function monoSitter(h0, temps) {
  return Math.exp(h0 * temps);
}

function monoCourbure(h0, temps) {
  return h0 * temps;
}
