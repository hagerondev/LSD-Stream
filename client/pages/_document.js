import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
            </Head>
            <body className='bg-gray-700'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}