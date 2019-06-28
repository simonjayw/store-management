import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import TableRenderImg from '@/components/TableRenderImg'

import { getRecordList } from '../services'

@connect(() => ({}))
class PurchaseRecord extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getRecordList({
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
                        total: res.pages ? res.pages.count : 0,
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

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku品名',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '日期',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '订货状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 0, value: '未发货' }, { key: 1, value: '已发货' }],
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '订货单ID',
                            dataIndex: 'id',
                        },
                        {
                            title: '日期',
                            dataIndex: 'create_time',
                        },
                        {
                            title: '订货门店',
                            dataIndex: 'merchant_name',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'pictures',
                            render: data => <TableRenderImg data={data} />,
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
                            dataIndex: 'quantity',
                            title: '进货数量',
                        },
                        {
                            dataIndex: 'status',
                            title: '订货状态',
                            render: status => (status === 0 ? '未发货' : '已发货'),
                        },
                    ]}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
            </PageHeaderWrapper>
        )
    }
}

export default PurchaseRecord
