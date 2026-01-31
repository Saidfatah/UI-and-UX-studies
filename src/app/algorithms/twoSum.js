const arr=[1,1,0,10,3,1,0,19]
const target =10

const getIndicesOfTwoNumbersThatAddUpToTheTarget=()=>{
  let index=-1;
  
  for(let i=0;i<arr.length; i++){
      for(let j=i+1;j<arr.length; j++){
          if(arr[i] + arr[j] === target){
            return[i, j]
          }
      }
  }
  
  return index;
}



const better = () => {
  const map = new Map(); // value → index

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(arr[i], i);
  }

  return null;
};

console.log(better())