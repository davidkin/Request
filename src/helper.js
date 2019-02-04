/* eslint-disable */

function getImgUrl(binaryImg) {
  const blob = new Blob([binaryImg], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

function downloadFile(blob, fileName) {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}

function areElementsFunction (arrayOfFunction)  {
  arrayOfFunction.every(value => {
    if (typeof value === 'function') {
      return true;
    } else {
      throw new TypeError(`${value} isn't a function`);
    }
  });
}

function checkForUpload() {
  const file = document.querySelector('.getFile').files;
  const uploadBtn = document.querySelector('.upload-button');

  if (file.length > 0) {
    uploadBtn.disabled = false;
  } else {
    uploadBtn.disabled = true;
  }
}

function isShow() {
  const showList = document.querySelector('.show-list');

  return showList.innerHTML === 'Show List';  
}

checkForUpload();