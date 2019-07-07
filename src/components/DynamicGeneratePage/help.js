/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import React from 'react'
import { Select, DatePicker, Input } from 'antd'
import UploadImg from '@/components/UploadImg'
import moment from 'moment'

// update 且 unmodifiable === 1时，禁用
export const generateFormItem = (
    { field_type, unmodifiable, field_name, selects },
    record,
    handleUploadImg
) => {
    let formItem
    switch (field_type) {
        case 'select':
            formItem = (
                <Select disabled={record && unmodifiable === 1} style={{ width: '100%' }}>
                    {selects.map(opt => (
                        <Select.Option key={opt.value}>{opt.text}</Select.Option>
                    ))}
                </Select>
            )
            break
        case 'date':
            formItem = (
                <DatePicker
                    disabled={record && unmodifiable === 1}
                    showTime={{
                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }}
                    style={{ width: '100%' }}
                />
            )
            break
        case 'file':
            formItem = (
                <UploadImg
                    fieldName={field_name}
                    initPictures={record[field_name]}
                    changeBc={handleUploadImg}
                />
            )
            break
        default:
            formItem = <Input disabled={record && unmodifiable === 1} style={{ width: '100%' }} />
            break
    }
    return formItem
}
