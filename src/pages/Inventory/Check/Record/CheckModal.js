import React, { Component } from 'react'
import { Modal, Form, InputNumber, Button } from 'antd'

@Form.create()
class CheckModal extends Component {
    state = {
        stockDeviation: null,
    }

    handleSave = () => {
        const {
            onSave,
            data,
            form: { validateFields },
        } = this.props

        validateFields((error, values) => {
            if (!error) {
                const resObj = Object.assign({}, values, { serial_no: data.serial_no })
                onSave(resObj)
            }
        })
    }

    onChangeStock = value => {
        const { data } = this.props
        const stockNow = data.stock_now

        this.setState({
            stockDeviation: stockNow - value,
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            visible,
            onCancel,
        } = this.props
        const { stockDeviation } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }

        return (
            <Modal
                visible={visible}
                destroyOnClose
                footer={null}
                title="实际库存录入"
                onCancel={onCancel}
            >
                <Form>
                    <Form.Item {...formItemLayout} label="实际库存值">
                        {getFieldDecorator('stock_count', {
                            rules: [{ required: true, message: '请输入实际库存' }],
                        })(<InputNumber onChange={this.onChangeStock} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="库存差值">
                        {stockDeviation}
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Button type="primary" onClick={this.handleSave}>
                        保存
                    </Button>
                </div>
            </Modal>
        )
    }
}

export default CheckModal
