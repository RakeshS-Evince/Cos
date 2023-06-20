
function useFilterHook(data, { category, brand, sizes, price: { from, to }, viewBy }) {
    const filterData = () => {
        let temp = data.filter(ele => ele.price >= from && ele.price <= to);
        let sizeFiltered = [];
        let temp2 = temp.filter(ele => category.length ? category.includes(ele.categoryName) : ele).filter(ele => brand.length ? brand.includes(ele.brandName) : ele);
        if (sizes.length) {
            for (let i = 0; i < temp2.length; i++) {
                for (let j = 0; j < sizes.length; j++) {
                    if (temp2[i].sizes.includes(sizes[j])) {
                        sizeFiltered.push(temp2[i]);
                    }
                }
            }
            if (viewBy === "Price Low to High") {
                return Array.from(new Set(sizeFiltered)).sort((a, b) => a.price - b.price);
            } else if (viewBy === "Price High to Low") {
                return Array.from(new Set(sizeFiltered)).sort((a, b) => b.price - a.price);
            } else if (viewBy === "Older first") {
                return Array.from(new Set(sizeFiltered)).sort((a, b) => a.id - b.id);
            } else if (viewBy === "Newer first") {
                return Array.from(new Set(sizeFiltered)).sort((a, b) => b.id - a.id);
            } else {
                return Array.from(new Set(sizeFiltered));
            }
        } else {
            if (viewBy === "Price Low to High") {
                return temp2.sort((a, b) => a.price - b.price);
            } else if (viewBy === "Price High to Low") {
                return temp2.sort((a, b) => b.price - a.price);
            } else if (viewBy === "Older first") {
                return temp2.sort((a, b) => a.id - b.id);
            } else if (viewBy === "Newer first") {
                return temp2.sort((a, b) => b.id - a.id);
            } else {
                return temp2
            }
        }
    }
    return filterData;

}

export default useFilterHook
