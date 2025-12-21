import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { loadBook } = props;

    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book!",
                description: "Vui lòng upload ảnh thumbnail",
            });
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //sucess
            const newThumbnail = resUpload.data.fileUploaded;
            const res = await createBookAPI(
                newThumbnail,
                mainText,
                author,
                price,
                quantity,
                category
            );
            if (res.data) {
                notification.success({
                    message: "create book",
                    description: "Thêm book thành công",
                });
                resetAndCloseModal();
                await loadBook();
            } else {
                notification.error({
                    message: "error create book",
                    description: JSON.stringify(res.message),
                });
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setSelectedFile(null);
        setPreview(null);
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

    return (
        <>
            <div style={{ margin: "20px 0" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h3>Table Book</h3>

                    <Button
                        type="primary"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        Create Book
                    </Button>
                </div>
                <Modal
                    title="Create Book"
                    open={isModalOpen}
                    onOk={() => {
                        handleSubmitBtn();
                    }}
                    onCancel={() => {
                        resetAndCloseModal();
                    }}
                    maskClosable={false}
                    okText={"CREATE"}
                >
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
            </div>
        </>
    );
};

export default CreateBookControl;
