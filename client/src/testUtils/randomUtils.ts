export const randomString = (length:number = 7) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  
  export const randomNumber = (min:number = 1, max:number = 100) => Math.floor(Math.random() * (max - min + 1)) + min;
  

  export const randomDate = () => new Date();
  