import type {Metadata} from 'next';import Header from '@/components/Header';import Footer from '@/components/Footer';import './globals.css';
export const metadata:Metadata={title:{default:'Aurum Café | Coffee, Crafted Beautifully',template:'%s | Aurum Café'},description:'Premium café experience, handcrafted coffee, beautiful interiors and table reservations.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
