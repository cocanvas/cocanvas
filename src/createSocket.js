import Cable from 'actioncable';
const createSocket = (coord='') => {
  let cable = Cable.createConsumer('ws://localhost:3001/cable');

  return cable.subscriptions.create(
    {
      channel: 'CoordChannel'
    },
    {
      connected: (data) => {
        console.log('connected',data);
        
      },
      received: (data) => {
        console.log(data);       
       
        // let coordLogs = this.state.chatLogs;
        // chatLogs.push(data);
        // this.setState({ chatLogs: chatLogs });
      },
      create: function(data) {
        if (coord) {
          this.perform('create', {
            coordinate: { x: data.x, y: data.y, colour: data.colour, user_id: data.user_id }
          });
        }
      }
    }
  );
};

export default createSocket;
