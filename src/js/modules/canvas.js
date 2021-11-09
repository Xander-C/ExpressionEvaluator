async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const drawCanvas = (history) => {
    let ctx = document.querySelector("canvas").getContext("2d");
    ctx.clearRect(0, 0, 600, 400);
    let originStr = history[0][0];
    ctx.font = "30px Consolas";
    ctx.fillText(originStr, 250, 50);

    ctx.fillText("操作符栈", 200, 370);
    ctx.fillText("数字栈", 420, 370);
    let originLength = originStr.length;
    asyncForEach(history, async (i) => {
        switch (i[3]) {
            case 'Origin':

                break;
            case 'Init':
                await drawChar(i, originLength);
                await sleep(500);
                break;
            case 'Char':
                await drawChar(i, originLength);
                await sleep(500);
                break;
            case 'Unary':
                await drawUnary(i, originLength);
                await sleep(500);

                break;
            case 'Binocular':
                await drawBinocular(i, originLength);
                await sleep(500);
                break;
            case 'Bracket':
                await drawBracket(i, originLength);
                await sleep(500);

                break;
            case 'Number':
                await drawNum(i, originLength);
                await sleep(500);
                break;
            default:
                break;
        }
    });
}

const sleep = async (ms) => {
    await new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

const fixNumber = (ans) => {
    if (ans - parseInt(ans) != 0) {
        ans = ans.toFixed(3);
    }
    return ans;
}

const drawBinocular = async (i, originLength) => { //Todo: 添加字符个数偏移
    let start;
    let str = i[0];
    let fst = i[4][0];
    fst = fixNumber(fst);
    let operator = i[4][1];
    let scd = i[4][2];
    scd = fixNumber(scd);
    let strOffsetLength = originLength - str.length;

    let numStack = i[2];
    let opStack = i[1];
    let ans = numStack[numStack.length - 1];
    ans = fixNumber(ans);


    let fstBeginX = 450;
    let fstBeginY = 340 - (numStack.length - 1) * 30;
    let fstEndX = 320;
    let fstEndY = 120;

    let scdBeginX = 450;
    let scdBeginY = 340 - (numStack.length - 2) * 30;
    let scdEndX = 380;
    let scdEndY = 120;


    let operatorBeginX = 255;
    let operatorBeginY = 340 - 30 * opStack.length;
    let operatorEndX = 345;
    let operatorEndY = 120;

    let ansBeginX = 350;
    let ansBeginY = 120;
    let ansEndX = 450;
    let ansEndY = 340 - (numStack.length - 1) * 30;

    window.requestAnimationFrame(innerDraw);
    await sleep(2000);

    function innerDraw(timeStamp) {
        let ctx = document.querySelector("canvas").getContext("2d");
        if (start == undefined)
            start = timeStamp;
        const elapsed = timeStamp - start;

        ctx.clearRect(0, 0, 600, 400);
        ctx.fillText(str, 250 + strOffsetLength * 16.5, 50);
        ctx.fillText("操作符栈", 200, 370);
        ctx.fillText("数字栈", 420, 370);
        for (let j = 0; j < opStack.length; j++) {
            ctx.fillText(opStack[j], 255, 340 - 30 * j);
        }
        for (let j = 0; j < numStack.length - 1; j++) {
            let outNumber = numStack[j];
            if (numStack[j] - parseInt(numStack[j]) != 0) {
                outNumber = numStack[j].toFixed(3);
            }
            ctx.fillText(outNumber + "", 450, 340 - 30 * j);
        }
        if (elapsed < 900) {
            ctx.fillText(fst, (fstEndX - fstBeginX) / 900 * Math.min(elapsed, 900) + fstBeginX, (fstEndY - fstBeginY) / 900 * Math.min(elapsed, 900) + fstBeginY);
            ctx.fillText(scd, (scdEndX - scdBeginX) / 900 * Math.min(elapsed, 900) + scdBeginX, (scdEndY - scdBeginY) / 900 * Math.min(elapsed, 900) + scdBeginY);
            ctx.fillText(operator, (operatorEndX - operatorBeginX) / 900 * Math.min(elapsed, 900) + operatorBeginX, (operatorEndY - operatorBeginY) / 900 * Math.min(elapsed, 900) + operatorBeginY);
        } else if (elapsed < 1200) {
            ctx.fillText(fst, fstEndX, fstEndY);
            ctx.fillText(scd, scdEndX, scdEndY);
            ctx.fillText(operator, operatorEndX, operatorEndY);
        } else {
            ctx.fillText(ans, (ansEndX - ansBeginX) / 800 * (Math.min(elapsed, 2000) - 1200) + ansBeginX, (ansEndY - ansBeginY) / 800 * (Math.min(elapsed, 2000) - 1200) + ansBeginY);
        }
        if (elapsed < 2000) {
            window.requestAnimationFrame(innerDraw);
        }
    }
}

const drawUnary = async (i, originLength) => {
    let start;
    let str = i[0];
    let number = i[4][1];
    let operator = i[4][0];
    let strOffsetLength = originLength - str.length;

    let numStack = i[2];
    let opStack = i[1];
    let ans = numStack[numStack.length - 1];
    if (ans - parseInt(ans) != 0) {
        ans = ans.toFixed(3);
    }

    let numberBeginX = 450;
    let numberBeginY = 340 - (numStack.length - 1) * 30;
    let numberEndX = 385;
    let numberEndY = 120;


    let operatorBeginX = 255;
    let operatorBeginY = 340 - 30 * opStack.length;
    let operatorEndX = 320;
    let operatorEndY = 120;

    let ansBeginX = 350;
    let ansBeginY = 120;
    let ansEndX = 450;
    let ansEndY = 340 - (numStack.length - 1) * 30;

    window.requestAnimationFrame(innerDraw);
    await sleep(2000);

    function innerDraw(timeStamp) {
        let ctx = document.querySelector("canvas").getContext("2d");
        if (start == undefined)
            start = timeStamp;
        const elapsed = timeStamp - start;

        ctx.clearRect(0, 0, 600, 400);
        ctx.fillText(str, 250 + strOffsetLength * 16.5, 50);
        ctx.fillText("操作符栈", 200, 370);
        ctx.fillText("数字栈", 420, 370);
        for (let j = 0; j < opStack.length; j++) {
            ctx.fillText(opStack[j], 255, 340 - 30 * j);
        }
        for (let j = 0; j < numStack.length - 1; j++) {
            let outNumber = numStack[j];
            if (numStack[j] - parseInt(numStack[j]) != 0) {
                outNumber = numStack[j].toFixed(3);
            }
            ctx.fillText(outNumber + "", 450, 340 - 30 * j);
        }
        if (elapsed < 900) {
            ctx.fillText(number, (numberEndX - numberBeginX) / 900 * Math.min(elapsed, 900) + numberBeginX, (numberEndY - numberBeginY) / 900 * Math.min(elapsed, 900) + numberBeginY);
            ctx.fillText(operator, (operatorEndX - operatorBeginX) / 900 * Math.min(elapsed, 900) + operatorBeginX, (operatorEndY - operatorBeginY) / 900 * Math.min(elapsed, 900) + operatorBeginY);
        } else if (elapsed < 1200) {
            ctx.fillText(number, numberEndX, numberEndY);
            ctx.fillText(operator, operatorEndX, operatorEndY);
        } else {
            ctx.fillText(ans, (ansEndX - ansBeginX) / 800 * (Math.min(elapsed, 2000) - 1200) + ansBeginX, (ansEndY - ansBeginY) / 800 * (Math.min(elapsed, 2000) - 1200) + ansBeginY);
        }
        if (elapsed < 2000) {
            window.requestAnimationFrame(innerDraw);
        }
    }
}

const drawBracket = async (i, originLength) => {
    let start;
    let str = i[0];
    let rightBracket = i[4][1];
    let leftBracket = i[4][0];
    let strOffsetLength = originLength - str.length;
    let rightBracketOffsetLength = strOffsetLength - rightBracket.length;
    let rightBracketBeginX = 250 + rightBracketOffsetLength * 16.5;
    let rightBracketBeginY = 50;
    let rightBracketEndX = 350;
    let rightBracketEndY = 120;

    let numStack = i[2];
    let opStack = i[1];

    let leftBracketBeginX = 255;
    let leftBracketBeginY = 340 - 30 * opStack.length;
    let leftBracketEndX = 350;
    let leftBracketEndY = 120;



    window.requestAnimationFrame(innerDraw);
    await sleep(1000);

    function innerDraw(timeStamp) {
        let ctx = document.querySelector("canvas").getContext("2d");
        if (start == undefined)
            start = timeStamp;
        const elapsed = timeStamp - start;

        ctx.clearRect(0, 0, 600, 400);
        ctx.fillText(str, 250 + strOffsetLength * 16.5, 50);
        ctx.fillText("操作符栈", 200, 370);
        ctx.fillText("数字栈", 420, 370);
        for (let j = 0; j < opStack.length; j++) {
            ctx.fillText(opStack[j], 255, 340 - 30 * j);
        }
        for (let j = 0; j < numStack.length; j++) {
            let outNumber = numStack[j];
            if (numStack[j] - parseInt(numStack[j]) != 0) {
                outNumber = numStack[j].toFixed(3);
            }
            ctx.fillText(outNumber + "", 450, 340 - 30 * j);
        }

        ctx.fillText(rightBracket, (rightBracketEndX - rightBracketBeginX) / 1000 * Math.min(elapsed, 1000) + rightBracketBeginX, (rightBracketEndY - rightBracketBeginY) / 1000 * Math.min(elapsed, 1000) + rightBracketBeginY);
        ctx.fillText(leftBracket, (leftBracketEndX - leftBracketBeginX) / 1000 * Math.min(elapsed, 1000) + leftBracketBeginX, (leftBracketEndY - leftBracketBeginY) / 1000 * Math.min(elapsed, 1000) + leftBracketBeginY);

        if (elapsed < 1000) {
            window.requestAnimationFrame(innerDraw);
        }
    }
}

const drawChar = async (i, originLength) => {
    let start;
    let str = i[0];
    let operator = i[1][i[1].length - 1];
    let strOffsetLength = originLength - str.length;
    let operatorOffsetLength = strOffsetLength - operator.length;
    let operatorBeginX = 250 + operatorOffsetLength * 16.5;
    let operatorEndX = 255;
    let operatorBeginY = 50;
    let opStack = i[1];
    let stackLength = opStack.length;
    let operatorEndY = 340 - 30 * (stackLength - 1);

    let numStack = i[2];


    window.requestAnimationFrame(innerDraw);
    await sleep(1000);

    function innerDraw(timeStamp) {
        let ctx = document.querySelector("canvas").getContext("2d");
        if (start == undefined)
            start = timeStamp;
        const elapsed = timeStamp - start;

        ctx.clearRect(0, 0, 600, 400);
        ctx.fillText(str, 250 + strOffsetLength * 16.5, 50);
        ctx.fillText("操作符栈", 200, 370);
        ctx.fillText("数字栈", 420, 370);
        for (let j = 0; j < stackLength - 1; j++) {
            ctx.fillText(opStack[j], 255, 340 - 30 * j);
        }
        for (let j = 0; j < numStack.length; j++) {
            let outNumber = numStack[j];
            if (numStack[j] - parseInt(numStack[j]) != 0) {
                outNumber = numStack[j].toFixed(3);
            }
            ctx.fillText(outNumber + "", 450, 340 - 30 * j);
        }
        ctx.fillText(operator, (operatorEndX - operatorBeginX) / 1000 * Math.min(elapsed, 1000) + operatorBeginX, (operatorEndY - operatorBeginY) / 1000 * Math.min(elapsed, 1000) + operatorBeginY);

        if (elapsed < 1000) {
            window.requestAnimationFrame(innerDraw);
        }
    }
}

const drawNum = async (i, originLength) => {
    let start;
    let str = i[0];
    let number = i[2][i[2].length - 1] + "";
    let strOffsetLength = originLength - str.length;
    let NumberOffsetLength = strOffsetLength - number.length;
    let numberBeginX = 250 + NumberOffsetLength * 16.5;
    let numberEndX = 450;
    let numberBeginY = 50;
    let numStack = i[2];
    let stackLength = numStack.length;
    let numberEndY = 340 - 30 * (stackLength - 1);

    let opStack = i[1];

    window.requestAnimationFrame(innerDraw);
    await sleep(1000);

    function innerDraw(timeStamp) {
        let ctx = document.querySelector("canvas").getContext("2d");
        if (start == undefined)
            start = timeStamp;
        const elapsed = timeStamp - start;

        ctx.clearRect(0, 0, 600, 400);
        ctx.fillText(str, 250 + strOffsetLength * 16.5, 50);
        ctx.fillText("操作符栈", 200, 370);
        ctx.fillText("数字栈", 420, 370);

        for (let j = 0; j < stackLength - 1; j++) {
            let outNumber = numStack[j];
            if (numStack[j] - parseInt(numStack[j]) != 0) {
                outNumber = numStack[j].toFixed(3);
            }
            ctx.fillText(outNumber + "", 450, 340 - 30 * j);
        }
        for (let j = 0; j < opStack.length; j++) {
            ctx.fillText(opStack[j], 255, 340 - 30 * j);
        }
        ctx.fillText(number, (numberEndX - numberBeginX) / 1000 * Math.min(elapsed, 1000) + numberBeginX, (numberEndY - numberBeginY) / 1000 * Math.min(elapsed, 1000) + numberBeginY);

        if (elapsed < 1000) {
            window.requestAnimationFrame(innerDraw);
        }
    }
}