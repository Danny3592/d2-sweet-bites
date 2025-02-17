import ReactLoading from 'react-loading';

export default function Loading({ type, color }) {
  return (
    <div className='position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center'
      style={{
        zIndex: 10000,
        backgroundColor: 'rgba(255, 255, 255, .6)'
      }}>
      <ReactLoading type={type} color={color} height={40} width={80}/>
    </div>
  )
}
