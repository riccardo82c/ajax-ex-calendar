/* Descrizione: Creiamo un calendario dinamico con le festività.
	Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018(unici dati disponibili sull’ API).
	Milestone 1
	Creiamo il mese di Gennaio,
	e con la chiamata all 'API inseriamo le festività.

	Milestone 2
	Diamo la possibilità di cambiare mese,
	gestendo il caso in cui l’ API non possa ritornare festività.

	Attenzione!
	Ogni volta che cambio mese dovrò: Controllare se il mese è valido(per ovviare al problema che l’ API non carichi holiday non del 2018)
	Controllare quanti giorni ha il mese scelto formando così una lista
	Chiedere all’ API quali sono le festività per il mese scelto
	Evidenziare le festività nella lista */

$(function () {

	/* let a = moment().format('MMMM Do YYYY, h:mm:ss a');
	console.log(a); */

	/* inizializzazione locale di moment per la lingua italiana */
	moment.locale('it');

	// handlebars
	var source = document.getElementById("entry-template").innerHTML;
	var template = Handlebars.compile(source);

	let initDate = moment("2018-01-01")


	console.log(initDate.format('DD MMMM YYYY'));

	// data corrente con mese e anno
	// let monthYear = moment('08 2018').format('MM YYYY');
	// let month = moment().format('MMMM');
	// let nDay = moment('').daysInMonth();
	// console.log(month);

	// oggetto da usare nel template di HB
	var meseCalendario = {
		meseAnno: initDate.format('MMMM YYYY').toUpperCase(),
	};



	// carico il template dell 'oggetto in una variabile 
	var html = template(meseCalendario);
	// la appendo nel DOM in container
	$('.container').append(html);

	// 


	let dayInMonth = moment(meseCalendario.meseAnno, 'MMMM YYYY').daysInMonth();
	console.log(dayInMonth);

	for (let i = 0; i <= dayInMonth; i++) {
		$('.days').append(`<p>${addZero(i)}</p>`);


	}




	/* funzioni */

	// addZero, aggiunge zero ad un numero se minore di 10

	function addZero(int) {
		if (int < 10) {
			return (`0${int}`);
		} else return int;
	}




















});