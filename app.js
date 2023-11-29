
class AnimeList {
    constructor(id, name, author, year, info, addedAt){
        this.Id = id;
        this.Name = name;
        this.Author = author;
        this.Year = year;
        this.Info = info;
        this.AddedAt = added;
    }
}

//String to Object and table display
function displayMachine(index, data){
    let table = document.querySelector('table');
    let tbody = document.createElement('tbody');
    table.append(tbody);

    for(let i = 0; i < 6; i++){
        let tr = document.createElement('tr');
        let tdescription = document.createElement('td');
        let td = document.createElement('td');

        switch(i) {
            case 0:
                tdescription.innerText = "Id: ";
                td.innerText = data[index].Id;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 1:
                tdescription.innerText = "Name: ";
                td.innerText = data[index].Name;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 2:
                tdescription.innerText = "Author: ";
                td.innerText = data[index].Author;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 3:
                tdescription.innerText = "Year: ";
                td.innerText = data[index].Year;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break;
            case 4:
                tdescription.innerText = "Inserted at: ";
                td.innerText = data[index].addedAt;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break;
            case 5:
                tdescription.innerText = "Synopsis: ";
                td.innerText = data[index].Info;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break;
            default:
              alert("SOMETHING WENT TERRIBLY WRONG");
        }
    }
}
//AJAX makes request to PHP server to retrieve data from Database
function generateTable(){
    let httpResquest = new XMLHttpRequest();
    httpResquest.open('GET', 'myServer.php?jsonCollection=true', true);
    httpResquest.send();
    httpResquest.onreadystatechange = function(){
        if (httpResquest.readyState == 4 && httpResquest.status == 200){
            let responseData = httpResquest.responseText;
            //alert(httpResquest.responseText);
            let parsedData = JSON.parse(responseData);
            console.log(parsedData);
            let table = document.createElement('table');
            let nextBtn = document.createElement('button');
            let prevBtn = document.createElement('button');
            let i = 0;

            nextBtn.innerText = 'Next';
            prevBtn.innerText = 'Previous';

            sections[0].append(table);

            displayMachine(i, parsedData);
            sections[0].append(prevBtn);
            sections[0].append(nextBtn);

            nextBtn.addEventListener('click', function(){
                i++
                if (i > parsedData.length - 1){
                    i = 0;
                }
                table.innerHTML = "";
                displayMachine(i, parsedData);
            })
            prevBtn.addEventListener('click', function(){
                i--
                if (i < 0){
                    i = parsedData.length - 1;
                }
                table.innerHTML = "";
                displayMachine(i, parsedData);
            })
        }
    }
}
//HTML Connection
let sections = document.querySelectorAll('section');
let btns = document.querySelectorAll('.btns');

//Function to generate a table with the answer from the server
btns[0].addEventListener('click', generateTable);

