function main() {
	var element = null;
	var tab = ["baseVerbale", "preterit", "participePasse"];
	for (var i=0; i<3; i++) {
		element = document.getElementById(tab[i]);
		element.onblur = function () {
			input_blur(this);
		};
		element.onfocus = function () {
			input_focus(this);
		};
		element.onkeydown = function (event) {
			var keyCode = (window.event) ? window.event.which : event.keyCode;
			
			var element;
			if (keyCode == 32) { //espace
				element = event.target.nextElementSibling;
				if (element !== null) {
					element.focus();
				} else {
					event.target.blur();
					_Verbe.verifier();
				}

				return false;
			} else if (keyCode == 13) { //entre
				event.target.blur();
				_Verbe.verifier();

				return false;
			} else if (keyCode == 9) { //tab
				element = event.target;
				if (element.nextElementSibling !== null) {
					element.nextElementSibling.focus();
					if (element.getAttribute("data-nom") != element.value) {
						element.nextElementSibling.value = element.value;
					}
				}

				return false;
			} else if (keyCode == 8) { //effacer
				element = event.target;
				if (element.previousElementSibling !== null && element.value.length === 0) {
					element.previousElementSibling.focus();

					return false;
				}
			}
		};
		element.value = element.getAttribute("data-nom");
		element.className = "nom";
	}

	element = document.getElementById("motAsk");
	textContent(element, element.getAttribute("data-nom"));

	textContent(document.getElementById("num_restant"), scriptDOM.verbeNonFait.length);
	textContent(document.getElementById("num_verbe"), listeVerbe.length);
	textContent(document.getElementById("num_faute"), 0);
}

function textContent(objet, valeur) {
	objet.textContent = valeur;
	objet.innerText = valeur;
}

function input_blur(element) {
	if (element.value === "") {
		element.value = element.getAttribute("data-nom");
		element.className = "nom";
	}
}

function input_focus(element) {
	if (element.value == element.getAttribute("data-nom")) {
		element.value = "";
		element.className = "";
	}
}

window.onload = function() {
	scriptDOM.verbeNonFait = listeVerbe.slice();

	main();

	_Verbe.demander();

	window.onbeforeunload = function () {
		if (5 < (listeVerbe.length - scriptDOM.verbeNonFait.length)) {
			return "Vous avez fait plus de 5 verbes justes, vous devez confirmer la fermeture";
		}
	};
};