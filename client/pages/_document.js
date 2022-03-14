import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html className='h-full'>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
            </Head>
            <body className='bg-[#F9F9F9] h-full'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}