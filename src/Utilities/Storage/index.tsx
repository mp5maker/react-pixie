export const StorageSet = ({ key, value }: any) => {
  return new Promise(resolve => {
    resolve(localStorage.setItem(key, value));
  });
};

export const StorageGet = ({ key }: any) => {
  return new Promise(resolve => {
    resolve(localStorage.getItem(key));
  });
};
