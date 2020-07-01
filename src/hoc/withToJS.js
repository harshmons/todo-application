import React from 'react';
import { isImmutable } from 'immutable';

const withToJS = WrappedComponent => {
  return props => {
    const keys = Object.keys(props);

    const propJS = keys.reduce((accumulator, key) => {
      accumulator[key] = isImmutable(props[key])
        ? props[key].toJS()
        : (accumulator[key] = props[key]);
      return accumulator;
    }, {});

    return <WrappedComponent {...propJS} />;
  };
};

export default withToJS;
