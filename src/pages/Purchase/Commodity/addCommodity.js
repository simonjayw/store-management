import React, { Component } from 'react'
import { Col, Row, InputNumber, Button } from 'antd'

class AddCommodity extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        const { data } = this.props

        const newData = data.map(item => ({ key: item.skuid, name: item.name, value: 1 }))

        this.setState({
            data: newData,
        })
    }

    onChangeInput = (key, value) => {
        const { data } = this.state
        const newData = data.map(item => {
            if (item.key === key) {
                return {
                    ...item,
                    value,
                }
            }
            return item
        })
        this.setState({
            data: newData,
        })
    }

    handleConfirm = () => {
        const { onConfirm } = this.props
        const { data } = this.state
        const result = {}
        data.forEach(item => {
            result[item.key] = item.value
        })

        onConfirm(result)
    }

    render() {
        const { data } = this.state
        return (
            <div>
                <Row style={{ marginBottom: 10, fontWeight: 'bold' }}>
                    <Col span={14}>SKU名</Col>
                    <Col span={8}>进货数量</Col>
                </Row>
                {data.map(item => (
                    <Row style={{ marginBottom: 10 }} key={item.key}>
                        <Col span={14}>{item.name}</Col>
                        <Col span={8}>
                            <InputNumber
                                min={1}
                                value={item.value}
                                onChange={value => this.onChangeInput(item.key, value)}
                            />
                        </Col>
                    </Row>
                ))}
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <Button type="primary" onClick={this.handleConfirm}>
                        确认进货
                    </Button>
                </div>
            </div>
        )
    }
}

export default AddCommodity
