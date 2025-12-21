import { Drawer } from "antd";

const ViewBookDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

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
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                            }}
                        >
                            <p>Id: {dataDetail._id}</p>
                            <p>Tiêu đề: {dataDetail.mainText}</p>
                            <p>Tác giả: {dataDetail.author}</p>
                            <p>Thể loại: {dataDetail.category}</p>
                            <p>
                                Giá tiền:
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(dataDetail.price)}
                            </p>
                            <p>Số lượng : {dataDetail.quantity}</p>
                            <p>Đã bán : {dataDetail.sold}</p>

                            <p>Thumbnail:</p>
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
                                    src={`${
                                        import.meta.env.VITE_BACKEND_URL
                                    }/images/book/${dataDetail.thumbnail}`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </Drawer>
        </>
    );
};

export default ViewBookDetail;
