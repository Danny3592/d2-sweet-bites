import axios from 'axios';

export const login = async () => {
  try {
    const res = await axios.post('/login', {
      email: 'Shin@gmail.com',
      password: '123456',
    });
    const { accessToken } = res.data;
    document.cookie = `dessertToken=${accessToken}; max-age=86400;`;
    // console.log('login');
  } catch (error) {
    console.log(error);
  }
};

export function generateRandomID() {
  const prefix = 'DNK';
  let newID;
  const randomNum = Math.floor(Math.random() * 1000); // 0 到 999 的隨機數
  const number = String(randomNum).padStart(3, '0'); // 確保數字部分為 3 位數
  newID = `${prefix}${number}`;
  return newID;
}
