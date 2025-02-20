import axios from "axios";

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
}