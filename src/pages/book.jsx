import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import CreateBookUnControl from "../components/book/create.book.uncontroll";
import { fetchAllBookAPI } from "../services/api.service/";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const loadBook = async () => {
        setLoading(true);
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoading(false);
    };

    return (
        <>
            <div style={{ padding: "20px" }}>
                {/* <CreateBookControl loadBook={loadBook} /> */}
                <CreateBookUnControl loadBook={loadBook} />
                <BookTable
                    dataBooks={dataBooks}
                    loadBook={loadBook}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </>
    );
};

export default BookPage;
