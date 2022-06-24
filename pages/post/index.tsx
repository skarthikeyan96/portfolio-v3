import Link from "next/link";
import { getAllDocs, getDocBySlug } from "../../lib/helper";

const Post = (props:any) => {
  console.log(props)
    return(<div>
      {
        props.response.map((r: any) => {
          return (
            <Link href={`/post/${r.meta.slug}`}> 
            <p> {r.meta.title} </p>
            </Link>
          )
        })
      }
    </div>)
}

export default Post;

export function getServerSideProps () {

    const files = getAllDocs()
  
   
    const response =files.map((file)=>{
      const {slug, meta} = getDocBySlug(file);
      return {slug,meta: JSON.parse(JSON.stringify(meta))}
    })

    // console.log(response)


    return{
      props:{
        response
      }
    }
  }
  