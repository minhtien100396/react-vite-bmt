import { Button, Drawer, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
        setPreview(null)
        setSelectedFile(null)
    };


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //sucess   
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUpdateAvatar.data) {
                loadUser()
                setPreview(null)
                setSelectedFile(null)
                setDataDetail(dataDetail => ({
                    ...dataDetail,
                    avatar: newAvatar
                }));
                notification.success({
                    message: "Updated user avatar",
                    description: "Cập nhật avatar thành công"
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }



    return (
        <>
            <Drawer
                width={"40vw"}
                title="Chi tiết User"
                closable={{ "aria-label": "Close Button" }}
                onClose={() => {
                    resetAndCloseModal();
                }}
                open={isDetailOpen}
                maskClosable={false}
            >
                {dataDetail ? (
                    <>
                        <p>Id: {dataDetail._id}</p>
                        <p>Full Name: {dataDetail.fullName}</p>
                        <p>Phone number: {dataDetail.phone}</p>
                        <p>Email: {dataDetail.email}</p>
                        <br />
                        <p>Avatar:</p>
                        <div style={{
                            margin: '10px',
                            height: '100px', width: '150px',
                            border: '1px solid #ccc'
                        }}>
                            <img
                                style={{
                                    height: '100%', width: '100%', objectFit: 'contain'
                                }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                        </div>
                        <div >
                            <label htmlFor="btnUpload" style={{
                                display: 'inline-block', width: 'fit-contend', margin: '15px 0', background: 'orange', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600'
                            }}>Upload Avatar</label>
                            <input type="File" hidden id="btnUpload"
                                onChange={(event) => {
                                    handleOnChangeFile(event)
                                }} />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    margin: '10px',
                                    height: '100px', width: '150px',
                                    border: '1px solid #ccc'
                                }}>
                                    <img
                                        style={{
                                            height: '100%', width: '100%', objectFit: 'contain'
                                        }}
                                        src={preview} alt="" />
                                </div>
                                <Button type="primary" onClick={handleUpdateUserAvatar}>Save</Button>
                            </>


                        }
                    </>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </Drawer>
        </>
    );
};

export default ViewUserDetail;
