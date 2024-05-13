/**
 * Extracts the latest news information from the provided Cheerio instance.
 * @param $ - The CheerioAPI instance representing the parsed HTML.
 * @returns An array of LastestNews objects containing the extracted data.
 * @throws If there's an error during the extraction process.
 */
import { CheerioAPI } from "cheerio";
import { LastestNews } from "./scrapeYCProfile";
export function extractLatestNews($: CheerioAPI): LastestNews[] {
  try {
    const latestNews: LastestNews[] = [];
    $("div#news div.ycdc-with-link-color").each((index, element) => {
      const link = $(element).find("a").attr("href") || "";
      const title = $(element).find("a").text() || "";

      latestNews.push({ title: title, link: link });
    });

    return latestNews;
  } catch (error) {
    console.error(`Error extracting latest news: ${error}`);
    throw error;
  }
}
