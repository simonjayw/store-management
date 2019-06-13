import React, { Component, Fragment } from 'react'
import { Form, Input, DatePicker, Radio, InputNumber } from 'antd'

import ButtonGroup from '@/components/ButtonGroup'

const { RangePicker } = DatePicker

@Form.create()
class OperationAdLimitDetail extends Component {
    handleConfirm = () => {
        console.log('confirm')
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }

        return (
            <Fragment>
                <Form {...formItemLayout}>
                    <Form.Item label="商品批次ID">
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="商品名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="上线 / 下线">
                        {getFieldDecorator('nup', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(
                            <Radio.Group>
                                <Radio value={0}>上线</Radio>
                                <Radio value={1}>下线</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="抢购时间">
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<RangePicker style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item label="抢购价格">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<InputNumber style={{ width: '100%' }} />)}
                    </Form.Item>
                </Form>
                <ButtonGroup
                    align="center"
                    primary={[
                        {
                            text: '提交',
                            onClick: this.handleConfirm,
                        },
                    ]}
                />
            </Fragment>
        )
    }
}

export default OperationAdLimitDetail
