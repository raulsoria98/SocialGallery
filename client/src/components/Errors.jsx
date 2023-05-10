import './Errors.scss'

export default function Errors ({ errors }) {
  return (
    <div className='errors'>
      <ul className='errors-ul'>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
