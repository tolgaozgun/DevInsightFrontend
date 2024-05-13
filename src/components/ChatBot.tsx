import { GoogleGenerativeAI } from '@google/generative-ai';
import { Box, Button, Container, Group, Textarea } from '@mantine/core';
import { useState } from 'react';

type ChatMessage = {
  author: string;
  text: string;
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);

function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState('');

  const fetchData = async (html: string, question: string) => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are a developer insight bot that will be used in a developer insight project. This application provides insights into the developer's performance and productivity using Github REST API. You will respond to user queries and provide insights into the data that will be exported from application HTML. Here is the application HTML: ${html}. Here is the user coversation: ${messages} Here is the user query: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setMessages((prevMessages) => [...prevMessages, { author: 'bot', text: text }]);
    console.log(text);
    setApiData(text);
    setLoading(false);
  };

  const sendMessage = async () => {
    const userMessage = { author: 'user', text: input };

    const mainElement = document.querySelector('.mantine-AppShell-main');
    const html = mainElement?.innerHTML || '';
    console.log('HTML: ', html);
    fetchData(html, input);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
  };

  return (
    <Container
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        maxHeight: '400px',
        border: '1px solid #ccc',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        zIndex: 1000,
      }}
    >
      <Box style={{ maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.author === 'user' ? 'right' : 'left' }}>
            <p>{msg.text}</p>
          </div>
        ))}
      </Box>
      <Textarea
        placeholder="Type your message here..."
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
      />
      <Group p="right" mt="md">
        <Button loading={loading} onClick={sendMessage}>
          Send
        </Button>
      </Group>
    </Container>
  );
}

export default ChatBot;
