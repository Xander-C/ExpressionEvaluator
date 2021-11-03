import {
    evaluate
} from "./modules/evaluate.js";

const updateHistory = (history) => {
    let tableBody = document.querySelector("#table-body");
    if (tableBody !== "undefined") {
        while (tableBody.hasChildNodes()) {
            tableBody.removeChild(tableBody.lastChild)
        }
    }
    history.forEach((i, index) => {
        let row = document.createElement("tr");
        let td0 = document.createElement("td");
        td0.innerHTML = index;
        let td1 = document.createElement("td");
        td1.innerHTML = i[0];
        let td2 = document.createElement("td");
        td2.innerHTML = i[1];
        let td3 = document.createElement("td");
        td3.innerHTML = i[2];
        let td4 = document.createElement("td");
        td4.innerHTML = i[3];
        row.appendChild(td0);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        tableBody.appendChild(row);
    })
}
document.querySelectorAll(".char").forEach((i) => {
    console.log(i);
    i.addEventListener("click", () => {
        let char = i.innerHTML;
        let display = document.querySelector("#display");
        let str = display.innerHTML;
        if (str == "0") {
            str = '';
        }
        str += char;
        console.log(char);
        display.innerHTML = str;
    })
})

document.querySelector("#btn-delete").addEventListener("click", () => {
    document.querySelector("#display").innerHTML = "0";
})

document.querySelector("#equals").addEventListener("click", () => {
    let display = document.querySelector("#display");
    let str = display.innerHTML;
    if (str.charAt(0) != '#') {
        str = "#" + str;
    }
    if (str.charAt(str.length - 1) != '#') {
        str = str + "#";
    }
    console.log(str);
    let history = evaluate(str);
    let ans = history[history.length - 1][2][0];
    if (ans != null && history[history.length - 1][2].length == 1) {
        display.innerHTML = ans;
    }
    updateHistory(history)

})