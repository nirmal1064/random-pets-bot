/**
 * Caching file using simple object caching
 * TODO: To implement any caching strategy to reduce the number of API requests to Unsplash.
 */

import { ICache } from "../unsplash/models";

let elephantCache: ICache | null;
let catCache: ICache | null;

export const getElephantCache = (): ICache | null => elephantCache;

export const setElephantCache = (data: ICache) => (elephantCache = data);

export const getCatCache = (): ICache | null => catCache;

export const setCatCache = (data: ICache) => (catCache = data);
