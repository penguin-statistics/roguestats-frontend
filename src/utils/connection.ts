// nodesFromEdges returns the nodes from a connection
// it also filters out null nodes (and makes typescript happy as well)
export const nodesFromEdges = <T extends Readonly<any>>(
  edges: Array<{ node: T | null }> | null,
): T[] =>
  (edges || []).filter(edge => edge.node !== null).map(edge => edge.node as T)
