/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Fotter = () =>{
    return(
        <footer className="page-footer font-small blue-grey lighten-5">

            <div style={{backgroundColor: "#21d192"}}>
                
                <div className="container">

                    <div className="row py-4 d-flex align-items-center">

                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                        <h6 className="mb-0">Get connected with us on social networks!</h6>
                        </div>

                        <div className="col-md-6 col-lg-7 text-center text-md-right">

                            <a class="fb-ic">
                                <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a class="tw-ic">
                                <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a class="li-ic">
                                <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>

                            <a class="ins-ic">
                                <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                        </div>

                    </div>
                </div>

            </div>

            <div className="container text-center text-md-left mt-5">

                <div className="row mt-3 dark-grey-text">

                <div className="col-md-4 col-lg-4 col-xl-3 mb-4">

                    <h6 className="text-uppercase font-weight-bold">ShopoZ</h6>
                    <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}} />
                    <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                    consectetur
                    adipisicing elit.</p>

                </div>

                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">

                    <h6 className="text-uppercase font-weight-bold">Products</h6>
                    <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}} />
                    <p>
                    <a className="dark-grey-text" href="#!">Link1</a>
                    </p>
                    <p>
                    <a className="dark-grey-text" href="#!">Link2</a>
                    </p>
                    <p>
                    <a className="dark-grey-text" href="#!">Link3</a>
                    </p>
                    <p>
                    <a className="dark-grey-text" href="#!">link4</a>
                    </p>

                </div>
                
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                    <h6 className="text-uppercase font-weight-bold">Contact</h6>
                    <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{width: "60px"}} />
                    <p>
                    <i className="fas fa-home mr-3"></i> Hyderabad, NY 10012, India</p>
                    <p>
                    <i className="fas fa-envelope mr-3"></i> info@example.com</p>
                    <p>
                    <i className="fas fa-phone mr-3"></i> + 91 8686 085 000</p>
                    <p>
                    <i className="fas fa-print mr-3"></i> +91 9966 404 042 </p>

                </div>

                </div>

            </div>

            <div className="footer-copyright text-center text-black-50 py-3">
                {/* <a className="dark-grey-text" href="https://mdbootstrap.com/"> Developed by Rohith & Vinod</a> */}
                <h6>Developed by Rohith & Vinod</h6>
            </div>

            </footer>
        
    )
}

export default Fotter