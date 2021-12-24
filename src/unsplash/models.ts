export interface IPhoto {
  id: string;
  urls: {
    regular: string;
  };
}

export interface ISearchPhoto {
  total: number;
  total_pages: number;
  results: IPhoto[];
}

export interface ICache extends ISearchPhoto {
  index: number;
}
