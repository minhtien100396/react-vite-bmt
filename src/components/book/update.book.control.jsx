import { Input, InputNumber, notification, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadBook,
    } = props;

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataUpdate.thumbnail
                }`
            );
        }
    }, [dataUpdate]);

    const handleUpdateBtn = async () => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book!",
                description: "Vui lòng upload ảnh thumbnail",
            });
            return;
        }
        let newThumbnail = "";
        if (preview && !selectedFile) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                //sucess
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }
        updateBook(newThumbnail);
    };

    const updateBook = async (newThumbnail) => {
        const res = await updateBookAPI(
            id,
            newThumbnail,
            mainText,
            author,
            price,
            quantity,
            category
        );
        if (res.data) {
            notification.success({
                message: "update book",
                description: "update book thành công",
            });
            resetAndCloseModal();
            await loadBook();
        } else {
            notification.error({
                message: "error update book",
                description: JSON.stringify(res.message),
            });
        }
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
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setMainText("");
        setAuthor("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setDataUpdate(null);
        setSelectedFile(null);
        setPreview(null);
    };

    return (
        <>
            <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onOk={() => {
                    handleUpdateBtn();
                }}
                onCancel={() => {
                    resetAndCloseModal();
                }}
                maskClosable={false}
                okText={"SAVE"}
            >
                <div>
                    <span>ID</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Tiêu đề</span>
                    <Input
                        value={mainText}
                        onChange={(event) => {
                            setMainText(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Tác giả</span>
                    <Input
                        value={author}
                        onChange={(event) => {
                            setAuthor(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <span>Giá tiền</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={price}
                        addonAfter={"đ"}
                        onChange={(event) => {
                            setPrice(event);
                        }}
                    />
                </div>
                <div>
                    <span>Số lượng</span>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(event);
                        }}
                    />
                </div>
                <div>
                    <span>Thể loại</span>
                    <Select
                        style={{ width: "100%" }}
                        value={category}
                        onChange={(value) => {
                            setCategory(value);
                        }}
                        options={[
                            { value: "Arts", label: "Arts" },
                            { value: "Business", label: "Business" },
                            { value: "Comics", label: "Comics" },
                            { value: "Cooking", label: "Cooking" },
                            {
                                value: "Entertainment",
                                label: "Entertainment",
                            },
                            { value: "History", label: "History" },
                            { value: "Music", label: "Music" },
                            { value: "Sports", label: "Sports" },
                            { value: "Teen", label: "Teen" },
                            { value: "Travel", label: "Travel" },
                        ]}
                    />
                </div>
                <div>
                    <p style={{ marginTop: "25px" }}>Ảnh thumbnail</p>

                    <label
                        htmlFor="btnUpload"
                        style={{
                            display: "inline-block",
                            width: "fit-contend",
                            margin: "15px 0",
                            background: "orange",
                            padding: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Upload
                    </label>
                    <input
                        type="File"
                        hidden
                        id="btnUpload"
                        onChange={(event) => {
                            handleOnChangeFile(event);
                        }}
                        onClick={(event) => (event.target.value = null)}
                    />
                    {preview && (
                        <>
                            <div
                                style={{
                                    height: "100px",
                                    width: "150px",
                                    border: "1px solid #ccc",
                                }}
                            >
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                    src={preview}
                                    alt=""
                                />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default UpdateBookControl;
