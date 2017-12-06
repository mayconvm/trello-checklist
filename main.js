// id da dashboard
const BOARD = "55d5487fb929f379cf626053";
const LIST = "58a5059770795a1522dffe14";
const LISTCHECK = "5653be94f6194a87a4af2beb";

const ARRAY_CHECKLIST = {
	"Padrao": "57a942fc94852c5694a90ddd",
	"ContasPagar": "57ac514241c9d60b6a533b6f",
	"Sexta": "5769eefc20160bef0d28cd37",
	"UptimeAudio": "5769eedb31d19f6f1c33c645",
	"UptimeExercicio": "576b424b37aa976d5baeee5e",
}


const MES = [
	'Janeiro',
	'Feveriro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]


const NOW = new Date();

const MONTH_NOW = NOW.getMonth();


function init()
{
	login(function (status) {
		if (!status) {
			return console.error('Não foi possível logar.');
		}

		// lista eles em um combobox[multiline]
		let inputLists = document.querySelectorAll(".checklists");

		for (let i in ARRAY_CHECKLIST) {
			for (item of inputLists) {
				item.options.add(new Option(i, ARRAY_CHECKLIST[i]));
			}
		}
	});
}

function logout() {
	Trello.deauthorize();
}

function login(callback) {

	console.log("Solicitando permissão para a aplicação.")
	var authenticationSuccess = function() { callback(true); };
	var authenticationFailure = function() { callback(false); };

	Trello.authorize({
	  type: 'popup',
	  name: 'LocalHost Gerador de cards',
	  scope: {
	    read: 'true',
	    write: 'true' },
	  expiration: 'never',
	  success: authenticationSuccess,
	  error: authenticationFailure
	});
}

function createListMes(callback) {
	var error = function(errorMsg) {
	  console.log(errorMsg);
	  callback(false, errorMsg);
	};

	var creationSuccess = function(data) {
		console.log(data);
		callback(true, data);
	};

	let objNewlist = {
		"name": MES[NOW.getMonth()],
		"idBoard": BOARD,
		"pos": "top"
	}

	Trello.post('/list', objNewlist, creationSuccess, error)
}

function adicionaChecklist(data, checklist, callback) {
	var error = function(errorMsg) {
	  console.log(errorMsg);
	  callback(false);
	};

	var creationSuccess = function(dataCard) {
		console.log(dataCard);
		callback(true);
	};	

	let newChecklist = {
		"name": data.name + "-" + checklist,
		"idChecklistSource": ARRAY_CHECKLIST[checklist],
	}

	Trello.post('/cards/' + data.id + '/checklists', newChecklist, creationSuccess, error);
}

function createAllDayCards(status, data) {

	if (!status) {
		return console.error("Não foi possível criar um nova lista");
	}

	let nameCard = NOW.getDate() + "-" + (NOW.getMonth() + 1);

	createCard(nameCard, data, function () {

		NOW.setDate(NOW.getDate() + 1);

		if (NOW.getMonth() != MONTH_NOW) {
			return;
		}

		createAllDayCards (true, data);
	});



	function createCard(nameCard, data, callback) {
		let error = function(errorMsg) {
		  console.log(errorMsg);
		  callback(false);
		};

		let creationSuccess = function(dataCard) {
		  console.log('Card created successfully. Data returned:' + JSON.stringify(dataCard));

		  // adiciona os checklists
		  adicionaChecklist(dataCard, 'Padrao', callback);

		  // sexta feira
		  if (NOW.getDay() == 5) {
		  	adicionaChecklist(dataCard, 'Sexta', function() {});
		  }

		  // caso seja o quinta dia útil
		  if (NOW.getDate() == 7) {
		  	adicionaChecklist(dataCard, 'ContasPagar', function() {});
		  }

		  // caso seja o primeiro dia da semana
		  if (NOW.getDay() == 1) {
		  	adicionaChecklist(dataCard, 'UptimeAudio', function() {});
		  	adicionaChecklist(dataCard, 'UptimeExercicio', function() {});
		  }
		};

		let newCard = {
		  name: nameCard, 
		  desc: 'HOJE',
		  // Place this card at the top of our list 
		  idList: data.id,
		  pos: 'bottom',
		  due: NOW
		};
		Trello.post('/cards/', newCard, creationSuccess, error);
	}
}

function initCreate() {
	createListMes(createAllDayCards);
}