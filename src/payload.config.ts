// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
// @ts-ignore
import { BlogPost } from './collections/BlogPost'
import Events from './collections/Events'
import Authors from './collections/Authors'
import FaqPage from './collections/FaqPage'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure the Lexical editor with common features
const lexicalRichTextEditor = lexicalEditor({})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Events, BlogPost, Authors, FaqPage],
  editor: lexicalRichTextEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
})
