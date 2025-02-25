import axios from 'axios';

export const login = async () => {
  try {
    const res = await axios.post('/login', {
      email: 'test123456@gmail.com',
      password: '123456',
    });
    const { accessToken } = res.data;
    document.cookie = `dessertToken=${accessToken}; max-age=86400;`;
    console.log('login');
  } catch (error) {
    console.log(error);
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
    console.log('date = ',date);
    
    const [year, month, day] = date.split('/');
    const randomNum = Math.floor(Math.random() * 1000); 
    const newID = `${prefix}-${year}${month}${day}-${randomNum}` 

    console.log('newID = ',newID);
    return newID;
  }
}
