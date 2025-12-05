// src/App.jsx
import headerLogo from "../../assests/images/sbpl-logo-2.jpg";
import "./header.css";

export default function HeaderComponent( props ) {
  const { details, setDetails } = props;
  return (
    <div className="header-section pt-2 pb-1 px-1">
      {/* <img className="header-logo" src={headerLogo} alt="logo" /> */}
      <div className=" mb-1 p-3">
        <div className="d-md-flex justify-content-between">
            <div className="d-flex header-mix">
                <img
                  src={
                    headerLogo
                  }
                  alt="SBPL Auction Banner"
                  className="header-banner-img"
                />
              <h2 className="mb-0 mt-2">Welcome to SBPL 2026 Auction </h2>
            </div>
           <div className="mt-1 right-btns">
           <button className={`btn btn-${details ? "outline-light" :"light"} custom-btn me-2`} onClick={()=> setDetails(!details)}>
            Teams
          </button>
            <button className={`btn btn-${details ? "light" : "outline-light"} custom-btn`}  onClick={()=> setDetails(!details)}>
              Live Auction
          </button>
         </div>
        </div>
         <div className="small left-btns">Auction for SBPL</div>
        
      </div>
    </div>
  );
}
