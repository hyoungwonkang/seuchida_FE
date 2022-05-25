import { lazy } from "react";

const Guide = lazy(() => import("../pages/LoginPages/Guide"));
const Login = lazy(() => import("../pages/LoginPages/Login"));
const KakaoRedirect = lazy(() => import("../shared/KakaoRedirect"));
const GoogleRedirect = lazy(() => import("../shared/GoogleRedirect"));
const SignupDone = lazy(() => import("../pages/LoginPages/SignupDone"));
const SignupLoca = lazy(() => import("../pages/LoginPages/SignupLoca"));
const AddProfile = lazy(() => import("../pages/LoginPages/AddProfile"));
const EditProfile = lazy(() => import("./LoginPages/EditProfile"));
const Category = lazy(() => import("../pages/LoginPages/Category"));
const Done = lazy(() => import("../pages/LoginPages/Done"));
const EditDone = lazy(() => import("./LoginPages/EditDone"));
const Main = lazy(() => import("../pages/Main"));
const PostList = lazy(() => import("../pages/PostList"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Map = lazy(() => import("../pages/Map"));
const ReviewList = lazy(() => import("../pages/ReviewList"));
const PostCategory = lazy(() => import("../pages/PostCategory"));
const PostWrite_1 = lazy(() => import("../pages/PostWrite_1"));
const PostWrite_2 = lazy(() => import("../pages/PostWrite_2"));
const PostWrite_3 = lazy(() => import("../pages/PostWrite_3"));
const PostWrite_4 = lazy(() => import("../pages/PostWrite_4"));
const PostDone = lazy(() => import("../pages/PostDone"));
const MyPage = lazy(() => import("../pages/MyPage"));
const MyPost = lazy(() => import("../pages/MyPost"));
const MyReview = lazy(() => import("../pages/MyReview"));
const ReviewWrite = lazy(() => import("../pages/ReviewWrite"));
const Evaluation = lazy(() => import("../pages/Evaluation"));
const ReviewDone = lazy(() => import("./ReviewDone"));
const Chatex = lazy(() => import("../pages/Chatex"));
const ChatList = lazy(() => import("../pages/ChatList"));
const NotFound = lazy(() => import("../pages/NotFound"));

export {
  Guide,
  Login,
  KakaoRedirect,
  GoogleRedirect,
  SignupDone,
  SignupLoca,
  AddProfile,
  EditProfile,
  Category,
  Main,
  PostList,
  PostDetail,
  Map,
  ReviewList,
  Done,
  EditDone,
  PostCategory,
  PostWrite_1,
  PostWrite_2,
  PostWrite_3,
  PostWrite_4,
  PostDone,
  MyPage,
  MyPost,
  MyReview,
  ReviewWrite,
  Evaluation,
  ReviewDone,
  Chatex,
  ChatList,
  NotFound,
};
