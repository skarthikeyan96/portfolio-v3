import { getAllDocs, getDocBySlug } from "../../lib/helper";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

const SeparateBlogPost = (props: any) => {
  console.log(props);
  return (
    <>
      <div>
        <Link href="/post"> Go to Posts </Link>
      </div>
      <div className="flex mx-auto container">
        <div className=" prose">
          <MDXRemote {...props.content} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }: any) {
  const { content, meta } = getDocBySlug(params.slug);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: JSON.parse(JSON.stringify(meta)),
  });

  console.log(mdxSource);

  return {
    props: {
      frontmatter: JSON.parse(JSON.stringify(meta)),
      content: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  const docs: any = getAllDocs();

  return {
    paths: docs.map((doc: any) => {
      const {
        meta: { slug },
      } = getDocBySlug(doc);
      console.log(slug);
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
}

export default SeparateBlogPost;
