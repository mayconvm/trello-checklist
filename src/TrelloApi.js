class TrelloApi
{
	constructor(props) {
	 	if (Trello === undefined) {
	 		throw new Error("SDK Trello not found.");
	 	}
	}

	login() {
		console.log("Solicitando permissão para a aplicação.");

		return new Promise((resolve, reject) => {
		    Trello.authorize({
		      type: 'popup',
		      name: 'LocalHost Gerador de cards',
		      scope: {
		        read: 'true',
		        write: 'true' },
		      expiration: 'never',
		      success: resolve,
		      error: reject
		    });
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			try {
				Trello.deauthorize();
				return resolve();
			} catch (e) {
				return reject();
			}
		})
	}

	apiPOST(url, data) {
		return new Promise((resolve, reject) => {
			Trello.post(url, data, resolve, reject);
		});
	}
}