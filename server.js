function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', user => {
			socket.emit('welcomeMessage', `Welcome ${user.username} !!`);

			if(user.channels) {
				user.channels.map(channel => {
					socket.join(channel);
					socket.emit('addedToChannel', { channel });
				});
			}

			socket.on('joinChannel', data => {
				socket.join(data.channel);
				socket.emit('addedToChannel', {channel: data.channel});
			});

			socket.on('message', data => {
				socket.to(data.channel).emit('newMessage', {
					username: data.username,
					message: data.message,
					channel: data.channel
				});
			});

			socket.on('leaveChannel', data => {
				socket.leave(data.channel);
				socket.emit('removedFromChannel', {channel: data.channel});
			});
		});
	});
}

module.exports = bootstrapSocketServer;
