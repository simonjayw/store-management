import React, { Component } from 'react'
import { connect } from 'dva'
import { message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import CheckModal from './CheckModal'

import { getCheckList, checkInventory } from '../../services'

@connect(() => ({}))
class InventoryCheckRecord extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页

        visible: false,
        record: {},
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getCheckList({
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
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

    handleCancelCheck = () => {
        this.setState({
            visible: false,
            record: {},
        })
    }

    handleShowCheck = record => {
        this.setState({
            visible: true,
            record,
        })
    }

    handleSaveCheck = value => {
        checkInventory(value).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功！')
                this.handleCancelCheck()
                this.fetchData()
            }
        })
    }

    render() {
        const { dataSrouce, pagination, visible, record } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '商品名称/编号',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            // initValue: '0',
                            options: [{ key: 0, value: '已下架' }, { key: 1, value: '已上架' }],
                            key: 'status',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            dataIndex: 'serial_no',
                            title: '商品批次 id',
                        },
                        {
                            dataIndex: 'skuid',
                            title: 'sku id',
                        },
                        {
                            dataIndex: 'name',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'category_name',
                            title: '品类',
                        },
                        {
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
                        },
                        {
                            dataIndex: 'storage_name',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'process_name',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'packing_name_a',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'packing_name_b',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'specification_real',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'weight_net',
                            title: '净重',
                        },
                        {
                            dataIndex: 'buy_date',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'price_settlement',
                            title: '门店结算价',
                        },
                        {
                            dataIndex: 'price_sale',
                            title: '门店售价',
                        },
                        {
                            dataIndex: 'stock_initial',
                            title: '入库库存',
                        },
                        {
                            dataIndex: 'stock_total',
                            title: '剩余库存',
                        },
                        // {
                        //     dataIndex: 'stock_count',
                        //     title: '期末库存',
                        // },
                        {
                            dataIndex: 'stock_now',
                            title: '实时库存',
                        },
                        {
                            dataIndex: 'status_desc',
                            title: '上下架状态',
                        },
                        {
                            dataIndex: 'stocktaking_date',
                            title: '盘点日期',
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                {
                                    text: '库存盘点',
                                    onClick: this.handleShowCheck,
                                },
                            ],
                        },
                    ]}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <CheckModal
                    visible={visible}
                    onCancel={this.handleCancelCheck}
                    onSave={this.handleSaveCheck}
                    data={record}
                />
            </PageHeaderWrapper>
        )
    }
}

export default InventoryCheckRecord
