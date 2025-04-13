'use client'

import ReactPlayer from 'react-player'

export default function YouTubeComponent({ id }: { id: string }) {
  return <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
}
