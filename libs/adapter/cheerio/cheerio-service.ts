import { CheerioService } from '@pl-oss/core';
import cheerio, { CheerioAPI } from 'cheerio';
import fetch from 'node-fetch';

export const cheerioService: CheerioService = {
  async getByUrl(url: string): Promise<CheerioAPI> {
    const response = await fetch(url);
    const rawText = await response.text();
    return cheerio.load(rawText);
  },
};
