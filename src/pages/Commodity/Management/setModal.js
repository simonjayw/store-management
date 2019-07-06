import React, { Component } from 'react'
import { Form, Button, Modal, Input } from 'antd'

@Form.create()
class SetModal extends Component {
    handleConfirm = () => {
        const {
            form: { validateFields },
            onConfirm,
            record,
        } = this.props

        validateFields((error, values) => {
            if (!error) {
                const resObj = {
                    serial_no: record.serial_no,
                    data: JSON.stringify(values),
                }
                onConfirm(resObj)
            }
        })
    }

    render() {
        const {
            record,
            visible,
            onCancel,
            form: { getFieldDecorator },
        } = this.props
        const formLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 18,
            },
        }

        return (
            <Modal title="设置别名/售价" visible={visible} footer={null} onCancel={onCancel}>
                <Form>
                    <Form.Item {...formLayout} label="sku品名">
                        {record.name}
                    </Form.Item>
                    <Form.Item {...formLayout} label="别名">
                        {getFieldDecorator('alias', {
                            rules: [{ required: true, message: '该项必填' }],
                            initialValue: record.alias,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formLayout} label="门店售价">
                        {getFieldDecorator('price_sale', {
                            rules: [{ required: true, message: '该项必填' }],
                            initialValue: record.alias,
                        })(<Input />)}
                    </Form.Item>
                </Form>
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <Button type="primary" onClick={this.handleConfirm}>
                        确认
                    </Button>
                </div>
            </Modal>
        )
    }
}

export default SetModal
