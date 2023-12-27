import { useState } from "react";

const usePagination = (data: any[], itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        //* protect filtering product
        const begin = ((currentPage > maxPage ? 1 : currentPage) - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }
    function jump(page: number) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));

        console.log(pageNumber, maxPage)
    }
    return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
