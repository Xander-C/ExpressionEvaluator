export function History() {
    var items = [];

    this.log = (str, opStack, numStack, type) => {
        items.push([str, opStack.snapshot(), numStack.snapshot(), type]);
    }

    this.print = () => {
        console.log(items);
    }

    this.getHistory = () => {
        return items;
    }
}