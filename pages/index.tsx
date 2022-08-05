import type { NextPage } from 'next'
import Link from 'next/link';
import { useState } from 'react';

interface Beer {
  id: number,
  name: string,
  description: string;
  image_url: string
}

interface Props {
  beers: Beer[]
}

const Home: NextPage<Props> = ({beers}) => {  
  const [show, setShow] = useState(false)

  return (
    <div>
        <h1>Blog de bebidas</h1>
        <button onClick={()=>setShow(!show)}>show</button>
        {
          show
          ? beers?.map(b => 
          (<Link href={`/ofertas/${b.id}`} key={b.id}>
            <p key={b.id}>{b.name}</p>
          </Link>)
          
          )
          : null
        }
    </div>
  )
}
//incremental static regeneration

export async function getStaticProps(){
    const res = await fetch("https://api.punkapi.com/v2/beers")
    const data = await res.json()

    return {
      props: {
        beers: data
      },
      revalidate: 10
    }
}

export default Home

