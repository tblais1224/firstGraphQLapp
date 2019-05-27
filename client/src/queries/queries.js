import { gql } from "apollo-boost";


const getGamesQuery = gql`
  {
    games {
      name
      id
    }
  }
`;

const getDesignersPlatformsQuery = gql`
  {
    designers {
      name
      id
    }
    platforms {
      name
      id
    }
  }
`;

export {getGamesQuery, getDesignersPlatformsQuery}