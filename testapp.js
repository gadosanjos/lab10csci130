//HTML Connection
let sections = document.querySelectorAll('section');
let btns = document.querySelectorAll('.btns');
const divs = document.getElementsByTagName('div');

//Function to generate a table with the answer from the server
btns[0].addEventListener('click', generateTable);



function displayAnime(data, i) {
  sections[0].style.display = 'none';
  if(document.getElementsByTagName('div').length >= 1){
    document.body.removeChild(document.getElementsByTagName('div')[0]);
  }
  const displayDiv = document.createElement('div');
  displayDiv.setAttribute('class', 'display');
  document.body.appendChild(displayDiv);
  const table = document.createElement('table');
  displayDiv.append(table);
  const tbody = document.createElement('tbody');
  tbody.setAttribute('class', 'animeInfo');
  let v = data[i];
  for (let key in v) {
    let tkey = document.createElement('th');
    let tvalue = document.createElement('td');
    let tr = document.createElement('tr');
    if (key == 'image_path') {
      displayDiv.innerHTML = `<img src=${v[key]}>`;
      continue;
    }else{
      tkey.innerText = key;
      tvalue.innerText = v[key];
      tr.append(tkey);
      tr.append(tvalue);
      tbody.append(tr);
    }
  }
  table.append(tbody);
  displayDiv.append(table);
  nextPrevBtn(i, data);
}

const nextPrevBtn = (i, data) => {
  let maxlength = data.length - 1;
  const divs = document.getElementsByTagName('div');
  const synoDiv = document.createElement('div');
  synoDiv.setAttribute('class', 'syno');
  divs[0].append(synoDiv);

  let sortBtn = document.createElement('button');
  let nextBtn = document.createElement('button');
  let prevBtn = document.createElement('button');
  let editBtn = document.createElement('button');
  let insertBtn = document.createElement('button');

  sortBtn.innerText = 'Sort';
  nextBtn.innerText = 'Next';
  prevBtn.innerText = 'Previous';
  editBtn.innerText = 'Edit';
  insertBtn.innerText = 'Insert';

  synoDiv.append(sortBtn);
  synoDiv.append(prevBtn);
  synoDiv.append(editBtn);
  synoDiv.append(insertBtn);
  synoDiv.append(nextBtn);

  sortBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sortTable();
  });
  insertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    insertForm(data);
  });
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editForm(data, i);
  });

  nextBtn.addEventListener('click', () => {
    divs[0].innerHTML = '';
    if (i == maxlength) {
      i = -1;
    }
    i++;
    displayAnime(data, i);
  });
  prevBtn.addEventListener('click', () => {
    if (i == 0) {
      i = maxlength + 1;
    }
    i--;
    displayAnime(data, i);
  });
};

//AJAX makes request to PHP server to retrieve data from Database
function sortTable() {
    let httpResquest = new XMLHttpRequest();
    httpResquest.open('GET', 'myServer.php?sort=true&sortBy=Name&asc=false', true);
    httpResquest.send();
    httpResquest.onreadystatechange = function () {
        if (httpResquest.readyState == 4 && httpResquest.status == 200) {
            let responseData = httpResquest.responseText;
            let parsedData = JSON.parse(responseData);
            let i = 0;
            displayAnime(parsedData, i);
        }
    };
}
//AJAX makes request to PHP server to retrieve data from Database
function generateTable() {
  let httpResquest = new XMLHttpRequest();
  httpResquest.open('GET', 'myServer.php?jsonCollection=true', true);
  httpResquest.send();
  httpResquest.onreadystatechange = function () {
    if (httpResquest.readyState == 4 && httpResquest.status == 200) {
      let responseData = httpResquest.responseText;
      let parsedData = JSON.parse(responseData);
      let i = 0;
      displayAnime(parsedData, i);
    }
  };
}

