import React, { Component, Fragment } from 'react'
import { Form, Input, message } from 'antd'

import ButtonGroup from '@/components/ButtonGroup'

const { TextArea } = Input

@Form.create()
class AuthorityMemberDetail extends Component {
    handleConfirm = () => {
        const {
            onConfirm,
            form: { validateFields },
            record,
        } = this.props
        validateFields((error, values) => {
            if (!error) {
                if (values.pwd !== values.repwd) {
                    message.warn('密码输入不一致！')
                    return
                }
                delete values.repwd
                onConfirm(Object.assign({ id: record ? record.id : 0 }, values))
            }
        })
    }

    render() {
        const {
            form: { getFieldDecorator },
            record,
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
                    <Form.Item label="成员姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '该项必填' }],
                            initialValue: record ? record.name : null,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('mobile', {
                            rules: [{ required: true, message: '该项必填' }],
                            initialValue: record ? record.mobile : null,
                        })(<Input />)}
                    </Form.Item>
                    {/* <Form.Item label="所属门店">
                        {getFieldDecorator('mch_id', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(
                            <Select>
                                <Select.Option value={1}>门店1</Select.Option>
                            </Select>
                        )}
                    </Form.Item> */}
                    <Form.Item label="登陆密码">
                        {getFieldDecorator('pwd', {
                            rules: [{ required: true, message: '该项必填' }],
                            // initialValue: record ? record.password : null,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('repwd', {
                            rules: [{ required: true, message: '该项必填' }],
                            // initialValue: record ? record.password : null,
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="备注信息">
                        {getFieldDecorator('remark', {
                            initialValue: record ? record.remark : null,
                        })(<TextArea rows={4} />)}
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

export default AuthorityMemberDetail
