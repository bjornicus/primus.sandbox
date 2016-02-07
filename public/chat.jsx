// var output = document.getElementById('output'),
// recipientBox = document.getElementById('recipientBox'),
// messageBox = document.getElementById('messageBox');

// //
// // Tell primus to create a new connect to the current domain/port/protocol
// //
// var primus = new Primus();

// //
// // Listen for incoming data and log it in our textarea.
// //
// primus.on('data', function received(data) {
//     output.value += data + '\n';
//     output.scrollTop = output.scrollHeight;
// });

// //
// // Listen for submits of the form so we can send the message to the server.
// //
// document.getElementById('write').onsubmit = function submit(e) {
//     if (e && e.preventDefault) e.preventDefault();

//     //
//     // Write the typed message.
//     //
//     var data = {
//         recipient: recipientBox.value,
//         message: messageBox.value
//     }
//     primus.write(data);
//     messageBox.value = '';
// };



var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
      <h2 className="commentAuthor">
      {this.props.author}
      </h2>
      <span>{this.props.children}</span>
      </div>
      );
}
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
        //this.setState({data: data});
    },
    handleCommentSubmit: function(comment) {
        // stuff
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        //this.loadCommentsFromServer();
    },
    render: function() {
        return (
          <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
          </div>
          );
    }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
        {comment.text}
        </Comment>
        );
  });
    return (
      <div className="commentList">
      {commentNodes}
      </div>
      );
}
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
},
handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
},
handleTextChange: function(e) {
    this.setState({text: e.target.value});
},
handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
  }
  this.props.onCommentSubmit({author: author, text: text});
  this.setState({author: '', text: ''});
},
render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
      <input
      type="text"
      placeholder="Your name"
      value={this.state.author}
      onChange={this.handleAuthorChange}/>
      <input
      type="text"
      placeholder="Say something..."
      value={this.state.text}
      onChange={this.handleTextChange}/>
      <input type="submit" value="Post" />
      </form>
      );
}
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
  );

