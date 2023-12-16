import axios from "axios";

// 코드 반복을 줄이고 위해 instance 사용
const instance = axios.create({
  baseURL: "https://learn.codeit.kr/api/codeitmall",
});

export default instance;
