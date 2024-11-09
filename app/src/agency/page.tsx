// index.js
'use client'
import PageTransition from '@/app/components/Layout/PageTransition';
import Header from "@/app/components/Header/index"
import Head from 'next/head';

export default function Home() {
    return (

        <>
        <Header />
        <PageTransition>
            <Head>
                <title>agency Page</title>
            </Head>
           
                <h1>Home</h1>
                <div className='body'>
                    {/* Your content here */}
                </div>
                </PageTransition>

        </>
    );
}
