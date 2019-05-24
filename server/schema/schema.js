const graphql = require("graphql");
const _ = require("lodash");
const Game = require('../models/Game')
const Platform = require('../models/Platform')
const Designer = require('../models/Designer')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;



const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    developer: { type: GraphQLString },
    publisher: { type: GraphQLString },
    designer: { type: GraphQLString },
    genre: { type: GraphQLString },
    platform: {
      type: PlatformType,
      resolve(parent, args) {
        //parent returns the game data in this case
        return _.find(platforms, { id: parent.platformId });
      }
    },
    designer: {
      type: DesignerType,
      resolve(parent, args) {
        return _.find(designers, { id: parent.designerId });
      }
    }
  })
});

const PlatformType = new GraphQLObjectType({
  name: "Platform",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    relaseDate: { type: GraphQLString },
    value: { type: GraphQLInt },
    valueCIB: { type: GraphQLInt },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return _.filter(games, {platformId: parent.id});
      }
    }
  })
});

const DesignerType = new GraphQLObjectType({
  name: "Designer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get the data from db or source of data
        //use lodash to find id using args
        return _.find(games, { id: args.id });
      }
    },
    designer: {
      type: DesignerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(designers, { id: args.id });
      }
    },
    platform: {
      type: PlatformType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(platforms, { id: args.id });
      }
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args){
        return games
      }
    },
    platforms: {
      type: new GraphQLList(PlatformType),
      resolve(parent, args){
        return platforms
      }
    },
    designers: {
      type: new GraphQLList(DesignerType),
      resolve(parent, args){
        return designers
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
