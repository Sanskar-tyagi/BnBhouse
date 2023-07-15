import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly' 
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './Providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUsers'
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'BnBhouse',
  description: 'AirBnBclone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
      <ClientOnly>
      <ToasterProvider/>
      <RegisterModal/>
      <LoginModal/>

      <Navbar/>
      </ClientOnly>
        {children}</body>
    </html>
  )
}
