import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { withErrorBoundary } from "../ErrorBoundary"
import {
  DiscoverQuerierQuery,
  DiscoverQuerierQuery$variables,
} from "./__generated__/DiscoverQuerierQuery.graphql"

export type QueryInput = DiscoverQuerierQuery$variables["input"]

export const DiscoverQuerier: FC<{
  input: QueryInput
}> = withErrorBoundary(({ input }) => {
  const data = useLazyLoadQuery<DiscoverQuerierQuery>(
    graphql`
      query DiscoverQuerierQuery($input: GroupCountInput!) {
        groupCount(input: $input) {
          results {
            category
            count
          }
          total
        }
      }
    `,
    { input },
  )

  return (
    <TableContainer className="h-full w-full">
      <Table sx={{ minWidth: 650 }} aria-label="discover query result">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.groupCount.results.map(row => (
            <TableRow
              key={row.category}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
DiscoverQuerier.displayName = "DiscoverQuerier"
