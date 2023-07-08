import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { ArticleTypes } from '../types/types';

export const useArticles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('https://script.google.com/macros/s/AKfycbyfzfv6XXgHpCjelAXH7EL03UNAWQzi0mgM2A5RPCbK0m26o9cAt2o6g_4jIz_sz7s/exec');
            // const res = await axios.get('http://localhost:3001/data');
            setArticles(res.data);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    return { articles, isLoading };
}

export const ArticlesContext = createContext<ArticleTypes[]>([]);
