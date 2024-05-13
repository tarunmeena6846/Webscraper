import { CheerioAPI } from "cheerio";
import { Job } from "./scrapeYCProfile";

/**
 * Extracts job information from the provided Cheerio instance.
 * @param $ - The CheerioAPI instance representing the parsed HTML.
 * @returns An array of Job objects containing the extracted data.
 * @throws If there's an error during the extraction process.
 */

export function extractJobs($: CheerioAPI): Job[] {
  try {
    const jobs: Job[] = [];
    $("div.flex.w-full.flex-row.justify-between.py-4").each(
      (index, element) => {
        const jobRole =
          $(element).find("div.ycdc-with-link-color").text().trim() || "";
        const locations =
          $(element)
            .find(
              "div.list-item.list-square.capitalize.first\\:list-none:first-child"
            )
            .text()
            .trim()
            .split(" / ") || "";
        const childInfo2 =
          $(element).find(".list-item:nth-child(2)").text().trim() || "";

        const childInfo3 =
          $(element).find(".list-item:nth-child(3)").text().trim() || "";
        const childInfo4 =
          $(element).find(".list-item:nth-child(4)").text().trim() || "";

        let compensation = "";
        let equity = "";
        let experience = "";

        // Determine the type of each child element
        if (
          (childInfo2.includes("$") || childInfo2.includes("€")) &&
          childInfo2.includes("-")
        ) {
          compensation = childInfo2;
        } else if (childInfo2.includes("%")) {
          equity = childInfo2;
        } else {
          experience = childInfo2;
        }

        if (childInfo3.includes("%")) {
          equity = childInfo3;
        } else if (childInfo3 && !equity) {
          experience = childInfo3;
        }

        if (childInfo4 && experience.length === 0) {
          experience = childInfo4;
        }

        jobs.push({
          role: jobRole,
          locations: locations,
          compensation: compensation,
          equity: equity,
          experience: experience,
        });
      }
    );

    return jobs;
  } catch (error) {
    console.error(`Error extracting jobs: ${error}`);
    throw error;
  }
}
