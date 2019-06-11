import React from 'react'
import moment from 'moment'
import { NumberToThousands } from '@/utils/utils'
import styles from './index.less'

const formateValue = (value, type, format) => {
    if (type === 'amount' && typeof value !== 'object') {
        return NumberToThousands(value)
    }
    if (type === 'date') {
        return value ? moment(value).format(format || 'YYYY-MM-DD hh:mm:ss') : ''
    }
    return value
}

const Detail = ({ label, value, type, width, format, required }) => (
    <div className={styles.detail}>
        <div className={`${styles.label} ${required ? styles.required : ''}`} style={{ width }}>
            {label}
        </div>
        <div className={styles.value}>{formateValue(value, type, format)}</div>
    </div>
)

const DetailList = ({ data, title, labelWidth }) => (
    <div>
        {title && <h4>{title}</h4>}
        {data.map((item, index) => (
            <Detail
                key={item.key || index}
                label={item.label}
                value={item.value}
                type={item.type}
                width={labelWidth}
                format={item.format}
                required={item.required}
            />
        ))}
    </div>
)

DetailList.defaultProps = {
    labelWidth: 140,
    title: null,
    data: [],
}

export default DetailList
