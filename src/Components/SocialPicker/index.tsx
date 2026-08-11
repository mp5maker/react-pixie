import {
  faGithub,
  faLinkedin,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ButtonRadial } from 'Components/Button/Radial';
import './styles.scss';

export const SocialPicker = ({ colors, theme }: any) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="social-picker-container">
        <div className="social-picker-content">
          <ButtonRadial
            title={t('GITHUB')}
            ariaLabel={`github`}
            onClick={() => {
              if (window) {
                // @ts-ignore
                window.open('https://github.com/mp5maker', '_blank').focus();
              }
            }}>
            <FontAwesomeIcon icon={faGithub} />
          </ButtonRadial>
          <ButtonRadial
            title={t('LINKEDIN')}
            ariaLabel={`linkedin`}
            onClick={() => {
              if (window) {
                // @ts-ignore
                window
                  .open(
                    'https://www.linkedin.com/in/shabuktaginkhan/',
                    '_blank',
                  )
                  .focus();
              }
            }}>
            <FontAwesomeIcon icon={faLinkedin} />
          </ButtonRadial>
        </div>
        <div className="social-picker-content mt-3">
          <ButtonRadial
            title={t('STACKOVERFLOW')}
            ariaLabel={`stack-overflow`}
            onClick={() => {
              if (window) {
                // @ts-ignore
                window
                  .open(
                    'https://stackoverflow.com/users/123456/shabuktaginkhan',
                    '_blank',
                  )
                  .focus();
              }
            }}>
            <FontAwesomeIcon icon={faStackOverflow} />
          </ButtonRadial>
          <ButtonRadial
            title={t('RESUME')}
            ariaLabel={`resume`}
            onClick={() => {
              if (window) {
                // @ts-ignore
                window.open('/Resume/resume-zeuz.pdf', '_blank').focus();
              }
            }}>
            <FontAwesomeIcon icon={faFilePdf} />
          </ButtonRadial>
        </div>
      </div>
    </>
  );
};
