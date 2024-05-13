/**
 * Extracts information about founders from the provided Cheerio instance.
 * @param $ - The CheerioAPI instance representing the parsed HTML.
 * @returns An array of Founder objects containing the extracted data.
 * @throws If there's an error during the extraction process.
 */

import { CheerioAPI } from "cheerio";
import { Founder } from "./scrapeYCProfile";
export function extractFounders($: CheerioAPI): Founder[] {
  try {
    const founders: Founder[] = [];
    $("div.flex.flex-row.flex-col.items-start.gap-3.md\\:flex-row").each(
      (index, element) => {
        const founderName = $(element).find("h3").text().trim() || "";
        const linkedinUrl =
          $(element).find("a[href*='linkedin.com']").attr("href") || "";
        founders.push({ name: founderName, linkedIn: linkedinUrl });
      }
    );

    if (founders.length === 0) {
      $("div.space-y-4 div.shrink-0").each((index, element) => {
        const founderName =
          $(element).find("div.font-bold").first().text().trim() || "";
        const linkedinUrl =
          $(element).find("a[href*='linkedin.com']").first().attr("href") || "";
        founders.push({ name: founderName, linkedIn: linkedinUrl });
      });
    }

    return founders;
  } catch (error) {
    console.error(`Error extracting founders: ${error}`);
    throw error;
  }
}
