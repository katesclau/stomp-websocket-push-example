var WebsocketConnection = function (address) {
    this.stompClient = null;
    this.socket_endpoint = address;
    this.socket = null;
}

WebsocketConnection.prototype.connect = function(callback) {
    this.socket = new SockJS(this.socket_endpoint);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, callback);
}
}

WebsocketConnection.prototype.disconnect = function() {
    if (this.stompClient != null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
}

WebsocketConnection.prototype.subscribe = function(endpoint, callback) {
    this.stompClient.subscribe(endpoint, function (event) {
        callback(JSON.parse(event.body));
    });
    console.log("Subscribed");
}

WebsocketConnection.prototype.unsubscribe = function(endpoint) {
    this.stompClient.unsubscribe(endpoint);
    console.log("Unsubscribed");
}
