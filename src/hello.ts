import axios from 'axios';

export default async function hello(name: string): Promise<string> {
  const response = await axios.get(`http://localhost:3000/hello?name=${name}`);
  console.log(response.data);
  const message = response.data as string;
  console.log('message:', message);
  return message;
}
