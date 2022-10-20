import React, { useState } from 'react'

function useToogle(initialVal = false) {
    const [ state, setState ] = useState(initialVal);
    const toggle = ()=> {
        setState(!state);
    }
    return [ state, toggle ];
}

export default useToogle
