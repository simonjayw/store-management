import React, { PureComponent } from 'react'
import { Cascader } from 'antd'
import { getRegions } from '@/services/common'

class CascaderScope extends PureComponent {
    state = {
        options: [],
        scopes: [undefined, undefined, undefined, undefined],
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
        const { onChange } = this.props
        const resId = value[value.length - 1]
        scopes[index] = resId

        onChange(scopes)
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
        const { options } = this.state

        return (
            <div>
                <Cascader
                    options={options}
                    placeholder="请选择配送范围"
                    loadData={this.loadData}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    onChange={v => this.onChange(v, 0)}
                />
                <Cascader
                    options={options}
                    placeholder="请选择配送范围"
                    loadData={this.loadData}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    onChange={v => this.onChange(v, 1)}
                />
                <Cascader
                    options={options}
                    placeholder="请选择配送范围"
                    loadData={this.loadData}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    onChange={v => this.onChange(v, 2)}
                />
                <Cascader
                    options={options}
                    placeholder="请选择配送范围"
                    loadData={this.loadData}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}
                    onChange={v => this.onChange(v, 3)}
                />
            </div>
        )
    }
}

export default CascaderScope
