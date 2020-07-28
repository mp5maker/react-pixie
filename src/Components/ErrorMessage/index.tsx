import * as React from 'react'
import { useTranslation } from 'react-i18next'

import "./styles.scss"

export const ErrorMessage = ({ history }: any) => {
    const { t, i18n } = useTranslation()

    return (
        <>
            <div className="error-message-container">
                <div className="error-message-content">
                    <div>
                        <h3 className={`text-center`}>
                            { t('PAGE_NOT_FOUND') }
                        </h3>
                        <h5>
                            {t('YOU_MIGHT_FIND_YOUR_LOST_FRIEND_IF_YOU_SCROLL') }
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}