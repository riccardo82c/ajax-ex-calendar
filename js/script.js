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
	/* inizializzazione locale di moment per la lingua italiana */
	moment.locale('it');

	// handlebars
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);

	// setto data iniziale del calendario
	let initDate = moment("2018-01-01");

	// oggetto da usare nel template di HB
	let meseCalendario = {
		meseAnno: initDate.format('MMMM YYYY').toUpperCase(),
	};

	// carico il template dell 'oggetto in una variabile 
	var html = template(meseCalendario);
	// la appendo nel DOM in container
	$('.container').append(html);

	// al click del bottone aggiungo o tolgo un mese
	$('#prev').click(function () {
		initDate = initDate.add('-1', 'M');
		console.log(initDate.format('DD MMMM YYYY'));
		console.log('prev');
		meseAnno = initDate.format('MMMM YYYY').toUpperCase();

	})

	$('#next').click(function () {
		initDate = initDate.add('1', 'M');
		console.log(initDate.format('DD MMMM YYYY'));
		console.log('next');
		meseAnno = initDate.format('MMMM YYYY').toUpperCase();
	})


	// salvo in una var i giorni del mese corrente
	let dayInMonth = moment(meseCalendario.meseAnno, 'MMMM YYYY').daysInMonth();


	// creo un ciclo per stampare i giorni correnti
	for (let i = 1; i <= dayInMonth; i++) {
		$('.days').append(`<p data-set='${initDate.format('YYYY-MM')}-${addZero(i)}'>${addZero(i)} ${initDate.format('MMMM')} </p>`);
	}


	// chiamata AJAX

	$.ajax({
		method: 'GET',
		url: 'https://flynn.boolean.careers/exercises/api/holidays',
		data: {
			year: 2018,
			month: 0
		},
		success: function (data) {

			for (let i = 0; i < data.response.length; i++) {
				// console.log(data.response[i].date);
				let currentday = $(`p[data-set='${data.response[i].date}'`)
				currentday.addClass('holiday').append(data.response[i].name);
			}

			// $('p').each(function (index, value) {
			// 	let a = $(this).text();
			// 	console.log(a);
			// });

		},
		error: function () {

		}
	});


	/* funzioni */

	// addZero, aggiunge zero ad un numero se minore di 10
	function addZero(int) {
		if (int < 10) {
			return (`0${int}`);
		} else return int;
	}




















});