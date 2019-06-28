import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, message } from 'antd'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'
import TableRenderImg from '@/components/TableRenderImg'

import AddCommodity from './addCommodity'

import { getCommodityList, commodityGoods } from '../services'

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

        selectedRowsData: [],
        showConfig: false,
        configData: [],
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
                        total: res.pages ? res.pages.count : 0,
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

    onChangeRowSelect = (_, selectedRows) => {
        this.setState({
            selectedRowsData: selectedRows,
        })
    }

    hideConfig = () => {
        this.setState({
            showConfig: false,
            configData: [],
        })
    }

    // 确定进货 显示配置弹窗
    handleCommodity = () => {
        // TODO: 请选择需要采购的商品

        const { selectedRowsData } = this.state

        if (selectedRowsData.length === 0) {
            message.warn('请选择需要采购的商品')
            return
        }

        this.setState({
            showConfig: true,
            configData: selectedRowsData,
        })
    }

    // 确认进货
    handleConfirmConfig = result => {
        const data = JSON.stringify(result)
        commodityGoods({
            // [skuid]: number
            data,
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功！')

                this.hideConfig()
            }
        })
    }

    render() {
        const { dataSrouce, showConfig, configData, pagination } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: 'sku品名',
                            type: 'input',
                            key: 'q',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '确定进货',
                            onClick: this.handleCommodity,
                        },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: 'sku id',
                            dataIndex: 'skuid',
                        },
                        {
                            title: '商品图片',
                            dataIndex: 'pictures',
                            render: data => <TableRenderImg data={data} />,
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
                            dataIndex: 'variety_name',
                            title: '品种',
                        },
                        {
                            dataIndex: 'region_name',
                            title: '产区',
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
                    ]}
                    dataSource={dataSrouce}
                    rowSelection={{
                        onChange: this.onChangeRowSelect,
                    }}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    title="进货数量配置"
                    visible={showConfig}
                    onCancel={this.hideConfig}
                    footer={null}
                    destroyOnClose
                >
                    <AddCommodity onConfirm={this.handleConfirmConfig} data={configData} />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default PurchaseCommodity
