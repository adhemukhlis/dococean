import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";
import remarkPrism from 'remark-prism'

// import {unified} from 'unified'
// import remarkParse from 'remark-parse'
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkGfm from 'remark-gfm'
// import remarkRehype from 'remark-rehype'
// import rehypeStringify from 'rehype-stringify'
// import rehypeHighlight from 'rehype-highlight'
// import remarkHighlightjs from 'remark-highlight.js'
// import rehypeSanitize from 'rehype-sanitize'

// import torchlight from 'remark-torchlight' 
// const torchlight = require('next-transpile-modules')(['remark-torchlight']);

const docsDirectory = path.join(process.cwd(), "docs");

export function getSortedDocsData() {
  // Get file names under /docs
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allDocsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export function getAllDocIds() {
  const fileNames = fs.readdirSync(docsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
export async function getDocData(id) {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html,{ sanitize: false })

    .use(remarkPrism)
    .process(matterResult.content);
  


  // const file = await unified()
  //   .use(remarkParse)
    
  //   .use(remarkFrontmatter)
  //   .use(remarkGfm)
  //   .use(remarkRehype)
  //   .use(rehypeSanitize)
  //   .use(rehypeStringify)
  //   .use(remarkPrism)
  //   .process(fileContents)
  //   console.log(file)

    // const contentHtml = String(file)

    const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
