import React, { Component, Fragment } from 'react'
import { Form, Input, Select } from 'antd'

import ButtonGroup from '@/components/ButtonGroup'

const { TextArea } = Input

@Form.create()
class AuthorityMemberDetail extends Component {
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
                    <Form.Item label="成员姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="手机号码">
                        {getFieldDecorator('mobile', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="所属门店">
                        {getFieldDecorator('nup', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(
                            <Select>
                                <Select.Option value={1}>门店1</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="登陆密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="确认密码">
                        {getFieldDecorator('repassword', {
                            rules: [{ required: true, message: '该项必填' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="备注信息">
                        {getFieldDecorator('remark', {})(<TextArea rows={4} />)}
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
