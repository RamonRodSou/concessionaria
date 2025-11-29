import '@css/index.scss'
import Menu from './_component/menu';
import Item from './_component/item';
import FooterNav from './_component/footerNav';
import TalkToUs from './_component/talkToUs';
import HeroCarousel from './_component/heroCarousel';
import slide1 from '@img/carImage1.webp';
import slide2 from '@img/carImage2.webp';

export default function Home() {
	return (
		<div>
			<header>
				<Menu />
			</header>
			<main>
				{/* <HeroCarousel slides={[slide1, slide2]} /> */}
				<Item />
				<TalkToUs />
			</main>
			<footer>
				<FooterNav />
			</footer>
		</div>
	);
}


