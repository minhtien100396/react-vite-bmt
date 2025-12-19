import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import ViewBookDetail from "./view.book.detail";


const BookTable = (props) => {
    const { dataBooks, loadBook, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [messageApi, holder] = message.useMessage();

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);



    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{pageSize * (current - 1) + (index + 1)}</>
                )
            }

        },

        {
            title: "ID",
            dataIndex: "_id",
            render: (_, record) => {
                return (
                    <>
                        <a
                            href="#"
                            onClick={() => {
                                setDataDetail(record);
                                setIsDetailOpen(true);
                            }}
                        >
                            {record._id}
                        </a>
                    </>
                );
            },
        },
        {
            title: "Tiêu đề ",
            dataIndex: "mainText",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <>
                        <div
                            style={{
                                display: "flex",
                                gap: "25px",
                            }}
                        >
                            <EditOutlined
                                style={{ cursor: "pointer", color: "orange" }}
                                onClick={() => {
                                    setDataUpdate(record);
                                    setIsModalUpdateOpen(true);
                                }}
                            />
                            {holder}
                            <Popconfirm
                                title="Xóa người dùng "
                                description={`Bạn chắc chắn muốn xóa user ${record.fullName} ?`}
                                // onConfirm={() => {
                                //     handleDeleteUser(record._id);
                                // }}
                                okText="Yes"
                                cancelText="No"
                                placement="top"
                            >
                                <DeleteOutlined
                                    style={{ cursor: "pointer", color: "red" }}
                                />
                            </Popconfirm>
                        </div>
                    </>
                );
            },
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pageSize && pagination.current) {
            if (+current != +pagination.current) {
                setCurrent(+pagination.current);
            }
        }

        if (pageSize && pagination.pageSize) {
            if (+pageSize != +pagination.pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }


    };
    return (
        <>
            <Table columns={columns} dataSource={dataBooks} rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) },
                        pageSizeOptions: ['5', '10', '20', '50', '100']
                    }} onChange={onChange} />
            <ViewBookDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadBook={loadBook}
            />

        </>
    );
};

export default BookTable;
