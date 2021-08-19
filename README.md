# Manga Pages
📖 Easily find the place to read a manga

## About
I built Manga Pages to solve the issue of finding which legal service provides a manga. Search engines don't always show this information (and often show lots of ad-filled unofficial sites). The site provides a simple hub to finding what you want to read next showing which sites have the manga available and a MyAnimeList button to read information about it. Think of this service as like [because.moe](https://because.moe) but for manga.

## Features
🔍 Fast search with support for [multiple websites](#supported-websites)

🌙 Clean UI with light and dark theme

📈 Database updated frequently to always show the latest manga

## Supported Websites
* [Azuki](https://www.azuki.co/)
* [BOOK☆WALKER Global](https://global.bookwalker.jp/)
* [ComicWalker](https://comic-walker.com/)
* [Crunchyroll](https://www.crunchyroll.com)
* [Inky Pen](https://inky-pen.com)
* [j-novel club](https://j-novel.club)
* [Manga Planet](https://read.mangaplanet.com)
* [MangaPlus](https://mangaplus.shueisha.co.jp/updates)
* [MyAnimeList](https://myanimelist.net/store)
* [NETCOMICS](https://www.netcomics.com/)
* [VIZ](https://www.viz.com)

*and more soon!*

## Future ideas
* More services
* Support for multiple regions (currently only been testing United Kingdom but content may be available elsewhere)
* Developer API
* Checkbox for only showing free websites/subscription services/paid ebooks
* List services that provide physical copies
* Support for more than just manga

## Notice
The backend is currently not opensource and most likely won't be for some time (it's a bit of a mess!). If you wish to make your own backend, all you really need is a ``/random`` and ``/search`` route that returns an array like this:
```js
[
  {
    "title": "Hunter x Hunter",
    "site": "viz",
    "url": "https://www.viz.com/hunter-x-hunter" // depending on the site, this may be different and you will need custom code!
  }
]
```

## Resources Used
[yattatachi's legal online manga sites list](https://yattatachi.com/legal-online-manga-sites)

[wherecanireadmanga.com](https://wherecanireadmanga.com/)

## License
[MIT](LICENSE)