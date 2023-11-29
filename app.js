
class MachineSelection {
    constructor(brand, model, year, color, bStyle, trans, dType){
        this.Brand = brand;
        this.Model = model;
        this.Year = year;
        this.Color = color;
        this.BodyStyle = bStyle;
        this.Transmission = trans;
        this.DriveType = dType;
    }
}
//Sends data to the server to get the same data back and attach to the first section
function generateJASON(index, data){
    let p = document.createElement('p');

    if(typeof(data) === "string"){
        let httpResquest = new XMLHttpRequest();
        httpResquest.onreadystatechange = function(){
            if(httpResquest.readyState ==4 & httpResquest.status == 200){
                p.innerHTML = httpResquest.responseText;
                alert(httpResquest.responseText);
                sections[index].append(p);
            }
        }
        httpResquest.open('GET', 'myServer.php?data=' + data, true);
        httpResquest.send();
    } else {
        let stringData = JSON.stringify(data);
        let httpResquest = new XMLHttpRequest();
        httpResquest.onreadystatechange = function(){
            if(httpResquest.readyState ==4 & httpResquest.status == 200){
                p.innerHTML = httpResquest.responseText;
                //alert(httpResquest.responseText);
                sections[index].append(p);
            }
        }
        httpResquest.open('GET', 'myServer.php?data=' + stringData, true);
        httpResquest.send();
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
                tdescription.innerText = "Brand and Model: ";
                td.innerText = data[index].Brand + " " + data[index].Model;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 1:
                tdescription.innerText = "Year: ";
                td.innerText = data[index].Year;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 2:
                tdescription.innerText = "Color: ";
                td.innerText = data[index].Color;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
                break;
            case 3:
                tdescription.innerText = "Body Style: ";
                td.innerText = data[index].BodyStyle;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break;
            case 4:
                tdescription.innerText = "Transmission: ";
                td.innerText = data[index].Transmission;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break;
            case 5:
                tdescription.innerText = "Drive Type: ";
                td.innerText = data[index].DriveType;
                tr.append(tdescription);
                tr.append(td);
                tbody.append(tr);
            break
            default:
              alert("SOMETHING WENT TERRIBLY WRONG");
        }
    }
}
//AJAX makes request to PHP server to retrieve json data and sends back to client
function ajaxHungers(){
    let httpResquest = new XMLHttpRequest();
    httpResquest.open('GET', 'myServer.php?jsonCollection=true', true);
    httpResquest.send();
    httpResquest.onreadystatechange = function(){
        if (httpResquest.readyState == 4 && httpResquest.status == 200){
            let responseData = httpResquest.responseText;
            //alert(httpResquest.responseText);
            let parsedData = JSON.parse(responseData);
            let table = document.createElement('table');
            let nextBtn = document.createElement('button');
            let prevBtn = document.createElement('button');
            let i = 0;

            nextBtn.innerText = 'Next';
            prevBtn.innerText = 'Previous';

            sections[1].append(table);

            displayMachine(i, parsedData);
            sections[1].append(prevBtn);
            sections[1].append(nextBtn);

            nextBtn.addEventListener('click', function(){
                i++
                if (i > 4){
                    i = 0;
                }
                table.innerHTML = "";
                displayMachine(i, parsedData);
            })
            prevBtn.addEventListener('click', function(){
                i--
                console.log(i);
                if (i < 0){
                    i = 4;
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

let brandsModels = [
    {
        brand: "Ford",
        model: "Mustang",
        year: 1965,
        colors: "Blue",
        bodyStyle: "Convertible",
        trans: "Automatic",
        driveType: "FWD"
    },
    {
        brand: "Chevy",
        model: "Silverado",
        year: 2016,
        colors: "White",
        bodyStyle: "Truck",
        trans: "Automatic",
        driveType: "AWD"
    },
    {
        brand: "Jeep",
        model: "Wrangler",
        year: 2006,
        colors: "Brown",
        bodyStyle: "SUV",
        trans: "Automatic",
        driveType: "AWD"
    },
    {
        brand: "Nissan",
        model: "Skyline GTR",
        year: 1993,
        colors: "White",
        bodyStyle: "Sports",
        trans: "Manual",
        driveType: "FWD"
    },
    {
        brand: "Honda",
        model: "Civic",
        year: 2021,
        colors: "Silver",
        bodyStyle: "Hatchback",
        trans: "Automatic",
        driveType: "FWD"
    }
];

//Array creation to carry Objects
let machina = [];
for(let i = 0; i < 5; i++){
    machina[i] = new MachineSelection(brandsModels[i].brand, brandsModels[i].model, brandsModels[i].year, brandsModels[i].colors, brandsModels[i].bodyStyle, brandsModels[i].trans, brandsModels[i].driveType);
}

//Function to generate a string from array objects
btns[0].addEventListener('click', function(){
    generateJASON(0, machina);
});
//Function to generate a table with the objects via the server saved document mycollection.json
btns[1].addEventListener('click', ajaxHungers);

