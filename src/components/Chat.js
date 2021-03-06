import React, { Component } from 'react';
import Cable from 'actioncable';
import getUserFromToken from '../getUserFromToken';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
      user_id: '',
      chatLogs: []
    };
    // ref for auto scroll div
    this.messagesEnd = React.createRef();
  }

  // when component is about to be loaded to the DOM
  componentWillMount() {
    this.createSocket();
  }

  // just after component has been loaded to the DOM
  componentDidMount() {
    const user = getUserFromToken();
    if (user) {
      this.setState({
        user_id: user.user_id
      });
    }
    fetch('https://cocanvas-server.herokuapp.com/chat_messages.json', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${window.localStorage.cocanvasAuthToken}`,
        'Content-Type': 'application/json'
      }
    }).then((res) =>
      res.json().then((data) => {
        this.setState({ chatLogs: data });
      })
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  _handleSendEvent(e) {
    this.chats.create(this.state);
    this.setState({
      currentMessage: ''
    });
    this.scrollToBottom();
  }

  _handleChatInputKeyPress(e) {
    if (e.key === 'Enter') {
      this._handleSendEvent(e);
    }
  }

  createSocket = () => {
    let cable = Cable.createConsumer('wss://cocanvas-server.herokuapp.com/cable');
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
          let chatLogs = this.state.chatLogs;
          chatLogs.push(data);

          this.setState({ chatLogs: chatLogs });
        },
        create: function(state) {
          this.perform('create', {
            message: { content: state.currentMessage, user_id: state.user_id }
          });
        }
      }
    );
  };

  scrollToBottom = (e) => {
    this.messagesEnd.current && this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  updateCurrentMessage(e) {
    this.setState({
      currentMessage: e.target.value
    });
  }

  renderChatLog = () => {
    return this.state.chatLogs.map((el) => {
      return (
        <div key={`chat_${el.id}`}>
          <p>
            <span className="chat-user">{el.username} </span>
            <span>&nbsp;</span>
            <span className="chat-created-at">{`${new Date(el.created_at).getHours()}:${new Date(
              el.created_at
            ).getMinutes()}`}</span>
          </p>
          <p>
            <span className="chat-message">{el.content}</span>
          </p>
        </div>
      );
    });
  };

  render() {
    return this.state.user_id ? (
      <div className="Chat">
        <div className="chat-header">
          <a className="close-chat" id="close-chat-button">
            Live chat
            <span className="collapse">
              <img className="down-arrow" src="./css/images/close.svg" />
            </span>
          </a>
        </div>
        <div className="chat-logs-div">
          <div className="chat-logs">{this.renderChatLog()}</div>
          <div style={{ float: 'left', clear: 'both' }} ref={this.messagesEnd} />
        </div>
        <div className="chat-input-div">
          <input
            onKeyPress={(e) => this._handleChatInputKeyPress(e)}
            className="chat-input"
            placeholder="Type a message"
            type="text"
            value={this.state.currentMessage}
            onChange={(e) => this.updateCurrentMessage(e)}
          />
          <button className="send" onClick={(e) => this._handleSendEvent(e)}>
            Send
          </button>
        </div>
      </div>
    ) : (
      <p />
    );
  }
} // final curly - end of class Chat

export default Chat;
