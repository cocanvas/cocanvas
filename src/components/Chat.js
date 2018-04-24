import React, {Component} from 'react';
import Cable from 'actioncable';
// import css file?

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: ''
    };
  }

  createSocket() {
    // TODO: address will need to be changed to heroku once deployment with action cable is working
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
    // below: this.chats is an instance variable which is an action cable subscription with ChatChannel
    this.chats = cable.subscriptions.create(
      {
      channel: 'ChatChannel'
      },
      {
      connected: () => {
        console.log('connected to chat channel!');
      },
      received: (data) => {
        console.log(data);
        // need to do something like the below with content and user_id??
        // ctx.fillStyle = data.colour;
        // ctx.fillRect(data.x, data.y, tileWidth, tileHeight);
      },
      create: function(chatContent) {
        this.perform('create', {
          message: { content: chatContent.content, user_id: chatContent.user_id }
        });
      }
    });
  }

  componentWillMount() {
    this.createSocket();
  }

  updateCurrentMessage(e) {
    this.setState({
      currentMessage: event.target.value
    });
  }

  render() {
    return (
      <div className="Chat">
        <div className="chat-header">
          <p className="live-chat-heading">
            <a>Live chat</a>
          </p>
        </div>
        <div className="chat-logs-div">
          <ul className="chat-logs">
            {/* {this.renderChatLog()} */}
          </ul>
        </div>
        <div className="chat-input-div">
          <input
            className="chat-input"
            placeholder="Type a message..."
            type="text"
            value={this.state.currentMessage}
            onChange={e => this.updateCurrentMessage(e)}
          />
          <button className="send" onClick={e => this._handleSendEvent(e)}>Send</button>
        </div>
      </div>
    )
  }

  _handleSendEvent(e) {
    e.preventDefault();
    this.chats.create(this.state.currentMessage);
    this.setState({
      currentMessage: ''
    });
  }

} // final curly - end of class Chat

export default Chat
