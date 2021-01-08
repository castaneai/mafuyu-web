import Link from 'next/link'
import 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import Layout from '../components/Layout'
import { Post } from '../interfaces'

const IndexPage = () => {
  const query = useFirestore().collection('mafuyuPosts')
  const { status, data: posts } = useFirestoreCollectionData<Post>(query)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      {status == 'loading' ? <p>loading...</p> : <ul>{posts.map(post => <li key={post.id}><Link href={`/posts/${post.id}`}>{post.title}</Link></li>)}</ul>}
    </Layout>
  )
}

export default IndexPage
