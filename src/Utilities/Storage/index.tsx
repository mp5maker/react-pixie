/* localStorage throws when storage is blocked (private mode, disabled cookies) */
export const StorageSet = ({ key, value }: any) => {
  return new Promise(resolve => {
    try {
      resolve(localStorage.setItem(key, value));
    } catch (error) {
      resolve(null);
    }
  });
};

export const StorageGet = ({ key }: any) => {
  return new Promise(resolve => {
    try {
      resolve(localStorage.getItem(key));
    } catch (error) {
      resolve(null);
    }
  });
};
