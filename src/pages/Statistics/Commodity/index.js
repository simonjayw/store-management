import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
// import ButtonGroup from '@/components/ButtonGroup'

import { getCommodityList } from '../services'

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

        getCommodityList({
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
                            label: '关键字',
                            type: 'input',
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                {/* <ButtonGroup
                    secondary={[
                        {
                            text: '导出数据',
                        },
                    ]}
                /> */}
                <BasicTable
                    columns={[
                        {
                            title: '商品批次id',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: 'sku id',
                            dataIndex: 'skuid',
                        },
                        {
                            title: 'sku品名',
                            dataIndex: 'name',
                        },
                        {
                            title: '品类',
                            dataIndex: 'category_name',
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
                            dataIndex: 'amount_settlement',
                            title: '门店结算总价',
                        },
                        {
                            dataIndex: 'price_sale',
                            title: '门店售价',
                        },
                        {
                            dataIndex: 'quantity_sale',
                            title: '销售数量',
                        },
                        {
                            dataIndex: 'amount_sale',
                            title: '销售收入',
                        },
                        {
                            dataIndex: 'price_settlement',
                            title: '进货成本',
                        },
                        {
                            dataIndex: 'quantity_loss',
                            title: '门店损耗数（库存差值）',
                        },
                        {
                            dataIndex: 'amount_loss',
                            title: '门店损耗额',
                        },
                        {
                            dataIndex: 'rate_loss',
                            title: '损耗率',
                        },
                        {
                            dataIndex: 'amount_gross_profit_mch',
                            title: '毛利额',
                        },
                        {
                            dataIndex: 'rate_gross_profit_mch',
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
