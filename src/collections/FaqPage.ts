import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

// Define languages with proper typing
const languages: Record<string, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  jsx: 'React JSX',
  python: 'Python',
}

const FaqPage: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // {
    //   name: 'content',
    //   type: 'richText',
    //   required: true,
    // },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                slug: 'Youtube',
                fields: [
                  {
                    type: 'text',
                    name: 'id',
                    required: true,
                  },
                ],
              },
            ],
            inlineBlocks: [],
          }),
        ],
      }),
    },
  ],
}

export default FaqPage
