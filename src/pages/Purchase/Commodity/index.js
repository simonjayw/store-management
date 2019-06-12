import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

// import { fetchFunction } from './services'
const fetchFunction = async () => ({ data: [], pages: { count: 0 }, errcode: 0 })

@connect(() => ({}))
class PurchaseCommodity extends Component {
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
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: 'sku id',
                            dataIndex: 'id1',
                        },
                        {
                            title: '商品tupian',
                            dataIndex: 'a',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'b',
                        },
                        {
                            title: '品类',
                            dataIndex: 'c',
                        },
                        {
                            dataIndex: 'd',
                            title: '品种',
                        },
                        {
                            dataIndex: 'e',
                            title: '产区',
                        },
                        {
                            dataIndex: 'f',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'g',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'h',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'i',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'j',
                            title: '等级',
                        },
                        {
                            dataIndex: 'k',
                            title: '品牌',
                        },
                        {
                            dataIndex: 'l',
                            title: '规格',
                        },
                        {
                            dataIndex: 'm',
                            title: '规格值',
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

export default PurchaseCommodity
