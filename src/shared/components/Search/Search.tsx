import React from "react";
import styles from "./Search.module.css";

const Search = ({ onFocus, onBlur }: { onFocus: () => void; onBlur: () => void }) => {
    return (
        <div className={styles.search}>
            <input
                className={styles.searchText}
                placeholder="Найти"
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Search;
