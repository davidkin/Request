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

checkForUpload();