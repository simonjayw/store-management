import React from 'react'
import { Select, DatePicker, Input } from 'antd'
import moment from 'moment'

// update 且 unmodifiable === 1时，禁用
// eslint-disable-next-line import/prefer-default-export
export const generateFormItem = ({ field_type: fieldType, unmodifiable, selects }, isUpdate) => {
    let formItem
    switch (fieldType) {
        case 'select':
            formItem = (
                <Select disabled={isUpdate && unmodifiable === 1} style={{ width: '100%' }}>
                    {selects.map(opt => (
                        <Select.Option key={opt.value}>{opt.text}</Select.Option>
                    ))}
                </Select>
            )
            break
        case 'date':
            formItem = (
                <DatePicker
                    disabled={isUpdate && unmodifiable === 1}
                    showTime={{
                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }}
                    style={{ width: '100%' }}
                />
            )
            break
        default:
            formItem = <Input disabled={isUpdate && unmodifiable === 1} style={{ width: '100%' }} />
            break
    }
    return formItem
}
