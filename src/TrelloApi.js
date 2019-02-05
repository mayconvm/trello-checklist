class TrelloApi
{
	constructor(props) {
	 	if (Trello === undefined) {
	 		throw new Error("SDK Trello not found.");
	 	}

	 	this.resultPromises = []
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
		let cont = 1;
		const that = this;
		
		// a gambiarra das gambiarras para criar uma lista ordenada
		for (item of listRoot) {
			this.resultPromises.push(
				function (item, cont) {
					return new Promise((resolve, reject) => {
						const res = (r) => {
							resolve(item.thenCallback? item.thenCallback(r) : null);
						}

						const rej = (r) => {
							console.error(r);
							reject(item.crachCallback? item.crachCallback(r) : null);
						}

						setTimeout(
							() => that.apiPOST(url, item.getData())
								.then(res)
								.catch(rej)
						, cont);
					});
				} (item, (cont * 2) * 100)
			);
			
			cont++;
		}

		return Promise.all(this.resultPromises);
	}
}