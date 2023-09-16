import React from "react";
import Card from "./Card";
interface CardsWrapperProps {
	tariffs: Post[];
}
const CardsWrapper = ({ tariffs }: CardsWrapperProps) => {
	return (
		<section className="flex justify-center items-center flex-wrap lg:mx-[150px] mx-5">
			{tariffs.length > 0 ? (
				tariffs.map((tariff) => (
					<Card
						key={tariff.id}
						id={tariff.id}
						bannerImgUrl={tariff.bannerImgUrl}
						title={tariff.title}
						tag={tariff.tag}
						description={tariff.description}
						options={tariff.options}
						services={tariff.services}
						currentPrice={tariff.currentPrice}
						priceCurrency={tariff.priceCurrency}
						previousPrice={tariff.previousPrice}
						dealDescription={tariff.dealDescription}
					/>
				))
			) : (
				<p className="text-black ">Ничего не найдено</p>
			)}
		</section>
	);
};

export default CardsWrapper;
