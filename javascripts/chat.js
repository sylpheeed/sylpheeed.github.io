$(function () {
    var s_url = '78.46.100.78:4204',
        socket = false,
        chat,
        writable = false,
        text,
        message_box = $('#message_box'),
        message_text = $('#message_text'),
        message_input = $('#send_message');

    chat = {
        connect: function () {
            this.set_binders();
            this.add_info('trying connect to server...', 'warning');
            if (window.io) {
                socket = io.connect('http://' + s_url);
                this.set_listeners();
            }
            else
                this.add_info('Unable connect to server', 'error');
        },

        send_message: function (text) {
            socket.emit('message', {m: text})
        },


        set_binders: function () {

            message_text.keypress(function (e) {
                if (e.which == 13) {
                    message_input.trigger('click');
                }
            });

            message_input.click((function () {
                if (writable) {
                    text = message_text.val();
                    if (text != '') {
                        this.send_message(text);
                        this.add_message('[You]: '+text);
                        message_text.val('');
                    }
                    else
                        this.add_info('Message cannot be blank', 'error');
                } else {
                    this.add_info('Sorry, but server is not connected', 'error');
                }
            }).bind(this));
        },

        set_listeners: function () {
            socket.on('connect', (function () {
                this.add_info('successfully connected', 'success');
                writable = true;
            }).bind(this));

            socket.on('message', (function (data) {
                this.add_message(data.m);
            }).bind(this));

        },

        add_info: function (m, type) {
            if (!type)
                type = 'warning';
            toastr[type](m);
        },

        add_message: function (m, u) {
            m = '<div>' + m + '</div>';
            message_box.append(m);
            message_box.animate({ scrollTop: message_box[0].scrollHeight}, 100);
        }
    };

    chat.connect();

});

