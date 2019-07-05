import React, { Component, Fragment } from 'react'
import { Modal, Form, Input, Select, DatePicker } from 'antd'

@Form.create()
class AddModal extends Component {
    handleConfirm = () => {
        const {
            onOk,
            form: { validateFields },
        } = this.props
        validateFields((error, values) => {
            if (!error) {
                onOk(values)
            }
        })
    }

    generateFormItem = ({ field_type: fieldType, selects }) => {
        let formItem
        switch (fieldType) {
            case 'select':
                formItem = (
                    <Select style={{ width: '100%' }}>
                        {selects.map(opt => (
                            <Select.Option key={opt.value}>{opt.text}</Select.Option>
                        ))}
                    </Select>
                )
                break
            case 'date':
                formItem = <DatePicker style={{ width: '100%' }} />
                break
            default:
                formItem = <Input style={{ width: '100%' }} />
                break
        }
        return formItem
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

                    if (item.hidden === 1) {
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
                                this.generateFormItem(item)
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
