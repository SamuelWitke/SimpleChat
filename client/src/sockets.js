const Singleton = (() => {
	// Instance stores a reference to the Singleton
	var instance;

	function init() {
		// Singleton

		// Private methods and variables
		let	HOST = "ws://localhost:8080";
		if(process.env.NODE_ENV === "production"){
			HOST = window.location.origin.replace(/^http/, 'ws')
		}

		return {
			// Public methods and variables
			getSocket: function() {
				return new WebSocket(HOST);
			}

		};

	};

	return {

		// Get the Singleton instance if one exists
		// or create one if it doesn't
		getInstance: function () {
			if ( !instance ) {
				instance = init();
			}

			return instance.getSocket();
		}

	};

})();

				export const setupWebsocket = () =>
					new Promise((resolve, reject) => {
						const webSocket = Singleton.getInstance();
						const receive = (onMessageCb) => {
							webSocket.onmessage = (event) => onMessageCb(JSON.parse(event.data));
						};

						const send = (type, payload) =>
							webSocket.send(JSON.stringify({ type, payload }));

						webSocket.onopen = () => resolve({ send, receive });
						webSocket.onclose = () => {
							webSocket.close();
							reject(new Error("WebSocket Closed"));
						}
					});
