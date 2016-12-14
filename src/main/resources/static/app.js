var socket = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    socket = new WebsocketConnection('/gs-guide-websocket');
    socket.connect(function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        socket.subscribe('/topic/events', function (event) {
            showGreeting(JSON.parse(event.body).content);
        });
    });
}

function disconnect() {
    if (socket != null) {
        socket.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
});

