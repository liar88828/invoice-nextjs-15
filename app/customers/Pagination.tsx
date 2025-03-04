import { useCustomerStore } from "@/store/customer";

export const Pagination = () => {
    const { params, setParams } = useCustomerStore();
    const { page, limit } = params;

    const handlePrevPage = () => {
        if (page > 0) {
            setParams({ page: page - 1 });
        }
    };

    const handleNextPage = () => {
        setParams({ page: page + 1 });
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setParams({ limit: Number(e.target.value) });
    };

    return (
        <div>
            {/* Pagination */}
            <div className="join">
                <button className="join-item btn btn-outline" onClick={handlePrevPage} disabled={page === 0}>
                    «
                </button>
                <button className="join-item btn btn-outline">Page {page}</button>
                <button className="join-item btn btn-outline" onClick={handleNextPage}>
                    »
                </button>
            </div>

            {/* Limit Selector */}
            <select value={limit} onChange={handleLimitChange} className="select select-bordered w-full max-w-xs">
                <option disabled>Choose limit</option>
                <option value="10">10</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
        </div>
    );
};

