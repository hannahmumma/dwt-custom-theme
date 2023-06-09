/**
 * External dependencies
 */

import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}