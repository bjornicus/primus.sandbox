
var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
      <span className="messageSender">{this.props.sender}: </span>
      <span className="messageBody">{this.props.children}</span>
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
        var component = this;
        this.props.connection.on('data', function received(data) {
            var newData = component.state.data.concat([data])
            component.setState({data: newData});
            // output.value += data + '\n';
            // output.scrollTop = output.scrollHeight;
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
        <form onSubmit={this.handleSubmit}>
        <input placeholder="<recipient id>" className="recipientBox" value={this.state.sender} onChange={this.handleRecipientChange}/>
        <input placeholder="write message here" className="messageBox" value={this.state.message} onChange={this.handleMessageChange}/>
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


