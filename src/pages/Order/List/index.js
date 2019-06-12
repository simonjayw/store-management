import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import { getOrderListMOCK } from './services'

@connect(() => ({}))
class OrderList extends Component {
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

        getOrderListMOCK({
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
                            label: '订单ID',
                            type: 'input',
                            key: 'orderId',
                        },
                        {
                            label: '用户手机',
                            type: 'input',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'mobile',
                        },
                        {
                            label: '订单时间',
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '订单状态',
                            type: 'select',
                            key: 'orderState',
                            options: [
                                { key: 1, value: '待支付' },
                                { key: 2, value: '待发货' },
                                { key: 3, value: '已挂账' },
                                { key: 4, value: '已完成' },
                                { key: 5, value: '已支付-现金' },
                                { key: 6, value: '已取消' },
                            ],
                        },
                        {
                            key: 'payWay',
                            label: '支付方式',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                        {
                            key: 'sku',
                            label: 'sku品名',
                            type: 'select',
                            showSearch: true,
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '导出',
                        },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '订单时间',
                            dataIndex: 'date1',
                        },
                        {
                            title: '订单id',
                            dataIndex: 'id1',
                        },
                        {
                            title: '客户id',
                            dataIndex: 'id2',
                        },
                        {
                            title: '客户电话',
                            dataIndex: 'a',
                        },
                        {
                            dataIndex: 'b',
                            title: '客户姓名',
                        },
                        {
                            dataIndex: 'number1',
                            title: '订单金额',
                        },
                        {
                            dataIndex: 'c',
                            title: '支付方式',
                        },
                        {
                            dataIndex: 'd',
                            title: '订单状态',
                        },
                        {
                            dataIndex: 'id3',
                            title: '商品批次ID',
                        },
                        {
                            dataIndex: 'qwe',
                            title: 'sku id',
                        },
                        {
                            dataIndex: 'd3',
                            title: 'sku品名',
                        },
                        {
                            dataIndex: 'f',
                            title: '品类',
                        },
                        {
                            dataIndex: 'g',
                            title: '产区',
                        },
                        {
                            dataIndex: 'h',
                            title: '品种',
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
                            dataIndex: 'date2',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'number3',
                            title: '门店结算价',
                        },
                        {
                            dataIndex: 'number4',
                            title: '门店在售价（单',
                        },
                        {
                            dataIndex: 'number5',
                            title: '售出数量',
                        },
                        {
                            dataIndex: 'key-20',
                            title: '门店在售价（总',
                        },
                        {
                            dataIndex: 'key-21',
                            title: '用户备注',
                        },
                        {
                            dataIndex: 'key-22',
                            title: '管理备注',
                        },
                        {
                            dataIndex: 'key-23',
                            title: '发票',
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                {
                                    text: '编辑',
                                },
                                {
                                    text: '记录',
                                },
                                {
                                    text: '发货',
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
            </PageHeaderWrapper>
        )
    }
}

export default OrderList
