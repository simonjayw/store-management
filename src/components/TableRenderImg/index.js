import React from 'react'

const TableRenderImg = ({ data = [] }) => (
    <div>
        {data.length &&
            data.map((item, index) => (
                <img
                    key={index}
                    style={{ width: 50, margin: '0 10px' }}
                    src={item.url}
                    alt={item.url}
                />
            ))}
    </div>
)

export default TableRenderImg
