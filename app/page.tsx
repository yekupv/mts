import { hello } from "./actions/hello";

export default async function Home() {
	await hello();

	return (
		<main className=" ">
			<h1 className="text-4xl">hello</h1>
		</main>
	);
}
