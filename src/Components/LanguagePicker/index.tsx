import * as React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useTranslation } from 'react-i18next';

import { ButtonRadial } from 'Components/Button/Radial';
import { BN, EN, LANGUAGE } from 'Constants/Settings';
import { StorageSet } from 'Utilities/Storage';

import './styles.scss';

export const LanguagePicker = () => {
  const { t, i18n } = useTranslation();

  const EnglishButton = (
    <ButtonRadial
      title={t(`CHANGE_TO_ENGLISH_LANGUAGE`)}
      aria-pressed={i18n.language === EN}
      onClick={() => {
        i18n.changeLanguage(EN);
        StorageSet({ key: LANGUAGE, value: EN });
      }}>
      {t(`EN`)}
    </ButtonRadial>
  );

  const BengaliButton = (
    <ButtonRadial
      title={t(`CHANGE_TO_BENGALI_LANGUAGE`)}
      aria-pressed={i18n.language === BN}
      onClick={() => {
        i18n.changeLanguage(BN);
        StorageSet({ key: LANGUAGE, value: BN });
      }}>
      {t(`BN`)}
    </ButtonRadial>
  );

  const handlers = {
    ENGLISH_SETTINGS: () => {
      i18n.changeLanguage(EN);
      StorageSet({ key: LANGUAGE, value: EN });
    },
    BENGALI_SETTINGS: () => {
      i18n.changeLanguage(BN);
      StorageSet({ key: LANGUAGE, value: BN });
    },
  };

  return (
    <>
      <GlobalHotKeys handlers={handlers}>
        <div className="language-picker-container">
          <div className="language-picker-content">
            {EnglishButton}
            {BengaliButton}
          </div>
        </div>
      </GlobalHotKeys>
    </>
  );
};
