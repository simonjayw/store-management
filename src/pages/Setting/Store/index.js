import React, { Component } from 'react'
import { connect } from 'dva'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import { getStoreListMOCK } from '../services'

@connect(() => ({}))
class SettingStore extends Component {
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
                            label: '门店名称',
                            type: 'input',
                            key: 'name',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '门店配置',
                        },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '编号',
                            dataIndex: 'id1',
                        },
                        {
                            title: '门店名称',
                            dataIndex: 'a',
                        },
                        {
                            title: '门店配送距离',
                            dataIndex: 'b',
                        },
                        {
                            title: '门店运费价格',
                            dataIndex: 'number1',
                            type: 'date',
                        },
                        {
                            dataIndex: 'd',
                            title: '门店起送件数',
                        },
                        {
                            type: 'oprate',
                            buttons: [{ text: '查看' }, { text: '编辑' }],
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

export default SettingStore
