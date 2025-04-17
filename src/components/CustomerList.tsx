import { useCustomerListData } from '@/hooks/useCustomerListData';
import { Alert, Card, List, Pagination, Spin, Tag, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Title, Text } = Typography;

interface CustomerCardProps {
    customer: {
        clientId: string;
        clientName: string;
        summary: string;
        keyInsights: string[];
        customerInfo: {
            company: string;
            email: string;
            phone: string;
            industry: string;
            region: string;
            status: number | null;
        };
        communications: Array<{
            id: string;
            week: string;
            summary: string;
            tags: string[];
            threadCount: number;
        }>;
    };
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
    return (
        <Card
            title={customer.clientName}
            extra={<Tag color={customer.customerInfo.status === 1 ? 'green' : 'red'}>
                {customer.customerInfo.status === 1 ? '活跃' : '非活跃'}
            </Tag>}
            style={{ marginBottom: 16 }}
        >
            <div style={{ marginBottom: 16 }}>
                <Text strong>公司：</Text>
                <Text>{customer.customerInfo.company}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
                <Text strong>联系方式：</Text>
                <Text>{customer.customerInfo.email} | {customer.customerInfo.phone}</Text>
            </div>
            <div style={{ marginBottom: 16 }}>
                <Text strong>行业：</Text>
                <Text>{customer.customerInfo.industry}</Text>
                <Text style={{ marginLeft: 16 }} strong>地区：</Text>
                <Text>{customer.customerInfo.region}</Text>
            </div>

            {customer.summary && (
                <div style={{ marginBottom: 16 }}>
                    <Text strong>客户摘要：</Text>
                    <Text>{customer.summary}</Text>
                </div>
            )}

            {customer.keyInsights && customer.keyInsights.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                    <Text strong>关键洞察：</Text>
                    <div>
                        {customer.keyInsights.map((insight, index) => (
                            <Tag key={index} color="blue">{insight}</Tag>
                        ))}
                    </div>
                </div>
            )}

            {customer.communications && customer.communications.length > 0 && (
                <div>
                    <Text strong>最近通信：</Text>
                    <List
                        dataSource={customer.communications}
                        renderItem={comm => (
                            <List.Item>
                                <div>
                                    <Text type="secondary">{comm.week}</Text>
                                    <div>{comm.summary}</div>
                                    <div>
                                        {comm.tags.map((tag, index) => (
                                            <Tag key={index}>{tag}</Tag>
                                        ))}
                                    </div>
                                    <Text type="secondary">通信数：{comm.threadCount}</Text>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            )}
        </Card>
    );
};

const CustomerList: React.FC = () => {
    const {
        data: customers,
        loading,
        error,
        pagination,
        fetchCustomers
    } = useCustomerListData();

    useEffect(() => {
        fetchCustomers(1, 10);
    }, []);

    const handlePageChange = (page: number, pageSize?: number) => {
        fetchCustomers(page, pageSize || pagination.pageSize);
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>加载中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <Alert
                message="加载失败"
                description={error.message}
                type="error"
                showIcon
            />
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>客户列表</Title>

            <div style={{ marginBottom: 24 }}>
                {customers.map(customer => (
                    <CustomerCard key={customer.clientId} customer={customer} />
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={pagination.total}
                    onChange={handlePageChange}
                    showSizeChanger
                    showQuickJumper
                    showTotal={total => `共 ${total} 条记录`}
                />
            </div>
        </div>
    );
};

export default CustomerList; 