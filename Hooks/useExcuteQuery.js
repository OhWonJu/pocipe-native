import { useApolloClient } from "@apollo/client";

const useExcuteQuery = (GQL_QUERY, onCompleted) => {
  const client = useApolloClient();
  return async ({ variables }) => {
    const response = await client.query({
      query: GQL_QUERY,
      variables,
      fetchPolicy: "network-only",
    });
    onCompleted(response.data);
  };
};

export default useExcuteQuery;
