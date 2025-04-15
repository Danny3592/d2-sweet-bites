import axios from 'axios';
import { alertError } from './sweetAlert';

export const login = async () => {
  try {
    const res = await axios.post('/login', {
      email: 'Shin@gmail.com',
      password: '123456',
    });
    const { accessToken } = res.data;
    document.cookie = `dessertToken=${accessToken}; max-age=86400;`;
  } catch (error) {
    alertError(error);
  }
};

export function generateRandomID(para,date) {
  if (para === 'charity') {
    const prefix = 'DNK';
    let newID;
    const randomNum = Math.floor(Math.random() * 1000); 
    const number = String(randomNum).padStart(3, '0'); 
    newID = `${prefix}${number}`;
    return newID;
  }else{
    const prefix = 'ORD';
    const [year, month, day] = date.split('/');
    const randomNum = Math.floor(Math.random() * 1000); 
    const newID = `${prefix}-${year}${month}${day}-${randomNum}` 
    return newID;
  }
}
