import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { getMemberList } from '../services'

@connect(() => ({}))
class StatisticsMember extends Component {
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

        getMemberList({
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
        const searchCondition = {}

        if (values.date) {
            if (values.date.length === 2) {
                const [beginTime, endTime] = values.date
                searchCondition.begin_time = beginTime
                searchCondition.end_time = endTime
            }
            delete values.date
        }

        this.setState(
            {
                searchCondition: {
                    ...searchCondition,
                    ...values,
                },
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
                            type: 'radiogroup',
                            key: 'days',
                            options: [
                                { text: '全部', value: 0 },
                                { text: '最近30天', value: 30 },
                                { text: '最近90天', value: 90 },
                            ],
                        },
                        {
                            label: '范围日期',
                            type: 'rangepicker',
                            key: 'date',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '排行',
                            dataIndex: 'rank',
                        },
                        {
                            title: '会员名',
                            dataIndex: 'name',
                        },
                        {
                            title: '累计订单数',
                            dataIndex: 'order_total',
                        },
                        {
                            title: '累计消费金额',
                            dataIndex: 'amount_total',
                        },
                        {
                            dataIndex: 'amount_average',
                            title: '平均订单金额',
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

export default StatisticsMember
