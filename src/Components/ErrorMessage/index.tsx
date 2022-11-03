import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useMedia } from 'Hooks/UseMedia';

import './styles.scss';

export const ErrorMessage = ({ history }: any) => {
  const { t, i18n } = useTranslation();
  const isWidthGreaterThan767 = useMedia({ query: `(min-width: 767px)` });

  return (
    <>
      <div className="error-message-container">
        <div className="error-message-content">
          {isWidthGreaterThan767 ? (
            <div>
              <h3 className={`text-center`}>{t('PAGE_NOT_FOUND')}</h3>
              <h5>{t('YOU_MIGHT_FIND_YOUR_LOST_FRIEND_IF_YOU_SCROLL')}</h5>
            </div>
          ) : (
            <React.Fragment>
              <div className={`mt-5`}>{t(`ERROR`)}</div>
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
};
