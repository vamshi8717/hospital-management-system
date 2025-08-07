import React from 'react'

const Hero = ({title,imageUrl}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa et officia, nihil aliquid quo aspernatur fugiat commodi, in harum incidunt deserunt autem quia beatae 
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam reprehenderit consectetur!provident dicta soluta quisquam architecto animi id, tempora rerum voluptas veniam!
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero banner" className='animated-image ' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>

    </div>
  )
}

export default Hero