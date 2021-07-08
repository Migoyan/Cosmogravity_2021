//formule appliquer aux calculs de rungekutta
function fonction(x) {
	w1 = Number(document.getElementById("omega1").value);
	w0 = Number(document.getElementById("omega0").value);
	f = ((1.5 * Math.pow(x, 2) * w1) - (1.5 * (w1 + w0 + 1)) * x) * Y(x) + x * Y(x);
	return (-Or / (Math.pow(x, 3)) - (0.5) * omegam0 / (Math.pow(x, 2)) + f * omegaDE0);
}

function valeurtest4(n, n2) {
	// 4 valeur test pour Runge-Kutta
	k[0] = fonction(n) * pas;
	j[0] = n2 * pas;

	k[1] = fonction(n + j[0] / 2) * pas;
	j[1] = (n2 + k[0] / 2) * pas;

	k[2] = fonction(n + j[1] / 2) * pas;
	j[2] = (n2 + k[1] / 2) * pas;

	k[3] = fonction(n + j[2]) * pas;
	j[3] = (n2 + k[2]) * pas;
}

function rungekutta(n) { // Fonction Runge-Kutta
	ymoinsrunge[1] = ymoinsrunge[0] + (1. / 6.) * (j[0] + 2. * (j[1] + j[2]) + j[3]);
	ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1] = ymoinsrungederiv[1] + (1. / 6.) * (k[0] + 2. * (k[1] + k[2]) + k[3]);
	ymoinsrungederiv[0] = ymoinsrungederiv[1];

	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);
	return ymoinsrunge[1];
}

function rungekutta_neg(n) { // Fonction Runge-Kutta
	ymoinsrunge[1] = ymoinsrunge[0] - (1. / 6.) * (j[0] + 2. * (j[1] + j[2]) + j[3]);
	//ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1] = ymoinsrungederiv[0] - (1. / 6.) * (k[0] + 2. * (k[1] + k[2]) + k[3]);
	//ymoinsrungederiv[0] = ymoinsrungederiv[1];

	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);
	return ymoinsrunge[1];
}

function runge_adaptatif_neg(n) {
	var delta_x = 1;
	var precision = 0.001;
	while (delta_x > precision) {
		run_0 = rungekutta_neg(n);
		pas = pas / 2;
		run_1 = rungekutta_neg(n);
		run_1 = rungekutta_neg(run_1);
		delta_x = Math.abs(run_0 - run_1);
		pas = pas * 0.9 * Math.pow(precision / delta_x, 1. / 5);
	}
	return run_0;
}

function runge_adaptatif(n) {
	var delta_x = 1;
	var precision = 0.0001;
	while (delta_x > precision) {
		var pas_temp = pas;
		run_0 = rungekutta(n);
		pas = pas / 2;
		run_1 = rungekutta(n);
		run_1 = rungekutta(run_1);
		delta_x = Math.abs(run_0 - run_1);
		if (delta_x < precision) {
			pas = pas_temp;
		}
	}
	pas *= 2;
	return run_0;
}
