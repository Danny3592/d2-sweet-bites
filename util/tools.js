export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從0開始
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const checkInputFill = (obj, requireInputs) => {
  return Object.entries(obj).every(([key, value]) => {
    if (requireInputs.includes(key)) {
      return value ? true : false;
    } else {
      return true;
    }
  })
}


export const getRandomProducts = (products, num) => {
  const desserts = products.filter(product => product.category !== '慈善');
  const result = new Set();
  if (desserts.length) {
    while (result.size < num) {
      const randomIndex = Math.floor(Math.random() * desserts.length);
      result.add(desserts[randomIndex]);
    }
  }
  return [...result];
}

export const getProductCategories = (products) => {
  const categoryCount = products.reduce((count, product) => {
    if (!count[product.category]) {
      count[product.category] = 1;
    } else {
      count[product.category] += 1;
    }
    return count;
  }, {});
  return Object.entries(categoryCount);
}

// 比較傳入日期是否過期
export const compareDateExpired = (date) => {
  const today = new Date(); // 取得今天日期
  const targetDate = new Date(date);
  return today > targetDate;
}