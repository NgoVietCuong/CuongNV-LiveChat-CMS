import axios from 'axios';

export default async function fetchData(props) {
  const [url, jwt] = props;
  const res = await axios({
    url: url,
    method: 'GET',
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` }
  });
  
  return res.data;
}