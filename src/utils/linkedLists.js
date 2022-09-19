export function findLastNode(pathArr, root) {
  let pos = 0;
  let currentNode = root[pathArr[pos]];

  while (pos < pathArr.length - 1) {
    pos++;
    currentNode = currentNode[pathArr[pos]];
  }
  return currentNode;
}
