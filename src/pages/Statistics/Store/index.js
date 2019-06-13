import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import { getStoreListMOCK } from '../services'

@connect(() => ({}))
class StatisticsStore extends Component {
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

        getStoreListMOCK({
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
                            title: '日期',
                            dataIndex: 'date1',
                        },
                        {
                            title: '门店ID',
                            dataIndex: 'id1',
                        },
                        {
                            title: '门店名称',
                            dataIndex: 'a',
                        },
                        {
                            title: '门店销售总额',
                            dataIndex: 'number1',
                        },
                        {
                            dataIndex: 'b',
                            title: '门店损耗额',
                        },
                        {
                            dataIndex: 'c',
                            title: '对应结算成本总额',
                        },
                        {
                            dataIndex: 'd',
                            title: '毛利额',
                        },
                        {
                            dataIndex: 'e',
                            title: '毛利率',
                        },
                        {
                            dataIndex: 'ff',
                            title: '四毛额',
                        },
                        {
                            dataIndex: 'g',
                            title: '四毛率',
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

export default StatisticsStore
