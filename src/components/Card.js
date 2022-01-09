// import styles from '../styles/Card.module.scss'
import React from 'react'
import { useEffect, useState } from "react"
import '../App.scss'

export default function Card({ data }) {

    const [imageUrl, setImageUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchImage = async () => {
            const imageRes = await fetch(`https://api.thecatapi.com/v1/images/${data.reference_image_id}`)
            const imageResJSON = await imageRes.json()
            setImageUrl(imageResJSON.url)
            setIsLoading(false)
        }

        if (data.reference_image_id) fetchImage()
        else {
            setIsLoading(false)
            setImageUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')
        }
        
    }, [data])

    return (<li className="listItem" key={data.id}>
        {isLoading ? <div className="loaderContainer"><div className="loader">Loading...</div></div> : <img src={imageUrl} alt={data.name}/>}
        <div className="itemInfo">
          <p style={{ fontWeight: 'bold' }}>{data.name}</p>
          <p>Weight: {data.weight?.metric}</p>
          <p>Life span: {data.life_span}</p>
        </div>
      </li>)
}