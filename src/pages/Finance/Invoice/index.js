import React, { Component } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'
import { message } from 'antd'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

import { getDynamicConfig, addDynamicData, disableDynamicData } from '@/services/common'

const cid = 'BC4C58CBD16DEDD23H'

@connect(() => ({}))
class FinanceInvoice extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        searchForm: [],
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页

        columns: [],
        fields: [],

        addModal: false,
        updateModal: false,
        updateRecord: {},

        selectedRowKeys: [],
        selectedRowData: [],
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getDynamicConfig({
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            // ...searchCondition,
            q: JSON.stringify(searchCondition),
            ...params,
            cid,
        }).then(res => {
            if (res && res.errcode === 0) {
                const { fields, values } = res.data
                this.setState({
                    fields,
                    columns: this.generateColumnsByFields(fields),
                    searchForm: this.generateFormByFields(fields),
                    dataSrouce: values,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
                    selectedRowKeys: [],
                    selectedRowData: [],
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = values => {
        const { pagination } = this.state

        this.setState(
            {
                searchCondition: values,
                pagination: {
                    ...pagination,
                    current: 1,
                },
            },
            () => {
                this.fetchData()
            }
        )
    }

    // 切换分页
    handleChangePage = page => {
        const { pagination } = this.state

        this.setState(
            {
                pagination: {
                    ...pagination,
                    current: page,
                },
            },
            () => {
                this.fetchData({
                    pageNum: page,
                })
            }
        )
    }

    // update弹窗 - 展示
    onShowUpdateModal = record => {
        this.setState({
            updateModal: true,
            updateRecord: record,
        })
    }

    // update弹窗 - 隐藏
    onHideUpdateModal = () => {
        this.setState({
            updateModal: false,
        })
    }

    // update弹窗 - 确认
    onConfirmUpdate = values => {
        addDynamicData(Object.assign({ cid }, values)).then(res => {
            if (res && res.errcode === 0) {
                message.success('更新成功')
                this.onHideUpdateModal()
                this.fetchData()
            }
        })
    }

    // 添加弹窗 - 展示
    onShowAddModal = () => {
        this.setState({
            addModal: true,
        })
    }

    // 添加弹窗 - 隐藏
    onHideAddModal = () => {
        this.setState({
            addModal: false,
        })
    }

    // 添加弹窗 - 确认
    onConfirmAdd = values => {
        addDynamicData(Object.assign({ cid }, values)).then(res => {
            if (res && res.errcode === 0) {
                message.success('添加成功')
                this.onHideAddModal()
                this.fetchData()
            }
        })
    }

    // 根据fields 生成columns
    generateColumnsByFields = (filelds = []) => {
        const { pushColumns } = this.props
        let columns = []
        filelds.forEach(item => {
            // 为1时隐藏
            if (item.hidden === 1) {
                return
            }
            const colObj = {
                title: item.show_name,
                dataIndex: item.field_name,
            }
            // 为下拉框类型时，查找数据再返回
            if (item.field_type === 'select') {
                colObj.render = v => {
                    let t = ''
                    item.selects.forEach(i => {
                        if (i.value === v) {
                            t = i.text
                        }
                    })
                    return t
                }
            }

            columns.push(colObj)
        })
        if (pushColumns && pushColumns.length) {
            columns = columns.concat(pushColumns)
        }

        columns.push({
            type: 'oprate',
            buttons: [
                {
                    text: '编辑',
                    onClick: this.onShowUpdateModal,
                },
            ],
        })
        return columns
    }

    getSearchFormTypeBtFiledType = fieldType => {
        let type = ''
        switch (fieldType) {
            case 'select':
                type = 'select'
                break
            case 'date':
                type = 'datepicker'
                break
            default:
                type = 'input'
                break
        }
        return type
    }

    generateFormByFields = (filelds = []) => {
        const searchForm = []
        filelds.forEach(item => {
            if (item.search === 1) {
                const type = this.getSearchFormTypeBtFiledType(item.field_type)
                const formObj = {
                    label: item.show_name,
                    key: item.field_name,
                    type,
                }
                // 对日期进行处理
                if (type === 'datepicker') {
                    formObj.dateFormat = 'YYYY-MM-DD HH:mm:ss'
                    formObj.showTime = {
                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                    }
                }
                // 对下拉框处理
                if (type === 'select') {
                    formObj.options = item.selects
                    formObj.keyFiled = 'value'
                    formObj.textFiled = 'text'
                }
                searchForm.push(formObj)
            }
        })
        return searchForm
    }

    onChangeRowSelect = (keyRow, dataRow) => {
        // 单选处理
        const selectedRowKeys = keyRow.length <= 1 ? keyRow : [keyRow[keyRow.length - 1]]
        const selectedRowData = dataRow.length <= 1 ? dataRow : [dataRow[dataRow.length - 1]]

        this.setState({
            selectedRowKeys,
            selectedRowData,
        })
    }

    dealWidthData = () => {
        const {
            selectedRowData: [record],
        } = this.state

        if (record == null) {
            message.warn('请选择数据')
            return
        }

        disableDynamicData({
            cid,
            id: record.id,
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('处理成功')
                this.fetchData()
            }
        })
    }

    render() {
        const {
            dataSrouce,
            pagination,
            columns,
            searchForm,
            fields,
            addModal,
            updateModal,
            updateRecord,

            selectedRowKeys,
        } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm data={searchForm} buttonGroup={[{ onSearch: this.handleFormSearch }]} />
                <ButtonGroup
                    secondary={[
                        {
                            text: '去处理发票',
                            onClick: this.dealWidthData,
                        },
                        // {
                        //     text: '新增',
                        //     onClick: this.onShowAddModal,
                        // },
                    ]}
                />
                <BasicTable
                    columns={columns}
                    dataSource={dataSrouce}
                    rowSelection={{
                        onChange: this.onChangeRowSelect,
                        selectedRowKeys,
                    }}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <AddModal
                    visible={addModal}
                    onCancel={this.onHideAddModal}
                    onOk={this.onConfirmAdd}
                    fields={fields}
                />
                <UpdateModal
                    visible={updateModal}
                    onCancel={this.onHideUpdateModal}
                    onOk={this.onConfirmUpdate}
                    fields={fields}
                    record={updateRecord}
                />
            </PageHeaderWrapper>
        )
    }
}

export default FinanceInvoice
