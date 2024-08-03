import React, { Component } from 'react'

import '../cssFolder/FooterComp.css'; // Correct relative path to the CSS file

export default class FooterComponent extends Component {
  
  constructor(props)
  {
    super(props)
    this.state = 
    {

    }
  }
  
  
    render() {
    return (
      <div className="footerDiv">
        <footer className = "footer footerSub">
            <span className = "text-center">All Rights Reserved 2020 @Tharun</span>
        </footer>
      </div>
    )
  }
}
