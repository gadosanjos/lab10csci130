// class AnimeList {
//     constructor(id, name, author, year, info, addedAt){
//         this.Id = id;
//         this.Name = name;
//         this.Author = author;
//         this.Year = year;
//         this.Info = info;
//         this.AddedAt = addedAt;
//     }
// }

function imageDisplay(input){
    sections[0].innerHTML = "<img src=" + input +" >";
}

//String to Object and table display
function displayAnime(data, i){
    let table = document.createElement('table');
    sections[1].innerHTML = "";
    sections[1].append(table);
    let tbody = document.createElement('tbody');
    table.appendChild(tbody);
    let v = data[i];
    for (let key in v){ 
        let tkey = document.createElement('td');
        let tvalue = document.createElement('td');
        let tr = document.createElement('tr');
        if(key == "image_path"){
            imageDisplay(v[key]);
            break;
        }
        tkey.innerText = key;
        tvalue.innerText = v[key];
        tr.append(tkey);
        tr.append(tvalue);
        tbody.append(tr);
    }
    nextPrevBtn(i, data);
}

const nextPrevBtn = (i, data) => {
    let maxlength = data.length - 1;
    let nextBtn = document.createElement('button');
    let prevBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    let insertBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    prevBtn.innerText = 'Previous';
    editBtn.innerText = 'Edit';
    insertBtn.innerText = 'Insert';
    sections[1].append(prevBtn);
    sections[1].append(nextBtn);
    sections[1].append(editBtn);
    sections[1].append(insertBtn);

    nextBtn.addEventListener('click', () => {
        if(i == maxlength){
            i = -1;
        }
        i++;
        displayAnime(data, i);
    })
    prevBtn.addEventListener('click', () => {
        if(i == 0){
            i = maxlength + 1;
        }
        i--;
        displayAnime(data, i);
    })
}
//AJAX makes request to PHP server to retrieve data from Database
function generateTable(){
    let httpResquest = new XMLHttpRequest();
    httpResquest.open('GET', 'myServer.php?jsonCollection=true', true);
    httpResquest.send();
    httpResquest.onreadystatechange = function(){
        if (httpResquest.readyState == 4 && httpResquest.status == 200){
            let responseData = httpResquest.responseText;
            let parsedData = JSON.parse(responseData);
            let i = 0;
            displayAnime(parsedData, i);

        }
    }
}
//HTML Connection
let sections = document.querySelectorAll('section');
let btns = document.querySelectorAll('.btns');

//Function to generate a table with the answer from the server
btns[0].addEventListener('click', generateTable);

