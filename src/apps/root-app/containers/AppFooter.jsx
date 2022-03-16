import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="d-flex justify-content-center">
        <a href="https://sreglobal.com" target="_blank" rel="noopener noreferrer">S.R.E</a>
        <span className="ml-1">&copy; 2021 All Rights Reserved.</span>
      </div>
      {/* <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
