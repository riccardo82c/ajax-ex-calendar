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

	moment.locale('it');

	let a = moment().format('MMMM Do YYYY, h:mm:ss a');
	console.log(a);



});