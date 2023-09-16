interface Post {
	id: string;
	bannerImgUrl: string | null;
	title: string;
	tag: string | null;
	description: string | null;
	options: Prisma.JsonValue[];
	services: Prisma.JsonValue;
	currentPrice: number;
	priceCurrency: string | null;
	previousPrice: string | null;
	dealDescription: string | null;
}
