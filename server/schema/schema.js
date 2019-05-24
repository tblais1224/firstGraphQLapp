const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
//game, system, developer, designer, release, genre, mode (1 or 2p or multi), timetobeat, price loose, price cib, image, ratings
const games = [
  {
    name: "The Lord of the Rings: The Third Age",
    developer: "Griptonite Games",
    publisher: "Electronic Arts",
    genre: "Turn-based tactics, tactical role-playing",
    platform: "Game Boy Advance",
    id: "1"
  },
  {
    name: "Need for Speed: Hot Pursuit 2",
    developer: "EA Black Box",
    publisher: "Electronic Arts",
    designer: "William Ho",
    genre: "Racing",
    platform: "PlayStation 2",
    id: "2"
  },
  {
    name: "Panzer Dragoon",
    developer: "Sega, Team Andromeda, Smilebit",
    publisher: "Sega",
    designer: "Yukio Futatsugi",
    genre: "Rail shooter, role-playing",
    platform: "Sega Saturn",
    id: "3"
  }
];

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    developer: { type: GraphQLString },
    publisher: { type: GraphQLString },
    designer: { type: GraphQLString },
    genre: { type: GraphQLString },
    platform: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get the data from db or source of data
        //use lodash to find id using args
        return _.find(games, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
