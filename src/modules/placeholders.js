// just a few popular manga/light novels for the search
// this file won't need to be updated probably
// the list is pretty much taken entirely from the MyAnimeList highest rated manga/light novels

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

const lightNovelList = [
  'Monogatari Series',
  'Ookami to Koushinryou',
  'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e',
  'Yahari Ore no Seishun Love Comedy wa Machigatteiru.',
  'Re:Zero kara Hajimeru Isekai Seikatsu',
  'Overlord',
  'Shinyaku Toaru Majutsu no Index',
  'Violet Evergarden',
  '86',
  'Kono Subarashii Sekai ni Shukufuku wo!',
  'Kino no Tabi: The Beautiful World',
  'Fate/Zero',
  'Suzumiya Haruhi Series',
  'Baccano!',
  'Seishun Buta Yarou Series',
  'No Game No Life',
  'Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen',
  'Steins;Gate',
  'Kumo desu ga, Nani ka?',
  'Tensei shitara Slime Datta Ken',
  'Akatsuki no Yona',
  'Umineko no Naku Koro ni',
  'Youjo Senki',
  'Juuni Kokuki',
  'Toaru Majutsu no Index',
  'Durarara!!',
  'Bungou Stray Dogs',
  'Adachi to Shimamura',
  'Sword Art Online: Progressive',
  'Toradora',
  'Hai to Gensou no Grimgar'
];

export function mangaPlaceholder() {
  return mangaList[Math.floor(Math.random() * mangaList.length)];
}

export function lightNovelPlaceholder() {
  return lightNovelList[Math.floor(Math.random() * lightNovelList.length)];
}
