const render = (JSONentry) =>{

  
  for(let i = 0; i < 2; i++){
    let tr = document.createElement('tr');
    let tdescription = document.createElement('td');
    let td = document.createElement('td');

    switch(i) {
        case 0:
            tdescription.innerText = "Anime: ";
            td.innerText = data[index].Name;
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
            tdescription.innerText = "Author: ";
            td.innerText = data[index].Author;
            tr.append(tdescription);
            tr.append(td);
            tbody.append(tr);
            break;
        case 3:
            tdescription.innerText = "Synopsis: ";
            td.innerText = data[index].Info;
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
        default:
          alert("SOMETHING WENT TERRIBLY WRONG");
    }
  }
};