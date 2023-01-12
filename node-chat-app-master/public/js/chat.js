var socket = io();

function scrollToBottom() {
    //selectors
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    var params = $.deparam(window.location.search);
    
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = $("<ol><ol>");

    users.forEach(function(user) {
        ol.append(`<li>${user}</li>`);
    });

    $("#users").html(ol);
});

socket.on('newMessage', function(message) {
    var timestamp = moment(message.createdAt).format("H:mm a");
    // $("#messages").append(`<li>${message.from} ${timestamp}: ${message.text}</li>`);

    var template = $("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        timestamp: timestamp
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var timestamp = moment(message.createdAt).format("H:mm a");
    
    // $("#messages").append(`<li>${message.from} ${timestamp}: <a target="_blank" href="${message.url}">View my current location</a></li>`)
    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        timestamp: timestamp
    });
    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $("#send-location");
locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $(this).attr('disabled', 'disabled');
    $(this).text('SENDING LOCATION ...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {
            locationButton.removeAttr('disabled');
            locationButton.text('SEND LOCATION');
        })
    }, function(err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled');
        locationButton.text('SEND LOCATION');
    });
});

