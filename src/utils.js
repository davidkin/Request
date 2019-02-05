(function() {
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

  function areElementsFunction(arrayOfFunction) {
    return arrayOfFunction.every(value => {
      if (typeof value === 'function') {
        return true;
      } else {
        throw new TypeError(`${value} isn't a function`);
      }
    });
  }

  function checkForUpload(uploadBtn) {
    const file = document.querySelector('.getFile').files;

    if (file.length > 0) {
      uploadBtn.disabled = false;
    } else {
      uploadBtn.disabled = true;
    }
  }

  function isShow(showList) {
    return !showList.classList.contains('active-list');
  }

  function downloadBtnIsEnable(fileName, fileInput, downloadBtn) {
    fileInput.value = fileName;
    downloadBtn.disabled = false;
  }

  function showResponse(fileName, response, infoText) {
    const img = document.querySelector('.img');

    infoText.innerHTML = `File ${fileName} downloaded`;

    return response.type === 'image/jpeg'
      ? img.setAttribute('src', getImgUrl(response))
      : downloadFile(response, fileName);
  }

  function showError(error, fileName, infoText) {
    infoText.innerHTML = `${fileName} file ${error}`;
  }

  window.helper = {
    getImgUrl,
    areElementsFunction,
    downloadFile,
    checkForUpload,
    downloadBtnIsEnable,
    isShow,
    showResponse,
    showError
  };
}());