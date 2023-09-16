"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
interface SortByPriceProps {
	minPrice: string;
	maxPrice: string;
}
const SortByPrice = ({ minPrice, maxPrice }: SortByPriceProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [sortValue, setSortValue] = useState("desc");
	useEffect(() => {
		if (+minPrice > 0 && +maxPrice > 0)
			router.push(
				`${pathname}/?min=${minPrice}&max=${maxPrice}&sort=` + sortValue
			);
		else if (+minPrice > 0)
			router.push(`${pathname}/?min=${minPrice}&sort=` + sortValue);
		else if (+maxPrice > 0)
			router.push(`${pathname}/?max=${maxPrice}&sort=` + sortValue);
		else router.push(`${pathname}/?sort=` + sortValue);
	}, [sortValue]);

	return (
		<form className="sorting-selector flex flex-col">
			<label htmlFor="sortBy">Сортировать по ценам:</label>
			<select
				id="sortBy"
				name="sortBy"
				value={sortValue}
				onChange={(e) => setSortValue(e.target.value)}
				className="border-2 p-1 rounded-md outline-none focus:border-focus:"
			>
				<option value="desc">Сначала дешёвые</option>
				<option value="asc">Сначала дорогие</option>
			</select>
		</form>
	);
};

export default SortByPrice;
