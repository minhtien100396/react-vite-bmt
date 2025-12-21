import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import Form from "antd/es/form/Form";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookUnControl = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { loadBook } = props;

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book!",
                description: "Vui lòng upload ảnh thumbnail",
            });
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        console.log("selectFile", selectedFile);

        if (resUpload.data) {
            //sucess
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category } = values;
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
        form.resetFields();
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
                    onOk={() => form.submit()}
                    // okButtonProps={{
                    //     loading: true,
                    // }}
                    onCancel={() => {
                        resetAndCloseModal();
                    }}
                    maskClosable={false}
                    okText={"CREATE"}
                >
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Tiêu đề"
                            name="mainText"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your main text!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tác giả"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your author!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giá tiền"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your price!",
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                addonAfter={"đ"}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your quantity!",
                                },
                            ]}
                        >
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>

                        <Form.Item
                            label="Thể loại"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your category!",
                                },
                            ]}
                        >
                            <Select
                                style={{ width: "100%" }}
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
                        </Form.Item>

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
                            type="file"
                            style={{ display: "none" }}
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
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default CreateBookUnControl;
