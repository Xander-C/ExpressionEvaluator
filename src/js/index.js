import {
    evaluate
} from "./modules/evaluate.js";


document.querySelector("#eval-btn").addEventListener("click", () => {
    let str = document.querySelector("#eval-input").value;
    console.log(str);
    let history = evaluate(str);
    let ans = history[history.length - 1][2][0];
    if (ans != null && history[history.length - 1][2].length == 1) {
        alert("结果为：" + ans);
    }
})