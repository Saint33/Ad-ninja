import React from 'react';

const Button = (props) => (
    <button className="button" {...props} >{props.children}</button>
)

export default Button;