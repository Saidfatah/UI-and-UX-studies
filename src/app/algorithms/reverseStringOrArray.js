const string="JAZMINE FAYROUZ"
const arr=[1,2,3,4]

const reverseString=()=>{
    const chars=string.split('')
    const length=chars.length
    for (let index = 0; index < length/2; index++) {
        const temp=chars[index]
        chars[index]=chars[length-index-1]
        chars[length-index-1]=temp
    }

    return chars.join('')
}

const reverseArray=()=>{
    const length=arr.length
    for (let index = 0; index < length/2; index++) {
        const temp=arr[index]
        arr[index]=arr[length-index-1]
        arr[length-index-1]=temp
    }

    return arr
}

console.log(reverseArray())
