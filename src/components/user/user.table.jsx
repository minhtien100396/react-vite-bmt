import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteUserAPI } from "../../services/api.service";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";

const UserTable = (props) => {
    const {
        dataUsers,
        loadUser,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize,
    } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [messageApi, holder] = message.useMessage();

    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const handleDeleteUser = async (id) => {
        if (id) {
            const res = await deleteUserAPI(id);
            if (res.data) {
                notification.success({
                    message: "Delete a user",
                    description: "Delete user thành công",
                });
                if (dataUsers.length === 1 && current > 1) {
                    setCurrent(current - 1);
                } else {
                    await loadUser();
                }
            } else {
                notification.error({
                    message: "Error delete a user",
                    description: JSON.stringify(res.message),
                });
            }
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{pageSize * (current - 1) + (index + 1)}</>;
            },
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
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
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
                                onConfirm={() => {
                                    handleDeleteUser(record._id);
                                }}
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
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {" "}
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    );
};

export default UserTable;
