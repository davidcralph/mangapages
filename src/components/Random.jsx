import * as Constants from '../modules/constants';

export default function RandomManga({ data, type }) {
  let text = 'Manga';
  if (type === 'light novel') {
    text = 'light novels';
  }

  return (
    <>
      <h2 className='subtitle'>Random {text}</h2>
      <div className='recommended-row'>
        {data.length > 0 ? data.map(manga => {
          const slug = manga.title.toLowerCase().replaceAll(' ', '-');
          return (
            <div className='card' key={manga.title}>
              <div className='card-content'>
                <span>{manga.title}</span>
                <div className='wheretoview'>
                  <a href={manga.url} target='_blank' rel='noopener noreferrer'>
                    <img src={Constants.CDN_URL + '/logos/' + manga.site + '.png'} alt={manga.site + ' icon'} title={manga.site.charAt(0).toUpperCase()  + manga.site.slice(1)}/>
                  </a>
                </div>
                <br/>
                <a className='mal-info' href={Constants.API_URL + '/mal/' + slug} target='_blank' rel='noopener noreferrer'>MyAnimeList</a>
              </div>
            </div>
          );
        }) : 
        <>
          {/* todo: use skeleton or something cleaner than just loading text */}
          <div className='card'>
            <div className='card-content'>
              <span>Loading...</span>
            </div>
          </div>
          <div className='card'>
            <div className='card-content'>
              <span>Loading...</span>
            </div>
          </div>
          <div className='card'>
            <div className='card-content'>
              <span>Loading...</span>
            </div>
          </div>
          <div className='card'>
            <div className='card-content'>
              <span>Loading...</span>
            </div>
          </div>
        </>}
      </div>
    </>
  );
}
