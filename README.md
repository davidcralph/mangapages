# Manga Pages
📖 Easily find the place to read a manga or light novel

As of the latest update, support for manhwa and manhua has been added. You can choose between manga, light novels, manhwa or manhua from the dropdown on the main page.

## About
I built Manga Pages to solve the issue of finding which legal service provides a manga/light novel. Search engines don't always show this information (and often show lots of ad-filled unofficial sites). The site provides a simple hub to finding what you want to read next showing which sites have the manga/light novel available and a MyAnimeList button to read information about it. Think of this service as like [because.moe](https://because.moe) but for manga/light novels.
## Features
🔍 Fast search with support for [multiple websites](#supported-websites)

🌙 Clean UI with light and dark theme

📈 Database updated frequently to always show the latest manga/light novels/manhwa/manhua

## Supported Websites
<!-- BOOK☆WALKER is disabled for now: its catalogue moved to bookwalker.com behind a Cloudflare bot check -->
* [J-Novel Club](https://j-novel.club) (manga and light novels)
* [MangaPlus](https://mangaplus.shueisha.co.jp/updates) (manga)
* [MyAnimeList](https://myanimelist.net/store) (manga)
* [Omoi](https://www.omoi.com) (manga, formerly Azuki)
* [Renta](https://www.ebookrenta.com) (manga)
* [VIZ](https://www.viz.com) (manga)
* [Toomics](https://toomics.com) (manhwa, only SFW)

## Future Ideas
* Support for multiple regions (currently only been testing United Kingdom but content may be available elsewhere)
* Checkbox for only showing free websites/subscription services/paid ebooks
* List services that provide physical copies

## Development
Bun workspace with `frontend` (Vite + React + TypeScript + shadcn/ui), `backend` (Cloudflare Worker + Hono) and `crawler` (fetch + Puppeteer).

```bash
bun install
bun crawl        # crawl every site into backend/src/data/ (takes a while), or e.g. `bun crawl viz toomics` for only some
bun dev:backend   # wrangler dev on http://localhost:8787
# frontend: cp frontend/.env.example frontend/.env.development.local to use the local worker
bun dev:frontend
```

Deploy the API with `bun --filter backend deploy` (data is bundled into the Worker). Deploy the frontend by building `frontend/dist` to Cloudflare Pages.

## Resources Used
[yattatachi's legal online manga sites list](https://yattatachi.com/legal-online-manga-sites)

[wherecanireadmanga.com](https://wherecanireadmanga.com)

[bookriot.com's legal manhwa sites list](https://bookriot.com/where-to-read-manhwa)

## License
[MIT](LICENSE)
