/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const title = document.querySelector('title');

  title.innerHTML = `Request  ${Math.floor((loaded / total) * 100)}%`;

  if (loaded === total) {
    progressBar.style.opacity = '1';
    progressBar.style.width = '100%';
    setTimeout(() => {
      title.innerHTML = 'Request';
      progressBar.style.opacity = '0';
      progressBar.style.width = '0%';
    }, 1000);
  }
}

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

document.querySelector('.file-input').oninput = function(e) {
  const downloadBtn = document.querySelector('.download-button');

  if (!e.target.value) {
    downloadBtn.disabled = true;
  } else {
    downloadBtn.disabled = false;
  }
};

function dragAndDrop(elem) {
  elem.onmousedown = function(e) {
    const coords = getCoords(elem);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    elem.style.position = 'absolute';
    document.body.appendChild(elem);
    moveAt(e);

    elem.style.zIndex = 1000;

    function moveAt(e) {
      elem.style.left = `${e.pageX - shiftX}px`;
      elem.style.top = `${e.pageY - shiftY}px`;
    }

    document.onmousemove = function(e) {
      moveAt(e);
    };

    elem.onmouseup = function() {
      document.onmousemove = null;
      elem.onmouseup = null;
    };
  };

  elem.ondragstart = function() {
    return false;
  };

  function getCoords(el) {
    const box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
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

document.querySelector('.getFile').onchange = function(e) {
  document.querySelector('.js-fileName').innerHTML = e.target.value.replace(/.*\\/, '');

  checkForUpload();
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

checkForUpload();