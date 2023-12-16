// useRouter 훅 import
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import SizeReviewList from "@/components/SizeReviewList";
import Image from "next/image";
import styles from "@/styles/ProductList.module.css";

export default function Product() {
  const [product, setProduct] = useState();
  const [sizeReviews, setSizeReviews] = useState([]);
  // router 객체 생성
  const router = useRouter();
  //  query에서 id값 추출(대괄호 안에 입력된 값 입력)
  const { id } = router.query;

  async function getProduct(targetId) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProduct = res.data;
    // response의 데이터로 product 상태를 변경함
    setProduct(nextProduct);
  }

  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews/?product_id${targetId}`);
    const nextSizeReview = res.data.results ?? [];
    // response의 데이터로 product 상태를 변경함
    setSizeReviews(nextSizeReview);
  }

  // id값이 바뀔 때마다 실행
  useEffect(() => {
    // id값이 없을 때는 실행하지 않음(불필요한 api요청 예방)
    if (!id) return;
    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  // 첫 화면에는 product 값이 없기 때문에 null 리턴
  if (!product) return null;

  return (
    <div>
      <h1>{product.name}</h1>
      <div className={styles.image}>
        <Image fill sizes="40vw" src={product.imgUrl} alt={product.name} />
      </div>
      <SizeReviewList sizeReviews={sizeReviews} />
    </div>
  );
}