const insertForm = (data) => {
  let form = document.createElement('form');
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  form.appendChild(table);
  for (let key in data[0]) {
    if (key == 'date_Joined' || key == 'id') {
      continue;
    } else if (key == 'image_path') {
      let inputKey = document.createElement('input');
      let labelKey = document.createElement('label');
      let tr = document.createElement('tr');
      inputKey.setAttribute('type', 'file');
      inputKey.setAttribute('name', `${key}`);
      inputKey.setAttribute('placeholder', `${key}`);
      labelKey.setAttribute('name', `${key}`);
      labelKey.innerText = `Image :`;
      tr.append(labelKey);
      tr.append(inputKey);
      tbody.append(tr);
      continue;
    }
    let inputKey = document.createElement('input');
    let labelKey = document.createElement('label');
    let tr = document.createElement('tr');
    inputKey.innerText = key;
    labelKey.innerText = `${key} :`;
    inputKey.setAttribute('name', `${key}`);
    inputKey.setAttribute('placeholder', `${key}`);
    labelKey.setAttribute('name', `${key}`);
    tr.append(labelKey);
    tr.append(inputKey);
    tbody.append(tr);
  }

  divs[0].removeChild(document.getElementsByTagName('table')[0]);
  divs[0].append(form);
  let submit = document.createElement('button');
  tbody.append(submit);
  submit.innerText = 'Submit';
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'submit');
  form.setAttribute('action', 'myServer.php');
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');

  form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        let formData = new FormData(form);

        let httpResquest = new XMLHttpRequest();
        httpResquest.open('POST', 'myServer.php', true);

        httpResquest.send(formData);

        httpResquest.onreadystatechange = function () {
            if (httpResquest.readyState == 4) {
                if (httpResquest.status == 200) {
                        let responseData = httpResquest.responseText;
                        let parsedData = JSON.parse(responseData);
                        let i = 0;
                        displayAnime(parsedData, i);
                    } else {
                        console.error('HTTP request failed with status:', httpResquest.status);
                    }
            }
        };
        location.reload();
    });
};

const editForm = (data, i) => {
  let form = document.createElement('form');
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  form.appendChild(table);
  for (let key in data[i]) {
    if (key == 'date_Joined' || key == 'id') {
      let tkey = document.createElement('th');
      let tvalue = document.createElement('td');
      let tr = document.createElement('tr');
      tr.setAttribute('class', 'fixedInfo')
      let hiddenInput = document.createElement('input');
      tkey.innerText = `${key} :`;
      tvalue.innerText = data[i][key];
      tkey.setAttribute('name', `${key}`);
      tvalue.setAttribute('name', `${data[i][key]}`);
      tvalue.setAttribute('value', `${data[i][key]}`);
      tr.append(tkey);
      tr.append(tvalue);
      tbody.append(tr);
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', `${key}`);
      hiddenInput.setAttribute('value', `${data[i][key]}`);
      form.appendChild(hiddenInput);
    } else if (key == 'image_path') {
      let inputKey = document.createElement('input');
      let labelKey = document.createElement('label');
      let tr = document.createElement('tr');
      inputKey.setAttribute('type', 'file');
      inputKey.setAttribute('name', `${key}`);
      inputKey.setAttribute('placeholder', `${key}`);
      labelKey.setAttribute('name', `${key}`);
      labelKey.innerText = `Image :`;
      tr.append(labelKey);
      tr.append(inputKey);
      tbody.append(tr);
      continue;
    } else {
      let inputKey = document.createElement('input');
      let labelKey = document.createElement('label');
      let tr = document.createElement('tr');
      inputKey.innerText = key;
      labelKey.innerText = `${key} :`;
      inputKey.setAttribute('name', `${key}`);
      inputKey.setAttribute('placeholder', `${key}`);
      labelKey.setAttribute('name', `${key}`);
      tr.append(labelKey);
      tr.append(inputKey);
      tbody.append(tr);
    }
  }

  divs[0].removeChild(document.getElementsByTagName('table')[0]);
  divs[0].append(form);
  let submit = document.createElement('button');
  tbody.append(submit);
  submit.innerText = 'Submit';
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'submit');
  form.setAttribute('action', 'edit.php');
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');

  submit.addEventListener('click', (e) => {
        e.preventDefault();

        // Get form data
        let formData = new FormData(form);

        let httpResquest = new XMLHttpRequest();
        httpResquest.open('POST', 'edit.php', true);

        httpResquest.send(formData);

        httpResquest.onreadystatechange = function () {
            if (httpResquest.readyState == 4) {
                if (httpResquest.status == 200) {
                        let responseData = httpResquest.responseText;
                        let parsedData = JSON.parse(responseData);
                        let i = 0;
                        displayAnime(parsedData, i);
                    } else {
                        console.error('HTTP request failed with status:', httpResquest.status);
                    }
            }
        };
        location.reload();
    });
  
  let del = document.createElement('button');
  tbody.append(del);
  del.innerText = 'Delete';

  del.addEventListener('click', (e) => {
      e.preventDefault();
  
      // Get form data
      let formData = new FormData(form);
  
      let httpResquest = new XMLHttpRequest();
      httpResquest.open('POST', 'delete.php', true);

      httpResquest.send(formData);
  
      httpResquest.onreadystatechange = function () {
          if (httpResquest.readyState == 4) {
              if (httpResquest.status == 200) {
                      let responseData = httpResquest.responseText;
                      let parsedData = JSON.parse(responseData);
                      let i = 0;
                      displayAnime(parsedData, i);
                  } else {
                      console.error('HTTP request failed with status:', httpResquest.status);
                  }
          }
      };
      location.reload();
  });
};
