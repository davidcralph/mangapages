import * as Constants from '../modules/constants';

export default function MangaResults({ done, data, type }) {
  const resultsText = () => {
    if (done === false && data.length === 0) {
      return 'Loading...';
    }
    
    if (data.length === 0) {
      switch (type) {
        case 'light novel':
          return 'No light novels found';
        case 'manhwa':
          return 'No manhwa found';
        case 'manhua':
          return 'No manhua found';
        default:
          return 'No manga found';
      }
    }
    
    if (data.length === 1) {
      return '1 result';
    }
    
    return data.length + ' results';
  }
    
  return (
    <>
      <h2 className='subtitle'>{resultsText()}</h2>
      {data.map((manga) => {
        const slug = manga.title.toLowerCase().replaceAll(' ', '-');
        return (
          <div className='card' key={Math.random()}>
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
      })}
    </>
  );
}
