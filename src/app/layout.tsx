import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const helviticaNue = localFont({
  src: [
    {
      path: '../../public/fonts/HelveticaNeueBold.otf',
      weight: '600',
      variable: '--font-HelveticaNeueBold',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueMedium.otf',
      weight: '400',
      variable: '--font-HelveticaNeueMedium',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueLight.otf',
      weight: '300',
      variable: '--font-HelveticaNeueLight',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ITCAvantGardeStd-Bold.ttf',
      weight: '600',
      variable: '--font-ITCAvantGardeStdBold',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ITCAvantGardeStd-Demi.ttf',
      weight: '600',
      variable: '--font-ITCAvantGardeStdDemi',
      style: 'normal',
    },
  ],
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={helviticaNue.className}>{children}</body>
    </html>
  );
}
