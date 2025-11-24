export function printMessage(message) {
    console.log(message);
}

class CustomerDetails {

    printName(Name){
        console.log("Customer Name: " + Name);
    }

    reverseArray(arr){
        return arr.reverse();
    }

    rotateRight(arr, k){

        if (arr.length === 0) return arr;

        if (k >= arr.length) { return arr}

        while(k-- > 0)  {
            let lastElement = arr.pop();
            arr.unshift(lastElement);
        }
        console.log("Array after right rotation: " + arr);
        return arr;
    }

    rotateleft(arr, k){
        
        while(k-- > 0)  {
            let firstElement = arr.push();
            arr.shift(lastElement);
        }
        console.log("Array after left rotation: " + arr);
        return arr;
    }

    oddIOccurrences(arr){
        for (let i = 0; i < arr.length; i++) {
            let fistIndex = arr.indexOf(arr[i]);
            let lastIndex = arr.lastIndexOf(arr[i]);
            if (fistIndex === lastIndex) {
                console.log("Element with odd occurrences: " + arr[i]);
                return arr[i];
            }    

        }
    }
        
        

}

export { CustomerDetails };