/* eslint-disable */

function getFileName() {
  const dataOfFile = document.querySelector('.file-input').value;

  return dataOfFile;
}

function showResponse(fileName, response) {
  const img = document.querySelector('.img');
  const infoText = document.querySelector('.info-text');

  infoText.innerHTML = `File ${fileName} downloaded`;

  return response.type === 'image/jpeg' ? img.setAttribute('src', getImgUrl(response)) : downloadFile(response, fileName);
}

function showError(error, fileName) {
  const infoText = document.querySelector('.info-text');

  infoText.innerHTML = `${fileName} file ${error}`;
}