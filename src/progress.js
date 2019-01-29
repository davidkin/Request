/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const title = document.querySelector('title');

  title.innerHTML = `Document  ${Math.floor((loaded / total) * 100)}%`;

  if (loaded === total) {
    progressBar.style.opacity = '1';
    progressBar.style.width = '100%'
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

document.querySelector('.file-input').oninput = function(e) {
  if (!e.target.value) {
    document.querySelector('.download-button').disabled = true;
  } else {
    document.querySelector('.download-button').disabled = false;
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
  document.querySelector('.download-button').disabled = true;
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
