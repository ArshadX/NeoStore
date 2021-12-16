import {e} from '../reg exp/email';
import {p} from '../reg exp/password';
import {name} from '../reg exp/name';
import {phoneNum} from '../reg exp/phoneNum';
import {nameswithspace} from '../reg exp/nameswithspace';

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

export const handleAddress = (text, setAddress, setBlankAddress) => {
  let temp = text.trimLeft();
  if (temp === '') {
    setBlankAddress(false);
    setAddress('');
  } else {
    setBlankAddress(false);
    setAddress(temp);
  }
};

export const handlePincode = (text, setPincode, setBlankPincode) => {
  let temp = text.trim();
  if (temp === '') {
    setBlankPincode(false);
    setPincode('');
  } else {
    setBlankPincode(false);
    setPincode(temp);
  }
};
export const handletextChange = (
  text,
  setName,
  setValidName,
  setisBlankinput,
) => {
  let temp = text.trimLeft();
  if (temp === '') {
    setValidName(true);
    setName('');
  } else {
    setValidName(nameswithspace.test(temp));
    setName(temp);
    setisBlankinput(false);
  }
};

export const changePasswordnew = (
  text,
  setPassword,
  setValidPassword,
  setisBlankpassword,
  confirmPassword,
  setValidConfirmPassword,
) => {
  let temp = text.trim();
  if (temp === '') {
    setValidPassword(true);
    setPassword('');
  } else {
    setValidPassword(p.test(temp));
    if (confirmPassword != '') {
      if (confirmPassword == temp) {
        setValidConfirmPassword(true);
      }
    }
    setPassword(temp);
    setisBlankpassword(false);
  }
};
