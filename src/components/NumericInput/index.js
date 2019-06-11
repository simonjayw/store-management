import React from 'react'
import { Input, Tooltip } from 'antd'

function formatNumber(value) {
    value += ''
    const list = value.split('.')
    const prefix = list[0].charAt(0) === '-' ? '-' : ''
    let num = prefix ? list[0].slice(1) : list[0]
    let result = ''
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`
        num = num.slice(0, num.length - 3)
    }
    if (num) {
        result = num + result
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

class NumericInput extends React.Component {
    onChange = e => {
        const { onChange: changeFn } = this.props
        const { value } = e.target
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            changeFn(value)
        }
    }

    // '.' at the end or only '-' in the input box.
    onBlur = () => {
        const { value, onBlur, onChange } = this.props
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            onChange(value.slice(0, -1))
        }
        if (onBlur) {
            onBlur()
        }
    }

    render() {
        const { value, placeholder } = this.props
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
            'Input a number'
        )
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    placeholder={placeholder || '请输入数字'}
                    maxLength={25}
                />
            </Tooltip>
        )
    }
}

export default NumericInput
