import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'
import AddModal from './AddModal'

import { getDynamicConfig, addDynamicData } from '@/services/common'

@connect(() => ({}))
class DynamicGeneratePage extends Component {
    state = {
        // searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页

        columns: [],
        fields: [],

        addModal: false,

        // updateModal: false,
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    // fetchData = (parmas = {}) => {
    // const { pageNum, ...params } = parmas
    // const { pagination, searchCondition } = this.state
    fetchData = () => {
        const { cid } = this.props

        getDynamicConfig(cid).then(res => {
            if (res && res.errcode === 0) {
                const { fields, values } = res.data
                this.setState({
                    fields,
                    columns: this.generateColumnsByFields(fields),
                    dataSrouce: values,
                })
            }
        })

        // getFiedcostListMOCK({
        //     size: pagination.pageSize,
        //     index: pageNum || pagination.current,
        //     ...searchCondition,
        //     ...params,
        // }).then(res => {
        //     if (res && res.errcode === 0) {
        //         this.setState({
        //             dataSrouce: res.data,
        //             pagination: {
        //                 ...pagination,
        //                 total: res.pages.count,
        //             },
        //         })
        //     }
        // })
    }

    // 查询表单搜索
    // handleFormSearch = values => {
    handleFormSearch = () => {
        const { pagination } = this.state

        this.setState(
            {
                // searchCondition: values,
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
    onShowUpdateModal = () => {
        this.setState({
            // updateModal: true,
        })
    }

    // update弹窗 - 隐藏
    onHideUpdateModal = () => {
        this.setState({
            // updateModal: false,
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
        addDynamicData(values).then(res => {
            console.log(res)
        })
    }

    // 根据fields 生成columns
    generateColumnsByFields = (filelds = []) => {
        const columns = []
        filelds.forEach(item => {
            // 为1时隐藏
            if (item.hidden === 1) {
                return
            }
            columns.push({
                title: item.show_name,
                dataIndex: item.field_name,
            })
        })
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

    render() {
        const { dataSrouce, pagination, columns, fields, addModal /* , updateModal */ } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '商品名称/编号',
                            type: 'input',
                            key: 'id',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '新增',
                            onClick: this.onShowAddModal,
                        },
                    ]}
                />
                <BasicTable
                    columns={columns}
                    dataSource={dataSrouce}
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
            </PageHeaderWrapper>
        )
    }
}

export default DynamicGeneratePage
