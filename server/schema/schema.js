const graphql = require("graphql");
const _ = require("lodash");
const Game = require("../models/Game");
const Platform = require("../models/Platform");
const Designer = require("../models/Designer");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    developer: { type: GraphQLString },
    publisher: { type: GraphQLString },
    genre: { type: GraphQLString },
    platform: {
      type: PlatformType,
      resolve(parent, args) {
        //parent returns the game data in this case
        // return _.find(platforms, { id: parent.platformId });
        return Platform.findById(parent.platformId);
      }
    },
    designer: {
      type: DesignerType,
      resolve(parent, args) {
        // return _.find(designers, { id: parent.designerId });
        return Designer.findById(parent.designerId);
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
    releaseDate: { type: GraphQLString },
    value: { type: GraphQLInt },
    valueCIB: { type: GraphQLInt },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        //   return _.filter(games, { platformId: parent.id });
        return Game.find({ platformId: parent.id });
      }
    }
  })
});

const DesignerType = new GraphQLObjectType({
  name: "Designer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        //   return _.filter(games, { platformId: parent.id });
        return Game.find({ designerId: parent.id });
      }
    }
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
        // return _.find(games, { id: args.id });
        return Game.findById(args.id);
      }
    },
    designer: {
      type: DesignerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Designer.findById(args.id);
      }
    },
    platform: {
      type: PlatformType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Platform.findById(args.id);
      }
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        //returns all games
        return Game.find({});
      }
    },
    platforms: {
      type: new GraphQLList(PlatformType),
      resolve(parent, args) {
        return Platform.find({});
      }
    },
    designers: {
      type: new GraphQLList(DesignerType),
      resolve(parent, args) {
        return Designer.find({});
      }
    }
  }
});

//setup mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGame: {
      type: GameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        developer: { type: new GraphQLNonNull(GraphQLString) },
        publisher: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        designerId: { type: GraphQLID },
        platformId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let game = new Game({
          name: args.name,
          developer: args.developer,
          publisher: args.publisher,
          genre: args.genre,
          platformId: args.platformId,
          designerId: args.designerId
        });
        return game.save().catch(err => console.log(err));
      }
    },

    addDesigner: {
      type: DesignerType,
      //args are passed in from user on front end
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //create an instance of the designer model
        let designer = new Designer({
          name: args.name,
          age: args.age
        });
        return designer.save().catch(err => console.log(err));
      }
    },

    addPlatform: {
      type: PlatformType,
      //args are passed in from user on front end
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        manufacturer: { type: new GraphQLNonNull(GraphQLString) },
        releaseDate: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLInt },
        valueCIB: { type: GraphQLInt }
      },
      resolve(parent, args) {
        //create an instance of the Platform model
        let platform = new Platform({
          name: args.name,
          manufacturer: args.manufacturer,
          releaseDate: args.releaseDate,
          value: args.value,
          valueCIB: args.valueCIB
        });
        // if(!Platform.findOne({name: args.name}, (err, res))){
        //   console.log("Does not exist in DB!")
        //   return platform.save().catch(err => console.log(err))
        // }else {
        //   console.log("Already exists in DB!")
        // }
        Platform.findOne({ name: args.name }, (err, res) => {
          if (err) {
            console.log(err, "Already exists in DB!");
          }
          if (!res) {
            addToDb()
          }
        });
        function addToDb (){
          return platform.save().catch(err => console.log(err));
        }
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
