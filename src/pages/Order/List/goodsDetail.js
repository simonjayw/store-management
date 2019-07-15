import React, { Component } from 'react'
import { connect } from 'dva'

import BasicTable from '@/components/BasicTable'

import { getGoodsList } from '../services'

@connect(() => ({}))
class OrderGoodsList extends Component {
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
        const { detail } = this.props

        getGoodsList({
            serial_no: detail.serial_no,
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
            <BasicTable
                columns={[
                    {
                        dataIndex: 'skuid',
                        title: 'sku id',
                    },
                    {
                        dataIndex: 'merchant_name',
                        title: '订货门店',
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
                        dataIndex: 'region_name',
                        title: '产区',
                    },
                    {
                        dataIndex: 'variety_name',
                        title: '品种',
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
                        dataIndex: 'levels',
                        title: '等级',
                    },
                    {
                        dataIndex: 'brand_name',
                        title: '品牌',
                    },
                    {
                        dataIndex: 'specification_name',
                        title: '规格',
                    },
                    {
                        dataIndex: 'specification_value',
                        title: '规格值',
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
                        dataIndex: 'quantity_original',
                        title: '订货数量',
                    },
                    {
                        dataIndex: 'quantity_purchase',
                        title: '实际采购数量',
                    },
                    {
                        dataIndex: 'price_purchase',
                        title: '采购单价',
                    },
                    // {
                    //     dataIndex: 'price_total',
                    //     title: '采购成本',
                    // },
                ]}
                dataSource={dataSrouce}
                pagination={{
                    ...pagination,
                    onChange: this.handleChangePage,
                }}
            />
        )
    }
}

export default OrderGoodsList
