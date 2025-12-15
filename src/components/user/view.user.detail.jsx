import { Drawer } from "antd";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

    console.log("deailOpen", isDetailOpen);

    return (
        <>
            <Drawer
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
                        <p>Phone: {dataDetail.phone}</p>
                        <p>Email: {dataDetail.email}</p>
                    </>
                ) : (
                    <div>Không có dữ liệu</div>
                )}
            </Drawer>
        </>
    );
};

export default ViewUserDetail;
