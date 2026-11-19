import MotionReveal from '@/components/MotionReveal';
import PageHeading from '@/components/PageHeading';import About from '@/components/About';import Highlights from '@/components/Highlights';import Testimonials from '@/components/Testimonials';import BookingBanner from '@/components/BookingBanner';
export const metadata={title:'Our Story'};
export default function AboutPage(){return <main><PageHeading eyebrow="Behind every cup" title="Our Story" description="An inviting space where coffee, creativity and connection come together."/><MotionReveal><About/></MotionReveal><MotionReveal><Highlights/></MotionReveal><MotionReveal><Testimonials/></MotionReveal><MotionReveal><BookingBanner/></MotionReveal></main>}
