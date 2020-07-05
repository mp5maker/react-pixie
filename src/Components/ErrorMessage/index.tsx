import * as React from 'react'
import { useTranslation } from 'react-i18next'

import "./styles.scss"

export const ErrorMessage = ({ history }: any) => {
    const { t, i18n } = useTranslation()

    return (
        <>
            <div className="error-message-container">
                <div className="error-message-content">
                    <h3>
                        { t('PAGE_NOT_FOUND') }
                    </h3>
                </div>
            </div>
        </>
    )
}