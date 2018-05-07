export const navLinks: {path: string, label:string}[] = [
  {path: '/music/itunes-search', label: 'Itunes search'},
  {path: '/music/manage', label: 'Manage'}
]; 

export const API_LINKS = Object.freeze(
  {
    MUSIC: {
      SEARCH: {
        link: "https://itunes.apple.com/search"
      },
      LOOKUP: {
        link: "https://itunes.apple.com/lookup"
      }
    }    
  }
);