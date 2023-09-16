"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FilterByPrice = () => {
	const [maxPrice, setMaxPrice] = useState(0);
	const [minPrice, setMinPrice] = useState(0);
	const router = useRouter();
	const pathname = usePathname();
	let query = "";
	useEffect(() => {
		const debounce = setTimeout(() => {
			if (minPrice > 0) {
				router.push(`${pathname}/?min=` + minPrice);
				query = `${pathname}/?min=` + minPrice;
			}
			if (maxPrice > 0)
				router.push(
					`${pathname}${minPrice > 0 ? "?min=" + minPrice + "&" : "?"}max=` +
						maxPrice
				);
			else if (maxPrice == 0 && minPrice == 0) router.push(`${pathname}`);
		}, 3);

		return () => clearTimeout(debounce);
	}, [maxPrice, minPrice]);
	return (
		<form className="flex flex-col">
			<label>От</label>
			<input
				type="number"
				value={minPrice}
				pattern="[0-9]*"
				onChange={(e) => setMinPrice(+e.target.value)}
				className="border-2 p-1 rounded-md outline-none focus:border- focus:"
			/>
			<label>До</label>
			<input
				type="number"
				value={maxPrice}
				pattern="[0-9]*"
				onChange={(e) => setMaxPrice(+e.target.value)}
				className="border-2 p-1 rounded-md outline-none focus:border- focus:"
			/>
		</form>
	);
};

export default FilterByPrice;
