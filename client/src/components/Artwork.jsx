export default function Artwork ({ artwork }) {
  return (
    <div className='Artwork'>
      <h2>{artwork.title}</h2>
      <p>{artwork.description}</p>
      <p>{artwork.type}</p>
      <p>{artwork.author.name}</p>
    </div>
  )
}
