export function History() {
    var items = [];

    this.log = (str, opStack, numStack, type, logList) => {
        items.push([str, opStack.snapshot(), numStack.snapshot(), type, logList]);
    }

    this.print = () => {
        console.log(items);
    }

    this.getHistory = () => {
        return items;
    }
}