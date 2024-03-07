import axios from "axios";
import * as cheerio from "cheerio";
import { JSDOM } from "jsdom";

export async function POST(req: Request) {
	try {
		const { pkg } = await req.json();
		const { data: html } = await axios.get(`https://www.npmjs.com/package/${pkg.toLowerCase()}`);

		// USING CHEERIO
		const $ = cheerio.load(html);
		const weeklyDownloads = $("._9ba9a726").text();

		// USING JSDOM
		// const dom = new JSDOM(html);
		// const document = dom.window.document;
		// const weeklyDownloads = document.querySelector("._9ba9a726")?.textContent;
		// console.log(weeklyDownloads);
		return new Response(weeklyDownloads);
	} catch (err) {
		console.error(err);
	}
}
