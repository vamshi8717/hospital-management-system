import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="bio grpahy image" />
        

      </div> 
      <div className="banner">
        <p>Biography</p>
        <p>Who are we</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum incidunt, in dignissimos quae repellat expedita illum. Alias ex quos culpa numquam placeat dolores, corrupti praesentium necessitatibus autem blanditiis quia eum, obcaecati aliqua</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae hic non animi!</p>
    
        
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, neque.
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam culpa facere necessitatibus eaqga quos debitis culpa.</p>
      </div>
    </div>
  )
}

export default Biography