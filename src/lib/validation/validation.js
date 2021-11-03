import {e} from '../reg exp/email';
import {p} from '../reg exp/password';
import {name} from '../reg exp/name';
import {phoneNum} from '../reg exp/phoneNum';

export const emailValidation = (setisValidEmail, email) => {
  if (email === '') {
    setisValidEmail(true);
  } else {
    setisValidEmail(e.test(email));
  }
};
export const passwordValidation = (setisValidPassword, password) => {
  if (password === '') {
    setisValidPassword(true);
  } else {
    setisValidPassword(p.test(password));
  }
};

export const changeEmail = (text, setEmail, setValidEmail) => {
  let temp = text.trim();
  if (temp === '') {
    setValidEmail(true);
    setEmail('');
  } else {
    setValidEmail(e.test(temp));
    setEmail(temp);
  }
};

export const changePassword = (text, setPassword, setValidPassword) => {
  let temp = text.trim();
  if (temp === '') {
    setValidPassword(true);
    setPassword('');
  } else {
    setValidPassword(p.test(temp));
    setPassword(temp);
  }
};

export const changeName = (text, setName, setValidName) => {
  let temp = text.trim();
  if (temp === '') {
    setValidName(true);
    setName('');
  } else {
    setValidName(name.test(temp));
    setName(temp);
  }
};

export const changePhone = (text, setPhone, setValidPhone) => {
  let temp = text.trim();
  if (temp === '') {
    setValidPhone(true);
    setPhone('');
  } else {
    setValidPhone(phoneNum.test(temp));
    setPhone(temp);
  }
};
export const changeConfirmPassword = (
  text,
  password,
  setValidConfirmPassword,
) => {
  let temp = text.trim();
  if (temp === '') {
    setValidConfirmPassword(true);
  } else {
    setValidConfirmPassword(password == temp);
  }
};
