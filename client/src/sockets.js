const Singleton = (() => {
    // Instance stores a reference to the Singleton
    var instance;
   
    function init() {
      // Singleton
   
      // Private methods and variables
     const AppConfig = {
        PROTOCOL: "ws",
        HOST: "localhost",
        PORT: "4000/"
      }
      if(process.env.NODE_ENV === "production"){
         AppConfig.HOST = ""; 
      }
   
      return {
        // Public methods and variables
        getSocket: function() {
          return new WebSocket(`${AppConfig.PROTOCOL}://${AppConfig.HOST}:${AppConfig.PORT}`);
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
