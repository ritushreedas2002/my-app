// index.js
'use client'
import PageTransition from '@/app/components/Layout/PageTransition';
import Head from 'next/head';
import Header from "@/app/components/Header/index"
export default function Expertise() {
    return (
        <>
        <Header/>
        <PageTransition>
            <Head>
                <title>Home Page</title>
            </Head>
           
                <h1>Expertise</h1>
                <div className='body'>
                    {/* Your content here */}
                </div>
                </PageTransition>
        </>
    );
}
