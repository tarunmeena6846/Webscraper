/**
 * Scrapes the company profile from a YC profile URL.
 * @param url - The URL of the YC profile to scrape.
 * @returns A Promise that resolves when the scraping process is complete.
 * @throws If there's an error during the scraping process.
 */

import { CheerioCrawler, Dataset } from "crawlee";
import { extractCompanyData } from "./extractCompanyData";

export async function scrapeYCProfile(url: string): Promise<void> {
  try {
    const crawler = new CheerioCrawler({
      async requestHandler({ request, $, log }) {
        try {
          const company = await extractCompanyData($);
          await Dataset.pushData({ company });
        } catch (error) {
          log.error(`Error processing ${request.url}: ${error}`);
          throw error; // Rethrow the error to bubble up
        }
      },
      maxRequestsPerCrawl: 50,
    });

    await crawler.run([url]);
  } catch (error) {
    // Handle any errors occurred during crawling
    console.error(`Error crawling YC profile for ${url}: ${error}`);
    throw error; // Rethrow the error to bubble up
  }
}

export interface Founder {
  name: string;
  linkedIn?: string;
}

export interface Job {
  role: string;
  locations: string[];
  equity: string;
  experience: string;
  compensation: string;
}

export interface LastestNews {
  title: string;
  link: string;
}

export interface Company {
  name: string;
  founded?: string;
  teamSize?: number;
  Location?: string;
  jobs?: Job[];
  founders?: Founder[];
  latestNews?: LastestNews[];
}
