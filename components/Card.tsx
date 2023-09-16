import { Prisma } from "@prisma/client";
import Image from "next/image";
import Button from "./Button";

const absolutePath = "https:";
const Card = ({
	id,
	bannerImgUrl,
	title,
	tag,
	description,
	options,
	services,
	currentPrice,
	priceCurrency,
	previousPrice,
	dealDescription,
}: Post) => {
	return (
		<article className="h-[516px] shadow-xl cursor-pointer hover:shadow-2xl transition duration-200 rounded-3xl mt-10 max-w-[364px] mx-10 relative">
			<div className="h-100 relative">
				<span className="absolute mx-3 my-5 text-white text-[0.75rem] px-1 rounded-md bg-[#FF0032]">
					{tag}
				</span>
				{bannerImgUrl && (
					<Image
						src={absolutePath + bannerImgUrl}
						alt="bannerImg"
						width={364}
						height={100}
						className="rounded-t-3xl obecjt-contain"
					/>
				)}
			</div>
			<div className="m-5 ">
				<h1 className="text-xl font-bold">{title}</h1>
				<p className="text-sm mt-1 font-light">{description}</p>
				<div className="h-[150px]">
					<div className="flex flex-col mt-4">
						{options.map((option) => (
							<div className="flex items-center">
								{option?.imgSrc && (
									<Image
										src={absolutePath + option?.imgSrc}
										alt="Feature Image"
										width={24}
										height={24}
									/>
								)}
								<p className="text-lg  ml-3 mt-1 font-bold">
									{option?.featureDescription}
								</p>
							</div>
						))}

						<div className="flex mt-2">
							<div className="flex item-center justify-center">
								{services?.benefitImgUrl?.map((img, index) => (
									<Image
										src={absolutePath + img}
										alt="Feature Image"
										width={28}
										height={28}
										className={`${
											index != 0 && "-ml-2"
										} rounded-full object-cover w-[32px] h-[32px] border-2 mt-2 border-white`}
									/>
								))}
								<p className="text-gray-500 text-sm ml-3 mt-1 font-light">
									{services?.benefitDescription}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-4">
					<div className="flex mt-4 align-center">
						<h1 className="text-xl font-bold">
							{currentPrice + " " + priceCurrency}
						</h1>

						{previousPrice && (
							<p className="text-lg ml-3  font-light line-through decoration-red-500 text-gray-500">
								{previousPrice}
							</p>
						)}
					</div>
					<p className="text-gray-500 text-xs">{dealDescription}</p>

					<div className="flex mt-2 gap-5 ">
						<Button className="bg-red-500 hover:bg-red-700 text-white">
							Подключить
						</Button>
						<Button className="bg-gray-100 text-black hover:bg-gray-300">
							Подробнее
						</Button>
					</div>
				</div>
			</div>
		</article>
	);
};

export default Card;
