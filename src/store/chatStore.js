import { observable, action } from 'mobx';
import io from 'socket.io-client/dist/socket.io';

class chatStore {
  @observable
  messages = [];

  init = async () => {
    console.log('chat init');
    const socket = await io.connect('http://localhost:3000', {
      query: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTNjMjJiZWFjZWQ5NjQ3NjQ1YjlmZWIiLCJpYXQiOjE1ODA5OTkzNTh9.l7YWtI5Fr478DO-Z0L1terNZ3JDt_qh6UIQlW2JKVhc',
      },
    });

    socket.on('chat message', socket => {
      console.log('Socket connected!', socket);

      //this.socket.join('lale', msg => console.log('2.', msg));

      //test.broadcast.emit('chat message', { test: 'test' });
    });

    socket.on('lale', test => console.log('test', test));
  };
}

export const chat = new chatStore();
