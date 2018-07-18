import React from 'react';
import { Loader as SUILoader, Dimmer } from 'semantic-ui-react';

const Loader = () => (
  <Dimmer active>
    <SUILoader>
      Loading
    </SUILoader>
  </Dimmer>
);

export default Loader;
