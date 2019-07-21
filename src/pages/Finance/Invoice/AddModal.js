import React, { Component, Fragment } from 'react'
import { Modal, Form } from 'antd'
import moment from 'moment'
import { generateFormItem } from './help'

@Form.create()
class AddModal extends Component {
    handleConfirm = () => {
        const {
            onOk,
            form: { validateFields },
        } = this.props
        validateFields((error, values) => {
            if (!error) {
                // 正对 日期格式
                Object.keys(values).forEach(key => {
                    if (values[key] instanceof moment) {
                        values[key] = moment(values[key]).format('YYYY-MM-DD HH:mm:ss')
                    }
                    if (!values[key]) {
                        delete values[key]
                    }
                })
                onOk(values)
            }
        })
    }

    generateForm = () => {
        const {
            form: { getFieldDecorator },
            fields,
        } = this.props

        return (
            <Fragment>
                {fields.map((item, index) => {
                    const fieldsOptions = {
                        initialValue: item.default_value,
                    }
                    const formItemStyle = {}

                    // 正对 日期处理
                    if (item.field_type === 'date') {
                        fieldsOptions.initialValue = item.default_value
                            ? moment(new Date(item.default_value))
                            : null
                    }
                    // 新增 编辑 1 2 隐藏
                    if (item.hidden === 1 || item.hidden === 2) {
                        formItemStyle.display = 'none'
                    } else {
                        fieldsOptions.rules = [{ required: true, message: '该项必填' }]
                    }

                    return (
                        <Form.Item
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            key={index}
                            label={item.show_name}
                            style={formItemStyle}
                        >
                            {getFieldDecorator(item.field_name, fieldsOptions)(
                                generateFormItem(item)
                            )}
                        </Form.Item>
                    )
                })}
            </Fragment>
        )
    }

    render() {
        const { visible, onCancel } = this.props

        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                onOk={this.handleConfirm}
                destroyOnClose
                title="添加"
            >
                <Form>{this.generateForm()}</Form>
            </Modal>
        )
    }
}

export default AddModal
