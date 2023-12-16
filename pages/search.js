import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Search() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  // 쿼리 스트링 값 추출
  const { q } = router.query;

  // Search 컴포넌트에서는 query값을 받아서 products 상태 업데이트
  async function getProducts(query) {
    const res = await axios.get(`/products/?q=${query}`);
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q);
  }, [q]);

  return (
    <div>
      <h1>Search 페이지</h1>
      <SearchForm initialValue={q} />
      <h2>{q} 검색 결과</h2>
      <ProductList products={products} />
    </div>
  );
}
