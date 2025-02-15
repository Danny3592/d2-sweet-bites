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