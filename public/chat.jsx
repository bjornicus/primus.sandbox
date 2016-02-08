// var output = document.getElementById('output'),
// recipientBox = document.getElementById('recipientBox'),
// messageBox = document.getElementById('messageBox');




// //
// // Listen for submits of the form so we can send the message to the server.
// //
// document.getElementById('write').onsubmit = function submit(e) {

// };



var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
      <span class="messageSender">{this.props.sender}</span>
      <span class="messageBody">{this.props.children}</span>
      </div>
      );
}
});

var ChatBox = React.createClass({
    handleMessageSubmit: function(data) {
        this.props.connection.write(data);
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        //
        // Listen for incoming data and log it in our textarea.
        //
        var component = this;
        this.props.connection.on('data', function received(data) {
            component.setState({data: [{sender: '?', message: data}]});
            output.value += data + '\n';
            output.scrollTop = output.scrollHeight;
        });
    },
    render: function() {
        return (
          <div className="chatBox">
          <h1>Messages</h1>
          <MessageList data={this.state.data} />
          <MessageForm onMessageSubmit={this.handleMessageSubmit} />
          </div>
          );
    }
});

var MessageList = React.createClass({
  render: function() {
    var messageNodes = this.props.data.map(function(message) {
      return (
        <Message sender={message.sender}>
        {message.message}
        </Message>
        );
  });
    return (
      <div className="messageList">
      {messageNodes}
      </div>
      );
}
});

var MessageForm = React.createClass({
  getInitialState: function() {
    return {recipient: '', message: ''};
},
handleRecipientChange: function(e) {
    this.setState({recipient: e.target.value});
},
handleMessageChange: function(e) {
    this.setState({message: e.target.value});
},
handleSubmit: function(e) {
    e.preventDefault();
    var recipient = this.state.recipient.trim();
    var message = this.state.message.trim();
    if (!message) {
      return;
  }
  this.props.onMessageSubmit({recipient: recipient, message: message});
  this.setState({recipient: '', message: ''});
},
render: function() {
    return (
        <form id="write" onSubmit={this.handleSubmit}>
        <textarea id="output" readonly></textarea>
        <input placeholder="<recipient id>" id="recipientBox" value={this.state.sender} onChange={this.handleRecipientChange}/>
        <input placeholder="write message here" id="messageBox" value={this.state.text} onChange={this.handleMessageChange}/>
        <button type="submit">Send</button>
        </form>  
        );
}
});

var MultiChat = React.createClass({
  render: function() {
    var primus = new Primus();
    var primus2 = new Primus();
    return (
        <div>
        <ChatBox connection={primus} />
        <ChatBox connection={primus2} />
        </div>
      );
}
});

ReactDOM.render(
  <MultiChat />,
  document.getElementById('content')
  );


