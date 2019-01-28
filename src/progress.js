/* eslint-disable */

function loadBarProgress(nameOfBar, loaded, total) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  const progress = Math.floor((loaded / total) * 100);
  progressBar.style.width = `${progress}%`;
}

function clearBarProgess (nameOfBar) {
  const progressBar = document.querySelector(`#${nameOfBar}`);
  progressBar.style.width = `${0}%`;
}

function events(xmlRequest, progressEvent) {
  if (progressEvent === 'upload') {
    xmlRequest.upload.onprogress = event => {
      loadBarProgress('upload-progress-bar', event.loaded, event.total);
      console.log('---', `Upload to the server ${event.loaded} bytes from ${event.total}`);
    };

    xmlRequest.upload.onload = () => {
      console.log('---', 'Data is fully uploaded to the server');
    };

    xmlRequest.upload.onerror = () => {
      console.log('---', 'An error occurred while loading data to the server!');
    };
  } else if (progressEvent === 'download') {
    xmlRequest.onprogress = event => {
      loadBarProgress('download-progress-bar', event.loaded, event.total);
      console.log(`Received from ${event.loaded} server bytes from ${event.total} `);
    };
  }
}

function parseImg(binaryImg) {
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

const request = new HttpRequest({
  baseUrl: 'http://localhost:8000'
});

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();

  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  // /files/__filename
  // fetch('http://localhost:8000/upload',{
  //   method: "POST",
  //   body: form
  // })

  const fileName = document.querySelector('.getFile').files[0].name;
  document.querySelector('.file-input').value = fileName;

  request.post('/upload', {
    data: form,
    onUploadProgress: (xmlRequest, progressEvent) => events(xmlRequest, progressEvent)
  })
    .then(response => {
      console.log('---', `Well done - ${response}`);
      clearBarProgess('upload-progress-bar');
    })
    .catch(e => {
      console.log(e);
    });
};


document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();

  const dataOfFile = document.querySelector('.file-input').value;
  const img = document.querySelector('.img');
  const isImg = dataOfFile.split('.')[1] === 'png' || dataOfFile.split('.')[1] === 'JPG' 
            || dataOfFile.split('.')[1] === 'jpeg' || dataOfFile.split('.')[1] === 'jpg';

  request.get(`/files/${dataOfFile}`, {
    responseType: 'blob',
    onDownloadProgress: (xmlRequest, progressEvent) => events(xmlRequest, progressEvent)
  })
    .then(response => {
      console.log(response);

      return isImg ? img.setAttribute('src', parseImg(response)) : downloadFile(response, dataOfFile);
    })
    .catch(e => {
      console.log(e);
    });
};


// function drawFilesList(files) {
//   const list = document.getElementById('files_list');
//   list.innerHTML = '';
//   files.forEach(element => {
//     const listItem = document.createElement('li');
//     const link = document.createElement('a');
//     link.href = `/files/${element}`;
//     link.textContent = element;
//     listItem.appendChild(link);
//     list.appendChild(listItem);
//   });
// }
// document.getElementById('upload_list').addEventListener('click', function(e) {
//   xhr.get('/list', {}).then(data =>
//     drawFilesList(JSON.parse(data)));
// });

// app.use('/files', express.static(`${__dirname}/uploads`));
// app.use(fileUpload());