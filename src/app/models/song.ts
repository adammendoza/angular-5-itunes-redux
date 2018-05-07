export interface IStatus{
  pending: boolean;
  isAdded: boolean;
  pendingRemove: boolean;
}
export interface ISong extends IStatus{
  trackId: number;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string; 
  artworkUrl100: string; 
  collectionPrice: number; 
  trackPrice:number; 
  releaseDate: Date;
  trackCount: number;
  trackNumber: number;
  country: string;
  currency: string;
  primaryGenreName: string;
}