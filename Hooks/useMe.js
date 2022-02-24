import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isSignInVar, userSignOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      userName
      profilePhoto
    }
  }
`;

export default useMe = () => {
  const hasToken = useReactiveVar(isSignInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me == null) {
      userSignOut();
    }
  }, [data]);
  return { data };
};
