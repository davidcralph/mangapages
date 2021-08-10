import * as Constants from '../modules/constants';

export default function MangaResults(props) {
  const resultsText = () => {
    if (props.done === false && props.data.length === 0) {
      return 'Loading...';
    }
    
    if (props.data.length === 0) {
      return 'No manga found';
    }
    
    if (props.data.length === 1) {
      return '1 result';
    }
    
    return props.data.length + ' results';
  }
    
  return (
    <>
      <h2 className='subtitle'>{resultsText()}</h2>
      {props.data.map(manga => {
        const slug = manga.title.toLowerCase().replaceAll(' ', '-');
        return (
          <div className='card' key={manga.title + manga.site}>
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
