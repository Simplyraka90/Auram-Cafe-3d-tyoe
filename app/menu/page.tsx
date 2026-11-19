import MotionReveal from '@/components/MotionReveal';
import PageHeading from '@/components/PageHeading';import MenuSection from '@/components/MenuSection';import BookingBanner from '@/components/BookingBanner';
export const metadata={title:'Our Menu'};
export default function MenuPage(){return <main><PageHeading eyebrow="Crafted with love" title="Our Menu" description="Explore our handpicked coffees, brunch favorites and irresistible desserts."/><MotionReveal><MenuSection/></MotionReveal><MotionReveal><BookingBanner/></MotionReveal></main>}
