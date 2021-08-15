import { CheerioAPI } from 'cheerio';

export interface CheerioService {
  getByUrl(url: string): Promise<CheerioAPI>;
}
