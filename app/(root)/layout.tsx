import type {Metadata} from 'next';
import {Nunito} from 'next/font/google';
import '../globals.css';
import Header from "@/shared/components/shared/header";
import React from "react";

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Pizza | Главная',
};

export default function HomeLayout({children,modal}: Readonly<{
    children: React.ReactNode;
    modal : React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={nunito.variable}>
        <main className='min-h-screen'>
            <Header/>
            {children}
            {modal}
        </main>
        </body>
        </html>
    );
}