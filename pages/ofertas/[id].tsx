import { GetStaticPaths, GetStaticProps, NextPage } from 'next';



interface Beer {
  id: number,
  name: string,
  description: string;
  image_url: string
}


interface Props{
  data: Beer
}

const Vinos: NextPage<Props> = ({data}) => {

  return (
    <div>
      <h1>Vinos {data.id}</h1>

      {data ? 
      <h2>{data.name}</h2>
      : null}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async()=>{
  const res = await fetch(`https://api.punkapi.com/v2/beers`)
  const data: Beer[] = await res.json()

  const paths = data.map(beer => ({params: {id: String(beer.id)}}))
  return{
    paths, 
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async(context)=>{
  const {params} = context

  const res = await fetch(`https://api.punkapi.com/v2/beers/${params?.id}`)
  const data: Beer = (await res.json())[0]

  return {
    props: {
      data
    }
  }
}

export default Vinos