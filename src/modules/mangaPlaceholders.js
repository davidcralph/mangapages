// just a few popular manga for the search
// this file won't need to be updated probably
// the list is pretty much taken entirely from the MyAnimeList most popular manga

const mangaList = [
  'Tokyo Ghoul',
  'Naruto',
  'One Piece',
  'Shingeki no Kyojin',
  'Boku no Hero Academia',
  'Death Note',
  'One Punch Man',
  'Bleach',
  'Chainsaw Man',
  'Kimetsu no Yaiba',
  'Fairy Tail',
  'Fullmetal Alchemist',
  'Hunter x Hunter',
  'Jujutsu Kaisen',
  'Vinland Saga',
  'Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen',
  'Komi-san wa, Comyushou desu',
  'Haikyuu!!',
  'Monster',
  'Akame ga Kill',
  'Soul Eater',
  'Nanatsu no Taizai',
  'Shokugeki no Souma',
  'Noragami',
  'Bakuman',
  'Black Clover',
  'Spy x Family',
  'Ao no Exorcist',
  'Deadman Wonderland',
  'Nisekoi'
];

export default function mangaPlaceholders() {
  return mangaList[Math.floor(Math.random() * mangaList.length)];
}
