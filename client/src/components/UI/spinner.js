import React from 'react';
import Spinner from 'react-spinkit';

const Loader = (props) => (
    <Spinner className="loader-position" name='folding-cube' fadeIn="none" {...props} />
)

export default Loader;