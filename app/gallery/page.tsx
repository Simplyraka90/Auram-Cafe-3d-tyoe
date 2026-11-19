import MotionReveal from '@/components/MotionReveal';
import PageHeading from '@/components/PageHeading';import GallerySection from '@/components/GallerySection';import BookingBanner from '@/components/BookingBanner';
export const metadata={title:'Gallery'};
export default function GalleryPage(){return <main><PageHeading eyebrow="Take a look inside" title="Our Gallery" description="A little peek into the warmth, design and flavors that make our café special."/><MotionReveal><GallerySection/></MotionReveal><MotionReveal><BookingBanner/></MotionReveal></main>}
