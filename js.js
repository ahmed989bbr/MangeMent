let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sub = document.getElementById("sub");
let tmp;
let mood = "create"

//  Calc Total
function calcTotal() {
    if (price.value != "") {
        let Totals = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = Totals;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

let dataCreate;
//  create prodact
if (localStorage.prodactes != null) {
    dataCreate = JSON.parse(localStorage.prodactes);
}else {
    dataCreate = [];
}
// let dataCreate= [];

sub.onclick = function () {
            let opject = {
                title: title.value.toLowerCase(),
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                category: category.value.toLowerCase(),
                count: count.value,
            };
            if (title.value != "" && price.value != "") {
                if (mood === "create") {
                    if (opject.count > 1) {
                        for (let i = 0; i < opject.count; i++) {
                            dataCreate.push(opject);
                        }
                    } else {
                        dataCreate.push(opject);
                    }
                } else {
                    dataCreate[tmp] = opject;
                    mood = "create";
                    sub.innerHTML = "create";
                    count.style.display = "block";

                    
                }
            

                // dataCreate.push(opject);
                    localStorage.setItem("prodactes", JSON.stringify(dataCreate));

                    clearD();

                    Show();
                }
      
            
        }

  
// clear data
function clearD() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
    count.value = "";
}

// show Data
function Show() {
    calcTotal();
    let table = "";
    for (let i = 0; i < dataCreate.length; i++) {
        table += `      <tr>
        <td>${i + 1}</td>
        <td>${dataCreate[i].title}</td>
        <td>${dataCreate[i].price}</td>
        <td>${dataCreate[i].taxes}</td>
        <td>${dataCreate[i].ads}</td>
        <td>${dataCreate[i].discount}</td>
        <td>${dataCreate[i].total}</td>
        <td>${dataCreate[i].category}</td>
        <td><button onclick = "updateD(${i})" id="update">Update</button></td>
        <td><button onclick = " delatr(${i})" id="delete">Delete</button></td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;

    let btndd = document.getElementById("deleta");
    if (dataCreate.length > 0) {
        btndd.innerHTML = `<button   onclick = " deletall()" >Delete All(${dataCreate.length})</button>`;
    } else {
        btndd.innerHTML = "";
    }
}
Show();

//Deleta DAta
function delatr(i) {
    dataCreate.splice(i, 1);
    localStorage.prodactes = JSON.stringify(dataCreate);
    Show();
}

// deleta all
function deletall() {
    localStorage.clear();
    dataCreate.splice(0);
    Show();
}

// count

function updateD(i) {
    title.value = dataCreate[i].title;
    price.value = dataCreate[i].price;
    taxes.value = dataCreate[i].taxes;
    ads.value = dataCreate[i].ads;
    discount.value = dataCreate[i].discount;
    calcTotal();
    count.style.display = "none";
    category.value = dataCreate[i].category;
    sub.innerHTML = "update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behevior: "smooth",
    });
}

// searchmood
let searchmood = "title";

function getmood(id) {
    let search = document.getElementById("search");

    if (id == "searchTitle") {
        searchmood = "title";
    } else {
        searchmood = "categery";

    }
    search.placeholder = "Search By Title" + searchmood;

    search.focus();
    search.value = "";
    Show()
}

function searchDat(value) {
    let table = "";
    for (let i = 0; dataCreate.length; i++) {
        if (searchmood == "title") {


            if (dataCreate[i].title.includes(value.toLowerCase())) {
                table += `      <tr>
                            <td>${i}</td>
                            <td>${dataCreate[i].title}</td>
                            <td>${dataCreate[i].price}</td>
                            <td>${dataCreate[i].taxes}</td>
                            <td>${dataCreate[i].ads}</td>
                            <td>${dataCreate[i].discount}</td>
                            <td>${dataCreate[i].total}</td>
                            <td>${dataCreate[i].category}</td>
                            <td><button onclick = "updateD(${i})" id="update">Update</button></td>
                            <td><button onclick = " delatr(${i})" id="delete">Delete</button></td>
                        </tr>`;
            }
        } else {
            for (let i = 0; dataCreate.length; i++) {
                if (dataCreate[i].categery.includes(value)) {
                    table += `      <tr>
                            <td>${i}</td>
                            <td>${dataCreate[i].title}</td>
                            <td>${dataCreate[i].price}</td>
                            <td>${dataCreate[i].taxes}</td>
                            <td>${dataCreate[i].ads}</td>
                            <td>${dataCreate[i].discount}</td>
                            <td>${dataCreate[i].total}</td>
                            <td>${dataCreate[i].category}</td>
                            <td><button onclick = "updateD(${i})" id="update">Update</button></td>
                            <td><button onclick = " delatr(${i})" id="delete">Delete</button></td>
                        </tr>`;
                }
            }
        }
        document.getElementById("tbody").innerHTML = table;
    }
}
