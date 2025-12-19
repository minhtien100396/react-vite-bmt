import { Button, Drawer, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookImgAPI } from "../../services/api.service";

const ViewBookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadBook } = props;
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

    const handleUpdateBookImg = async () => {
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //sucess   
            const newImg = resUpload.data.fileUploaded;
            const resUpdateBookImg = await updateBookImgAPI(newImg, dataDetail._id, dataDetail.mainText, dataDetail.author, dataDetail.price, dataDetail.quantity, dataDetail.category)
            if (resUpdateBookImg.data) {
                loadBook()
                setPreview(null)
                setSelectedFile(null)
                setDataDetail(dataDetail => ({
                    ...dataDetail,
                    thumbnail: newImg
                }));
                notification.success({
                    message: "Updated user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateBookImg.message)
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
                title="Chi tiết Book"
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
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <p>Tác giả: {dataDetail.author}</p>
                        <p>Thể loại: {dataDetail.category}</p>
                        <p>Giá tiền : {dataDetail.price}</p>
                        <p>Số lượng : {dataDetail.quantity}</p>
                        <p>Đã bán : {dataDetail.sold}</p>

                        <br />
                        <p>Thumbnail:</p>
                        <div style={{
                            margin: '10px',
                            height: '100px', width: '150px',
                            border: '1px solid #ccc'
                        }}>
                            <img
                                style={{
                                    height: '100%', width: '100%', objectFit: 'contain'
                                }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                        </div>
                        <div >
                            <label htmlFor="btnUpload" style={{
                                display: 'inline-block', width: 'fit-contend', margin: '15px 0', background: 'orange', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600'
                            }}>Upload Book Image</label>
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
                                <Button type="primary" onClick={handleUpdateBookImg}>Save</Button>
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

export default ViewBookDetail;
