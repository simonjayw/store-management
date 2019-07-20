import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
// import ButtonGroup from '@/components/ButtonGroup'
import GoodsDetail from './goodsDetail'

import { getOrderList } from '../services'

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

        goodsDetail: false,
        goodsDetailRecord: {},
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getOrderList({
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

    onShowGoodsDetail = record => {
        this.setState({
            goodsDetail: true,
            goodsDetailRecord: record,
        })
    }

    onHideGoodsDetail = () => {
        this.setState({
            goodsDetail: false,
            goodsDetailRecord: {},
        })
    }

    render() {
        const { dataSrouce, pagination, goodsDetail, goodsDetailRecord } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '订单ID',
                            type: 'input',
                            key: 'serial_no',
                        },
                        {
                            label: '用户手机',
                            type: 'input',
                            key: 'mobile',
                        },
                        {
                            label: '订单时间',
                            type: 'datepicker',
                            key: 'order_time',
                        },
                        {
                            label: '订单状态',
                            type: 'select',
                            key: 'status',
                            initValue: '0',
                            options: [
                                { key: -1, value: '全部' },
                                { key: 0, value: '待支付' },
                                { key: 1, value: '已支付' },
                                { key: 11, value: '已取消' },
                            ],
                        },
                        {
                            key: 'paytype',
                            label: '支付方式',
                            type: 'select',
                            options: [
                                {
                                    key: 'weixin',
                                    value: '微信支付',
                                },
                                {
                                    key: 'alipay',
                                    value: '支付宝支付',
                                },
                                {
                                    key: 'cash',
                                    value: '现金支付',
                                },
                            ],
                        },
                        // {
                        //     key: 'q',
                        //     label: 'sku品名',
                        //     type: 'input',
                        // },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                {/* <ButtonGroup
                    secondary={[
                        {
                            text: '导出',
                        },
                    ]}
                /> */}
                <BasicTable
                    columns={[
                        {
                            title: '订单时间',
                            dataIndex: 'order_time',
                        },
                        {
                            title: '订单id',
                            dataIndex: 'serial_no',
                        },
                        {
                            title: '客户id',
                            dataIndex: 'contacter',
                        },
                        {
                            title: '客户电话',
                            dataIndex: 'mobile',
                        },
                        {
                            dataIndex: 'anyname',
                            title: '客户姓名',
                            render(_, { invoice }) {
                                return invoice.name
                            },
                        },
                        {
                            dataIndex: 'amount_total',
                            title: '订单金额',
                        },
                        {
                            dataIndex: 'amount_actually',
                            title: '实收金额',
                        },
                        {
                            dataIndex: 'paytype_desc',
                            title: '支付方式',
                        },
                        {
                            dataIndex: 'status_desc',
                            title: '订单状态',
                        },
                        // {
                        //     dataIndex: 'id34564563634563',
                        //     title: '商品批次ID',
                        // },
                        // {
                        //     dataIndex: 'qwe45654645645645645',
                        //     title: 'sku id',
                        // },
                        // {
                        //     dataIndex: 'name',
                        //     title: 'sku品名',
                        // },
                        // {
                        //     dataIndex: 'category_name',
                        //     title: '品类',
                        // },
                        // {
                        //     dataIndex: 'region_name',
                        //     title: '产区',
                        // },
                        // {
                        //     dataIndex: 'variety_name',
                        //     title: '品种',
                        // },
                        // {
                        //     dataIndex: 'storage_name',
                        //     title: '存储情况',
                        // },
                        // {
                        //     dataIndex: 'process_name',
                        //     title: '加工情况',
                        // },
                        // {
                        //     dataIndex: 'packing_name_a',
                        //     title: '外包装',
                        // },
                        // {
                        //     dataIndex: 'packing_name_b',
                        //     title: '内包装',
                        // },
                        // {
                        //     dataIndex: 'specification_real',
                        //     title: '实际规格值',
                        // },
                        // {
                        //     dataIndex: 'weight_net',
                        //     title: '净重',
                        // },
                        // {
                        //     dataIndex: 'buy_date',
                        //     title: '采购日期',
                        // },
                        // {
                        //     dataIndex: 'price_settlement',
                        //     title: '门店结算价',
                        // },
                        // {
                        //     dataIndex: 'price_sale',
                        //     title: '门店在售价（单',
                        // },
                        // {
                        //     dataIndex: 'number52222222222',
                        //     title: '售出数量',
                        // },
                        // {
                        //     dataIndex: 'number522222222222345345',
                        //     title: '门店在售价（总',
                        // },
                        {
                            dataIndex: 'remark_user',
                            title: '用户备注',
                        },
                        {
                            dataIndex: 'remark_admin',
                            title: '管理备注',
                        },
                        {
                            dataIndex: 'anyinvoicetitle',
                            title: '发票',
                            render(_, { invoice }) {
                                return invoice.title
                            },
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                {
                                    text: '查看详情',
                                    onClick: this.onShowGoodsDetail,
                                },
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
                <Modal
                    visible={goodsDetail}
                    title="商品列表页"
                    destroyOnClose
                    footer={null}
                    width={1000}
                    onCancel={this.onHideGoodsDetail}
                >
                    <GoodsDetail detail={goodsDetailRecord} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default OrderList
