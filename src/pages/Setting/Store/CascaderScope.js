import React, { Component } from 'react'
import { Cascader, Icon } from 'antd'
import { getRegions } from '@/services/common'

import styles from './CascaderScope.less'

class CascaderScope extends Component {
    state = {
        options: [],
        scopes: [[]],
    }

    componentDidMount() {
        getRegions().then(res => {
            if (res && res.errcode === 0) {
                const options = res.data.map(item => Object.assign({ isLeaf: false }, item))
                this.setState({
                    options,
                })
            }
        })
    }

    onChange = (value, index) => {
        const { scopes } = this.state
        scopes[index] = value

        this.changeDataByProps(scopes)
        this.setState({
            scopes,
        })
    }

    changeDataByProps = scopes => {
        const { onChange } = this.props
        const result = scopes.map(item => {
            if (item.length === 0) {
                return ''
            }
            return item[item.length - 1]
        })
        onChange(result)
    }

    handleChangeRow = index => {
        const { scopes } = this.state
        if (index === 0) {
            scopes.push([])
        } else {
            scopes.splice(index, 1)
        }
        this.changeDataByProps(scopes)
        this.setState({
            scopes,
        })
    }

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        getRegions({
            code: targetOption.code,
        }).then(res => {
            if (res && res.errcode === 0) {
                targetOption.loading = false
                const children = res.data.map(item => {
                    if (item.code) {
                        return Object.assign({ isLeaf: false }, item)
                    }
                    return item
                })
                children.unshift({
                    name: `全${targetOption.name}`,
                    id: targetOption.id,
                })
                targetOption.children = children

                const { options } = this.state
                this.setState({
                    options: [...options],
                })
            }
        })
    }

    render() {
        const { options, scopes } = this.state

        return (
            <div>
                {scopes.map((value, index) => (
                    <div key={index}>
                        <Cascader
                            options={options}
                            placeholder="请选择配送范围"
                            loadData={this.loadData}
                            value={value}
                            style={{ width: '90%' }}
                            fieldNames={{
                                label: 'name',
                                value: 'id',
                            }}
                            onChange={v => this.onChange(v, index)}
                        />
                        <span onClick={() => this.handleChangeRow(index)} className={styles.button}>
                            {index === 0 ? (
                                <Icon type="plus-circle" />
                            ) : (
                                <Icon type="minus-circle" />
                            )}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
}

export default CascaderScope
