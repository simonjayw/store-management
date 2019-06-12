import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// import { fetchFunction } from './services'
const fetchFunction = async () => ({ data: [], pages: { count: 0 }, errcode: 0 })

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

        fetchFunction({
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

    render() {
        const { dataSrouce, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku品名',
                            type: 'input',
                            key: 'sku',
                        },
                        {
                            label: '日期',
                            type: 'datepicker',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'date',
                        },
                        {
                            label: '订货状态',
                            type: 'select',
                            key: 'status',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '订货单ID',
                            dataIndex: 'id1',
                        },
                        {
                            title: '日期',
                            dataIndex: 'date1',
                        },
                        {
                            title: '订货门店',
                            dataIndex: 'amount',
                            type: 'amount',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'datecol',
                            type: 'date',
                        },
                        {
                            dataIndex: 'a',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'b',
                            title: '品类',
                        },
                        {
                            dataIndex: 'c',
                            title: '品种',
                        },
                        {
                            dataIndex: 'd',
                            title: '产区',
                        },
                        {
                            dataIndex: 'e',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'f',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'g',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'h',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'i',
                            title: '进货数量',
                        },
                        {
                            dataIndex: 'j',
                            title: '订货状态',
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
