import { Input, InputNumber, notification, Select } from "antd";
import Form from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUnControl = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [form] = Form.useForm();
    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadBook,
    } = props;

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataUpdate.thumbnail
                }`
            );
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            });
        }
    }, [dataUpdate, form]);

    const handleUpdateBtn = async (values) => {
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
        updateBook(newThumbnail, values);
    };

    const updateBook = async (newThumbnail, values) => {
        const res = await updateBookAPI(
            values.id,
            newThumbnail,
            values.mainText,
            values.author,
            values.price,
            values.quantity,
            values.category
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
        form.resetFields();
        setDataUpdate(null);
        setSelectedFile(null);
        setPreview(null);
    };

    return (
        <>
            <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    resetAndCloseModal();
                }}
                maskClosable={false}
                okText={"SAVE"}
            >
                {dataUpdate && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdateBtn}
                    >
                        <Form.Item label="ID" name="id">
                            <Input disabled />
                        </Form.Item>
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
                            // value={dataUpdate.author}
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
                            value={dataUpdate.category}
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
                )}
            </Modal>
        </>
    );
};

export default UpdateBookUnControl;
