import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import { getCommodityListMOCK } from '../services'

@connect(() => ({}))
class StatisticsCommodity extends Component {
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

        getCommodityListMOCK({
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
                            label: '日期',
                            type: 'rangepicker',
                            key: 'date',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '导出数据',
                        },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '商品批次id',
                            dataIndex: 'id1',
                        },
                        {
                            title: 'sku id',
                            dataIndex: 'id2',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'a',
                        },
                        {
                            title: '品类',
                            dataIndex: 'b',
                        },
                        {
                            dataIndex: 'd',
                            title: '实际规格值',
                        },
                        {
                            dataIndex: 'e',
                            title: '净重',
                        },
                        {
                            dataIndex: 'c',
                            title: '门店结算总价',
                        },
                        {
                            dataIndex: 'f',
                            title: '门店售价',
                        },
                        {
                            dataIndex: 'number1',
                            title: '销售数量',
                        },
                        {
                            dataIndex: 'number2',
                            title: '销售收入',
                        },
                        {
                            dataIndex: 'number4',
                            title: '进货成本',
                        },
                        {
                            dataIndex: 'ff',
                            title: '门店损耗数（库存差值）',
                        },
                        {
                            dataIndex: 'g',
                            title: '门店损耗额',
                        },
                        {
                            dataIndex: 'h',
                            title: '损耗率',
                        },
                        {
                            dataIndex: 'i',
                            title: '毛利额',
                        },
                        {
                            dataIndex: 'j',
                            title: '毛利率',
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

export default StatisticsCommodity
