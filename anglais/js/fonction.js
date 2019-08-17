var scriptDOM = {
	verbeActuel:0,
	verbeNonFait:[],
	verbeAttente:false,
	verbeAttenteTimeout:null
};

var _Verbe = {
	verifier:function () {
		var tab = ["baseVerbale", "preterit", "participePasse"];

		if (!scriptDOM.verbeAttente) {
			var C = true;
			var HTML = "<tr>";
			HTML += '<td>'+scriptDOM.verbeNonFait[scriptDOM.verbeActuel][3]+'</td>';

			var element = null;
			for (var i=0; i<3; i++) {
				element = document.getElementById(tab[i]);
				if (element.value != scriptDOM.verbeNonFait[scriptDOM.verbeActuel][i]) {
					C = false;
					element.value = scriptDOM.verbeNonFait[scriptDOM.verbeActuel][i];
					element.className = "faux";
					HTML += '<td class="faux">X</td>';
				} else {
					element.className = "correct";
					HTML += '<td>'+element.value+'</td>';
				}
				element.disabled = false;
			}

			HTML += "</tr>";

			element = document.getElementById("logVerbe");

			element.innerHTML = HTML + element.innerHTML;
			
			scriptDOM.verbeAttente = true;

			var seconde = 2000;
			if (C) {
				scriptDOM.verbeNonFait.splice(scriptDOM.verbeActuel, 1);
				textContent(document.getElementById("num_restant"), scriptDOM.verbeNonFait.length);
				seconde = 500;
			} else {
				document.getElementById("num_faute").textContent++;
			}
			scriptDOM.verbeAttenteTimeout = setTimeout(function () {
				_Verbe.verifier();
			}, seconde);
		} else {
			clearTimeout(scriptDOM.verbeAttenteTimeout);
			for (var i=0; i<3; i++) {
				var element = document.getElementById(tab[i]);
				element.value = element.getAttribute("data-nom");
				element.className = "nom";
			}

			scriptDOM.verbeAttente = false;
			this.demander();
		}
	},
	demander:function () {
		if (scriptDOM.verbeNonFait.length === 0) {
			alert("Vous avez fini !");
			scriptDOM.verbeNonFait = listeVerbe.slice();
			textContent(document.getElementById("num_restant"), scriptDOM.verbeNonFait.length);
			textContent(document.getElementById("num_verbe"), listeVerbe.length);
			textContent(document.getElementById("num_faute"), 0);
		}
		scriptDOM.verbeActuel = Math.floor(Math.random()*scriptDOM.verbeNonFait.length);

		element = document.getElementById("motAsk");
		textContent(element, scriptDOM.verbeNonFait[scriptDOM.verbeActuel][3]);
		document.getElementById("baseVerbale").focus();
	}
}