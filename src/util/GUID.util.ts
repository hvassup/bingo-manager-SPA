const MY_ID_KEY = 'my-id';
export function get_user_id() {
  let key = localStorage.getItem(MY_ID_KEY);
  if (key) {
    return key;
  } else {
    key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem(MY_ID_KEY, key);
    return key;
  }
}
