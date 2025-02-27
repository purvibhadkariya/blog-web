import Image from "next/image";
import styles from "./page.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default async function Home({ searchParams }: { searchParams:any }) {
	const page = parseInt(searchParams.page) || 1;
	return (
		<div className={styles.container}>
			<Featured />
			<CategoryList />
			<div className={styles.content}>
				<CardList page={page} />
				<Menu />
			</div>
		</div>
	);
}
