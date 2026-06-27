import { useEffect, useState } from "react";
import { getNews } from "../api/newsApi";

const useNews = (
    page,
    size
) => {

    const [news, setNews] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [totalPages, setTotalPages] =
        useState(0);

    const fetchNews =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getNews(
                        page,
                        size
                    );

                setNews(
                    data.content
                );

                setTotalPages(
                    data.totalPages
                );

            } catch (error) {

                console.error(
                    error
                );

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {

        fetchNews();

    }, [page, size]);

    return {
        news,
        loading,
        totalPages,
        fetchNews,
    };
};

export default useNews;