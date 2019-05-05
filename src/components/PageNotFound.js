import React, { Component } from 'react'
import { connect } from 'react-redux'

class PageNotFound extends Component {
    render(){
        return(
            <div className='center'>
                <h4>Error. Page Not Found.</h4>
            </div>
        )
    }
}

export default connect()(PageNotFound)