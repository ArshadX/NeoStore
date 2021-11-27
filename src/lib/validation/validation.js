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

export const changeEmail = (text, setEmail, setValidEmail, setisBlankemail) => {
  let temp = text.trim();
  if (temp === '') {
    setValidEmail(true);
    setEmail('');
  } else {
    setValidEmail(e.test(temp));
    setEmail(temp);
    setisBlankemail(false);
  }
};

export const changePassword = (
  text,
  setPassword,
  setValidPassword,
  setisBlankpassword,
) => {
  let temp = text.trim();
  if (temp === '') {
    setValidPassword(true);
    setPassword('');
  } else {
    setValidPassword(p.test(temp));
    setPassword(temp);
    setisBlankpassword(false);
  }
};

export const changeName = (text, setName, setValidName, setisBlankinput) => {
  let temp = text.trim();
  if (temp === '') {
    setValidName(true);
    setName('');
  } else {
    setValidName(name.test(temp));
    setName(temp);
    setisBlankinput(false);
  }
};

export const changePhone = (text, setPhone, setValidPhone, setIsBlankPhone) => {
  let temp = text.trim();
  if (temp === '') {
    setValidPhone(true);
    setPhone('');
  } else {
    setValidPhone(phoneNum.test(temp));
    setPhone(temp);
    setIsBlankPhone(false);
  }
};
export const changeConfirmPassword = (
  text,
  password,
  setValidConfirmPassword,
  setconfirmPassword,
  setisBlankConfPassword,
) => {
  let temp = text.trim();
  if (temp === '') {
    setValidConfirmPassword(true);
  } else {
    setValidConfirmPassword(password == temp);
    setconfirmPassword(temp);
    setisBlankConfPassword(false);
  }
};
