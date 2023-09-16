import prisma from "@/prisma/prisma";

export async function fetchTariffs({
	maxPrice = 100000,
	sortBy = "desc",
	minPrice = 0,
}: {
	maxPrice?: number;
	sortBy?: string;
	minPrice?: number;
}) {
	try {
		const sortOptions = { currentPrice: sortBy };
		const queryOptions: any = {
			where: {
				currentPrice: {
					gte: minPrice, // Greater than or equal to minPrice
					lte: maxPrice, // Less than or equal to maxPrice
				},
			},
			orderBy: {
				currentPrice: sortBy, // Sort by currentPrice in ascending or descending order
			},
		};
		const tariffs = await prisma.posts.findMany(queryOptions);
		return tariffs;
	} catch (error: any) {
		throw new Error(`Failed to fetch tariffs: ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
}
