import API from "../api";
import {
  getCatCache,
  getElephantCache,
  setCatCache,
  setElephantCache
} from "../cache";
import { UNSPLASH_SEARCH_PIC } from "../utils/constants";
import { ICache, IPhoto, ISearchPhoto } from "./models";

export const getElephant = async () => {
  try {
    const cache = getElephantCache();
    if (cache && validateCache(cache)) {
      console.log("From cache");
      setElephantCache({ ...cache, index: cache.index + 1 });
      return getPicFromIndex(cache.results, cache.index + 1);
    }
    const params = {
      query: "elephant",
      page: Math.floor(Math.random() * 100) + 1
    };
    console.log(`Page: ${params.page}`);
    const data: ISearchPhoto = (await API.get(UNSPLASH_SEARCH_PIC, { params }))
      .data;
    setElephantCache({ index: 0, ...data });
    return getPicFromIndex(data.results, 0);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCat = async () => {
  try {
    const cache = getCatCache();
    if (cache && validateCache(cache)) {
      console.log("From cache");
      setCatCache({ ...cache, index: cache.index + 1 });
      return getPicFromIndex(cache.results, cache.index + 1);
    }
    const params = {
      query: "cat",
      page: Math.floor(Math.random() * 100) + 1
    };
    console.log(`Page: ${params.page}`);
    const data: ISearchPhoto = (await API.get(UNSPLASH_SEARCH_PIC, { params }))
      .data;
    setCatCache({ index: 0, ...data });
    return getPicFromIndex(data.results, 0);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const validateCache = (data: ICache | null) => {
  if (!data) {
    return false;
  }
  if (data.index >= data.results.length - 1) {
    return false;
  }
  return true;
};

const getPicFromIndex = (photos: IPhoto[], index: number) => {
  console.log(`Index: ${index}`);
  return photos[index].urls.regular;
};
