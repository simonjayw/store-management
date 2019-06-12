import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { getCheckListMOCK } from '../../services'

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
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getCheckListMOCK({
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
                            label: '商品名称/编号',
                            type: 'input',
                            key: 'name',
                        },
                        {
                            label: '状态',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'status',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            dataIndex: 'id2',
                            title: '商品批次 id',
                        },
                        {
                            dataIndex: 'id1',
                            title: 'sku id',
                        },
                        {
                            dataIndex: 'e',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'f',
                            title: '品类',
                        },
                        {
                            dataIndex: 'g',
                            title: '品种',
                        },
                        {
                            dataIndex: 'h',
                            title: '产区',
                        },
                        {
                            dataIndex: 'i',
                            title: '存储情况',
                        },
                        {
                            dataIndex: 'j',
                            title: '加工情况',
                        },
                        {
                            dataIndex: 'k',
                            title: '外包装',
                        },
                        {
                            dataIndex: 'l',
                            title: '内包装',
                        },
                        {
                            dataIndex: 'm',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'n',
                            title: '净重',
                        },
                        {
                            dataIndex: 'date3',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'number2',
                            title: '门店结算价',
                        },
                        {
                            dataIndex: 'a',
                            title: '门店售价',
                        },
                        {
                            dataIndex: 'b',
                            title: '入库库存',
                        },
                        {
                            dataIndex: 'c',
                            title: '期初库存',
                        },
                        {
                            dataIndex: 'key-3',
                            title: '期末库存',
                        },
                        {
                            dataIndex: 'key-4',
                            title: '当前库存',
                        },
                        {
                            dataIndex: 'key-5',
                            title: '上下架状态',
                        },
                        {
                            dataIndex: 'oprate',
                            type: 'oprate',
                            title: '操作',
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

export default InventoryCheckRecord
