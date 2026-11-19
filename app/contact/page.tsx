import MotionReveal from '@/components/MotionReveal';
import PageHeading from '@/components/PageHeading';import ContactSection from '@/components/ContactSection';import BookingBanner from '@/components/BookingBanner';
export const metadata={title:'Contact'};
export default function ContactPage(){return <main><PageHeading eyebrow="We'd love to see you" title="Get in Touch" description="Drop by, say hello, or plan a special moment with us."/><MotionReveal><ContactSection/></MotionReveal><MotionReveal><BookingBanner/></MotionReveal></main>}
