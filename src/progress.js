/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const title = document.querySelector('title');

  title.innerHTML = `Document  ${Math.floor((loaded / total) * 100)}%`;
  progressBar.style.width = `${Math.floor((loaded / total) * 100)}%`;

  if (loaded === total) {
    setTimeout(() => {
      title.innerHTML = 'Document';
      progressBar.style.opacity = '0';
      progressBar.style.width = '0%';
    }, 1000);
  }
}

function showFilesList(data) {
  const block = document.querySelector('.show-block');
  dragAndDrop(block);
  const list = document.createElement('ul');
  list.className = 'list';

  document.querySelector('.show-block').style.display = 'block';
  document.querySelector('.show-list').innerHTML = 'Close list';
  document.querySelector('.show-list').style.color = '#de0a4e';
  document.querySelector('.show-list').style.borderColor = '#de0a4e';


  data.forEach(element => {
    const listItem = document.createElement('li');
    const link = document.createElement('span');
    link.innerHTML = element;

    list.appendChild(listItem);
    listItem.appendChild(link);
  });

  block.appendChild(list);
}

document.querySelector('.file-input').onchange = function() {
  if (!document.querySelector('.file-input').value) {
    document.querySelector('.download-button').disabled = true;
  } else if (document.querySelector('.file-input').value) {
    document.querySelector('.download-button').disabled = false;
  }
};

document.querySelector('.getFile').onchange = function(e) {
  document.querySelector('.js-fileName').innerHTML = e.target.value.replace(/.*\\/, '');
};

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
  document.querySelector('.js-fileName').innerHTML = 'Choose a file';
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  downloadFromServer(request);
  document.querySelector('.file-input').value = '';
};


document.querySelector('.show-list').addEventListener('click', () => {
  if (document.querySelector('.show-list').innerHTML === 'Show List') {
    request.get('/list', {}).then(data => showFilesList(JSON.parse(data)));
  } else {
    document.querySelector('.show-block').removeChild(document.querySelector('.list'));
    document.querySelector('.show-block').style.display = 'none';
    document.querySelector('.show-list').innerHTML = 'Show List';
    document.querySelector('.show-list').style.color = '#fff';
    document.querySelector('.show-list').style.borderColor = '#fff';
  }
});
