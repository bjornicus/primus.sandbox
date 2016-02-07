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


//
// react stuff
//
var mockData = [
{"author": "Pete Hunt", "text": "This is one comment"},
{"author": "Jordan Walke", "text": "This is *another* comment"}
]

var Comment = React.createClass({
    render: function() {
        return ( 
            <div className = "comment">
            <h2 className = "commentAuthor"> 
            {this.props.author} 
            </h2> 
            {this.props.children} 
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
            <div className="commentList"> {commentNodes} </div>
            );
    }
});
var CommentForm = React.createClass({
    render: function() {
        return ( 
            <div className="commentForm">
            Hello, world!I am a CommentForm. 
            </div>
            );
    }
});
var CommentBox = React.createClass({  
    getInitialState: function() {
        return {data: []};
    },  
    componentDidMount: function() {
        this.setState({data: mockData});
    },
    render: function() {
        return ( 
            <div className="commentBox">
            <h1> Comments </h1> 
            <CommentList data={this.state.data} />
            <CommentForm/>
            </div>
            );
    }
});
ReactDOM.render( <CommentBox/>, document.getElementById('content') );
