import Head from "next/head";
import Layout from "../../components/layout";
import { getAllDocIds, getDocData } from "../../lib/docs";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Doc({ docData }) {
  return (
    <Layout>
      <Head>
        <title>{docData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{docData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={docData.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: docData.contentHtml,
          }}
        />
      </article>
    </Layout>
  );
}
export async function getStaticPaths() {
  const paths = getAllDocIds();
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const docData = await getDocData(params.id);
  return {
    props: {
      docData,
    },
  };
}
