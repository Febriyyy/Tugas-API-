import Head from 'next/head'

export default function about() {
    return(
        <div className="container">
            <Head>
                <title>About Us</title>
                <link rel="stylesheeet" href="/styles.css"/>
            </Head>
            <h1>About</h1>
        </div>
    )
}