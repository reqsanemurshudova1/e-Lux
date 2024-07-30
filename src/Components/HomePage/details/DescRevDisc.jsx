import React from 'react'

import './common.css'

export default function DescRevDisc() {
  return (
    <div>
        <div className="titles">
            <Link to={`/product/{$id}/details`} >
            <h2>Description</h2>
            </Link>
            <Link to={`/product/{$id}/reviews`}>    <h2>Reviews</h2></Link>
        
          <Link to={`/product/{$id}/discussions`}>  <h2>Discussions</h2></Link>
        </div>
        <div className="border"></div>
        <span className="activespan"></span>
    </div>
  )
}
