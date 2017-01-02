module.exports = function (str, pattern) {

  let position = 0
  let text = str
  let pieceIndex = 0

  const keys = pattern.match(/\$\{(.*?)\}/gi)
  const filterUndef = (el) => 
    (el != undefined) 
      ? el 
      : false
  const mapIntersections = (key, i) => {
    let intersection = pattern.slice(position, pattern.indexOf(key))
    if (pattern.indexOf(key) > -1){ 
      position += (key.length + intersection.length)
      return intersection
    }
  }
  const reduzLast = (acc, pattern) => {
    let lastIntersection = pattern.slice(position, pattern.length)
    if (lastIntersection.length) acc.push(lastIntersection)
    return acc
  }

  const intersections = keys.map(mapIntersections).filter(filterUndef)
  const intersectionsTotal = [pattern].reduce(reduzLast, intersections)

  const reduceToResponse = (acc, intersection) => {
    if (text != undefined) {
      let tmp = text.split(intersection)
      let tag = keys[pieceIndex].match(/.*\$\{(.*)\}.*/)[1] // [ '${action}', 'action', index: 0, input: '${action}' ]
   
      const success = () => { 
        pieceIndex++
        acc[tag] = tmp[0]
       }   

      text = tmp[1]

      if (tmp[0].length) success()
      return acc
    }
  }
  
  const response = intersectionsTotal.reduce(reduceToResponse, {})
  if (text) {
    let tag = keys[pieceIndex].match(/.*\$\{(.*)\}.*/)[1] // [ '${action}', 'action', index: 0, input: '${action}' ]
    response[tag] = text
  }
  return response
}
