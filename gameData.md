/game data
//game, system, developer, designer, release, genre, mode (1 or 2p or multi), timetobeat, price loose, price cib, image, ratings


const games = [
  {
    name: "The Lord of the Rings: The Third Age",
    developer: "Griptonite Games",
    publisher: "Electronic Arts",
    genre: "Turn-based tactics, tactical role-playing",
    id: "1",
    platformId: "1"
  },
  {
    name: "Need for Speed: Hot Pursuit 2",
    developer: "EA Black Box",
    publisher: "Electronic Arts",
    genre: "Racing",
    id: "2",
    platformId: "2",
    designerId: "1"
  },
  {
    name: "Panzer Dragoon",
    developer: "Sega, Team Andromeda, Smilebit",
    publisher: "Sega",
    genre: "Rail shooter, role-playing",
    id: "3",
    platformId: "3",
    designerId: "2"
  },
  {
    name: "Sly Cooper",
    developer: "Sucker Punch Productions",
    publisher: "Sony Computer Entertainment",
    genre: "Platform, stealth",
    id: "4",
    platformId: "2"
  },
  {
    name: "Guardian Heroes",
    developer: "Treasure",
    publisher: "Sega",
    genre: "Beat 'em up, hack and slash, Action role-playing",
    id: "5",
    platformId: "3",
    designerId: "4, 3"
  }
];

const platforms = [
  {
    name: "Game Boy Advance",
    manufacturer: "Nintendo",
    relaseDate: "June 11, 2001",
    value: 32,
    valueCIB: 57,
    id: "1"
  },
  {
    name: "PlayStation 2",
    manufacturer: "Sony",
    relaseDate: "October 26, 2000",
    value: 42,
    valueCIB: 52,
    id: "2"
  },
  {
    name: "Sega Saturn",
    manufacturer: "Sega",
    relaseDate: "May 11, 1995",
    value: 88,
    valueCIB: 105,
    id: "3"
  }
];

const designers = [
  {
    name: "William Ho",
    id: "1"
  },
  {
    name: "Yukio Futatsugi",
    age: 49,
    id: "2"
  },
  {
    name: "Tetsuhiko Kikuchi",
    id: "3"
  },
  {
    name: "Masaki Ukyo",
    id: "4"
  }
];

