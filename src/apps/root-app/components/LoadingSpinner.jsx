/** @jsxImportSource @emotion/react */
import LoadBar from "react-spinners/PropagateLoader";

export const PageLoading = ({ className }) => {
  return (
    <div className="c-app align-items-center">
      <div className="container d-flex justify-content-center">
        <div className={className}>
          <LoadBar color="#3172BE" size={10} />
        </div>
      </div>
    </div>
  );
};

export const SimpleComponentLoading = ({ className }) => {
  return (
    <div className="row text-center">
      <div className="col-12 d-flex justify-content-center">
        <div className={className}>
          <LoadBar color="#3172BE" size={10} />
        </div>
      </div>
    </div>
  );
};

export const ComponentLoading = ({ className }) => {
  return (
    <div className="row h-100 text-center">
      <div className="col-12 align-self-center d-flex justify-content-center">
        <div className={className}>
          <LoadBar color="#3172BE" size={10} />
        </div>
      </div>
    </div>
  );
};

export const InfiniteBarLoader = ({ className, style }) => {
  return (
    <div className="infinite-page-loader-main">
      <div className="infinite-progress-loader" style={style}>
        <div className="infinite-progress-loader-bar"></div>
      </div>
    </div>
  );
};
