/* eslint-disable */

const request = new HttpRequest({
  baseUrl: 'http://localhost:8000'
});

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const form = new FormData();
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);

  uploadToServer(request, form);

  document.querySelector('.getFile').value = '';
  document.querySelector('.js-fileName').innerHTML = 'Choose a file';
  document.querySelector('.upload-button').disabled = true;
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  downloadFromServer(request);

  document.querySelector('.file-input').value = '';
  document.querySelector('.download-button').disabled = true;
};

document.querySelector('.show-list').addEventListener('click', () => {
  getListOfFile(request);
});


document.querySelector('.file-input').oninput = function(e) {
  const downloadBtn = document.querySelector('.download-button');

  if (!e.target.value) {
    downloadBtn.disabled = true;
  } else {
    downloadBtn.disabled = false;
  }
};

document.querySelector('.getFile').onchange = function(e) {
  document.querySelector('.js-fileName').innerHTML = e.target.value.replace(/.*\\/, '');

  checkForUpload();
};

function showFilesList(data) {
  const block = document.querySelector('.show-block');
  const showList = document.querySelector('.show-list');
  const list = document.createElement('ul');

  list.className = 'list';

  document.querySelector('.show-block').style.display = 'block';
  showList.innerHTML = 'Close list';
  showList.style.color = '#de0a4e';
  showList.style.borderColor = '#de0a4e';

  createListElement(data, list);
  dragAndDrop(block);

  block.appendChild(list);
}

function createListElement(data, list) {
  data.forEach(element => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');

    link.innerHTML = element;
    link.style.color = '#fff';
    link.style.wordWrap = 'break-word';

    link.setAttribute('href', 'javascript:void(0);');

    list.appendChild(listItem);
    listItem.appendChild(link);
  });
}

checkForUpload();
