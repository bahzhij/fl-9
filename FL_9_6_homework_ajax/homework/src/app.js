let button = document.querySelector('.button');
let loader = document.querySelector('.loader');
let landAnimation = document.querySelector('.animation-land');
let waterAnimation = document.querySelector('.animation-water');
button.addEventListener('click', findLocation);

const http = {
  get: function (url) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.addEventListener('loadend', loaded);
      request.open('GET', url);

      function loaded() {
        loader.style.display = 'none';
      }

      request.onload = function () {
        if (request.readyState === 4 && request.status === 200) {
          resolve(JSON.parse(request.responseText));          
        } else {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        }
      };
      request.send();
    });
  }
};

function findLocation() {
  loader.style.display = 'flex';
  waterAnimation.style.display = 'none';
  landAnimation.style.display = 'none';
  let latitude = document.querySelector('input[name=latitude]').value;
  let longitude = document.querySelector('input[name=longitude]').value;
  let apiData = `https://api.onwater.io/api/v1/results/${latitude},${longitude}`;
  let response = http.get(apiData);

  response.then(function (result) {
    if (result.water) {
      waterAnimation.style.display = 'flex';
    } else {
      landAnimation.style.display = 'flex';
    }
  }).catch((e) => {
    alert('error: ', e);
  });
}