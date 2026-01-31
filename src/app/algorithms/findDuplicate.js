const arr=[1,0,9,10,7,5, 2,1]

const hasDuplicate=(arr)=>{
    const seen=new Set()
    for (let i = 0; i < arr.length; i++) {
        if(seen.has(arr[i])) return true
        seen.add(arr[i]);
    }
    return false
}
console.log(hasDuplicate(arr))



// shortcut 
// This works because a Set automatically removes duplicates 
// so if the sizes differ, duplicates exist.
// However, the explicit loop version is better when I need to short-circuit early.
// const hasDuplicate = arr => new Set(arr).size !== arr.length;