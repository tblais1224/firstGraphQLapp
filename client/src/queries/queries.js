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

const addGameMutation = gql`
  mutation(
    $name: String!
    $genre: String!
    $developer: String!
    $publisher: String!
    $platformId: ID!
    $designerId: ID
  ) {
    addGame(
      name: $name
      genre: $genre
      developer: $developer
      publisher: $publisher
      designerId: $designerId
      platformId: $platformId
    ) {
      name
      id
    }
  }
`;

export { getGamesQuery, getDesignersPlatformsQuery, addGameMutation };
