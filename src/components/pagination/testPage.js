import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export class Pagination extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="p-3">
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <div
                className="mt-1 font-size-14"
                role="status"
                aria-live="polite"
              >
                Showing 1 to 10 of 57 entries
              </div>
            </div>
            <div className="col-sm-12 col-md-7">
              <div className="text-right">
                <ul className="pagination m-0 float-right">
                  <li className="paginate_button page-item previous disabled">
                    <Link to="" className="page-link">
                      Previous
                    </Link>
                  </li>
                  <li className="paginate_button page-item active">
                    <Link to="" className="page-link">
                      1
                    </Link>
                  </li>
                  <li className="paginate_button page-item ">
                    <Link to="" className="page-link">
                      2
                    </Link>
                  </li>
                  <li className="paginate_button page-item ">
                    <Link to="" className="page-link">
                      3
                    </Link>
                  </li>
                  <li className="paginate_button page-item ">
                    <Link to="" className="page-link">
                      4
                    </Link>
                  </li>
                  <li className="paginate_button page-item ">
                    <Link to="" className="page-link">
                      5
                    </Link>
                  </li>
                  <li className="paginate_button page-item ">
                    <Link to="" className="page-link">
                      6
                    </Link>
                  </li>
                  <li className="paginate_button page-item next">
                    <Link to="" className="page-link">
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Pagination);
