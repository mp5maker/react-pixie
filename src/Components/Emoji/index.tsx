import * as React from 'react'
import twemoji from 'twemoji'

import './styles.scss'

export const Emoji = React.memo(({ emoji }: any) => {
    const preparedHTML: string = twemoji.parse(emoji, {
        folder: `svg`,
        ext: `.svg`,
    })

    return (
        <span
            className={`emoji-container`}
            dangerouslySetInnerHTML={{
                __html: preparedHTML
            }} />
    )
})