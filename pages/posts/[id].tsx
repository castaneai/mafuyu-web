import { GetStaticProps, GetStaticPaths } from 'next'
import * as admin from 'firebase-admin'

import Layout from '../../components/Layout'
import { Post } from '../../interfaces'

type Props = {
  post?: Post
  errors?: string
}

const PostDetail = ({ post, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={post ? post.id : '(none)'}
    >
      <p>{post?.title}</p>
    </Layout>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
  }
  try {
    let id: string;
    if (!params?.id) {
      throw 'invalid post id'
    }
    id = Array.isArray(params.id) ? params.id[0] : params.id

    const ref = admin.firestore().doc(`/mafuyuPosts/${id}`)
    const doc = (await ref.get())
    if (!doc.exists) {
      return { props: { errors: 'post not found' } }
    }
    const post = doc.data()
    return { props: { post } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
