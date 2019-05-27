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

// gets details for a single game
const getGameQuery = gql`
  query($id: ID) {
    game(id: $id) {
      id
      name
      genre
      developer
      publisher
      platform {
        id
        name
        manufacturer
        releaseDate
        value
        valueCIB
        games {
          id
          name
        }
      }
      designer {
        id
        name
        age
        games {
          id
          name
        }
      }
    }
  }
`;

export {
  getGamesQuery,
  getDesignersPlatformsQuery,
  addGameMutation,
  getGameQuery
};
