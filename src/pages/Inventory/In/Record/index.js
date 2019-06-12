import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import { getInListMOCK } from '../../services'

@connect(() => ({}))
class InventoryInRecord extends Component {
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

        getInListMOCK({
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
                            type: 'datepicker',
                            key: 'date',
                        },
                        {
                            label: '发货地',
                            type: 'input',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'outPlace',
                        },
                        {
                            label: '收货地',
                            type: 'input',
                            key: 'inPlace',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '入库日期',
                            dataIndex: 'aa',
                        },
                        {
                            title: '收货员',
                            dataIndex: 'dd',
                        },
                        {
                            title: '发货日期',
                            dataIndex: 'date1',
                        },
                        {
                            title: '物流公司',
                            dataIndex: 'a',
                        },
                        {
                            title: '车辆类型',
                            dataIndex: 'b',
                        },
                        {
                            title: '车牌号码',
                            dataIndex: 'number1',
                        },
                        {
                            dataIndex: 'c',
                            title: '发货地',
                        },
                        {
                            dataIndex: 'd',
                            title: '收货地',
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
                            title: '内包装',
                        },
                        {
                            dataIndex: 'l',
                            title: '外包装',
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
                            dataIndex: 'number2',
                            title: '订货数量',
                        },
                        {
                            dataIndex: 'number3',
                            title: '实际入库数量',
                        },
                        {
                            dataIndex: 'date3',
                            title: '采购日期',
                        },
                        {
                            dataIndex: 'me',
                            title: '采购人员',
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

export default InventoryInRecord
