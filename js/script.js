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
	const thisYear = initDate.format('YYYY');
	$('h1').append(thisYear);

	// oggetto da usare nel template di HB
	let meseCalendario = {
		meseAnno: initDate.format('MMMM YYYY').toUpperCase(),
	};

	// carico il template dell 'oggetto in una variabile 
	var html = template(meseCalendario);

	// la appendo nel DOM in container
	$('.container').append(html);



	// al click del bottone aggiungo o tolgo un mese e ristampo i giorni
	$('#prev').click(function () {
		if (initDate.format('MM') !== '01') {
			changeMonth('-1');
			printDay();
		} else {
			alert('errore');
		}
	})

	$('#next').click(function () {
		if (initDate.format('MM') !== '12') {
			changeMonth('1');
			printDay();
		} else {
			alert('errore');
		}
	})

	printDay();
	setHolidays(initDate.format('M') - 1, thisYear);





	/* funzioni */

	function setHolidays(m, year) {

		// chiamata AJAX
		$.ajax({
			method: 'GET',
			url: 'https://flynn.boolean.careers/exercises/api/holidays',
			data: {
				/* year: initDate.format('YYYY'),
				month: initDate.format('M') */
				year: year,
				month: m
			},
			success: function (obj) {

				for (let i = 0; i < obj.response.length; i++) {
					// console.log(data.response[i].date);
					let currentday = $(`p[data-set='${obj.response[i].date}'`)
					currentday.addClass('holiday').append(obj.response[i].name);
				}

				// $('p').each(function (index, value) {
				// 	let a = $(this).text();
				// 	console.log(a);
				// });

			},
			error: function () {

			}
		});

	};

	// addZero, aggiunge zero ad un numero se minore di 10
	function addZero(int) {
		if (int < 10) {
			return (`0${int}`);
		} else return int;
	}

	// cambio mese

	function changeMonth(int) {
		initDate = initDate.add(int, 'M');
		/* meseAnno = initDate.format('MMMM YYYY').toUpperCase(); */

		$('.container').empty();
		var source = $("#entry-template").html();
		var template = Handlebars.compile(source);
		let meseCalendario = {
			meseAnno: initDate.format('MMMM YYYY').toUpperCase(),
		};
		var html = template(meseCalendario);
		$('.container').append(html);
		setHolidays(initDate.format('M') - 1, thisYear);
	}


	// stampa i giorni

	function printDay() {

		$('.days').empty();
		// salvo in una var i giorni del mese corrente
		let dayInMonth = moment(initDate, 'MMMM YYYY').daysInMonth();
		// creo un ciclo per stampare i giorni correnti
		for (let i = 1; i <= dayInMonth; i++) {
			$('.days').append(`<p data-set='${initDate.format('YYYY-MM')}-${addZero(i)}'>${addZero(i)} ${initDate.format('MMMM')} </p>`);
		}
	}

});