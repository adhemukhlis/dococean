import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout";
import { getSortedDocsData } from "../lib/docs";
import Date from "../components/date";
import Link from "next/link";
import Head from "next/head";
export default function Home({ allDocsData }) {
  return (
    <Layout home>
      <Head>
        <title>Dococean</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Docs</h2>
          <ul className={utilStyles.list}>
            {allDocsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/doc/${id}`}>
                  {title}
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const allDocsData = getSortedDocsData();
  return {
    props: {
      allDocsData,
    },
  };
}
