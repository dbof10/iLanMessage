import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {subscribeToMessages} from "./chat/chatThunk";
import MessageList from "./components/messageList";
import ChatInput from "./components/chatInput";
import {AppDispatch} from "./store";
import {Toaster} from "react-hot-toast";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(subscribeToMessages());
  }, [dispatch]);

  return (
      <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
          }}
      >
          <MessageList />
          <ChatInput />
          <Toaster
              position="top-right"
              toastOptions={{
                  duration: 4000,
              }}
          />
      </div>

  );
}

export default App;
