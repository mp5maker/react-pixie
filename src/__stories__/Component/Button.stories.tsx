import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, object } from '@storybook/addon-knobs';

import { ButtonRadial } from 'Components/Button/Radial';
import { ButtonSquare } from 'Components/Button/Square';

export default {
  title: 'Button',
  decorators: [withA11y, withKnobs],
};

export const radial = () => {
  return (
    <ButtonRadial
      onClick={action('onClick')}
      style={object(`style`, {}, `optional`)}>
      <FontAwesomeIcon icon={faMusic} />
    </ButtonRadial>
  );
};

export const square = () => {
  const props = {
    onClick: action('onClick'),
    style: object(`style`, {}, `optional`),
  };

  return <ButtonSquare {...props}>Experience</ButtonSquare>;
};
