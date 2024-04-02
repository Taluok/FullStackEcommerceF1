import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (222)</div>
            </div>
            <div className="descriptionbox-description">
                <p>Uno de los estilos de zapatillas más icónicos de PUMA está de vuelta y esta vez se trata de deportes de motor.
            PUMA y BMW M Motorsport se han asociado para crear X-Ray Speed, un calzado que ofrece una estabilidad y durabilidad fantásticas gracias a la entresuela de EVA moldeada por inyección y la suela de caucho.
            Luego está la síntesis de superposiciones de malla, gamuza y material sintético a lo largo de la lengüeta y la parte superior, que transforman el calzado en un llamativo mosaico textil.</p>
                <p>Y con un atrevido diseño de bloques de colores que combinan con el logotipo de BMW M Motorsport, esta es una zapatilla que pisa el acelerador a fondo cuando se trata del verdadero estilo de los deportes de motor.</p>
            </div>
            <br/>
        </div>
    )
}

export default DescriptionBox