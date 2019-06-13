import React, { Component, Fragment } from 'react'
import { Form, Input, DatePicker, Radio } from 'antd'

import ButtonGroup from '@/components/ButtonGroup'
import FileUpload from '@/components/FileUpload'

const { TextArea } = Input

@Form.create()
class OperationAdCarouselDetail extends Component {
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
                    <Form.Item label="广告名称">
                        {getFieldDecorator('adName', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="广告时间">
                        {getFieldDecorator('adTime', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<DatePicker style={{ width: '100%' }} />)}
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
                    <Form.Item label="文件上传">
                        {getFieldDecorator('nup', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<FileUpload />)}
                    </Form.Item>
                    <Form.Item label="广告链接">
                        {getFieldDecorator('adName', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="广告备注">
                        {getFieldDecorator('adRemark', {})(<TextArea rows={4} />)}
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

export default OperationAdCarouselDetail
