import "../assets/scss/CustomElementStyles.scss"
import React, { useEffect, useState } from 'react'

const RTCircularLoader = ({ size }) => {
    const [styl, setstyl] = useState({});
    useEffect(() => {
        setstyl(prev => {
            return {
                width: size,
                height: size
            }
        })
    }, [])

    return (
        <div
            className="loader"
            style={size ? styl : {}}
        >

        </div>
    )
}

export { RTCircularLoader }