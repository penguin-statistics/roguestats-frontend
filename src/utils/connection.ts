// nodesFromEdges returns the nodes from a connection
// it also filters out null nodes (and makes typescript happy as well)
export const nodesFromEdges = <T extends Readonly<unknown>>(
  edges: Readonly<Array<{ readonly node: T | null } | null>> | null,
): T[] =>
  (edges ?? [])
    .filter(edge => edge?.node !== null && edge?.node !== undefined)
    .map(edge => edge?.node as T)
