import { Cta } from "@/components/cta";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Testimonial } from "@/components/testimonial";
import { Stack } from "@chakra-ui/react";

export default function Home() {
	return (
		<Stack>
			<Header />
			<Hero />
			<Features />
			<Testimonial />
			<Cta />
			<Footer />
		</Stack>
	);
}
