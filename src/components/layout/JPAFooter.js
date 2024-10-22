import React from 'react'

const JPAFooter = () => {
  return (
    <>
      <footer className='bg-light text-dark' style={{ background: '#f2f2f3' }}>
        <div className='container py-md-1'>
          <div className='text-center mb-4 mt-3 footer_title'>
            <span
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: 'black'
              }}
            >
              Sierra JPA
            </span>
          </div>
          <div className='row justify-content-md-between'>
            <div className='col-4 col-md-2 text-center  '>
              <h2
                className='h6'
                style={{
                  fontWeight: 'bold'
                }}
              >
                Review
              </h2>
              <ul className='nav flex-column'>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    New
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Search
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Comment
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-4 col-md-2 text-center  '>
              <h2
                className='h6 mb-3'
                style={{
                  fontWeight: 'bold'
                }}
              >
                About
              </h2>
              <ul className='nav flex-column'>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Staff
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Our Mission
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Contect Us
                  </a>
                </li>
              </ul>
            </div>
            <div className='col-4 col-md-2 text-center '>
              <h2
                className='h6 mb-3'
                style={{
                  fontWeight: 'bold'
                }}
              >
                Social
              </h2>
              <ul className='nav flex-column'>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Instagram
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Twitter
                  </a>
                </li>
                <li className='mb-1'>
                  <a href='#' className='link-secondary'>
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div className='footer-bottom'>
              <p className='text-center mt-5 text-secondary'>
                @Sierra all rights reserved | Privacy & Terms of Services |
                Cookies
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default JPAFooter
