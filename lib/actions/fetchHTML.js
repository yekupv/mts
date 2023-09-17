import { PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer";
import {
	extractNumberFromString,
	extractStringFromValue,
} from "../helpers/findExtremumValues";

const prisma = new PrismaClient();

export async function scrapeAndInsert() {
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	try {
		// Navigate to the MTS tariffs website
		await page.goto(
			"https://moskva.mts.ru/personal/mobilnaya-svyaz/tarifi/vse-tarifi/mobile-tv-inet",
			{ waitUntil: "networkidle2" }
		);
		await page.screenshot({ path: "screenshot1.png", fullPage: true });

		await page.waitForSelector(".dialog__actions-container .btn.btn_mts");
		await page.click(".dialog__actions-container .btn.btn_mts");

		await page.setViewport({ width: 1920, height: 1024 });
		await page.waitForSelector(".tariffs-more-btn .btn.btn_secondary");
		await page.click(".tariffs-more-btn .btn.btn_secondary"); // Wait for the dynamic content to load (you may need to adjust this wait time)
		await page.screenshot(
			{ path: "screenshot.png", fullPage: true },
			{ timeout: 1000 }
		);

		await page.waitForSelector(".card", { timeout: 10000 }); // Wait for up to 10 seconds

		// Extract data from the fully rendered page
		let tariffs = [];

		tariffs = await page.evaluate(async () => {
			const cardElements = Array.from(
				document.querySelectorAll(".card.card__wrapper")
			);
			const data = cardElements.map((card) => {
				window.scrollBy(0, window.innerHeight);
				const cardObj = {
					id: card?.querySelector(".card-title__link")?.innerText,
					tag: card?.querySelector(".badge-text")?.innerText || "",
					bannerImgUrl: card
						?.querySelector(".img.specify")
						?.getAttribute("src"),
					title: card?.querySelector(".card-title__link")?.innerText,
					description: card.querySelector(".card-description")?.innerText,
					featureOptions: Array.from(
						card.querySelectorAll(".feature__wrapper")
					).map((liElement) => ({
						imgSrc:
							liElement
								.querySelector(".feature-icon img")
								?.getAttribute("src") || "",
						featureDescription:
							liElement.querySelector(
								".feature-description.feature-description__text.feature-description__margin"
							)?.innerText || "",
					})),
					benefitOptions: {
						benefitImgUrl: Array.from(
							card?.querySelectorAll(".benefit-option img")
						).map((img) => img.getAttribute("src")),
						benefitDescription: card.querySelector(".benefits-description")
							?.innerText,
					},

					currentPrice:
						card.querySelector(".price-text")?.innerText +
						card.querySelectorAll(".price-text")[1]?.innerText,
					priceCurrency:
						card.querySelector(".price-text")?.innerText +
						card.querySelectorAll(".price-text")[1]?.innerText,

					previousPrice:
						card.querySelectorAll(".price-text")[2]?.innerText +
						card.querySelectorAll(".price-text")[3]?.innerText,
					dealDescription: card
						.querySelector(".price-annotation")
						?.innerText.trim(),
				};

				return cardObj;
			});

			return data;
		});

		console.log(tariffs);
		await Promise.all(
			tariffs.map(async (tariffData) => {
				await prisma.Posts.upsert({
					where: { id: tariffData.id },
					update: {
						tag: tariffData.tag,
						bannerImgUrl: tariffData.bannerImgUrl,
						title: tariffData.title,
						description: tariffData.description,
						options: tariffData.featureOptions,
						services: tariffData.benefitOptions,
						currentPrice: extractNumberFromString(tariffData.currentPrice),
						priceCurrency: extractStringFromValue(tariffData.priceCurrency),
						previousPrice: tariffData.previousPrice,
						dealDescription: tariffData.dealDescription,
					},
					create: {
						id: tariffData.id,
						tag: tariffData.tag,
						bannerImgUrl: tariffData.bannerImgUrl,
						title: tariffData.title,
						description: tariffData.description,
						options: tariffData.featureOptions,
						services: tariffData.benefitOptions,
						currentPrice: extractNumberFromString(tariffData.currentPrice),
						priceCurrency: extractStringFromValue(tariffData.priceCurrency),
						previousPrice: tariffData.previousPrice,
						dealDescription: tariffData.dealDescription,
					},
				});
			})
		);

		console.log("Data successfully inserted into the database.");
		console.log("browser is closed");
	} catch (error) {
		console.error(
			"Error scraping data and inserting into the database:",
			error
		);
	} finally {
		await browser.close();
		// await prisma.$disconnect();
	}
}
