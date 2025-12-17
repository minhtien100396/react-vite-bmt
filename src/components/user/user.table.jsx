import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import { deleteUserAPI } from "../../services/api.service";
import UpdateUserModal from "./update.user.modal";
import ViewUserDetail from "./view.user.detail";

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [messageApi, holder] = message.useMessage();
    const handleDeleteUser = async (id) => {
        if (id) {
            const res = await deleteUserAPI(id);
            if (res.data) {
                notification.success({
                    message: "Delete a user",
                    description: "Delete user thành công",
                });
                await loadUser();
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
    // const data = [
    //     {
    //         key: "1",
    //         name: "John Brown",
    //         age: 32,
    //         address: "New York No. 1 Lake Park",
    //         tags: ["nice", "developer"],
    //     },
    //     {
    //         key: "2",
    //         name: "Jim Green",
    //         age: 42,
    //         address: "London No. 1 Lake Park",
    //         tags: ["loser"],
    //     },
    //     {
    //         key: "3",
    //         name: "Joe Black",
    //         age: 32,
    //         address: "Sydney No. 1 Lake Park",
    //         tags: ["cool", "teacher"],
    //     },
    // ];

    return (
        <>
            <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
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
