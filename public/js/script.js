function sendMessage(event, socket) {
	event.preventDefault();

	let message = document.getElementById('message').value;
	let channel = document.getElementById('channel').value;
	let username = document.getElementById('username').value;
	let msgElement = document.createElement('div');
	msgElement.innerHTML = 
	`<div class="col-12">
		<div class="card sent-message">
			<div class="card-body">
				<p class="card-text">Me : ${message}</p>
			</div>
		</div>
	</div>
	`;

	let chatContainer = document.getElementById('chatContainer');
	chatContainer.insertBefore(msgElement, chatContainer.childNodes[0]);

	socket.emit('message', {username, message, channel});
	document.getElementById('message').value = '';
	document.getElementById('channel').value = '';
}

function joinChannel(event, socket) {
	event.preventDefault();
	let channel = document.getElementById('newchannel').value;
	socket.emit('joinChannel', {channel});
}

function leaveChannel(event, socket) {
	event.preventDefault();
	let channel = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', {channel});
}

function onWelcomeMessageReceived(data) {
	let msgElement = document.createElement('div');
	msgElement.innerHTML = 
	`<div class="card received-message col-12">
		<div class="card-body">
			<p class="card-text">System : ${data}</p>
		</div>
	</div>
	`;
	document.getElementById('chatContainer').appendChild(msgElement);
}

function onNewMessageReceived(data) {
	let msg = document.createElement('div');
	msg.className = 'col-12';
	msg.innerHTML = `
	<div class="card received-message col-12">
		<div class="card-body">
			<p class="card-text">System : ${data.username} : ${data.message}</p>
		</div>
	</div>
	`;
	let chatContainerList = document.getElementById('chatContainer');
	chatContainerList.insertBefore(msg, chatContainerList.childNodes[0]);
}

function onAddedToNewChannelReceived(data) {
	let channelInfo = document.createElement('option');
	channelInfo.innerHTML = data.channel;
	document.getElementById('channelsList').appendChild(channelInfo);
	const newchannalinfo = document.createElement('div');
	newchannalinfo.innerHTML = 
	`<div class="alert alert-success alert-dismissible fade show" role="alert">
		You are added to <strong>${data.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
	document.getElementById('alertContainer').appendChild(newchannalinfo);
	document.getElementById('newchannel').value = '';
}

function onRemovedFromChannelReceived(data) {
	let channelsList = document.getElementById('channelsList').children;
	let childArr = [...channelsList];
	const index = childArr.indexOf(val => val.innerHTML === data.channel)
	document.getElementById('channelsList').removeChild(childArr[index]);
	const removechannal = document.createElement('div');
	removechannal.innerHTML = 
	`<div class="alert alert-success alert-dismissible fade show" role="alert">
		You are removed to <strong>${data.channel}</strong> successfully!
		<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	`;
	document.getElementById('alertContainer').appendChild(removechannal);
	document.getElementById('newchannel').value = '';
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

