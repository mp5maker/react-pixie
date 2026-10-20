import * as React from 'react';
import { useTranslation } from 'react-i18next';

import './styles.scss';

export const ErrorMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="error-message-container">
      <div className="error-message-content hud-panel">
        <p className="error-status">{t('HUD_SIGNAL_LOST')}</p>
        <h1 className="error-code hud-display">404</h1>
        <p className="error-hint">
          {t('YOU_MIGHT_FIND_YOUR_LOST_FRIEND_IF_YOU_SCROLL')}
        </p>
      </div>
    </div>
  );
};
