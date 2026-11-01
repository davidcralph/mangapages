// just a few popular manga/light novels/manhwa/manhua for the search
// this file won't need to be updated probably
// the list is pretty much taken entirely from the MyAnimeList highest rated manga/light novels/manhwa/manhua

import type { TitleType } from './api';

const mangaList: string[] = [
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
  'Nisekoi',
];

const lightNovelList: string[] = [
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
  'Hai to Gensou no Grimgar',
];

const manhwaList: string[] = [
  'Solo Levelling',
  'The Horizon',
  'Wind Breaker',
  'Who Made Me a Princess',
  'Tower of God',
  'The Legend of the Northern Blade',
  'The Breaker',
  'Omniscient Reader',
  'Annarasumanara',
  'The Boxer',
  'Sweet Home',
  'Your Throne',
  'Spirit Fingers',
  'Noblesse',
];

const manhuaList: string[] = [
  'Here U Are',
  'Song of the Long March',
  'SQ: Begin W/Your Name!',
  'Mo Dao Zu Shi',
  'Feng Shen Ji',
  'The One',
  'Tian Guan Ci Fu',
  'The Ravages of Time',
  'Doupo Cangqiong',
  'Douluo Dalu',
  'Please Take My Brother Away',
  'Gu Fang Bu Zi Shang',
  'Blood and Steel',
  'City of Darkness',
];

const lists: Record<TitleType, string[]> = {
  manga: mangaList,
  'light novel': lightNovelList,
  manhwa: manhwaList,
  manhua: manhuaList,
};

export function randomPlaceholder(type: TitleType): string {
  const list = lists[type];
  return list[Math.floor(Math.random() * list.length)];
}
