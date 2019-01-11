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

	pushList(url, listRoot) {
		const funcRecusive = (list) => {
			const item = list.splice(0, 1)[0];

			if (item === undefined) {
				return Promise.resolve();
			}

			return new Promise((resolve, reject) => {
				const res = (r) => {
					item.thenCallback? item.thenCallback(r) : null;

					funcRecusive(list)
				}

				const rej = (r) => {
					item.crachCallback? item.crachCallback(r) : null;

					funcRecusive(list)
				}

				this.apiPOST(url, item.getData())
				.then(res)
				.catch(rej);
			});
		}

		return funcRecusive(listRoot)
	}
}