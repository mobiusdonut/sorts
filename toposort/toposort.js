const union = (setA, setB) => {
  let _union = new Set(setA)
  for (let elem of new Set(setB)) {
      _union.add(elem)
  }
  return Array.from(_union)
}

const difference = (setA, setB) => {
  let _difference = new Set(setA)
  for (let elem of new Set(setB)) {
      _difference.delete(elem)
  }
  return Array.from(_difference)
}

const toposort = (data) => {
//empty dataset
if (data.length === 0) {
  return None;
}
//copy of dataset
data = new Map(Object.entries(data));
//remove self dependencies
for (let [key, value] of data.entries()) {
  if (value.indexOf(key) !== -1) {
    value.splice(value.indexOf(key), 1);
  }
}
//find items with no dependencies
no_deps = difference(Array.from(data.values()).reduce(union), new Set(data.keys()));
//add empty dependencies
no_deps.forEach((item) => data.set(item, []));

let done = false;
let final = [];
while (!done) {
  let ordered = Array.from(data.keys()).filter((key) => data.get(key).length === 0);
  if (Array.from(data.keys()).length === 0) {
    done = true;
  }
  else if (ordered.length === 0) {
    done = true;
    return "Circular dependency error"
  }
  else {
    final.push(ordered)
    for (let [key, value] of data.entries()) {
      if (value.length === 0) {
        data.delete(key)
      }
      else {
        data.set(key, difference(value, ordered))
      }
    }
  }
}
return final
}

const toposort_flatten = (data) => {
result = []
toposort(data).forEach((d) => {
  result.push(...d)
})
return result
}