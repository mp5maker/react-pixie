import * as React from 'react'

import "./styles.scss"

export const Cards = ({ list, prepareItem }: any) => {
    const memoList = React.useMemo(() => {
        return (
            <React.Fragment>
                {
                    Array.isArray(list) && list.length > 0 && list.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="card-item-container">
                                    { prepareItem && prepareItem({ item }) }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }, [list])


    return (
        <React.Fragment>
            <div className="cards-container">
                <div className="card-list-container">
                    { memoList }
                </div>
            </div>
        </React.Fragment>
    )
}