# SimpleChat
Simple React Node Websocket chat server and client


The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.
* [Read More](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

This appliction integrates with redux by passing a thunk to the onmessage recieve function.
```javascript
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
	...
  	const middleware=[thunkMiddleware.withExtraArgument({ send }), logger];
  	const store = createStore(
    		rootReducer,
    		initialState,
    		applyMiddleware(...middleware),
  	);
  	receive(store.dispatch);
```
