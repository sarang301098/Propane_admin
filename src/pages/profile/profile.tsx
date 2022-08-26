import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../components/sidebar/sidebar";
import NoImage from "../../assets/img/image.png";
import { getProfileActionThunk } from "../../store/profile/profile.actions.async";
import TRootState from "../../store/root.types";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const adminProfile = useSelector(
    (state: TRootState) => state.profile.profileData
  );

  /**
   * Get Profile data when component load first time
   */
  useEffect(() => {
    dispatch(getProfileActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Profile</h1>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => history.push("/settings/profile/edit")}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="media">
                    <img
                      src={adminProfile?.profileImage || NoImage}
                      className="align-self-start mr-5 ml-3 rounded-circle img-thumbnail o-cover"
                      alt="profile-thumbnail"
                      width="130"
                      height="130"
                    />
                    <div className="media-body">
                      <div className="row">
                        <div className="col-lg-12 col-xl-10">
                          <h2 className="mt-0 mb-3 text-info">
                            {adminProfile?.fullName}
                          </h2>
                          <ul className="list-unstyled text-left row mb-0">
                            <li className="mb-3 col-md-6">
                              <label className="text-muted mb-1">
                                Mobile Number
                              </label>
                              <br /> {adminProfile?.mobileNumber}
                            </li>
                            <li className="mb-3 col-md-6">
                              <label className="text-muted mb-1">Email </label>
                              <br /> {adminProfile?.email}
                            </li>
                            <li className="mb-3 col-md-6">
                              <label className="text-muted mb-1">Address</label>
                              <br />
                              {/* TODO: When address API done */}
                              {/* {adminProfile?.address} */}
                              656 Chatham Way, Washington, MD, Maryland, 20008,
                              USA
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
