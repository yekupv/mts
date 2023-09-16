import Card from "@/components/Card";
import prisma from "@/prisma/prisma";
import { scrapeAndInsert } from "@/lib/actions/fetchHTML";
import Button from "@/components/Button";
import { findMaxAndMin } from "@/lib/helpers/findExtremumValues";
import CardsWrapper from "@/components/CardsWrapper";
import { fetchTariffs } from "@/lib/actions/posts.actions";
import FilterByPrice from "@/components/FilterByPrice";
import SortByPrice from "@/components/SortByPrice";
import { revalidatePath } from "next/cache";
export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	let tariffs: Post[] = await fetchTariffs({
		maxPrice: searchParams.max ? +searchParams.max : 100000,
		minPrice: searchParams.min ? +searchParams.min : 0,
		sortBy: searchParams.sort ? searchParams.sort : "desc",
	});

	async function handleScrapeAndInsert(e) {
		"use server";
		console.log("scrapeAndInsert called");
		await scrapeAndInsert();
		revalidatePath("/");
	}
	return (
		<main className="min-h-screen flex flex-col">
			<section className="flex  justify-around items-center mt-10 ">
				<div className="flex flex-1 justify-around items-center flex-col  md:flex-row ">
					<FilterByPrice />
					<form action={handleScrapeAndInsert}>
						<Button type="submit" className="bg-red-500 text-white">
							Parse
						</Button>
					</form>
					<SortByPrice
						minPrice={searchParams.min}
						maxPrice={searchParams.max}
					/>
				</div>
			</section>
			<CardsWrapper tariffs={tariffs} />
		</main>
	);
}
