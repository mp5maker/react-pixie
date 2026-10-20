import {
  faGithub,
  faGitlab,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { ButtonRadial } from 'Components/Button/Radial';
import './styles.scss';

/* noopener makes window.open return null; the old .focus() threw there and when popups are blocked */
const open = (url: string) => window.open(url, '_blank', 'noopener');

export const SocialPicker = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="social-picker-container">
        <div className="social-picker-content">
          <ButtonRadial
            title={t('GITHUB')}
            ariaLabel={t('GITHUB')}
            onClick={() => open('https://github.com/mp5maker')}>
            <FontAwesomeIcon icon={faGithub} />
          </ButtonRadial>
          <ButtonRadial
            title={t('LINKEDIN')}
            ariaLabel={t('LINKEDIN')}
            onClick={() => open('https://www.linkedin.com/in/shabuktaginkhan/')}>
            <FontAwesomeIcon icon={faLinkedin} />
          </ButtonRadial>
          <ButtonRadial
            title={t('GITLAB')}
            ariaLabel={t('GITLAB')}
            onClick={() => open('https://gitlab.com/khan.photon')}>
            <FontAwesomeIcon icon={faGitlab} />
          </ButtonRadial>
          <ButtonRadial
            title={t('RESUME')}
            ariaLabel={t('RESUME')}
            onClick={() => open('/Resume/resume-zeuz.pdf')}>
            <FontAwesomeIcon icon={faFilePdf} />
          </ButtonRadial>
        </div>
      </div>
    </>
  );
};
