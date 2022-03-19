import './style.css';

const hexForm = document.querySelector('#hexForm');
const submitBtn = document.querySelector('#submitBtn');

const uploadToGoogleSheet = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(() => resolve())
      .catch(() => reject());
  });
};

const getDom = (str) => {
  return document.querySelector(str);
};

const checkForm = () => {
  const nameStr = getDom('#hexName').value;
  const phoneStr = getDom('#hexPhone').value;
  const dateStr = getDom('#hexDate').value;
  const hexPeopleNumStr = getDom('#hexPeopleNum').value;

  const alertArr = [];

  if (nameStr === '') alertArr.push('姓名');
  if (phoneStr === '') alertArr.push('電話');
  if (dateStr === '') alertArr.push('日期');
  if (hexPeopleNumStr === '') alertArr.push('用餐人數');

  if (nameStr === '' || phoneStr === '' || dateStr === '' || hexPeopleNumStr === '') {
    let str = alertArr.join(', ');
    alert(str + '為必填！');
    return;
  }

  const phoneRegex = /^09[0-9]{8}$/;

  if (!phoneRegex.test(phoneStr)) {
    alert('電話須符合手機格式！例如：0912345678');
    return;
  }

  if (Number(hexPeopleNumStr) <= 0) {
    alert('用餐人數需大於一人！');
    return;
  }

  const dateArr = dateStr.split('-').map((str) => parseInt(str, 10));

  let form = [...hexForm];
  const checkedArr = form
    .filter((input) => {
      if (input['type'] === 'checkbox' && input['checked'] === true) {
        return input;
      }
    })
    .map((input) => {
      return input.value;
    });

  let checkboxStr = '';

  checkedArr.forEach((item) => {
    checkboxStr += `&entry.630732474=${item}`;
  });

  const body = `entry.165277323=${nameStr}&entry.1441896226=${phoneStr}&entry.265264378=${hexPeopleNumStr}&entry.1759070785_year=${dateArr[0]}&entry.1759070785_month=${dateArr[1]}&entry.1759070785_day=${dateArr[2]}${checkboxStr}`;

  const hashStr = '1FAIpQLSc9Ua4AG6ESaCHf7HMcw4la795snNXTlSPZJ-2qep2S0xbbWw';
  const url = `https://docs.google.com/forms/u/0/d/e/${hashStr}/formResponse?`;
  const postUrl = url + body + '&submit=SUBMIT';

  uploadToGoogleSheet(postUrl)
    .then((res) => {
      alert('成功送出表單！');
      hexForm.reset();
    })
    .catch((err) => {
      console.dir(err);
    });
};

submitBtn.addEventListener('click', checkForm);
