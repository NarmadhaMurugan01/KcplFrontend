import React from "react";
import "./vehicles.css";
import bird from "../assets/images/bird_2.jpg";
import license from "../assets/images/download.png";

const Vehicle = () => {
  return (
    <div className="Company-Profile">
      <div className="card">
        <div className="row">
          <div className="col-1">
            <div className="com-img">
              <img
                src={bird}
                alt=""
                className="img-fluid"
                style={{
                  width: "110px",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.09)",
                }}
              />
            </div>
          </div>
          <div className="col-11">
            <div className="texts">
              <h5 className="m-0">Sheral Gropus</h5>
              <div className="bottom d-flex">
                <p className=" mb-0">Shethal@gmail.com</p>
                <p className="mx-4 mb-0">4552648632</p>
                <p className="mx-4 mb-0">Www.shetal.com</p>
              </div>
              <hr className="line" />
              <div className="address d-flex justify-content-between">
                <div className="current-ad">
                  <p>
                    Address :
                    <span>
                      #2 junstreet , velacherry ,Chennai- 50 ,TamilNadu .
                    </span>
                  </p>
                </div>
                <div className="head">
                  <p>
                    Head Quator :
                    <span>
                      #2 junstreet , velacherry ,Chennai- 50 ,TamilNadu .
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>
                  Company Category : <span> Patersip</span>
                </p>
              </div>
              <div className="col-6">
                <p>
                  Establishment : <span> 3 years 4 months</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>
                  Industry : <span> Financial Invest </span>
                </p>
              </div>
              <div className="col-6">
                <p>
                  Country : <span> India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-2">
                <img src={license} alt="" className="img-fluid" />
              </div>
              <div className="col-7">
                <p>
                  Register NO : <span> U 1232 TN 2020 PT 879264</span>
                </p>
              </div>
              <div className="col-3">
                <p>
                  Branches : <span> 10</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>
              Company Misson :
              <span>
                Our vision is to become a globally recognized leader in
                providing innovative IT solutions that empower businesses to
                thrive in the digital era.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="row">
          <div className="col-6">
            <p>
              Description about the Company :
              <span>
                Dynamic Solutions, a trusted name in the finance industry, has
                been providing cutting-edge financial software and consulting
                services since 1985. Our flagship product, FinTech Pro, is a
                comprehensive financial software solution designed for managing
                and optimizing financial processes. With a team of 180 dedicated
                professionals, we empower financial institutions with robust
                solutions for strategic .
              </span>
            </p>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>
                  Employees : <span> 2- 30 </span>
                </p>
              </div>
              <div className="col-6">
                <p>
                  Map : <span> Chennai</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <p>
          Product / Service Name : <span> TeleComMaster</span>
        </p>
        <p>
          Description :
          <span>
            TeleComMaster is our advanced line of telecom equipment designed for
            high-performance and secure communication networks. With a focus on
            reliability and innovation, TeleComMaster products are engineered to
            meet the evolving needs of the telecom industry.
          </span>
        </p>
      </div>
    </div>
  );
};

export default Vehicle;
