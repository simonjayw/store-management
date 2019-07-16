import React, { Component, Fragment } from 'react'
import { Modal, Form } from 'antd'
import moment from 'moment'
import { generateFormItem } from './help'
import CascaderScope from './CascaderScope'

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
                if (values.scope) {
                    values.scope = values.scope.join(',')
                }
                onOk(values)
            }
        })
    }

    handleUploadImg = (fieldName, path) => {
        const {
            form: { setFieldsValue },
        } = this.props
        console.log('fieldName', path)
        if (path) {
            setFieldsValue({
                [fieldName]: path,
            })
        }
    }

    onChangeScope = values => {
        const {
            form: { setFieldsValue },
        } = this.props
        console.log('scope', values)
        setFieldsValue({
            scope: values,
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
                    if (item.hidden === 1) {
                        formItemStyle.display = 'none'
                    } else {
                        fieldsOptions.rules = [{ required: true, message: '该项必填' }]
                    }

                    if (item.field_name === 'scope') {
                        fieldsOptions.initialValue = []
                        fieldsOptions.rules = [
                            { required: true, message: '该项必填' },
                            {
                                validator: (rule, value, callback) => {
                                    // TODO: 是否要去重复
                                    // const v = new Set(value)
                                    if (value.includes('')) {
                                        callback('请填写完整')
                                    }
                                    callback()
                                },
                            },
                        ]
                        fieldsOptions.validateTrigger = 'validateFields'
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
                                item.field_name === 'scope' ? (
                                    <CascaderScope onChange={this.onChangeScope} />
                                ) : (
                                    generateFormItem(item, false, this.handleUploadImg)
                                )
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
