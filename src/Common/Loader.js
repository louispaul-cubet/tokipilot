import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';

export const Loader = ({ showLoader }) => (
  
  <Fragment>
    {showLoader==true && (
      <div className='uk-overlay-default uk-position-cover custom-overlay'>
        <div className='showbox'>
          <Spinner />
        </div>
      </div>
    )}
  </Fragment>
);

const mapStateToProps = (state, props) => ({
  showLoader: state.uiReducer.showLoader
});

export default connect(mapStateToProps)(Loader);
