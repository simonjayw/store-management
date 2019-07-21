import React, { Component, Fragment } from 'react'
import { Modal, Form } from 'antd'
import moment from 'moment'
import { generateFormItem } from './help'

@Form.create()
class UpdateModal extends Component {
    handleConfirm = () => {
        const {
            onOk,
            form: { validateFields },
            record,
        } = this.props
        validateFields((error, values) => {
            if (!error) {
                // 正对 日期格式
                Object.keys(values).forEach(key => {
                    if (values[key] instanceof moment) {
                        values[key] = moment(values[key]).format('YYYY-MM-DD HH:mm:ss')
                    }
                })
                const res = Object.assign({ id: record.id }, values)
                onOk(res)
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

    generateForm = () => {
        const {
            form: { getFieldDecorator },
            fields,
            record,
        } = this.props

        return (
            <Fragment>
                {fields.map((item, index) => {
                    const fieldsOptions = {
                        initialValue: record[item.field_name],
                    }
                    const formItemStyle = {}

                    // 正对 日期处理
                    if (item.field_type === 'date') {
                        fieldsOptions.initialValue = record[item.field_name]
                            ? moment(new Date(record[item.field_name]))
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
                                generateFormItem(item, record, this.handleUploadImg)
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
                title="更新"
            >
                <Form>{this.generateForm()}</Form>
            </Modal>
        )
    }
}

export default UpdateModal
