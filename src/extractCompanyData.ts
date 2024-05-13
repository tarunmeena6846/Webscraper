/**
 * Extracts company data from the provided Cheerio instance.
 * @param $ - The CheerioAPI instance representing the parsed HTML.
 * @returns A Promise resolving to a Company object containing the extracted data.
 * @throws If any required label is not found in the HTML.
 */

import { CheerioAPI } from "cheerio";
import { extractFounders } from "./extractFounders";
import { extractJobs } from "./extractJobs";
import { extractLatestNews } from "./extractLatestNews";
import { Company } from "./scrapeYCProfile";

function extractInfo($: CheerioAPI, label: string): string {
  const element = $("div.flex.flex-row.justify-between")
    .find(`span:contains('${label}')`)
    .next();

  if (element.length === 0) {
    throw { label, message: `Label '${label}' not found` };
  }

  return element.text().trim();
}

export async function extractCompanyData($: CheerioAPI): Promise<Company> {
  try {
    const name = $("h1.font-extralight").text().trim() || "";
    const founded = extractInfo($, "Founded:") || "";
    const teamSize = parseInt(extractInfo($, "Team Size:"), 10);
    const Location = extractInfo($, "Location:") || "";

    const founders = extractFounders($);
    const jobs = extractJobs($);
    const latestNews = extractLatestNews($);

    return {
      name,
      founded,
      teamSize,
      Location,
      founders,
      jobs,
      latestNews,
    };
  } catch (error) {
    if (error) {
      console.error(`Error extracting ${error}`);
      throw error; // Rethrow the error to bubble up
    } else {
      console.error(`Unknown error during extraction: ${error}`);
      throw error; // Rethrow the error to bubble up
    }
  }
}
